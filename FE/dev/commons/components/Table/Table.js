import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './styles/Table';



const Table = ({children}) => {

    return (
        <styles.Table>        
            {children}
        </styles.Table>
    );

}

Table.propTypes = {
};

export default Table;
