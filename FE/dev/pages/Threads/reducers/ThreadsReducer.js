import actionTypes from '../actionTypes';
import commonTypes from '~/commons/actionTypes';
import {requestStatus} from '~/commons/constants';
import initialState from './initialState';


const ThreadsReducer = ( state = initialState.threadsReducer, action) =>{
    switch(action.type) {
        case actionTypes.loadThreads + commonTypes.status.pending:{
            return {
                ...state,
                threads:{
                    ...state.threads,
                    loaderStatus: requestStatus.pending
                }
            }
        }
        case actionTypes.loadThreads + commonTypes.status.fulfilled:{
            let {threads} = action.payload;
            return {
                ...state,
                threads:{
                    ...state.threads,
                    data: [...threads],
                    loaderStatus: requestStatus.fulfilled
                }
            }
        }
        case actionTypes.loadThreads + commonTypes.status.rejected:{
            return {
                ...state,
                threads:{
                    ...state.threads,
                    loaderStatus: requestStatus.rejected
                }
            }
        }

    }

    return state;
}

export default ThreadsReducer;