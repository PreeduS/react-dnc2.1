import React from 'react';
import PropTypes from 'prop-types';
import * as styles from '../styles/Field';

class Field extends React.Component {
    constructor(){
        super();
        this.changeHandler = this.changeHandler.bind(this);
        this.blurHandler = this.blurHandler.bind(this);
    }
    changeHandler(e){
        var {changeHandler, mapTo} = this.props;
        changeHandler(e.target.value, mapTo)
    }
    blurHandler(e){
        var {blurHandler, mapTo} = this.props;
        if(!blurHandler){return;}
        blurHandler(e.target.value, mapTo);
    }
    render(){
        let { label, value, errors, type, disabled} = this.props;

        return(
            <styles.FieldContainer>
                <styles.LeftContent><span>{label}:</span></styles.LeftContent>
                <styles.RightContent>
                    <styles.InputContent>
                        <styles.Input
                            disabled = {disabled} 
                            type={type} 
                            value={value} 
                            onChange = {this.changeHandler} 
                            onBlur = {this.blurHandler} 
                        />
                    </styles.InputContent>
                    {errors && (
                        <styles.ValidationContent>
                            <span>{value.length>0 && errors}</span>
                        </styles.ValidationContent>
                    )}
                </styles.RightContent>

            </styles.FieldContainer>
        )
    }
}

Field.propTypes = {
    disabled: PropTypes.bool
};

Field.defaultProps = {
    disabled: false
};

export default Field;

