import React from 'react';

import { Link , NavLink} from 'react-router-dom';

import * as styles from '../styles/Threads';

import Table, {Header, Body, Row, Column} from '~/commons/components/Table';

import ThreadRow from '../components/ThreadRow';

class Threads extends React.Component {

    render(){

        const threads = this.props.threads

        return(
            <Table>
                <Header>
                    <Row showBorder = {'horizontal'}> 
                        <Column width = {'70px'}>Logo temp</Column>
                        <Column >main content temp</Column>
                        <Column width = {'100px'}>
                            <styles.HeaderCategory>Categories</styles.HeaderCategory>
                        </Column>
                        <Column width = {'100px'}>
                            <styles.HeaderCategory>Comments</styles.HeaderCategory>
                        </Column>
                        <Column width = {'100px'}>
                            <styles.HeaderCategory>Time</styles.HeaderCategory>
                        </Column>

                    </Row>
                </Header>
                <Body>
                    {threads.length > 0 && threads.map( (val , index) => 
                        <ThreadRow 
                            logoSrc = {''} 
                            username = {val.username}
                            title = {val.title}
                            showBorder = {'horizontal'}
                            height = {'80px'}
                        /> 
                    )}
                </Body>
            </Table>
        );

        /*
        const {id,content} = this.props
        return(
            <div className = {styles.threadWrapper}>
                <div className = {styles.topHeader}><div>header</div></div>           
                <div className = {styles.content}>
                    <NavLink exact  to={"/Thread/"+id} >
                      {content}
                    </NavLink>
                </div>
               
                
            </div>
        );*/
    }
}

export default Threads;