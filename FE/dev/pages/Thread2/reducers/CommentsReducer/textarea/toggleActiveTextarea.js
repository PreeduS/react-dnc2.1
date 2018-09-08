
const toggleActiveTextarea = ({id}) => state => {
    let isActive = !(state.textarea[id] && state.textarea[id].isActive);
    //rem: if isActive === true, deselect rest
    return {
        ...state,
        textarea: {
            ...state.textarea,
            [id]: {
                ...state.textarea[id],
                isActive
            }
        }
    }
}

export default toggleActiveTextarea;