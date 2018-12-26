import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
//import { Link , NavLink} from 'react-router-dom';
import {loadThreads} from '../actions/index';

import Table, {Header, Body, Row, Column} from '~/commons/components/Table';
import ThreadRow from '../components/ThreadRow';
import {getThreads} from '../selectors';
import * as styles from '../styles/Threads';

class Threads extends React.Component {

    componentDidMount(){
        this.props.loadThreads();
    }


    render(){

        const threads = this.props.threads.data;
        console.log('pr threads ',threads)
        //const threads = [
          /*  {id:1, title:'test1', username:'uname'},
            {id:2, title:'test2', username:'uname2'},
            {id:2, title:'test2', username:'uname2'},
            {id:2, title:'test2', username:'uname2'},
            {id:1, title:'test1', username:'uname'},
            {id:2, title:'test2', username:'uname2'},
            {id:2, title:'test2', username:'uname2'},
            {id:2, title:'test2', username:'uname2'},
            {id:2, title:'test2', username:'uname2'},
            {id:2, title:'test2', username:'uname3'},
            {id:2, title:'test2', username:'uname2'},
            {id:2, title:'test2', username:'uname3'},*/
        //]
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
                    {threads.length > 0 && threads.map( (thread , index) => 
                        <ThreadRow 
                            key = {index}
                            thread = {thread}
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
const mapStateToProps = state =>({
    threads: getThreads(state),
});
const mapDispatchToProps = dispatch => ({
    loadThreads: (lastId, categoryId) =>
        dispatch(() => loadThreads(lastId, categoryId)(dispatch) )

});


export default connect(mapStateToProps, mapDispatchToProps)(Threads);