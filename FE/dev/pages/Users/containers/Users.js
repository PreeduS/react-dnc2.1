import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {loadUsers} from '../actions';
import {getUsers} from '../selectors';

import User from '../components/User';

class Users extends React.Component {

    componentDidMount(){
        this.props.loadUsers();
    }
    render() {
        const {users} = this.props;
        const usersData = users.data;

        return(
            <div>
                {usersData.length > 0 && usersData.map( (val , index) => 
                    <User key = {index} username = {val.username}/> 
                )}
                
            </div>
        );
    }
}

/*
                {Object.keys(usersData).length > 0 && Object.keys(usersData).map(key => 
                    <User key = {key} username = {usersData[key].username}/> 
                )}
*/

Users.propTypes = {
    users: PropTypes.object.isRequired,

};

const mapStateToProps = state =>( {
    users: getUsers(state)
});
const mapDispatchToProps = dispatch => ({
    loadUsers: () =>
        dispatch(() => loadUsers()(dispatch) )
    ,
});


export default connect(mapStateToProps, mapDispatchToProps)(Users);