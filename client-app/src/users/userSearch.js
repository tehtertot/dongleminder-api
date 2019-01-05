import React from 'react';
import User from './user';

class UserSearch extends React.Component {
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
            <User name={st.full_name} key={st.id} value={st.id} onClick={ this.props.showStudent } />)
        return(
            <div className="search">
                <input placeholder="search students..." onChange={ (e) => this.handleChange(e.target.value) } />
                <ul id="studentList">{visibleStudents}</ul>
            </div>
        );
    }
}

export default UserSearch;