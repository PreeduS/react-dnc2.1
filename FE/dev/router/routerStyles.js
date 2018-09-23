import styled from 'styled-components';

export const AppBody = styled.div` 
    display:flex;
    flex-direction:column;
    background:${props => props.theme.mainContainer.backgroundColor};
    min-height:100%;

`;
export const AppWrapper = styled.div`
    //width:100%;
    position:relative;
    display:flex;
    flex-grow:1;
    margin-right: ${props => props.theme.sideMenu.width};
    margin-top:${props => props.theme.topMenu.height};

    
`;

export const AppMainContainer = styled.div`
    box-sizing: border-box;
    width:100%;
    overflow: hidden;
    padding-bottom:50px;
      
`;

//width:calc(100% - #{$sideMenuWidth});
// min-height:calc(100% - #{$topMenuHeight + 1} );
// background: ${variables.appMainContainerBackgroundColor};
//width:calc(100% - ${sideMenuWidth});
//min-height:calc(100% - ${topMenuHeight});

export const AppSideMenu = styled.div`
    position: fixed;
    right:0px;
    top:${props => props.theme.topMenu.height};
    bottom:0px;
    box-sizing: border-box;
    padding:0px 10px; 
    background: ${props => props.theme.sideMenu.backgroundColor};;   
    height:100%;
    display: inline-block;
    vertical-align: top;
    width: ${props => props.theme.sideMenu.width};
    border-left:1px solid ${props => props.theme.sideMenu.borderColor};
        
`;
