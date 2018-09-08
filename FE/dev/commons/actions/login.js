//import {actionTypes} from '../actionTypes'
import commonTypes, {actionTypes} from '~/commons/actionTypes';
import services from '~/commons/services';
/*
export const login = username =>(
    {
        type: actionTypes.login,
        payload: username
    }
);*/

export const login = (username, password) => dispatch =>{
    dispatch({ type: actionTypes.login + commonTypes.status.pending} );

    services.login(username, password).then( result => {        
        dispatch({ 
            type: actionTypes.login + commonTypes.status.fulfilled,
            payload: {username}
        });
    }).catch(error => {
        dispatch({ type: actionTypes.login + commonTypes.status.rejected} );
    });  

};