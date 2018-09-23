

export const actionTypes = {
    user: {
        logout: 'COMMON_LOGOUT',
        login: 'COMMON_LOGIN',
        register: 'COMMON_REGISTER',
        getUserData: 'COMMON_GET_USER_DATA',
    },
    commons:{
        getInitialData: 'COMMON_GET_INITIAL_DATA'
    }

};

const commonTypes = {
    status: {
        pending: '_PENDING',
        fulfilled: '_FULFILLED',
        rejected: '_REJECTED',
    }
}

export default commonTypes;