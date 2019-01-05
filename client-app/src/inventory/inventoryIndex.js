import React from 'react';

import {showMain} from '../index';

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

export default InventoryIndex;