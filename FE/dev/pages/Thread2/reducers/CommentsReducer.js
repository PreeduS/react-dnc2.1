import actionTypes from '../actionTypes';
import commonTypes from '~/commons/actionTypes';
//import {requestStatus} from '~/commons/constants';
import {commentStatus, textareaStatus, loaderStatus} from '../constants';
import initialState from './initialState';

//import {loadMoreComments} from './CommentsReducer/shared';

import addReply from './CommentsReducer/addReply'
import addComment from './CommentsReducer/addComment';
import loadComments from './CommentsReducer/loadComments';
import loadMoreComments from './CommentsReducer/loadMoreComments';
import loadMoreReplies from './CommentsReducer/loadMoreReplies';
import updateTextarea from './CommentsReducer/textarea/updateTextarea';
import toggleActiveTextarea from './CommentsReducer/textarea/toggleActiveTextarea';


const CommentsReducer = ( state = initialState.commentsReducer, action) =>{
    switch(action.type) {
        //addComment
        case actionTypes.addComment + commonTypes.status.pending:{
            return addComment()(commonTypes.status.pending)(state);
        }
        case actionTypes.addComment + commonTypes.status.fulfilled:{
            let {comment} = action.payload;
            return addComment(comment)(commonTypes.status.fulfilled)(state);;
        }
        case actionTypes.addComment + commonTypes.status.rejected:{
            return addComment()(commonTypes.status.rejected)(state);
        }
        
        //addReply
        case actionTypes.addReply + commonTypes.status.pending:{
            return addReply()(commonTypes.status.pending)(state);
        }
        case actionTypes.addReply + commonTypes.status.fulfilled:{
            let {reply} = action.payload;
            return addReply(reply)(commonTypes.status.fulfilled)(state);
        }
        case actionTypes.addReply + commonTypes.status.rejected:{
            return addReply()(commonTypes.status.rejected)(state);
        }


        //loadComments
        case actionTypes.loadComments + commonTypes.status.pending:{
            return loadComments()(commonTypes.status.pending)(state);
        }
        case actionTypes.loadComments + commonTypes.status.fulfilled:{
            let {comments} = action.payload;
            return loadComments(comments)(commonTypes.status.fulfilled)(state);
        }
        case actionTypes.loadComments + commonTypes.status.rejected:{
            return loadComments()(commonTypes.status.rejected)(state);
        }

        //loadMoreComments
        case actionTypes.loadMoreComments + commonTypes.status.pending:{
            return loadMoreComments()(commonTypes.status.pending)(state);
        }
        case actionTypes.loadMoreComments + commonTypes.status.fulfilled:{
            let {comments} = action.payload;
            return loadMoreComments(comments)(commonTypes.status.fulfilled)(state);
        }
        case actionTypes.loadMoreComments + commonTypes.status.rejected:{
            return loadMoreComments()(commonTypes.status.rejected)(state);
        }


        //loadMoreReplies
        case actionTypes.loadMoreReplies + commonTypes.status.pending:{
            let {commentGroupId} = action.payload;
            return loadMoreReplies(commentGroupId)(commonTypes.status.pending)(state);
        }
        case actionTypes.loadMoreReplies + commonTypes.status.fulfilled:{
            let {replies, commentGroupId} = action.payload;
            return loadMoreReplies(replies, commentGroupId)(commonTypes.status.fulfilled)(state); 
        }
        case actionTypes.loadMoreReplies + commonTypes.status.rejected:{
            let {commentGroupId} = action.payload;
            return loadMoreReplies(commentGroupId)(commonTypes.status.rejected)(state);  
        }

        //textarea
        case actionTypes.updateTextarea:{
            let {id, value, status, isActive} = action.payload;
            return updateTextarea({id, value, status, isActive})(state);
        }

        case actionTypes.toggleActiveTextarea:{
            let {id} = action.payload;
            return toggleActiveTextarea({id})(state);
        }
    }
    
    return state;

}

export default CommentsReducer;