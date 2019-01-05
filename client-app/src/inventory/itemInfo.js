import React from 'react';

class ItemInfo extends React.Component {
    render() {
        let item = this.props.item;
        let users;
        if (item.users) {
            let list = item.users.map((u) => <li key={u}>{u}</li>)
            users = <ul>{list}</ul>;
        }
        return (
            <div className="itemInfo">
                <h6>{item.description} ({item.count})</h6>
                {users}
                <hr />
            </div>
        );
    }
}

export default ItemInfo;