//import {actionTypes} from '../actionTypes'
import commonTypes, {actionTypes} from '~/commons/actionTypes';
import services from '~/commons/services';

export const logout = dispatch =>{
    dispatch({ type: actionTypes.logout + commonTypes.status.pending} );

    services.logout().then( result =>{           
        dispatch({ type: actionTypes.logout + commonTypes.status.fulfilled} );
    }).catch(error => {
        dispatch({ type: actionTypes.logout + commonTypes.status.rejected} );
    });  

};