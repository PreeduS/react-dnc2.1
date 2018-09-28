const initialState = {
    commentsReducer:{
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
        activeTextarea: {}  //{active}
    },
    threadReducer:{}
}
export default initialState;

/*

*/