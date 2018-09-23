import React from 'react';
import {connect} from 'react-redux';

import UsersContainer from './containers/Users';

class Users extends React.Component{
    render(){
        return(
            <UsersContainer />
        );
    }
}

export default Users;