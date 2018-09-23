import {initialState} from './initialState';
import commonTypes, {actionTypes} from '../actionTypes';
import {requestStatus} from '../constants';

//move to state.user
const CommonsReducer = (state = initialState.commonsReducer, action) =>{
    switch(action.type){
        case actionTypes.commons.getInitialData + commonTypes.status.pending:{
            return {
                ...state,
                initialData:{
                    ...state.initialData,
                    status: requestStatus.pending
                }
            }
        }
        case actionTypes.commons.getInitialData + commonTypes.status.fulfilled:{
            return {
                ...state,
                initialData:{
                    ...state.initialData,
                    data:{
                        //data here
                    },
                    status: requestStatus.fulfilled
                }
            }
        }
        case actionTypes.commons.getInitialData + commonTypes.status.rejected:{
            return {
                ...state,
                initialData:{
                    ...state.initialData,
                    status: requestStatus.rejected
                }
            }
        }
    }
    return state;

}