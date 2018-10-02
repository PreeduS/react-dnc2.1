import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import CommentsReducer from '../reducers/CommentsReducer';

import {addComment, loadMoreComments} from '../actions/comments';
import {updateTextarea} from '../actions/index';

import {getComments, geThread} from '../selectors'
import getCommentsList from '../commons/getCommentsList'

import CommentGroup from '../components/comments/CommentGroup';
import CommentTextArea from '../components/comments/CommentTextArea';
import LoadMoreComments from '../components/comments/LoadMoreComments';
import {commentStatus, loaderStatus} from '../constants';
import * as styles from '../styles/Comments.js';



class Comments extends React.Component {
    constructor(){
        super();
        this.addNewComment = this.addNewComment.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.loadMoreComments = this.loadMoreComments.bind(this);
    }

    addNewComment(content){
        const threadId = this.props.threadId; //this.props.thread.id;
        const comment = {content, threadId};
        this.props.addComment(comment);
    }
    loadMoreComments(){
        const {comments, thread} = this.props;
        /*
        const commentsData = comments.data;
        const commentsKeys = Object.keys(commentsData);
        const lastId = commentsKeys.reverse().find( id => {
            return(commentsData[id] && commentsData[id].status !== commentStatus.recent);
        });
        */
        const commentsList = getCommentsList(comments.data, 'ASC');
      
        const lastComment = commentsList.find( comment => 
            true === true //comment.status !== commentStatus.recent      //maybe not recent: recentUserAdded
        );
        const lastId = lastComment === undefined ? null : lastComment.id;

        const threadId = this.props.threadId;// thread.id;
        this.props.loadMoreComments(threadId, lastId)
    }


    changeHandler(el){
        this.props.updateTextarea({
            id: -1, 
            value: el.target.value, 
            status: null, 
            isActive: null
        });
    }

    render() {
        const {comments} = this.props;
        //const commentsData = comments.data;
        //const commentsKeys = Object.keys(commentsData);

        const commentsList = getCommentsList(comments.data);

        const isPending = comments.loaderStatus === loaderStatus.pending;
        const isDisabled = comments.loaderStatus === loaderStatus.done;

        return (
            <styles.CommentsWrapper>
                <CommentTextArea
                    id = {-1}
                    onSubmit = {this.addNewComment}
                    isVisible = {true}
                    onChange = {this.changeHandler}
                    isReply = {false}
                />
                <br />                
                {//commentsKeys.length > 0 && commentsKeys.map(key => {
                    commentsList.map( comment => {
                    //let comment = commentsData[key];
                    //key = {key}
                    return(
                        <CommentGroup
                            key = {comment.id}
                            comment = {comment}
                            addNewComment = {this.addNewComment}
                        />
                    );
                })}
                <LoadMoreComments 
                    loading = {isPending} 
                    disabled = {isPending || isDisabled} 
                    onClick = {this.loadMoreComments}
                    label = {isDisabled ? 'No more comments' : 'Load more comments'}
                    threadId = {this.props.threadId}
                />                                
            </styles.CommentsWrapper>
        );
    }
}

Comments.propTypes = {
    comments: PropTypes.object.isRequired,
    thread: PropTypes.object.isRequired,

};

const mapStateToProps = state =>({
    comments: getComments(state),
    thread: geThread(state),
});
const mapDispatchToProps = dispatch => ({
    updateTextarea: ({id,value,status, isActive}) =>
        dispatch(() => updateTextarea({id,value,status, isActive})(dispatch) )
    ,
    addComment: comment =>
        dispatch(() => addComment(comment)(dispatch) )
    ,
    loadMoreComments: (threadId, lastId) =>
        dispatch(() => loadMoreComments(threadId, lastId)(dispatch) )

});


export default connect(mapStateToProps, mapDispatchToProps)(Comments);