import React from 'react';
import PropTypes from 'prop-types';
import * as styles from '../styles/Button.js';
import { Button as ButtonSemanticUI, Loader } from 'semantic-ui-react'


class Button extends React.Component {
    constructor(){
        super();
        this.clickHandler = this.clickHandler.bind(this);
        this.styledContainer = {
            'default': styles.ButtonDefault,
            'gray': styles.ButtonGray,
        }
    }
    clickHandler(e){
        const {onClick, disabled} = this.props;
        if(disabled){ return; }
        if(onClick){
            onClick(e);
        }
    }

    render(){
        const { width, height, children, disabled, loading, inlineStyles, attached, type, ...rest} = this.props;
        const StyledContainer = this.styledContainer[type];
//attached = "bottom"
        const content = loading ?
            (<styles.Content>
                <Loader active inline size = "tiny"/>
                <span>{children}</span>
            </styles.Content>) : 
        <span>{children}</span>;

        return(
            <StyledContainer 
                width = {width} 
                height = {height} 
                inlineStyles = {inlineStyles}
                attached = {attached}
            >
                <ButtonSemanticUI onClick = {this.clickHandler} disabled = {disabled} {...rest}>
                    {content}
                </ButtonSemanticUI>
            </StyledContainer>
        )
    }
}

Button.propTypes = {
    children: PropTypes.string.isRequired,
    width: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    height: PropTypes.number,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    type: PropTypes.oneOf(['default', 'gray']),
    attached: PropTypes.oneOf(['top', 'bottom','none']),
};

Button.defaultProps = {
    width: 120,
    height: 24,
    disabled: false,
    loading: false,
    fluid: true,
    size:'medium',
    compact:true,
    basic:true,
    inlineStyles:'',
    type:'default',
    attached:'none',
};

export default Button;

