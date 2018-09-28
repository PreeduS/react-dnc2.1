import React from 'react';

import * as styles from '../styles/MainContent';

class MainContent extends React.Component{
    render(){
        const {username} = this.props;
        return(
            <styles.MainContent>

                <styles.Title>
                    Title
                </styles.Title>

                <styles.Details>
                    Uploaded by {username}
                </styles.Details>

                
            </styles.MainContent>
        );
    }
}

export default MainContent;