
import {initialState} from './initialState';
import commonTypes, {actionTypes} from '../actionTypes';
import {userStatus} from '~/commons/constants';

//move to state.user
const UserReducer = (state = initialState, action) =>{
    switch(action.type){
        //login
        case actionTypes.login + commonTypes.status.pending:
            return{
                ...state,
                user:{
                    ...state.user,
                    username: null,
                    loginStatus: userStatus.pending
                }
            };
        case actionTypes.login + commonTypes.status.fulfilled:
            return{
                ...state,
                user:{
                    ...state.user,
                    loginStatus: userStatus.fulfilled,
                    username: action.payload.username
                }
            };
        case actionTypes.login + commonTypes.status.rejected:
            return{
                ...state,
                user:{
                    ...state.user,
                    username: null,
                    loginStatus: userStatus.rejected
                }
            };

        //logout
        case actionTypes.logout + commonTypes.status.pending:
            return{
                ...state,
                user:{
                    ...state.user,
                    username: null,
                    logoutStatus: userStatus.pending
                }
            };
        //on logout reset loginStatus
        case actionTypes.logout + commonTypes.status.fulfilled:
        return{
            ...state,
            user:{
                ...state.user,
                username: null,
                logoutStatus: userStatus.fulfilled
            }
        };   
        case actionTypes.logout + commonTypes.status.rejected:
            return{
                ...state,
                user:{
                    ...state.user,
                    logoutStatus: userStatus.rejected
                }
            };     
        //getUserData    
        case actionTypes.getUserData + commonTypes.status.pending:
            return{
                ...state,
                user:{
                    ...state.user,
                    username: null,
                    //loginStatus: userStatus.pending,
                    initialLoginStatus: userStatus.pending
                }
            };
        case actionTypes.getUserData + commonTypes.status.fulfilled:
            return{
                ...state,
                user:{
                    ...state.user,
                    username: action.payload.username,
                    //loginStatus: userStatus.fulfilled,
                    initialLoginStatus: userStatus.fulfilled
                }
            };
        case actionTypes.getUserData + commonTypes.status.rejected:
            return{
                ...state,
                user:{
                    ...state.user,
                    username: null,
                    //loginStatus: userStatus.rejected,
                    initialLoginStatus: userStatus.rejected //not logged in
                }
            };

    }
    return state;
};
export default UserReducer;