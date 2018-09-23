export const initialState = {
    //commons.user
    userReducer:{
        user:{
            //id: null,
            username: null,
            //loginPending: false,
            loginStatus: null,
            initialLoginStatus: null,
            logoutStatus: null,
            registerStatus: null
        
        },
    },
    commonsReducer:{
        initialData:{    //staticData
            data:{
                validation:{
                    username:{
                        minLength: null,
                        maxLength: null
                    },
                    password:{
                        minLength: null,
                        maxLength: null
                    }
                },
                status: null
            }
        }
    }
};