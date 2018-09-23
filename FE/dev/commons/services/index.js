import axios from '~/commons/axios';

const services = {
    login: (username, password) =>
        axios.post('/api/UserManager/login',{username, password})
    ,
    logout: () =>
        axios.post('/api/UserManager/logout')
    ,
    //login data
    getUserData: () =>
        axios.post('/api/usermanager/getUserData')
    ,
    register : (username, password, email) => 
        axios.post('api/UserManager/register',{username, password, email})
    ,
    doesUserExists : username => 
        axios.get('api/UserManager/userExists?username='+username)
    ,
}

export default services;