import initialState from './initialState';
import actionTypes from '../actionTypes';
import commonTypes from '~/commons/actionTypes';
import {requestStatus} from '~/commons/constants';

const UsersReducer = ( state = initialState, action) =>{
    switch(action.type) {
        case actionTypes.loadUsers + commonTypes.status.pending:{
            return {
                ...state,
                users:{
                    ...state.users,
                    status: requestStatus.pending
                }
            }
        }
        case actionTypes.loadUsers + commonTypes.status.fulfilled:{
            let {users} = action.payload;
            console.log('r ',users)
            return {
                ...state,
                users:{
                    ...state.users,
                    data: users,
                    status: requestStatus.fulfilled
                }
            }
        }
        case actionTypes.loadUsers + commonTypes.status.rejected:{
            return {
                ...state,
                users:{
                    ...state.users,
                    status: requestStatus.rejected
                }
            }
        }
    }

    return state;
}

export default UsersReducer;