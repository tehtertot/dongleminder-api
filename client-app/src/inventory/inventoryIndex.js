import React from 'react';

import {showMain} from '../index';

import ItemInfo from './itemInfo';

class InventoryIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "items": [],
        }
        fetch("http://localhost:5000/items/detail", {
            method: "GET",
            crossDomain: true,
        })
            .then((res) => res.json())
            .then((jsonRes) => this.setState( {'items': jsonRes} ))
    }
    render() {
        let items = this.state.items.map((i) => <ItemInfo key={i.id} item={i} />)
        return (
            <div className="container">
                <h3>Dojo Inventory</h3>
                <p className="link" onClick={showMain}>View Students</p>
                {items}
            </div>
        );
    }
}

export default InventoryIndex;