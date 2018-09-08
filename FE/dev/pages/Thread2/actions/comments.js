import actionTypes from '../actionTypes';
import commonTypes from '~/commons/actionTypes';
import {generalError} from './commons';
import {updateTextarea} from './index';
import {commentStatus, textareaStatus} from '../constants';
import services from '../services';

const setTextarea = (id, status) => dispatch => {
    if(status === textareaStatus.pending){
        updateTextarea({
            id, 
            status,
            value: null, 
            isActive: null
        })(dispatch);    

    }else if(status === textareaStatus.fulfilled){
        updateTextarea({
            id, 
            status, 
            //value: null, 
            value: '', 
            isActive: false
        })(dispatch);

    }else if(status === textareaStatus.rejected){
        updateTextarea({
            id, 
            status, 
            value: null, 
            isActive: true
        })(dispatch);
    }
}
//actions for comments & replies

//add
export const addComment = comment => dispatch => {

    dispatch({
        type: actionTypes.addComment + commonTypes.status.pending
    });
    setTextarea(-1, textareaStatus.pending)(dispatch);
  
    const {threadId, content} = comment;

    services.addComment(threadId, content).then( result =>{ 
        //let {id, content, replyTo, threadId, userId, groupId} = result.data ;
        dispatch({
            type: actionTypes.addComment + commonTypes.status.fulfilled,
            payload: {comment: result.data}
        });

        //setActiveTextarea(replyTo, false)
        setTextarea(-1, textareaStatus.fulfilled)(dispatch);

        

    }).catch(error => { 
        //generalError(actionTypes.addComment)(dispatch) 
        dispatch({
            type: actionTypes.addComment + commonTypes.status.rejected
        });
        setTextarea(-1, textareaStatus.rejected)(dispatch);
        
    });

}

export const addReply = reply => dispatch => {
    const {threadId, content, replyTo} = reply;
    dispatch({
        type: actionTypes.addReply + commonTypes.status.pending,
        //payload: {replyTo}
        //payload: {reply:{replyTo}}
    });
    setTextarea(replyTo, textareaStatus.pending)(dispatch);

    services.addReply(threadId, content, replyTo).then( result =>{ 
        dispatch({
            type: actionTypes.addReply + commonTypes.status.fulfilled,
            payload: {reply: result.data}
        });
        setTextarea(replyTo, textareaStatus.fulfilled)(dispatch);
        
    }).catch(error => {
        dispatch({
            type: actionTypes.addReply + commonTypes.status.rejected
        });
        setTextarea(replyTo, textareaStatus.rejected)(dispatch);
    });

};

//loadComments
export const loadComments = threadId => dispatch => {
    dispatch( {type: actionTypes.loadComments + commonTypes.status.pending } );

    services.loadComments(threadId).then( result => {
        dispatch({
            type: actionTypes.loadComments + commonTypes.status.fulfilled,
            payload: {comments: result.data}
        });

    }).catch( error => {
        dispatch({
            type: actionTypes.loadComments + commonTypes.status.rejected
        });
    });
    
};

//loadMoreComments
export const loadMoreComments = (threadId, lastId) => dispatch => {
    dispatch( {type: actionTypes.loadMoreComments + commonTypes.status.pending } );

    services.loadMoreComments(threadId, lastId).then( result => {
        dispatch({
            type: actionTypes.loadMoreComments + commonTypes.status.fulfilled,
            payload: {comments: result.data}
        });

    }).catch( error => {
        dispatch({
            type: actionTypes.loadMoreComments + commonTypes.status.rejected
        });
    });

};

//loadMoreComments
export const loadMoreReplies = (threadId, commentGroupId, lastReplyId) => dispatch => {
    dispatch({
        type: actionTypes.loadMoreReplies + commonTypes.status.pending,
        payload:{commentGroupId}
    });

    services.loadMoreReplies(threadId, commentGroupId, lastReplyId).then( result => {
        dispatch({
            type: actionTypes.loadMoreReplies + commonTypes.status.fulfilled,
            payload: {replies: result.data, commentGroupId}
        });

    }).catch( error => {
        dispatch({
            type: actionTypes.loadMoreReplies + commonTypes.status.rejected,
            payload:{commentGroupId}
        });
    });

};