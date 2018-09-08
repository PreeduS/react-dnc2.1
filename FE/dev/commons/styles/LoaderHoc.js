import styled from 'styled-components';
import * as variables from '~/commons/styles/variables';

export const Wrapper = styled.div`
  position:relative;

`;

export const DimmerContainer = styled.div`
    position:absolute;
    width:100%;
    height:100%;
    z-index:${variables.loaderHocZIndex};
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
    color:${variables.colorLighter};
`;

export const Dimmer = styled.div`

    ${props => props.loading && `
        opacity:.3;
    `}
`;