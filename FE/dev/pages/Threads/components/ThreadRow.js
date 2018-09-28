import React from 'react';
import {Row, Column} from '~/commons/components/Table';

import * as styles from '../styles/ThreadRow';

import MainContent from './MainContent';
import Logo from './Logo';

class ThreadRow extends React.Component{
    
    render(){

        const {username, ...rest} = this.props;
        return(
            <Row {...rest}>
                <Column width = {'70px'}>  
                    <Logo />
                </Column>
                <Column>  
                    <MainContent username = {username}/>
                </Column>
                <Column width = {'100px'}>
                    <styles.Category>Placeholder</styles.Category>
                </Column>
                <Column width = {'100px'}>
                    <styles.Category>20</styles.Category>
                </Column>
                <Column width = {'100px'}>
                    <styles.Category>3h</styles.Category>
                </Column>

            </Row>
        );
    }
}

export default ThreadRow;