import { injectGlobal } from "styled-components";

injectGlobal`
    body{
        margin:0px;
        padding:0px;
        font-size:14px;
        font-family: 'Roboto', sans-serif;
        font-size:14px; 
    } 
    *{
        box-sizing:border-box;
    }

`;

export default injectGlobal;