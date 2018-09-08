import styled from 'styled-components';
//import * as variables from '~/commons/styles/variables';

export const UserSection = styled.div`
           border:1px solid gray;
    position:relative;
`;
export const UserSectionContainer = styled.div`

    display:flex; 
`;

export const LeftContent = styled.div`
    width:40px;
    height:40px;   
`;



export const RightContent = styled.div`
    >div{
        flex:1;
        display: flex;
        height:100%;
    }
    >div>div{
        margin:auto 0px;
        cursor:pointer;
        user-select: none; 
    }

`;
export const DropDownContainer = styled.div`
    position: absolute;
    top:40px;
    left:0px;
    right:0px;
`;