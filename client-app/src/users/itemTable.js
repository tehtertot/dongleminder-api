import React from 'react';
import CheckoutForm from './checkoutForm';
import ItemRow from './itemRow';

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

export default ItemTable;