import React from 'react';
import axios from 'axios';

import Field from '~/commons/components/Field';

import services from '~/commons/services';

class LoginForm extends React.Component{
    constructor(){
        super();
        this.changeHandler = this.changeHandler.bind(this);
        this.login = this.login.bind(this);

        this.state = {
            username:'',
            password:'',
            status:''
        }
    }

    login(){
        this.setState({status:''});
        const {username, password} = this.state;
        const {login, isPendingHandler} = this.props;
        
        isPendingHandler(true);    
        services.login(username, password).then( result =>{
            isPendingHandler(false); 
            this.setState({
                status: 'Logged in successfully'
            });
            login(username);
        }).catch(err => {
            isPendingHandler(false);   
            this.setState({
                status: 'Wrong username of password'
            });
        });

    }

    changeHandler(value, mapTo){
        this.setState({
            [mapTo]:value
        });
    }

    render(){
        const {username, password, status} = this.state;
        return(
            <div>

                <Field
                    type= "text"
                    label="Username"
                    errors = {null}
                    changeHandler = {this.changeHandler}
                    mapTo = {'username'}
                    value = {username}
                />
                <Field
                    type= "password"
                    label="Password"
                    errors = {null}
                    changeHandler = {this.changeHandler}
                    mapTo = {'password'}
                    value = {password}
                />

                {status}
                <br />
                <button disabled = {this.props.isPending} onClick = {this.login}>Login</button>
            </div>
        );
    }
}

export default LoginForm;
