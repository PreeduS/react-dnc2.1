import styled from 'styled-components';

export const LoginForm = styled.div`
    background:${props => props.theme.topMenu.backgroundColor};
    border-left:1px solid ${props => props.theme.topMenu.borderColor};
    border-bottom:1px solid ${props => props.theme.topMenu.borderColor};
    padding:5px;
`;