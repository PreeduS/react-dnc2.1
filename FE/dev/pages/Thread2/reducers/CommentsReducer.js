import actionTypes from '../actionTypes';
import commonTypes from '~/commons/actionTypes';
import {requestStatus} from '~/commons/constants';
import {commentStatus, textareaStatus, loaderStatus} from '../constants';
import check from '~/commons/utils/check';
import initialState from './initialState';
export default CommentsReducer;


const addComment = (commentsDataState, comment) => {
    let id = comment.id;

    //rem, add check if id exists, server may return the same comment again later
    //keep only textarea data
    // /{"id":38,"content":"zzz","replyTo":4,"groupId":4,
    //  "threadId":1,"userId":"439e896d-d4d4-4c3e-937c-cd45d6f63dfe","user":null}

    let newCommentsDataState = {
        ...commentsDataState,
        [id]:{
            ...comment,
            status: commentStatus.recent
        }
    }

    return newCommentsDataState;
}

const addReply = (commentsDataState, reply) => {
    let groupId = reply.groupId;    //groupId === comments[data]:{  [groupId]:{replies:{thisReply}}  }

    if(commentsDataState[groupId] === undefined){
        throw new Error('Failed to find commentgroup id: '+ groupId);
    }    

    let prevReplies = newCommentsDataState[groupId].replies === undefined ? {} : newCommentsDataState[groupId].replies;

    let newCommentsDataState = {
        ...commentsDataState,
        [groupId]:{
            ...newCommentsDataState[groupId],
            replies:{
                ...prevReplies,
                //rem, add check if reply already exists, BE may return same elem multiple times 
                [reply.id]:{
                    ...reply,
                    status: commentStatus.recent
                }
            }

        }
    }
    return newCommentsDataState;
}

//loadComments,loadMoreComments
const loadMoreComments = (commentsDataState, comments) => {
    return {
        ...commentsDataState,
        ...comments        
    };
}

const loadMoreReplies = (commentsDataState, newReplies, commentGroupId) => {
    if(commentsDataState[commentGroupId] === undefined){
        throw new Error('Failed to find commentgroup id: '+ commentGroupId);
    }  
    let prevReplies = newCommentsDataState[groupId].replies === undefined ? {} : newCommentsDataState[groupId].replies;

    //newReplies - add foreach -> status: commentStatus.recent

    let newCommentsDataState = {
        ...commentsDataState,
        [groupId]:{
            ...newCommentsDataState[groupId],
            replies:{
                ...prevReplies,
                ...newReplies
            }

        }
    }
    return newCommentsDataState;         
}


