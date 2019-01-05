import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Button from 'react-bootstrap/lib/Button';

class CheckinForm extends React.Component {
    render() {
        return (
            <form onSubmit={(e) => this.props.checkin(e)}>
                <Button type="submit" variant="danger">return</Button>
            </form>
        );
    }
}

class CheckoutForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemSelected: '',
            itemDesc: '',
        };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSubmit = this.handleCheckout.bind(this);
    }

    handleUpdate(e) {
        let selectedIndex = e.target.selectedIndex;
        let selectedContent = e.target.options[selectedIndex].text;
        selectedContent = selectedContent.substring(0, selectedContent.lastIndexOf("(")-1)
        this.setState({itemSelected: e.target.value, itemDesc: selectedContent});
    }

    handleCheckout(e) {
        e.preventDefault();
        if (this.props.studentId && this.state.itemSelected) {
            fetch(`http://localhost:5000/checkout/${this.props.studentId}/${this.state.itemSelected}`, {
                method: "POST",
            })
                .then(() => {
                    this.props.update();
                    this.setState({itemSelected: '', itemDesc: ''});
                })
                .catch(() => {console.log("something went wrong") })
        }
    }

    render() {
        let items = this.props.allItems.map((item) => <option key={item.id} value={item.id}>{item.description} ({item.available})</option>);
        
        return (
            <form action="/checkout" method="POST" onSubmit={(e) => this.handleCheckout(e)}>
                <select className="itemDropdown" onChange={(e) => this.handleUpdate(e)} value={this.state.itemSelected ? this.state.itemSelected : ''}>
                    <option value=''>---please select an item---</option>
                    {items}
                </select>
                <Button variant="success" size="sm" type="submit">Check Out</Button>
            </form>
        );
    }
}

class ItemRow extends React.Component {
    returnItem(e) {
        e.preventDefault();
        let item = this.props.item.id;
        let student = this.props.student.id;
        fetch(`http://localhost:5000/checkin/${student}/${item}`, {
            method: "POST",
        })
            .then(() => this.props.update() )
            .catch(() => {console.log("something went wrong")})
    }

    render() {
        const item = this.props.item;
        let checkout_date = new Date(item.checkout_date);
        checkout_date = checkout_date.toLocaleDateString("en-US");
        return (
            <tr>
                <td>{item.description}</td>
                <td>{checkout_date}</td>
                <td><CheckinForm checkin={(e) => this.returnItem(e) } item={item.id} /></td>
            </tr>
        );
    }
}

class ItemTable extends React.Component {
    render() {
        if (this.props.student) {
            let items;
            if (this.props.items.length === 0) {
                items = <tr><td colSpan="3">no checked out items</td></tr>;
            }
            else {
                items = this.props.items.map((item) => <ItemRow key={item.id} item={item} student={this.props.student} update={this.props.update} />);
            }

            return(
                <table className="itemsTable table text-center">
                    <thead>
                        <tr>
                            <th colSpan="3">Items on Loan to {this.props.student.full_name}</th>
                        </tr>
                        <tr>
                            <th>Item</th>
                            <th>Date Checked Out</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                        <tr>
                            <td colSpan="3"><CheckoutForm studentId={this.props.student.id} update={this.props.update} allItems={this.props.allItems} /></td>
                        </tr>
                    </tbody>
                </table>
            );
        }
        else {
            return (<p className="itemsTable font-italic">Please select a student</p>);
        }
    }
}

class Student extends React.Component {
    render() {
        return (
            <li className="studentRow" value={this.props.value} onClick={() => this.props.onClick(this.props.value, this.props.name)}>{this.props.name}</li>
        );
    }
}

class StudentSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allStudents: [],
            filteredStudents: [],
            searchFilter: "",
        }
        fetch('http://localhost:5000/users', {
            method: 'GET',
            crossDomain: true,
        })
            .then((res) => res.json())
            .then((jsonRes) => {
                this.setState({allStudents: jsonRes, filteredStudents: jsonRes});
            })
    }

    handleChange(val) {
        let searchVal = val.toLowerCase();
        let students = this.state.allStudents.slice();
        students = students.filter((st) => st.full_name.toLowerCase().includes(searchVal));
        this.setState({filteredStudents: students});
    }

    render() {
        let visibleStudents = this.state.filteredStudents.map((st) =>
            <Student name={st.full_name} key={st.id} value={st.id} onClick={ this.props.showStudent } />)
        return(
            <div className="search">
                <input placeholder="search students..." onChange={ (e) => this.handleChange(e.target.value) } />
                <ul id="studentList">{visibleStudents}</ul>
            </div>
        );
    }
}
  
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student: null,
            items: [],
            allItems: [],
        };
        this.updateTable = this.displayStudentItems.bind(this);
    }

    displayStudent(id) {
        fetch(`http://localhost:5000/users/${id}`, {
            method: "GET",
            crossDomain: true,
        })
            .then((res) => res.json())
            .then((jsonRes) => {
                this.setState({student: jsonRes[0]});
                this.displayStudentItems();
            })
    }

    displayItemDropdown() {
        fetch('http://localhost:5000/items', {
            method: 'GET',
            crossDomain: true,
        })
            .then((res) => res.json())
            .then((jsonRes) => this.setState({allItems: jsonRes}));
    }

    displayStudentItems() {
        let id = this.state.student.id;
        fetch(`http://localhost:5000/users/${id}/items`, {
            method: 'GET',
            crossDomain: true,
        })
            .then((res) => res.json())
            .then((jsonRes) => {
                this.setState({ items: jsonRes });
                this.displayItemDropdown();
            })
    }

    switchView() {
        ReactDOM.render(
            <InventoryIndex />,
            document.getElementById('root')
        );
    }

    render() {
        return (
            <div className="container">
                <h3>Dojo Inventory</h3>
                <p className="link" onClick={this.switchView}>View All</p>
                <StudentSearch showStudent={ this.displayStudent.bind(this) } />
                <ItemTable student={this.state.student} items={this.state.items} update={this.updateTable} allItems={this.state.allItems} />
            </div>
        );
    }
}

class InventoryIndex extends React.Component {
    render() {
        return (
            <div className="container">
                <h3>Dojo Inventory</h3>
                <p className="link" onClick={showMain}>View Students</p>
            </div>
        );
    }
}
  
// ========================================

function showMain() {
    ReactDOM.render(
        <Index />,
        document.getElementById('root')
    );
}

showMain();