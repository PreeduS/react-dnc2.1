import actionTypes from '../actionTypes';
import commonTypes from '~/commons/actionTypes';
import {generalError} from './commons';

//maybe set value also here
export const setActiveTextarea = (id, isActive) => ({
    type: actionTypes.setActiveTextarea,
    payload: {id, isActive}
});

export const addComment = comment => dispatch => {

    dispatch( {type: actionTypes.addComment + commonTypes.status.pending} );
    const {threadId, content} = comment;

    services.addComment(threadId, content).then( result =>{ 
        //let {id, content, replyTo, threadId, userId, groupId} = result.data ;
        dispatch({
            type: actionTypes.addComment + commonTypes.status.fulfilled,
            payload: result.data
        });

    }).catch( generalError(actionTypes.addComment)(dispatch) )
}

export const addReply = reply => dispatch =>{
    const {threadId, content, replyTo} = reply;
    dispatch({
        type: actionTypes.addReply + commonTypes.status.pending,
        payload: {replyTo}
    });

    services.addReply(threadId, content, replyTo).then( result =>{ 
        dispatch({
            type: actionTypes.addReply + commonTypes.status.fulfilled,
            payload: result.data
        });
        dispatch(
            setActiveTextarea(replyTo, false)
        );
    }).catch(error =>{
        dispatch({
            type: actionTypes.addReply + commonTypes.status.rejected,
            payload: {replyTo}
        });
        dispatch(
            setActiveTextarea(replyTo, true)
        );

        
        }
    );

};