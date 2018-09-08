
const getCommentsList = (commentsData, order = 'DESC') => {
    let commentsKeys = Object.keys(commentsData);
    if(order === 'DESC'){
        commentsKeys.reverse();
    }

    return commentsKeys.map( key => {
        let comment = commentsData[key];
        return comment;
    });

}

export default getCommentsList;