const initialState = {
    commentsReducer:{

        comments = {
            data: {},
            status: null
        },
        mainTextarea: {
            status: null,
            value: ''
        }


    /*
        //replies:
        BE: [id]:{"id":38,"content":"zzz","replyTo":4,"groupId":4,
            "threadId":1,"userId":"","user":null}
        FE:
            status,     
            textarea: {value, status}
        //comments:
        //same + replies:{...}
    */

/*
        data:[],
        pending: false,  //pending overall
        //pending:{
           // loadMoreComments: false
        //},
        //status:{}  //comments/replies/commentGroup status
        status:{
            loadMoreComments: {
                status: null
            },
            comments:{}     //comments/replies/commentGroup status
                            //{value, status, commentGroupStatus }
        },
        activeTextarea: {}  //{active}*/
    },
    threadReducer:{}
}
export default initialState;

/*

*/