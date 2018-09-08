import React from 'react';
import axios from 'axios';

import Field from '~/commons/components/Field';

//import services from '~/commons/services';

class LoginForm extends React.Component{
    constructor(){
        super();
        this.changeHandler = this.changeHandler.bind(this);
        this.login = this.login.bind(this);

        this.state = {
            username:'',
            password:'',
           // status:''
        }
    }

    login(){
        //this.setState({status:''});
        const {username, password} = this.state;
        const {login} = this.props;
        
        login(username, password);
/*
        //isPendingHandler - not used
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
        });*/

    }

    changeHandler(value, mapTo){
        this.setState({
            [mapTo]:value
        });
    }
    /*static getDerivedStateFromProps(nextProps, prevState){
        console.log('nextProps' , nextProps)
        console.log('prevState' , prevState)
        return prevState;
    }*/

    render(){
        const {username, password, /*status*/} = this.state;
        //const {isPending} = this.props;
       // const {loginStatus} = this.props;
        const {statusMessage, disabled} = this.props;

       /* let status = '';
        if(loginStatus === 'fulfilled'){
            status = 'Logged in successfully';
        }
        if(loginStatus === 'rejected'){
            status = 'Wrong username of password';
        }
        if(loginStatus === 'pending'){
            status = 'Loading...';
        }*/
        
        return(
            <div>

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
            </div>
        );
    }
}

export default LoginForm;
