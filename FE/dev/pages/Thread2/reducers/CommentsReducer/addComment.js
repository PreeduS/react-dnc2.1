import forwardState from './shared/forwardState'
import {addComment} from './shared'

//loading status is set on textarea -> textareaStatus

const addCommentPending = () => state => (
    {
        ...state,
        comments:{
            ...state.comments
        },
    }
);
const addCommentFulfilled = (comment) => state => (
    {
        ...state,
        comments:{
            ...state.comments,
            data:addComment(state.comments.data, comment)
        }
    }
);
const addCommentRejected = () => state => (
    {
        ...state,
        comments:{
            ...state.comments
        }
    }
);


export default forwardState(addCommentPending, addCommentFulfilled, addCommentRejected);