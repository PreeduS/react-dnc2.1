import {commentStatus, loaderStatus} from '../../../constants';

//map array to object
const mapToObject = list => ( 
    list.reduce( (acc, el) => {
        return {
            ...acc,
            [el.id]: {...el}
        }
    },{})
);



const mapComments = comments =>{

    let commentsObject = mapToObject(comments)
    console.log('commentsObject ',commentsObject)

    Object.keys(commentsObject).forEach( key => {
        let replies = commentsObject[key].replies;
        commentsObject[key].replies = mapToObject(replies)
        //commentsObject[key].loaderStatus = replies.length === 0 ? loaderStatus.done : null;
        commentsObject[key].loaderStatus = commentsObject[key].nrReplies === 0 ? loaderStatus.done : null;
    })
    console.log('commentsObject ',commentsObject)
    return commentsObject;
    //replies: mapToObject(acc[el.id].replies)

};


//rem
//add comment/replies reset recentLoaded,recentUserAdded status

const updateCommentsRecetStatus = (prevComments, newComments) => {
    const updatedPrevComments = {...prevComments};
    const updatedNewComments = {...newComments};
    Object.keys(updatedPrevComments).forEach( key => {
        updatedPrevComments[key].status = null;
    })
    Object.keys(updatedNewComments).forEach( key => {
        updatedNewComments[key].status = commentStatus.recentLoaded;
    })

    return ({
        ...prevComments,
        ...newComments
    });
}



export const addComment = (commentsDataState, comment) => {


    let id = comment.id;

    //rem, add check if id exists, server may return the same comment again later
    //keep only textarea data
    // /{"id":38,"content":"zzz","replyTo":4,"groupId":4,
    //  "threadId":1,"userId":"439e896d-d4d4-4c3e-937c-cd45d6f63dfe","user":null}

    let newCommentsDataState = {
        ...commentsDataState,
        [id]:{
            ...comment,
            replies:{},
            nrReplies: 0,
            status: commentStatus.recentUserAdded
        }
    }

    return newCommentsDataState;
}

export const addReply = (commentsDataState, reply) => {
    let groupId = reply.groupId;    //groupId === comments[data]:{  [groupId]:{replies:{thisReply}}  }

    if(commentsDataState[groupId] === undefined){
        throw new Error('Failed to find commentgroup id: '+ groupId);
    }    
   
    let prevReplies = commentsDataState[groupId].replies === undefined ? {} : commentsDataState[groupId].replies;

    let newCommentsDataState = {
        ...commentsDataState,
        [groupId]:{
            ...commentsDataState[groupId],
            nrReplies: commentsDataState[groupId].nrReplies + 1,
            replies:{
                ...prevReplies,
                //rem, add check if reply already exists, BE may return same elem multiple times 
                [reply.id]:{
                    ...reply,
                    status: commentStatus.recentUserAdded
                }
            }

        }
    }
    

    return newCommentsDataState;
}


//loadComments,loadMoreComments
export const loadComments = (commentsDataState, comments) => {
    const commentsObject = mapComments(comments);
    console.log('comments ',comments)
    console.log('commentsObject ',commentsObject)
    return {
        //...commentsDataState,
        ...commentsObject        
    };
}

export const loadMoreComments = (commentsDataState, comments) => {
    const commentsObject = mapComments(comments);
    
    return updateCommentsRecetStatus(commentsDataState, commentsObject);
    /*return {
        ...commentsDataState,
        ...commentsObject        
    };*/
}





export const loadMoreReplies = (commentsDataState, newReplies, groupId, loaderStatus) => {
    if(commentsDataState[groupId] === undefined){
        throw new Error('Failed to find commentgroup id: '+ groupId);
    }  

    const prevReplies = commentsDataState[groupId].replies === undefined ? {} : commentsDataState[groupId].replies;
    let newRepliesObject = mapToObject(newReplies);
    //newReplies - add foreach -> status: commentStatus.recent

    let newCommentsDataState = {
        ...commentsDataState,
        [groupId]:{
            ...commentsDataState[groupId],
            replies:  updateCommentsRecetStatus(prevReplies, newRepliesObject)
            //{...prevReplies,
                //...newRepliesObject}
            ,
            loaderStatus

        }
    }
    return newCommentsDataState;         
}