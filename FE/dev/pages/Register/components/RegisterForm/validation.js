
export const usernameStatus = {
    pending: 'pending',
    available: 'available',
    exists: 'exists',
}
const field = {
    username: 'username',
    password: 'password',
    password2: 'password2',

}

//move/get later to redux initial state
const username = {
    minLength: 6
}
const password = {
    minLength: 6
}


const validationHandler = (newValues, mapTo) => state => {

    let validation =  {
        ...state.validation,
        messages: {...state.validation.messages},
        errors: {...state.validation.errors},
    };


    const {usernameStatus: status} = state;

    if(mapTo === field.username){
        validation.messages.username = null;
        validation.errors.username = false;

        if(newValues.username.indexOf(' ') !== -1){
            validation.messages.username = 'No whitespaces allowed';
            validation.errors.username = true;

        }else if(newValues.username.length < username.minLength){
            validation.messages.username = `At least ${username.minLength} characters required`;
            validation.errors.username = true;

        }else if(status === usernameStatus.pending){
            validation.messages.username = 'Loading...';
        }else if(status === usernameStatus.available){
            validation.messages.username = 'Username available';
        }else if(status === usernameStatus.exists){
            validation.messages.username = 'Username is taken';
            validation.errors.username = true;
        }        

    }else if(mapTo === field.password || mapTo === field.password2){
        validation.messages.password = null;
        validation.messages.password2 = null;
        validation.errors.password = false;
        validation.errors.password2 = false;
        if(newValues.password.length < password.minLength){
            validation.messages.password = `At least ${password.minLength} characters required`;
            validation.errors.password = true;
        }
        if(newValues.password !== newValues.password2){
            validation.messages.password2 = 'Passwords don\'t match';
            validation.errors.password2 = true;
        }
    } 

    validation.hasErrors = Object.keys(field).find(key => validation.errors[key] === true) !== undefined;

    return validation;

}

export default validationHandler;