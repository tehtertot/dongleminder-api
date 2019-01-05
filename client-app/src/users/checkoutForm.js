import React from 'react';
import Button from 'react-bootstrap/lib/Button';

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

export default CheckoutForm;