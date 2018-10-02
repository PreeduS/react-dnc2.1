import React from 'react';

import {Row, Column} from '~/commons/components/Table';

import Logo from './Logo';
import MainContent from './MainContent';


class UserRow extends React.Component{
    render(){
        const {username, ...rest} = this.props;
        return(
            <Row {...rest}>
                <Column width = {'50px'}>  
                   <Logo />
                </Column>
                <Column>  
                    <MainContent username = {username}/>
                </Column>

            </Row>
        );
    }
}

export default UserRow;