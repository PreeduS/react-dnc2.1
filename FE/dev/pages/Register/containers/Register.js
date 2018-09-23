import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from '../components/RegisterForm';

import * as styles from '../styles/Register'

class Register extends React.Component {

    render(){
       return(
            <styles.RegisterWrapper>
                <RegisterForm />
            </styles.RegisterWrapper>
        );
    }

}

export default Register;