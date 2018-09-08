import commonTypes from '~/commons/actionTypes';

const forwardState = (onPending, onFulfilled, onRejected) => 
    (...params) => actionType => state =>  { 

        switch(actionType){
            case commonTypes.status.pending:{
                return onPending(...params)(state);
            }
            case commonTypes.status.fulfilled:{
                return onFulfilled(...params)(state);
            }
            case commonTypes.status.rejected:{
                return onRejected(...params)(state);
            }
        }

}

export default forwardState;