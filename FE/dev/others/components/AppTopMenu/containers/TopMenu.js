import React from 'react';
import * as styles from '../styles/TopMenu';
import UserHeader from '../components/UserHeader';

class TopMenu extends React.Component{
    
    render(){
        const {children} = this.props;
        const routesLinks = React.Children.map(children, child =>
            <styles.NavItem>{child}</styles.NavItem>
        )
        return(
            <styles.TopMenu>
                <styles.Logo />
                <styles.MiddleContainer>
                    {routesLinks}
                </styles.MiddleContainer>
                <styles.RightContainer>
                   <UserHeader />
                </styles.RightContainer>
            </styles.TopMenu>
        );
    }
}

export default TopMenu;