import React from 'react';
import ReactDOM from 'react-dom';

import UserSearch from './userSearch';
import ItemTable from './itemTable';
import InventoryIndex from '../inventory/inventoryIndex';

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
                <UserSearch showStudent={ this.displayStudent.bind(this) } />
                <ItemTable student={this.state.student} items={this.state.items} update={this.updateTable} allItems={this.state.allItems} />
            </div>
        );
    }
}

export default Index;