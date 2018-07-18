import React from 'react';
import {connect} from 'react-redux';

import CommentsReducer from '../reducers/CommentsReducer'
//import ThreadReducer from '../reducers/ThreadReducer'
import {addComment, updateTextarea, loadMoreComments } from '../actions';

import CommentGroup from '../components/CommentGroup';
import CommentTextArea from '../components/CommentTextArea';
//import LoadMoreComments from '../components/LoadMoreComments';

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
        const {comments} = this.props;
        const commentsData = comments.data;
        const commentsKeys = Object.keys(commentsData);

        const lastId = commentsKeys.reverse().find( id => {
            if( commentsData[id] && commentsData[id].status !== 'recent'){ return true; }
            return false;
        });

        const threadId = 1; //temp ----------------
        this.props.loadMoreComments(threadId, lastId)
    }


    changeHandler(el){
        //this.props.updateTextarea(id, el.target.value);//edit
        this.props.updateTextarea({
            id: -1, 
            value: el.target.value, 
            status: null, 
            isActive: null
        });
    }

    render() {
        //const isPending = this.props.comments.status.loadMoreComments.status === 'pending';
        //const isDisabled = this.props.comments.status.loadMoreComments.status === 'done';

        const {comments} = this.props;
        const commentsData = comments.data;
        const commentsKeys = Object.keys(commentsData);
        return (
            <styles.CommentsWrapper>
                <CommentTextArea
                    id = {-1}
                    addCommentOrReply = {this.addNewComment}
                    isVisible = {true}
                    onChange = {this.changeHandler}
                />
                <br />                
                {commentsKeys.length > 0 && commentsKeys.map( key => {
                    let comment = commentsData[key];
                    return(
                        <CommentGroup
                            key = {key}
                            comment = {comment}
                            addNewComment = {this.addNewComment}
                        />
                    );
                })
                }                
            </styles.CommentsWrapper>
        );
       /* return (
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
*/
    }
}



const mapStateToProps = state =>( {
    comments: state.CommentsReducer.comments,
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