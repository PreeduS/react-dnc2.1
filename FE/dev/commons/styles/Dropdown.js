import styled from 'styled-components';

export const Dropdown = styled.div`
    position: relative;
    z-index:${props => props.theme.zIndex.dropdown};
`;
