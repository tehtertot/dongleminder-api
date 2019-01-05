from flask import Flask, jsonify, request, Response, make_response, render_template
from flask_cors import CORS, cross_origin
from datetime import datetime

from mysqlconnection import connectToMySQL

app = Flask(__name__)

@app.route('/favicon.ico') 
def favicon(): 
    return Response(status=200)

@app.errorhandler(404)
def not_found(error):
    """ error handler """
    return make_response(jsonify({'error': 'Not found'}), 404)

@app.route("/users")
@cross_origin(supports_credentials=True)
def all_users():
    db = connectToMySQL()
    # filter by status?
    users = db.query_db("SELECT id, full_name, email FROM users ORDER BY full_name ASC;")
    return jsonify(users)

@app.route("/items")
@cross_origin(supports_credentials=True)
def all_items():
    db = connectToMySQL()
    items = db.query_db("SELECT id, description, available FROM items WHERE available > 0;")
    return jsonify(items)

@app.route("/items/detail")
@cross_origin(supports_credentials=True)
def all_items_with_detail():
    db = connectToMySQL()
    items = db.query_db("SELECT id, description, count, available FROM items;")
    db = connectToMySQL()
    checked_out = db.query_db("SELECT user_id, item_id FROM checked_out_items WHERE checkin_date IS NULL;")
    print(checked_out)
    list_of_users = {u["user_id"] for u in checked_out}
    db = connectToMySQL()
    users = db.query_db(f"SELECT id, full_name FROM users WHERE id IN ({','.join(str(i) for i in list_of_users)});")
    for item in items:
        for c in checked_out:
            if c['item_id'] == item['id']:
                name = list(filter(lambda u: u['id'] == c['user_id'], users))[0]['full_name']
                if 'users' in item:
                    item['users'].append(name)
                else:
                    item['users'] = [name] 
    return jsonify(items)

@app.route("/users/<int:id>")
@cross_origin(supports_credentials=True)
def one_user(id):
    db = connectToMySQL()
    user = db.query_db(f"SELECT id, full_name, email FROM users WHERE id={id};")
    return jsonify(user)

@app.route("/users/<int:id>/items")
@cross_origin(supports_credentials=True)
def one_user_items(id):
    db = connectToMySQL()
    user_items = db.query_db(f"SELECT item_id AS id, checkout_date, description FROM checked_out_items JOIN items ON checked_out_items.item_id = items.id WHERE user_id={id} AND checked_out_items.checkin_date IS NULL;")
    return jsonify(user_items)

## read from file input?
@app.route("/users/create", methods=["POST"])
def create_user():
    try:
        db = connectToMySQL()
        query = "INSERT INTO users (first_name, last_name, email, start_date, grad_date) VALUES (%(f)s, %(l)s, %(e)s, %(s)s, %(g)s);"
        data = {
            "f": request.form["first"],
            "l": request.form["last"],
            "e": request.form["email"],
            "s": request.form["start"],
            "g": request.form["grad"]
        }
        return db.query_db(query, data)
    except:
        return Response(status=500)

@app.route("/items/create", methods=["POST"])
def create_item():
    try:
        db = connectToMySQL()
        query = "INSERT INTO items (description, count, available) VALUES (%(d)s, %(c)s, %(c)s);"
        data = {
            "d": request.form["desc"],
            "c": request.form["count"],
        }
        return db.query_db(query, data)
    except:
        return Response(status=500)

@app.route("/users/checkout/<int:user>/<int:item>", methods=["POST"])
@cross_origin(supports_credentials=True)
def checkout_item(user, item):
    try:
        db = connectToMySQL()
        query = "INSERT INTO checked_out_items (user_id, item_id) VALUES (%(s)s, %(i)s);"
        data = {
            "s": user,
            "i": item
        }
        inserted = db.query_db(query, data)

        if inserted:
            db = connectToMySQL()
            query = f"UPDATE items SET available = available - 1 WHERE id={item};"
            db.query_db(query)
            return jsonify({'status': 1})
        else:
            return jsonify({'status': 0})
        # return Response(status=200) if inserted else Response(status=500)
    except Exception as e:
        return Response(status=500)
    
@app.route("/users/checkin/<int:user>/<int:item>", methods=["POST"])
@cross_origin(supports_credentials=True)
def checkin_item(user, item):
    try:
        db = connectToMySQL()
        query = f"UPDATE checked_out_items SET checkin_date = NOW() WHERE user_id = {user} AND item_id = {item};"
        removed = db.query_db(query)

        db = connectToMySQL()
        query = f"UPDATE items SET available = available + 1 WHERE id={item};"
        db.query_db(query)
        return jsonify({'status': 1}) if removed else jsonify({'status': 0})
        # return Response(status=200) if removed else Response(status=500)
    except Exception as e:
        return Response(status=500)

if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=True)
