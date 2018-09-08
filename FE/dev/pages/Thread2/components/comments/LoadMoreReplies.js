import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import Link from '~/commons/components/Link';

const LoadMoreReplies = props => {
    const {isPending, label, onClick, disabled} = props;




    return (
        <Link onClick = {onClick} disabled = {disabled} >
            {isPending && <Loader active inline size = "tiny" />} 
            {label} 
        </Link>
    );
} 

export default LoadMoreReplies;