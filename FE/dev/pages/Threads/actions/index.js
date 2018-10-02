import actionTypes from '../actionTypes';
import commonTypes from '~/commons/actionTypes';
import services from '../services';

export const loadThreads = (lastId, categoryId) => dispatch => {

    services.loadThreads(lastId, categoryId).then( result =>{ 

        dispatch({
            type: actionTypes.loadThreads + commonTypes.status.fulfilled,
            payload: {threads: result.data}
        });

        

    }).catch(error => { 
        dispatch({
            type: actionTypes.loadThreads + commonTypes.status.rejected
        });

        
    });


};