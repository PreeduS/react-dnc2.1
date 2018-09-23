
import {initialState} from './initialState';
import commonTypes, {actionTypes} from '../actionTypes';
import {userStatus} from '~/commons/constants';

//move to state.user
const UserReducer = (state = initialState.userReducer, action) =>{
    switch(action.type){
        //login
        case actionTypes.user.login + commonTypes.status.pending:
            return{
                ...state,
                user:{
                    ...state.user,
                    username: null,
                    loginStatus: userStatus.pending
                }
            };
        case actionTypes.user.login + commonTypes.status.fulfilled:
            return{
                ...state,
                user:{
                    ...state.user,
                    loginStatus: userStatus.fulfilled,
                    logoutStatus: null,
                    registerStatus: null,
                    username: action.payload.username
                }
            };
        case actionTypes.user.login + commonTypes.status.rejected:
            return{
                ...state,
                user:{
                    ...state.user,
                    username: null,
                    loginStatus: userStatus.rejected
                }
            };

        //logout
        case actionTypes.user.logout + commonTypes.status.pending:
            return{
                ...state,
                user:{
                    ...state.user,
                    //username: null,
                    logoutStatus: userStatus.pending
                }
            };
        case actionTypes.user.logout + commonTypes.status.fulfilled:
            return{
                ...state,
                user:{
                    ...state.user,
                    username: null,
                    logoutStatus: userStatus.fulfilled,
                    loginStatus: null,
                    registerStatus: null  
                }
            };   
        case actionTypes.user.logout + commonTypes.status.rejected:
            return{
                ...state,
                user:{
                    ...state.user,
                    logoutStatus: userStatus.rejected
                }
            };     
        //register
        case actionTypes.user.register + commonTypes.status.pending:{
            return{
                ...state,
                user:{
                    ...state.user,
                    registerStatus: userStatus.pending,
                    username: null
                }
            };
        }
        case actionTypes.user.register + commonTypes.status.fulfilled:{
            let {username} = action.payload;
            return{
                ...state,
                user:{
                    ...state.user,
                    registerStatus: userStatus.fulfilled,
                    username
                }
            };
        }
        case actionTypes.user.register + commonTypes.status.rejected:{
            return{
                ...state,
                user:{
                    ...state.user,
                    registerStatus: userStatus.rejected
                }
            };
        }

        //getUserData    
        case actionTypes.user.getUserData + commonTypes.status.pending:
            return{
                ...state,
                user:{
                    ...state.user,
                    username: null,
                    //loginStatus: userStatus.pending,
                    initialLoginStatus: userStatus.pending
                }
            };
        case actionTypes.user.getUserData + commonTypes.status.fulfilled:
            return{
                ...state,
                user:{
                    ...state.user,
                    username: action.payload.username,
                    //loginStatus: userStatus.fulfilled,
                    initialLoginStatus: userStatus.fulfilled
                }
            };
        case actionTypes.user.getUserData + commonTypes.status.rejected:
            return{
                ...state,
                user:{
                    ...state.user,
                    username: null,
                    //loginStatus: userStatus.rejected,
                    initialLoginStatus: userStatus.rejected //not logged in
                }
            };

        //rem - add update option to reset state on unmount

    }
    return state;
};
export default UserReducer;