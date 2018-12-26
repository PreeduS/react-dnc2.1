import React from 'react';
import styled from 'styled-components';

//const imgSrc = require.context('~/dev/commons/assets/user.png');

const logoPath = require('~/commons/assets/user.png');


export const Logo = styled.div`
    width:100%;
    height:100%;
    display:flex;
    background:rgb(240,240,240);
    border-right:1px solid ${props => props.theme.mainContainer.borderColor};
`;
export const Img = styled.div`
    background-image: url(${logoPath});
    width:60%;
    height:60%;
    background-size:cover;
    margin:auto;

`;
