import commonTypes, {actionTypes} from '~/commons/actionTypes';
import services from '~/commons/services';


export const login = (username, password) => dispatch =>{
    dispatch({ type: actionTypes.user.login + commonTypes.status.pending} );

    services.login(username, password).then( result => {        
        dispatch({ 
            type: actionTypes.user.login + commonTypes.status.fulfilled,
            payload: {username}
        });
    }).catch(error => {
        dispatch({ type: actionTypes.user.login + commonTypes.status.rejected} );
    });  

};

export const logout = dispatch =>{
    dispatch({ type: actionTypes.user.logout + commonTypes.status.pending} );

    services.logout().then( result =>{           
        dispatch({ type: actionTypes.user.logout + commonTypes.status.fulfilled} );
    }).catch(error => {
        dispatch({ type: actionTypes.user.logout + commonTypes.status.rejected} );
    });  

};

export const register = (username, password, email) => dispatch =>{
    dispatch({ type: actionTypes.user.register + commonTypes.status.pending} );

    services.register(username, password, email).then( result => {        
        dispatch({ 
            type: actionTypes.user.register + commonTypes.status.fulfilled,
            //payload: {username}
        });
    }).catch(error => {
        dispatch({ type: actionTypes.user.register + commonTypes.status.rejected} );
    });  

};

//login data
export const getUserData = () => dispatch => {
    dispatch({ type: actionTypes.user.getUserData + commonTypes.status.pending} );

    services.getUserData().then( result =>{     
        let username = result.data.username;    
        dispatch({
            type: actionTypes.user.getUserData + commonTypes.status.fulfilled,
            payload: {username}
        });
    }).catch(error => {
        dispatch({ type: actionTypes.user.getUserData + commonTypes.status.rejected} );
    });  

};

