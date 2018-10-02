import axios from '~/commons/axios';

const services = {
    loadThreads: (lastId, categoryId) =>
        axios.get('/api/threads/getThreads',{
            params: {test:'param'}
        })
    ,

}

export default services;