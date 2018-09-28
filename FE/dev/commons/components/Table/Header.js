import React from 'react';

import Row from './Row';


class Header extends React.Component{

    render(){

        const {children} = this.props;
        const rows = React.Children.map(children, (child, index) => {
            let isFirst = index === 0;
            let isLast = index === React.Children.count(children) - 1;
            return React.cloneElement(child, {isFirst, isLast, isHeader: true})
        })


        return(
            <React.Fragment>
                {
                    rows.map( row => row )
                }
            </React.Fragment>
        )
           
        
    }
}

export default Header;