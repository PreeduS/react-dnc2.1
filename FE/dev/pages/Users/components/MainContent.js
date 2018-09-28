import React from 'react';

import * as styles from '../styles/MainContent';

class MainContent extends React.Component{
    render(){
        const {username} = this.props;
        return(
            <styles.MainContent>

                <styles.Username>
                    {username}
                </styles.Username>
                
            </styles.MainContent>
        );
    }
}

export default MainContent;