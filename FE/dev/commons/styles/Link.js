import styled from 'styled-components';

export const Link = styled.div`
    display:inline-block;
    color:rgb(77, 77, 77);
    font-size:1.05rem;
    font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
    font-weight:bold;
    user-select: none;
    ${props => !props.disabled && `
        cursor:pointer;
        &:hover{
            color:rgb(7, 7, 7);
        }
    `}
`;
