import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './styles/Row';

//import Column from './Column';

const Row = ({height, isFirst, isLast, isHeader, showBorder, children}) => {

    const cols = React.Children.map(children, (child, index) => {
        let isFirst = index === 0;
        let isLast = index === React.Children.count(children) - 1;
        return React.cloneElement(child, {isFirst, isLast, isHeader, showBorder})
    })
    console.log('row isHeader ', isHeader,isLast )
    return(
        <styles.Row 
            height = {height} 
            isFirst = {isFirst}
            isLast = {isLast}
            isHeader = {isHeader}
            showBorder = {showBorder}
        >
            {cols.map( col => col )}
        </styles.Row>
    );
}

Row.propTypes = {
    height: PropTypes.string.isRequired,
    isFirst: PropTypes.bool,
    isLast: PropTypes.bool,
    isHeader: PropTypes.bool,
    columns: PropTypes.array.isRequired,
    showBorder: PropTypes.string
};
Row.defaultProps = {
    height: '60px',
    isFirst: false,
    isLast: false,
    isHeader: false,
    showBorder: 'horizontal'

};
export default Row;