import actionTypes from '../actionTypes';
import commonTypes from '~/commons/actionTypes';
import {generalError} from './commons';
import {commentStatus, textareaStatus} from '../constants';

//maybe set value also here
//export const setActiveTextarea = (id, isActive) => ({

//textarea
export const updateTextarea = ({id, value, status, isActive}) => dispatch => {
    //setActiveTextarea here
    dispatch({
        type: actionTypes.updateTextarea,
        payload: {id, value, status, isActive}
    });
};

/*
//or setSingleActiveTextarea
export const setActiveTextarea = ({id}) => dispatch => { 
    dispatch({
        type: actionTypes.setActiveTextarea,
        payload: {id}
    });
}*/

export const toggleActiveTextarea = id => ({
    type: actionTypes.toggleActiveTextarea,
    payload: {id}
});


