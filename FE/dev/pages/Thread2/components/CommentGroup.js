import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as styles from '../styles/CommentGroup.js';
import Link from '~/commons/components/Link';
import {loaderStatus, commentStatus} from '../constants';
import { Loader } from 'semantic-ui-react'
//reducers
//import CommentsReducer from '../reducers/CommentsReducer'
//actions
import {loadMoreReplies } from '../actions';
//components
import Comment from './Comment';


class CommentGroup extends React.Component {
    constructor(){
        super();
        this.content = '';
        this.getLoadMoreRepliesLabel = this.getLoadMoreRepliesLabel.bind(this);
        this.loadMoreReplies = this.loadMoreReplies.bind(this);
    }

    loadMoreReplies(){
        const {id, replies} = this.props.comment;
        const hasReplies = replies !== undefined;
        const repliesKeys = Object.keys(replies);
        let lastReplyId = null;

        if(hasReplies){
            lastReplyId = repliesKeys.reverse().find( id => {
                return(replies[id] && replies[id].status !== commentStatus.recent);       
            });   
        }

        const threadId = this.props.thread.id;
        this.props.loadMoreReplies(threadId, id, lastReplyId)
    }

    getLoadMoreRepliesLabel(nrReplies, repliesKeys){   
        const {comment} = this.props;
        const {id} = comment;
        const currentStatus = comment.loaderStatus;
        const isPending = currentStatus === loaderStatus.pending;

        let nrVisibleRplies = replies ? repliesKeys.length : 0;

        let content = <span>
            {isPending && <Loader active inline size = "tiny" />} 
            Load more replies {nrVisibleRplies}/{nrReplies} 
        </span>;
        return content;
    }

    render() {
        const {comment} = this.props;
        const {replies, nrReplies} = comment;
        const repliesKeys = Object.keys(replies);

        const isPending = comment.loaderStatus === loaderStatus.pending;
        const isDisabled = comment.loaderStatus === loaderStatus.done;        

        var loadMoreRepliesLabel = this.getLoadMoreRepliesLabel(nrReplies, repliesKeys);
        return (
            <styles.CommentGroupWrapper>
                <Comment {...comment} isReply = {false} />
                {repliesKeys.length > 0 && repliesKeys.map(key => {
                    let reply = replies[key];
                    <div key={key}>
                        <Comment {...reply} isReply = {true} />
                    </div>
                })}
                
                <styles.LoadCommentsContainer hasReplies = {replies!==undefined}>
                    <Link onClick = {this.loadMoreReplies} disabled = {isPending || isDisabled} >{loadMoreRepliesLabel}</Link>;
                </styles.LoadCommentsContainer>
            </styles.CommentGroupWrapper>

        );
    }
}

CommentGroup.propTypes = {
    //comments: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    thread: PropTypes.object.isRequired,

};

const mapStateToProps = state =>({
    //comments: state.CommentsReducer,
    thread: state.threadReducer.thread,
});

const mapDispatchToProps = dispatch=>({
    loadMoreReplies: (threadId, commentGroupId, lastReplyId) =>
        dispatch(() => loadMoreReplies(threadId, commentGroupId, lastReplyId)(dispatch) )
    ,
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentGroup);
