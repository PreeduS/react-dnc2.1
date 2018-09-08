import check from '~/commons/utils/check';

const updateTextarea = ({id, value, status, isActive}) => state => {

    let prevTextarea = check( state => state.textarea[id] !== undefined )(state) ? state.textarea[id] : {};
    if(value === null){  value = prevTextarea.value || ''; }                
    if(status === null){  status = prevTextarea.status || null; }       
    if(isActive === null){  isActive = prevTextarea.isActive || null; }   

    //rem: if isActive === true, deselect rest

    return {
        ...state,
        textarea: {
            ...state.textarea,
            [id]: {
                ...prevTextarea,
                value,
                status,
                isActive
            }
        }
    };

}

export default updateTextarea;