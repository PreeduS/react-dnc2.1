import actionTypes from '../actionTypes';
import commonTypes from '~/commons/actionTypes';
import initialState from './initialState';
export default CommentsReducer;



const CommentsReducer = ( state = initialState.commentsReducer, action) =>{
    switch(action.type) {
        case actionTypes.addComment + commonTypes.status.pending:{
            return {
                ...state,
                comments:{
                    ...state.comments,
                    status: 'pending'
                },
                mainTextarea:{
                    ...state.mainTextarea,
                    status: 'pending'
                }
            };
        }
        case actionTypes.addComment + commonTypes.status.fulfilled:{
            let {comment} = action.payload;
            let id = comment.id;
            console.log('comment = ', comment)
            
            //re, add check if id exists, server may return the same comment again later
            let newComment = {
                ...comment,
                 status: 'recent',           //recent, null   //maybe userAdded
                textarea: {
                    value: '',
                    status: null            //done,error,pending,null       
                }
            }
            // textareaValue : '' //update to the comment replyTo
                //here is -1 for main commentTextarea


            // /{"id":38,"content":"zzz","replyTo":4,"groupId":4,
            //  "threadId":1,"userId":"439e896d-d4d4-4c3e-937c-cd45d6f63dfe","user":null}
            return {
                ...state,
                comments:{
                    ...state.comments,
                    data:{
                        ...state.comments.data,
                        [id] : newComment
                    },
                    status: 'fulfilled'
                },
                mainTextarea:{
                    ...state.mainTextarea,
                    status: 'done'
                }
            };
        }
    }
    return state;

}

export default CommentsReducer;