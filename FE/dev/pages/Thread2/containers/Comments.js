import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import CommentsReducer from '../reducers/CommentsReducer'
//import ThreadReducer from '../reducers/ThreadReducer'
import {addComment, updateTextarea, loadMoreComments } from '../actions';

import CommentGroup from '../components/CommentGroup';
import CommentTextArea from '../components/CommentTextArea';
import LoadMoreComments from '../components/LoadMoreComments';
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
        const threadId = this.props.thread.id;
        const comment = {content, threadId};
        this.props.addComment(comment);
    }
    loadMoreComments(){
        const {comments} = this.props;
        const commentsData = comments.data;
        const commentsKeys = Object.keys(commentsData);

        const lastId = commentsKeys.reverse().find( id => {
            return(commentsData[id] && commentsData[id].status !== commentStatus.recent);
        });

        const threadId = this.props.thread.id;
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
        const commentsData = comments.data;
        const commentsKeys = Object.keys(commentsData);

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
                {commentsKeys.length > 0 && commentsKeys.map(key => {
                    let comment = commentsData[key];
                    return(
                        <CommentGroup
                            key = {key}
                            comment = {comment}
                            addNewComment = {this.addNewComment}
                        />
                    );
                })}
                <LoadMoreComments 
                    loading = {isPending} 
                    disabled = {isDisabled} 
                    onClick = {this.loadMoreComments}
                />                                
            </styles.CommentsWrapper>
        );
    }
}

Comments.propTypes = {
    comments: PropTypes.object.isRequired,
    thread: PropTypes.object.isRequired,

};

const mapStateToProps = state =>( {
    comments: state.CommentsReducer.comments,
    thread: state.ThreadReducer.thread
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