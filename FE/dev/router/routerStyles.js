import styled from 'styled-components';

export const AppBody = styled.div` 
    display:flex;
    flex-direction:column;
    min-height:100%;
    background:${props => props.theme.mainContainer.backgroundColor};

`;
export const AppWrapper = styled.div`
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
    color:${props => props.theme.mainContainer.color};
      
`;

//width:calc(100% - #{$sideMenuWidth});
// min-height:calc(100% - #{$topMenuHeight + 1} );
// background: ${variables.appMainContainerBackgroundColor};
//width:calc(100% - ${sideMenuWidth});
//min-height:calc(100% - ${topMenuHeight});

export const AppSideMenu = styled.div`
    position: fixed;
    right:0px;
    bottom:0px;
    box-sizing: border-box;
    padding:0px 10px; 
    height:100%;
    display: inline-block;
    vertical-align: top;
    background: ${props => props.theme.sideMenu.backgroundColor};;   
    color:${props => props.theme.sideMenu.color};
    top:${props => props.theme.topMenu.height};
    width: ${props => props.theme.sideMenu.width};
    border-left:1px solid ${props => props.theme.sideMenu.borderColor};
        
`;
