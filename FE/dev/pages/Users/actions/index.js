import actionTypes from '../actionTypes';
import commonTypes from '~/commons/actionTypes';
import services from '../services';

export const loadUsers = () => dispatch => {
    dispatch({
        type: actionTypes.loadUsers + commonTypes.status.pending
    });

    services.loadUsers().then( result => {    
        const users = result.data;    

        dispatch({ 
            type: actionTypes.loadUsers + commonTypes.status.fulfilled,
            payload: {users}
        });
    }).catch(error => {
        dispatch({ type: actionTypes.loadUsers + commonTypes.status.rejected} );
    });  
};
