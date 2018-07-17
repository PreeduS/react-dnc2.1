export const generalError = actionType => dispatch => error =>
    dispatch({
        type: actionType + '_REJECTED',
        payload: error
    });