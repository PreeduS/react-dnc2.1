import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as styles from '../../styles/CommentGroup.js';

import {loaderStatus, commentStatus} from '../../constants';
import { Loader } from 'semantic-ui-react'

import getCommentsList from '../../commons/getCommentsList';
//reducers
//import CommentsReducer from '../reducers/CommentsReducer'
//actions
import {loadMoreReplies } from '../../actions/comments';
import {geThread} from '../../selectors'

//components
import Comment from './Comment';
import LoadMoreReplies from './LoadMoreReplies';


class CommentGroup extends React.Component {
    constructor(){
        super();
        this.loadMoreReplies = this.loadMoreReplies.bind(this);
    }

    loadMoreReplies(){
        const {id, replies, nrReplies} = this.props.comment;  
        const hasReplies =  nrReplies > 0;      //replies !== undefined 
        //const repliesKeys = Object.keys(replies);
        let lastReplyId = null;

        const repliesList = getCommentsList(replies);

        if(hasReplies){
            let lastReply = repliesList.find( reply => 
                reply.status !== commentStatus.recentUserAdded
            );
            lastReplyId = lastReply === undefined ? null : lastReply.id;
            /*
            lastReplyId = repliesKeys.reverse().find( id => {
                return (replies[id] && replies[id].status !== commentStatus.recentUserAdded);       
            });   */
        }

        const threadId = this.props.thread.id;
        this.props.loadMoreReplies(threadId, id, lastReplyId)
    }


    render() {
        const {comment} = this.props;
        const {replies, nrReplies} = comment;
        //const repliesKeys = Object.keys(replies);
        //const nrVisibleRplies =  replies ? repliesKeys.length : 0;
        const repliesList = getCommentsList(replies, 'ASC');
        const nrVisibleRplies =  repliesList.length;

        const isPending = comment.loaderStatus === loaderStatus.pending;
        const isDisabled = comment.loaderStatus === loaderStatus.done || nrVisibleRplies === nrReplies;        

        const label = isDisabled ? `No more replies` : `Load more replies ${nrVisibleRplies}/${nrReplies}`;

        

        return (
            <styles.CommentGroupWrapper>
                <Comment {...comment} isReply = {false} />
                {repliesList.map( reply => 
                    <Comment key={reply.id} {...reply} isReply = {true} />
                )}
                
                <styles.LoadCommentsContainer hasReplies = {nrReplies > 0}>

                    <LoadMoreReplies 
                        onClick = {this.loadMoreReplies} 
                        disabled = {isPending || isDisabled}
                        isPending = {isPending}
                        label = {label}
                    />
               
                </styles.LoadCommentsContainer>
            </styles.CommentGroupWrapper>

        );
    }
}

/*
        return (
            <styles.CommentGroupWrapper>
                <Comment {...comment} isReply = {false} />
                {repliesKeys.length > 0 && repliesKeys.map(key => {
                    let reply = replies[key];
                    return (
                        <div key={key}>
                            <Comment {...reply} isReply = {true} />
                        </div>
                    );
                })}
                
                <styles.LoadCommentsContainer hasReplies = {nrReplies > 0}>
*/


CommentGroup.propTypes = {
    //comments: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    thread: PropTypes.object.isRequired,

};

const mapStateToProps = state =>({
    //comments: state.CommentsReducer,
    thread: geThread(state),
});

const mapDispatchToProps = dispatch=>({
    loadMoreReplies: (threadId, commentGroupId, lastReplyId) =>
        dispatch(() => loadMoreReplies(threadId, commentGroupId, lastReplyId)(dispatch) )
    ,
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentGroup);