const CommentsReducer = ( state = initialState.commentsReducer, action) =>{
    switch(action.type) {
        //addComment
        case actionTypes.addComment + commonTypes.status.pending:{
            return {
                ...state,
                comments:{
                    ...state.comments,
                    //status: requestStatus.pending
                },
            };
        }
        case actionTypes.addComment + commonTypes.status.fulfilled:{
            let {comment} = action.payload;
            return {
                ...state,
                comments:{
                    ...state.comments,
                    data:addComment(state.comments.data, comment),
                    //status: requestStatus.fulfilled
                }
            };
        }
        case actionTypes.addComment + commonTypes.status.rejected:{
            return {
                ...state,
                comments:{
                    ...state.comments,
                    //status: requestStatus.rejected
                }
            };
        }
        //addReply
        case actionTypes.addReply + commonTypes.status.pending:{
            return {
                ...state,
                comments:{
                    ...state.comments,
                    //status: requestStatus.pending
                }
            };
        }
        case actionTypes.addReply + commonTypes.status.fulfilled:{
            let {reply} = action.payload;
            return {
                ...state,
                comments:{
                    ...state.comments,
                    data: addReply(state.comments.data, reply), 
                    //status: requestStatus.fulfilled
                }
            };
        }
        case actionTypes.addReply + commonTypes.status.rejected:{
            return {
                ...state,
                comments:{
                    ...state.comments,
                    //status: requestStatus.rejected
                }
            };
        }
        //loadComments
        case actionTypes.loadComments + commonTypes.status.pending:{
            return {
                ...state,
                comments:{
                    ...state.comments,
                    status: loaderStatus.pending
                }
            };
        }
        case actionTypes.loadComments + commonTypes.status.fulfilled:{
            let {comments} = action.payload;
            return {
                ...state,
                comments:{ 
                    data: loadMoreComments(state.comments.data, comments),
                    status: loaderStatus.fulfilled  //if comments are empty -> status:'done'
                }
            };
        }
        case actionTypes.loadComments + commonTypes.status.rejected:{
            return {
                ...state,
                comments:{
                    ...state.comments,
                    status: loaderStatus.rejected
                }
            };
        }
        //loadMoreComments
        case actionTypes.loadMoreComments + commonTypes.status.pending:{
            return {
                ...state,
                comments:{
                    ...state.comments,
                    status: loaderStatus.pending
                }
            };
        }
        case actionTypes.loadMoreComments + commonTypes.status.fulfilled:{
            let {comments} = action.payload;
            return {
                ...state,
                comments:{ 
                    data: loadMoreComments(state.comments.data, comments),
                    status: loaderStatus.fulfilled      //if comments are empty -> status:'done'
                }
            };            
        }
        case actionTypes.loadMoreComments + commonTypes.status.rejected:{
            return {
                ...state,
                comments:{
                    ...state.comments,
                    status: loaderStatus.rejected
                }
            };
        }

        //loadMoreReplies
        case actionTypes.loadMoreReplies + commonTypes.status.pending:{
            return {
                ...state,
                comments:{
                    ...state.comments,
                    status: loaderStatus.pending
                }
            };
        }
        case actionTypes.loadMoreReplies + commonTypes.status.fulfilled:{
            let {replies, commentGroupId} = action.payload;

            return {
                ...state,
                comments:{
                    ...state.comments,
                    data: loadMoreReplies(state.comments.data, replies, commentGroupId),
                    status: requestStatus.fulfilled
                }
            };
        }
        case actionTypes.loadMoreReplies + commonTypes.status.rejected:{
            return {
                ...state,
                comments:{
                    ...state.comments,
                    status: loaderStatus.rejected
                }
            };
        }

        //textarea
        case actionTypes.updateTextarea:{
            let {id, value, status, isActive} = action.payload;

            let prevTextarea = check( state => state.textarea[id] !== undefined )(state) ? state.textarea[id] : {};
            if(value === null){  value = prevTextarea.value || ''; }                
            if(status === null){  status = prevTextarea.status || null; }       
            if(isActive === null){  isActive = prevTextarea.isActive || null; }   

            return {
                ...state,
                textarea: {
                    ...state.textarea,
                    [id]: {
                        ...prevTextarea,
                        value,
                        status,
                        isActive
                    }
                }
            }

        }

        /*
        case actionTypes.updateTextarea:{
            let {id, value, status, isActive} = action.payload;


            if(id === -1){
                if(value === null){  value = state.mainTextarea.value || ''; }                
                if(status === null){  status = state.mainTextarea.status || null; }       
                return {
                    ...state,
                    mainTextarea:{
                        ...state.mainTextarea,
                        value,
                        status
                    }
                };
            }else{    
                let prevTextarea = check( state => state.comments.data[id].textarea !== undefined )(state) ? state.comments.data[id].textarea : {};
                if(value === null){  value = prevTextarea.value || ''; }                
                if(status === null){  status = prevTextarea.status || null; }       
                if(isActive === null){  isActive = prevTextarea.isActive || null; }       
                //rem, search for replies in comments, not only comments
                //keep all textarea state inline...
                return {
                    ...state,
                    comments:{
                        ...state.comments,
                        data:{
                            ...state.comments.data,
                            [id] : {
                                ...state.comments.data[id],
                                textarea: {
                                    ...prevTextarea,
                                    value,
                                    status,
                                    isActive
                                }
                            }
                        },
                    }
                };

            }

        }*/

    }
    
    return state;

}

export default CommentsReducer;