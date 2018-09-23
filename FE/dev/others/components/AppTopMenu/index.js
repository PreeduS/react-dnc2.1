import React from 'react';
import * as styles from './styles/AppTopMenu';
//import UserHeader from '../UserHeader';
import TopMenuContainer from './containers/TopMenu';

class AppTopMenu extends React.Component{

    render(){            
        return(
            <styles.AppTopMenu>
                <TopMenuContainer {...this.props}/>
            </styles.AppTopMenu>
        );
    }
}

export default AppTopMenu;
