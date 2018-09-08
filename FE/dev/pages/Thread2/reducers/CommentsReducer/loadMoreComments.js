
import forwardState from './shared/forwardState'
import {loadMoreComments} from './shared'
import {loaderStatus} from '../../constants';

const loadCommentsPending = () => state => (
    {
        ...state,
        comments:{
            ...state.comments,
            loaderStatus: loaderStatus.pending
        }
    }
);
const loadCommentsFulfilled = (comments) => state => (
    {
        ...state,
        comments:{ 
            data: loadMoreComments(state.comments.data, comments),
            loaderStatus: comments.length === 0 ? loaderStatus.done : loaderStatus.fulfilled  
        }
    }
);
const loadCommentsRejected = () => state => (
    {
        ...state,
        comments:{
            ...state.comments,
            loaderStatus: loaderStatus.rejected
        }
    }
);


export default forwardState(loadCommentsPending, loadCommentsFulfilled, loadCommentsRejected);