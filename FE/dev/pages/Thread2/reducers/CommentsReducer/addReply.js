import forwardState from './shared/forwardState'
import {addReply} from './shared'

//loading status is set on textarea -> textareaStatus

const addReplyPending = () => state => (
    {
        ...state,
        comments:{
            ...state.comments
        }
    }
);
const addReplyFulfilled = (reply) => state => (
    {
        ...state,
        comments:{
            ...state.comments,
            data: addReply(state.comments.data, reply)
        }
    }
);
const addReplyRejected = () => state => (
    {
        ...state,
        comments:{
            ...state.comments
        }
    }
);


export default forwardState(addReplyPending, addReplyFulfilled, addReplyRejected);