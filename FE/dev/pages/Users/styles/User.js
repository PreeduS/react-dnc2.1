import React from 'react';
import styled from 'styled-components';

export const UserWrapper = styled.div`

    height:60px;
    border-bottom:1px solid ${props => props.theme.mainContainer.borderColor};
    display:flex;
`;

export const LeftContainer = styled.div`

    height:60px;
    width:60px;
    border-right:1px solid ${props => props.theme.mainContainer.borderColor};
`;
export const RightContainer = styled.div`

    height:100%;
    flex:1;
`;