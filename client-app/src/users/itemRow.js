import React from 'react';
import CheckinForm from './checkinForm';

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

export default ItemRow;