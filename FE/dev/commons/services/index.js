import axios from 'axios';

const services = {
    login: (username, password) =>
        axios.post('/api/UserManager/login',{username, password})
    ,
    logout: () =>
        axios.post('/api/UserManager/logout')
    ,
    getUserData: () =>
        axios.post('/api/usermanager/getUserData')

}

export default services;