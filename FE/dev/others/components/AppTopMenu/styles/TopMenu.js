import styled from 'styled-components';

export const TopMenu = styled.div`
    border-bottom:1px solid ${props => props.theme.topMenu.borderColor};
    height:${props => props.theme.topMenu.height};
    background:${props => props.theme.topMenu.backgroundColor};
    color:${props => props.theme.sideMenu.color};
    display:flex;
    position:fixed;
    top:0px;
    left:0px;
    right:0px;

`;
export const Logo = styled.div`
    display:flex;
    flex-basis:${props => props.theme.topMenu.height};
    flex-shrink:0;
`;
export const MiddleContainer = styled.div`
    display:flex;
    flex:1;
`;
export const NavItem = styled.div`
    display:flex;
    align-items:center;
    margin:0px 5px;

`;

export const RightContainer = styled.div`
    flex-basis:${props => props.theme.sideMenu.width};
    flex-shrink:0;
`;


