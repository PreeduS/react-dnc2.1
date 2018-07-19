import React from 'react';
import * as styles from '../styles/LoadMoreComments';
import PropTypes from 'prop-types';

import Button from '~/commons/components/Button';

class LoadMoreComments extends React.Component {
    constructor(){
        super();
    }


    render(){
        const {loading, disabled, onClick} = this.props;
        return(
            <div>
                <styles.LoadMoreCommentsWrapper>
                    <Button
                        onClick = {onClick}
                        disabled = {loading || disabled}
                        loading = {loading}
                        width = {'100%'}
                        height = {30}
                        inlineStyles = {'font-family: Roboto,sans-serif;'}
                        type = "gray"
                    >
                        Load more comments
                    </Button>
                </styles.LoadMoreCommentsWrapper>

            </div>
        );
    }
}

LoadMoreComments.propTypes = {
    loading: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
}
export default LoadMoreComments;

// inlineStyles = {'border-top:0px !important;border-top-left-radius: 0px;border-top-right-radius: 0px;'}
