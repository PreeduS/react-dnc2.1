import styled from 'styled-components';

export const RegisterForm = styled.div`
    max-width:600px;
    border:1px solid rgb(220,220,220);
    //margin-left:${props => props.theme.mainContainer.content.marginLeft};
    //margin-right:${props => props.theme.mainContainer.content.marginRight};
    margin: 0px auto;
    margin-top:${props => props.theme.mainContainer.content.marginTop};
    padding:10px;
`;