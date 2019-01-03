from flask import Flask, jsonify, request, Response, make_response, render_template
from flask_cors import CORS, cross_origin
from datetime import datetime

from mysqlconnection import connectToMySQL


app = Flask(__name__, template_folder='client-app/public')

@app.route('/favicon.ico') 
def favicon(): 
    return Response(status=200)

@app.errorhandler(404)
def not_found(error):
    """ error handler """
    return make_response(jsonify({'error': 'Not found'}), 404)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/students")
@cross_origin(supports_credentials=True)
def all_students():
    db = connectToMySQL()
    students = db.query_db("SELECT id, full_name, email FROM students ORDER BY full_name ASC;")
    return jsonify(students)

@app.route("/items")
@cross_origin(supports_credentials=True)
def all_items():
    db = connectToMySQL()
    items = db.query_db("SELECT id, description, available FROM items WHERE available > 0;")
    return jsonify(items)

@app.route("/students/<int:id>")
@cross_origin(supports_credentials=True)
def one_student(id):
    db = connectToMySQL()
    student = db.query_db(f"SELECT id, full_name, email FROM students WHERE id={id};")
    return jsonify(student)

@app.route("/students/<int:id>/items")
@cross_origin(supports_credentials=True)
def one_student_items(id):
    db = connectToMySQL()
    student_items = db.query_db(f"SELECT item_id AS id, checkout_date, description FROM checked_out_items JOIN items ON checked_out_items.item_id = items.id WHERE student_id={id} AND checked_out_items.checkin_date IS NULL;")
    print(student_items)
    return jsonify(student_items)

## read from file input?
@app.route("/students/create", methods=["POST"])
def create_student():
    try:
        db = connectToMySQL()
        query = "INSERT INTO students (first_name, last_name, email, start_date, grad_date) VALUES (%(f)s, %(l)s, %(e)s, %(s)s, %(g)s);"
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

@app.route("/checkout/<int:student>/<int:item>", methods=["POST"])
@cross_origin(supports_credentials=True)
def checkout_item(student, item):
    try:
        db = connectToMySQL()
        query = "INSERT INTO checked_out_items (student_id, item_id) VALUES (%(s)s, %(i)s);"
        data = {
            "s": student,
            "i": item
        }
        inserted = db.query_db(query, data)

        db = connectToMySQL()
        query = f"UPDATE items SET available = available - 1 WHERE id={item};"
        db.query_db(query)
        return jsonify({'status': 1}) if inserted else jsonify({'status': 0})
        # return Response(status=200) if inserted else Response(status=500)
    except Exception as e:
        return Response(status=500)
    
@app.route("/checkin/<int:student>/<int:item>", methods=["POST"])
@cross_origin(supports_credentials=True)
def checkin_item(student, item):
    try:
        db = connectToMySQL()
        query = f"UPDATE checked_out_items SET checkin_date = NOW() WHERE student_id = {student} AND item_id = {item};"
        removed = db.query_db(query)

        db = connectToMySQL()
        query = f"UPDATE items SET available = available + 1 WHERE id={item};"
        db.query_db(query)
        return jsonify({'status': 1}) if removed else jsonify({'status': 0})
        # return Response(status=200) if removed else Response(status=500)
    except Exception as e:
        return Response(status=500)

if __name__ == "__main__":
    app.run(debug=True)
