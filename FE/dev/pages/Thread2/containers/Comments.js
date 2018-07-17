import React from 'react';
import {connect} from 'react-redux';

import CommentsReducer from '../reducers/CommentsReducer'
import ThreadReducer from '../reducers/ThreadReducer'
import {addComment, updateTextarea, loadMoreComments } from '../actions';

import CommentGroup from '../components/CommentGroup';
import CommentTextArea from '../components/CommentTextArea';
import LoadMoreComments from '../components/LoadMoreComments';

import * as styles from '../styles/Comments.js';

class Comments extends React.Component {
    constructor(){
        super();

        this.addNewComment = this.addNewComment.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.loadMoreComments = this.loadMoreComments.bind(this);
    }

    addNewComment(content){
        const threadId = 1; //temp ----------------
        const comment = {content, threadId};
        this.props.addComment(comment);
    }
    loadMoreComments(){
        const commentsData = this.props.comments.data;
        const commentsDataReverse = [...commentsData].reverse();
        const threadId = 1; //temp ----------------
        let lastComment = commentsDataReverse.find(c =>{
            let commentId = c.id;
            if(
                this.props.comments.status.comments && 
                this.props.comments.status.comments[commentId] && 
                this.props.comments.status.comments[commentId].status !== 'recent'
            ){return true;}
            return false;
        });

        let lastId = lastComment.id;

 
        this.props.loadMoreComments(threadId, lastId)
    }


    changeHandler(el){
        const id = -1;
        this.props.updateTextarea(id, el.target.value)
    }

    render() {
        const commentsData = this.props.comments.data;
        const isPending = this.props.comments.status.loadMoreComments.status === 'pending';
        const isDisabled = this.props.comments.status.loadMoreComments.status === 'done';

        return (
            <styles.CommentsWrapper>
                <CommentTextArea
                    id = {-1}
                    addCommentOrReply = {this.addNewComment}
                    isVisible = {true}
                    onChange = {this.changeHandler}
                />
                <br />

                {commentsData.length > 0 && commentsData.map( c =>
                    <CommentGroup
                        key = {c.id}
                        comment = {c}
                        addNewComment = {this.addNewComment}
                    />
                )}

                <LoadMoreComments 
                    loading = {isPending} 
                    disabled = {isDisabled} 
                    onClick = {this.loadMoreComments}
                />
            </styles.CommentsWrapper>
        );

    }
}



const mapStateToProps = state =>( {
    comments: state.CommentsReducer,
    thread: state.ThreadReducer
});
const mapDispatchToProps = dispatch => ({
    updateTextarea: (id, value) =>
        dispatch(() => updateTextarea(id, value)(dispatch) )
    ,
    addComment: comment =>
        dispatch(() => addComment(comment)(dispatch) )
    ,
    loadMoreComments: (threadId, lastId) =>
        dispatch(() => loadMoreComments(threadId, lastId)(dispatch) )

});


export default connect(mapStateToProps, mapDispatchToProps)(Comments);