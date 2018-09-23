import React from 'react';
//import axios from 'axios';
import axios from '~/commons/axios';

import Field from '~/commons/components/Field';
import * as styles from '../styles/LoginForm'

//import services from '~/commons/services';

class LoginForm extends React.Component{
    constructor(){
        super();
        this.changeHandler = this.changeHandler.bind(this);
        this.login = this.login.bind(this);

        this.state = {
            username:'',
            password:''
        }
    }

    login(){
        const {username, password} = this.state;
        const {login} = this.props;        
        login(username, password);
    }

    changeHandler(value, mapTo){
        this.setState({
            [mapTo]:value
        });
    }

    render(){
        const {username, password} = this.state;
        const {statusMessage, disabled} = this.props;

        return(
            <styles.LoginForm>
                <Field
                    type= "text"
                    label="Username"
                    errors = {null}
                    changeHandler = {this.changeHandler}
                    mapTo = {'username'}
                    value = {username}
                    disabled = {disabled} 
                />
                <Field
                    type= "password"
                    label="Password"
                    errors = {null}
                    changeHandler = {this.changeHandler}
                    mapTo = {'password'}
                    value = {password}
                    disabled = {disabled} 
                />

                {statusMessage}
                <br />
                <button disabled = {disabled} onClick = {this.login}>Login</button>
            </styles.LoginForm>
        );
    }
}

export default LoginForm;
