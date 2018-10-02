import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {loadUsers} from '../actions';
import {getUsers} from '../selectors';

//import User from '../components/User';

import Table, {Header, Body, Row, Column} from '~/commons/components/Table';
import UserRow from '../components/UserRow';


class Users extends React.Component {

    componentDidMount(){
        this.props.loadUsers();
    }
    render() {
        const users = this.props.users.data;
        //const usersData = users.data;

        console.log('users ',users)

        return(
            <div style= {{marginTop:'30px'}}>
                <Table>

                    <Body>
                        {users.length > 0 && users.map( (val , index) => 
                            <UserRow 
                                logoSrc = {''} 
                                username = {val.username}
                                showBorder = {'horizontal'}
                                height = {'50px'}
                            /> 
                        )}
                    </Body>

                </Table>
            </div>
        );

        /*return(
            <div>
                {usersData.length > 0 && usersData.map( (val , index) => 
                    <User key = {index} username = {val.username}/> 
                )}
                
            </div>
        );*/

    }
}

/*
                {Object.keys(usersData).length > 0 && Object.keys(usersData).map(key => 
                    <User key = {key} username = {usersData[key].username}/> 
                )}


                    <Header>
                        <Row showBorder = {'horizontal'}> 
                            <Column width = {'60px'}>Logo temp</Column>
                            <Column width = {'400px'}>main content temp</Column>
                        </Row>
                    </Header>



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