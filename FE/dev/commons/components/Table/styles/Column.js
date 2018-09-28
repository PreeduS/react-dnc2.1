import styled from 'styled-components';

//${props => props.theme.mainContainer.borderColor};
export const Column = styled.div`
    display:flex;
    height: ${props => props.height};
    flex: 1;
    ${props => props.width && (`
        flex-basis: ${props.width};
        flex-shrink:0;
        flex-grow:0;
    `)}


    ${props => (props.showBorder === 'vertical' || props.showBorder === 'all') && !props.isLast && `
        border-right:1px solid ${props.theme.mainContainer.borderColor};
    `}

    ${props => props.isHeader && `
        //border-color:blue;
    `}
    
`;

