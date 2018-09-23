import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from '~/commons/axios';
import Field from './Field';
import validation, {usernameStatus} from './RegisterForm/validation';
import Button from '~/commons/components/Button';

import {register} from '~/commons/actions/user';
import {getUser} from '~/commons/selectors';
import services from '~/commons/services';

import * as styles from '../styles/RegisterForm';

const username = {  //tmp
    minLength: 6
}

class RegisterForm extends React.Component {
    constructor(){
        super();
        this.state = {
            usernameStatus: null,
            values:{
                username:'',
                password:'',
                password2:'',
                //email:''
            },
            validation: {
                messages:{},
                errors:{},
                hasErrors: null
            }     
        }
        this.validationManager = this.validationManager.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.userHandler = this.userHandler.bind(this);
        this.blurHandler = this.blurHandler.bind(this);
        this.register = this.register.bind(this);

    }
    
    register(){
        const {username, password} = this.state.values;
        const {register} = this.props;
        register(username, password, username + '@zzz.zzz');
    }  

    blurHandler(value, mapTo){
        if(value.length < username.minLength){ return; }

        this.setState({
            usernameStatus: usernameStatus.pending
        },() => this.validationManager(value, 'username'));
        

        services.doesUserExists(value).then(result=>{
            const userExists = result.data.userExists;
            
            if(this.state.values.username !== value){ return; }
            this.setState({
                usernameStatus: userExists ? usernameStatus.exists : usernameStatus.available
            }, () => this.validationManager(value, 'username'));
            
            
        }).catch(error => {
            this.setState({
                usernameStatus: null
             }, () => this.validationManager(this.state.values.username, 'username'));
                           
        });   
    
    }

    userHandler(value, mapTo){
        this.setState({
            usernameStatus: null     
        },() => this.validationManager(value, mapTo) );

    }
    changeHandler(value, mapTo){
        this.validationManager(value, mapTo);
    }

    validationManager(value, mapTo){  
        let newValues =  {...this.state.values};
        if(mapTo){
            newValues[mapTo] = value;
        }
        const validationData = validation(newValues, mapTo)(this.state);

        this.setState({
            ...this.state,
            values: newValues,
            validation: validationData
        });

    }
    //componentDidMount(){ this.validationManager(); }
    
    render() {
        const {validation, values , usernameStatus: status} = this.state;
        const {registerStatus, username} = this.props.user;
        const loggedIn = username !== null;
      
        const isFieldEmpty = Object.keys(values).find( key => values[key] === '' || values[key] === null ) !== undefined;
        const isDisabled = (
            validation.hasErrors === null ||
            validation.hasErrors === true ||
            isFieldEmpty ||
            status === usernameStatus.pending 
        )

        if(loggedIn){
            return (
                <styles.RegisterForm>
                    Already logged in.
                </styles.RegisterForm>
            );
        }
        
        return (
            <styles.RegisterForm>
                <div>RegisterForm</div>    <br />
        
                <Field 
                    label = "Username" 
                    type="text" 
                    errors = {validation.messages.username} 
                    changeHandler = {this.userHandler}
                    blurHandler = {this.blurHandler}
                    value = {values.username}
                    mapTo = {'username'}
                />
                <Field 
                    label = "Password" 
                    type="password" 
                    errors = {validation.messages.password}
                    changeHandler = {this.changeHandler}
                    value = {values.password}    
                    mapTo = {'password'}            
                />
                <Field 
                    label = "Password verify" 
                    type="password" 
                    errors = {validation.messages.password2}
                    changeHandler = {this.changeHandler}
                    value = {values.password2}    
                    mapTo = {'password2'}            
                />

                <br />
                <button 
                    disabled = {isDisabled} 
                    onClick = {this.register}           
                >
                    Register
                </button>
                <Button
                        onClick = {this.register}
                        disabled = {isDisabled}
                        width = {100}
                        height = {30}
                        type = "gray"
                    >
                    Register
                    </Button>
                <Button
                        onClick = {this.register}
                        disabled = {isDisabled}
                        width = {100}
                        height = {30}
                 
                    >
                    Register
                    </Button>


                <br />
             

            </styles.RegisterForm>
        );
    }
}

const mapStateToProps = state =>( {
    user: getUser(state),
});
const mapDispatchToProps = dispatch=>({
    register: (username, password, email) =>
        dispatch(() => register(username, password, email)(dispatch) )
});


export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
