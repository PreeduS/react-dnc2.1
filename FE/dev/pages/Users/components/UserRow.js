import React from 'react';

import {Row, Column} from '~/commons/components/Table';

import Logo from './Logo';
import MainContent from './MainContent';


class UserRow extends React.Component{
    render(){
        const {username, ...rest} = this.props;
        console.log( this.props)
        return(
            <Row {...rest}>
                <Column width = {'60px'}>  
                   <Logo />
                </Column>
                <Column width = {'400px'}>  
                    <MainContent username = {username}/>
                </Column>

            </Row>
        );
    }
}

export default UserRow;