import React from 'react';
import {UserWrapper, LeftContainer, RightContainer} from '../styles/User';

class User extends React.Component{
    render(){


        
        return(
            <UserWrapper>

                <LeftContainer>
                     
                </LeftContainer>
                <RightContainer>
                    {this.props.username}
                </RightContainer>

            </UserWrapper>
        );
    }
}

export default User;