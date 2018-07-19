import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Link from '~/commons/components/Link';
import CommentTextArea from './CommentTextArea';
//reducers
//import ThreadReducer from '../reducers/ThreadReducer';
//import CommentsReducer from '../reducers/CommentsReducer';
import {toggleActiveTextarea, updateTextarea} from '../actions';
import {addReply} from '../actions/comments';

import * as styles from '../styles/Comment.js';


class Comment extends React.Component {
    constructor(){
        super();
        this.toggleTextarea = this.toggleTextarea.bind(this);
        this.addNewReply = this.addNewReply.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    toggleTextarea(){
        this.props.toggleActiveTextarea(this.props.id);
    }

    addNewReply(content){ 
        const {id} = this.props;
        let threadId = this.props.thread.id;
        const reply = {replyTo: id, content, threadId};

        this.props.addReply(reply);
    }
    changeHandler(el){
        const {id} = this.props;
        this.props.updateTextarea({
            id, 
            value: el.target.value, 
            status: null, 
            isActive: null
        });        
    }

    render(){
        const {id, content, isReply, userId, textarea} = this.props;
        const isVisible = textarea[id] && textarea[id].isActive;

        const tempc = ` | id: ${id} --- Comment: 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur	`;
        content = content + ' - ' + tempc;


        return(
            <styles.CommentsWrapper  isReply = {isReply}>
                <styles.Group>
                    <styles.Container>
                        <styles.ContentLeft>
                            <styles.Logo></styles.Logo>
                        </styles.ContentLeft>

                        <styles.ContentRight>
                            <styles.Header>
                                <styles.Username>userId: {userId} </styles.Username>
                            </styles.Header>
                            <styles.Content >
                                {content}
                            </styles.Content>
                            <styles.Footer>
                                <div onClick = {this.toggleTextarea}>
                                    <Link>Reply</Link>
                                </div>

                            </styles.Footer>
                            <div>
                                <CommentTextArea
                                    id = {id}
                                    isVisible = {isVisible}
                                    isReply={true}
                                    onSubmit = {this.addNewReply}
                                    onChange = {this.changeHandler}
                                />
                            </div>
                        </styles.ContentRight>

                    </styles.Container>
                </styles.Group>
            </styles.CommentsWrapper>
        );


    }

}

Comment.propTypes = {
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    isReply: PropTypes.bool.isRequired,
    userId: PropTypes.string.isRequired,
    textarea: PropTypes.object.isRequired,
    thread: PropTypes.object.isRequired,
};

const mapStateToProps = state =>( {
    textarea: state.CommentsReducer.textarea,
    thread: state.threadReducer.thread,
});

const mapDispatchToProps = dispatch=>({
    addReply: reply =>
        dispatch(() => addReply(reply)(dispatch) )
    ,
    updateTextarea: ({id, value, status, isActive}) =>
        dispatch(() => updateTextarea({id, value, status: null, isActive: null})(dispatch) )
    ,
    toggleActiveTextarea: id =>
        dispatch(toggleActiveTextarea(id))

});


export default connect(mapStateToProps, mapDispatchToProps)(Comment);