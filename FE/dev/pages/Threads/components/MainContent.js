import React from 'react';
import { NavLink} from 'react-router-dom';
import * as styles from '../styles/MainContent';

class MainContent extends React.Component{
    render(){
        const {id, title, content, username} = this.props.thread;
        return(
            <styles.MainContent>

                <styles.Title>
                    {title} - {id}

                     <NavLink exact  to={"/Thread/"+id} >
                      link
                    </NavLink>                   
                </styles.Title>

                <styles.Details>
                    Uploaded by {username}
                </styles.Details>

                
            </styles.MainContent>
        );
    }
}

export default MainContent;