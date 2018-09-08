import React from 'react';
import PropTypes from 'prop-types';
import * as styles from '../styles/Link.js';

class Link extends React.Component {
    constructor(){
        super();
        this.clickHandler = this.clickHandler.bind(this);
    }
    clickHandler(e){
        if(this.props.disabled){return;}
        if(this.props.onClick){
            this.props.onClick(e)
        }
    }

    render(){
        const {children, disabled} = this.props;
        return <styles.Link onClick = {this.clickHandler} disabled = {disabled}>{children}</styles.Link>
    }
}

Link.propTypes = {
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
}
Link.defaultProps = {
    disabled: false
};

export default Link;