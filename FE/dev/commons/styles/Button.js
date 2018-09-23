import styled from 'styled-components';


const BaseButton = styled.div`
    display:inline-flex;
    opacity:1 !important;
    width:${props => typeof props.width === 'string' ? props.width : props.width + 'px'};
    height:${props => props.height + 'px'};

    
    &&&&&>button{
        cursor:pointer;        
        box-shadow:none !important;
        font-size:1.01rem;
        font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
        font-weight:bold;
        width:100%;
        height:100%;
        margin:auto auto;
        padding:0px;
        border: 1px solid transparent;
        &:disabled{
            cursor:default;
            opacity:1 !important;
        }       
        
        ${props => props.attached === 'bottom' && `
            border-top:0px;
            border-top-left-radius: 0px;
            border-top-right-radius: 0px;
        `}
        
    }
        
`;


//basic/default only
export const ButtonDefault = BaseButton.extend`

    &&&&&>button{
        background-color:initial !important;

        border-color: ${props => props.theme.mainContainer.borderColor};
        color:${props => props.theme.commons.color.lighter} !important;
        
        &:hover{
            background-color:rgb(241, 242, 246) !important;
            color: ${props => props.theme.button.default.colorHover} !important;
        }
        &:active{
            background-color:rgb(237, 238, 243) !important;
            color: ${props => props.theme.button.default.colorActive} !important;
        }

        &:disabled{
            color:rgba(40,40,40,.4) !important;
        }        

        ${props => props.inlineStyles}        
    }

`;
export const ButtonGray = BaseButton.extend`
    &&&&&>button{
        background-color:rgb(241, 242, 246) !important;

        border-color: ${props => props.theme.mainContainer.borderColor};
        color:${props => props.theme.commons.color.lighter} !important;

        &:hover{
            background:rgb(239, 240, 245) !important;
            color:rgb(7,7,7) !important;
        }
        &:active{
            background:rgb(236,237,242) !important;
            border:1px solid rgb(234,234,234) !important;
        }
        &:disabled{
            color:rgba(77,77,77,.6) !important;
        }     
        ${props => props.inlineStyles}        
    }
`;



export const Content = styled.div`
    >div.loader{
        border-right:5px solid transparent;
        vertical-align:middle;
    }
    >span{vertical-align:middle;}
`;
