import React from 'react';
import PropTypes from 'prop-types';
import * as styles from '../styles/Dropdown';


class Dropdown extends React.Component {
    constructor(){
        super();
        this.dropdownRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        const dropDownParentNode = this.dropdownRef.current.parentNode
        let target = e.target;
        let clickedInside = false;

        while(target.parentNode !== null){
            target = target.parentNode;
            if(target === dropDownParentNode){
                clickedInside = true; break;
            }
        }

        if(!clickedInside){
            this.props.onDropdownBlur(e);
        }

    }

    componentDidMount(){
        window.addEventListener('click',this.handleClick)
    }
    componentWillUnmount(){
        window.removeEventListener('click',this.handleClick)
    }

    render(){
        let {showDropdown} = this.props;
        return(
            <div ref = {this.dropdownRef}>
                {showDropdown &&
                <styles.Dropdown>
                    {this.props.children}
                </styles.Dropdown>}
            </div>
        );
    }
}

Dropdown.propTypes = {
    showDropdown: PropTypes.bool.isRequired,
    onDropdownBlur: PropTypes.func,
}
/*
Dropdown.defaultProps = {
    preventClose: false
};
*/
export default Dropdown;