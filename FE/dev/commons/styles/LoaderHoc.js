import styled from 'styled-components';

export const Wrapper = styled.div`
  position:relative;

`;

export const DimmerContainer = styled.div`
    position:absolute;
    width:100%;
    height:100%;
    z-index: ${props => props.theme.zIndex.loaderHoc};
    ${props => !props.loading && `
        display:none;
    `}
  
`;
export const LoaderContainer = styled.div`
    position:relative;
    width:100%;
    height:100%;
    max-height:100px;
    display:flex;
    user-select: none;

    
`;
export const Center = styled.div`
    margin:auto auto;
`;
export const Label = styled.span`
    vertical-align:middle;
    margin-left:3px;

    color:${props => props.theme.commons.color.lighter};
`;

export const Dimmer = styled.div`

    ${props => props.loading && `
        opacity:.3;
    `}
`;