import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './styles/Column';

const Column = ({width, height, isFirst, isLast, isHeader, showBorder, children}) => {
    return (
        <styles.Column 
            width = {width} 
            height = {height}
            isFirst = {isFirst}
            isLast = {isLast}
            isHeader = {isHeader}
            showBorder = {showBorder}
        >
            {children}
        </styles.Column>
    );
}
Column.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    isFirst: PropTypes.bool,
    isLast: PropTypes.bool,
    isHeader: PropTypes.bool,
    children: PropTypes.node.isRequired,
};
Column.defaultProps = {
    height: '100%'
};
export default Column;