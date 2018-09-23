import styled from 'styled-components';

export const CommentGroupWrapper = styled.div`
    border:1px solid ${props => props.theme.mainContainer.borderColor};
    margin-bottom:25px;
`;
export const LoadCommentsContainer = styled.div`
    margin-top:5px;
    margin-left: ${props => props.hasReplies ? '122px':'62px'};
    display:inline-block;
`;


