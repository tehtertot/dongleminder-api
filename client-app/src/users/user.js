import React from 'react';

class User extends React.Component {
    render() {
        return (
            <li className="studentRow" value={this.props.value} onClick={() => this.props.onClick(this.props.value, this.props.name)}>{this.props.name}</li>
        );
    }
}

export default User;