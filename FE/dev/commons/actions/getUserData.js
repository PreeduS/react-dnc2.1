import commonTypes, {actionTypes} from '~/commons/actionTypes';
import services from '~/commons/services';

export const getUserData = dispatch =>{
    dispatch({ type: actionTypes.getUserData + commonTypes.status.pending} );

    services.getUserData().then( result =>{     
        let username = result.data.username;    
        dispatch({
            type: actionTypes.getUserData + commonTypes.status.fulfilled,
            payload: {username}
        });
    }).catch(error => {
        dispatch({ type: actionTypes.getUserData + commonTypes.status.rejected} );
    });  

};