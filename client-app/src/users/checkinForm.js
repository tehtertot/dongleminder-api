import React from 'react';

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

export default CheckinForm;