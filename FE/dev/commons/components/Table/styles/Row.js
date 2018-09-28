import styled from 'styled-components';




export const Row = styled.div`
    display:flex;
    height: ${props => props.height};



    ${props => (props.showBorder === 'horizontal' || props.showBorder === 'all') && `
        border-top:1px solid ${props.theme.mainContainer.borderColor};
    `}

    ${props => (props.showBorder === 'horizontal' || props.showBorder === 'all') && props.isLast && `
        border-bottom:1px solid ${props.theme.mainContainer.borderColor};
    `}

    ${props => (props.showBorder === 'vertical' || props.showBorder === 'all') && `
        border-left:1px solid ${props.theme.mainContainer.borderColor};
        border-right:1px solid ${props.theme.mainContainer.borderColor};
    `}

    ${props => props.showBorder === 'horizontal' && props.isHeader && `
        border-top:0px;
    `}


`;

