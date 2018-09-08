
import forwardState from './shared/forwardState'
import {loadMoreReplies} from './shared'
import {loaderStatus} from '../../constants';

const loadMoreRepliesPending = (commentGroupId) => state => (
    {
        ...state,
        comments:{
            ...state.comments,
            data: loadMoreReplies(state.comments.data, [], commentGroupId, loaderStatus.pending),
            /*{
                ...state.comments.data,
                [commentGroupId] : {
                    ...state.comments.data[commentGroupId],
                    loaderStatus: loaderStatus.pending
                }
            }*/
            
            //status: loaderStatus.pending
        }
    }
);
const loadMoreRepliesFulfilled = (replies, commentGroupId) => state => (
    {
        ...state,
        comments:{
            ...state.comments,
            data: loadMoreReplies(state.comments.data, replies, commentGroupId, 
                replies.length === 0 ? loaderStatus.done : loaderStatus.fulfilled),
            //status: requestStatus.fulfilled
        }
    }
);
const loadMoreRepliesRejected = (commentGroupId) => state => (
    {
        ...state,
        comments:{
            ...state.comments,
            data: loadMoreReplies(state.comments.data, [], commentGroupId, loaderStatus.rejected),
        }
    }

    /*{
        ...state,
        comments:{
            ...state.comments,
            data:{
                ...state.comments.data,
                [commentGroupId] : {
                    ...state.comments.data[commentGroupId],
                    loaderStatus: loaderStatus.rejected
                }
            }
            //status: loaderStatus.rejected
        }
    }*/
);


export default forwardState(loadMoreRepliesPending, loadMoreRepliesFulfilled, loadMoreRepliesRejected);