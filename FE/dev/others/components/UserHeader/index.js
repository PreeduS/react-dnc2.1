import React from 'react';
import {connect} from 'react-redux';

import UserHeaderContainer from './containers/UserHeader'; 
//import {getUser} from '~/commons/selectors';
//import {userStatus} from '~/commons/constants';


//import LoaderHoc from '~/commons/components/LoaderHoc';
//const UserHeaderHoc = LoaderHoc(UserHeaderContainer);


class UserHeader extends React.Component {
    render(){
        //const {loginStatus, logoutStatus} = this.props.user;
        //const isPending = loginStatus === userStatus.pending || logoutStatus === userStatus.pending;
        //return <UserHeaderHoc loading = {isPending}/>;
        return <UserHeaderContainer/>;
    }
}

const mapStateToProps = state=>( {
    //user:getUser(state)
});

export default connect(mapStateToProps, null)(UserHeader);
