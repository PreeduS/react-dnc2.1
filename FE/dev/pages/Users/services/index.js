import axios from '~/commons/axios';

const services = {
    loadUsers: threadId =>
        axios.get('/api/users/getUsers')
    ,

}

export default services;