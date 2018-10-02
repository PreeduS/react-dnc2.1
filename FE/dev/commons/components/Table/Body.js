import React from 'react';

import Row from './Row';


class Body extends React.Component{

    render(){

        const {children} = this.props;

        const rows = children ? React.Children.map(children, (child, index) => {
            let isFirst = index === 0;
            let isLast = index === React.Children.count(children) - 1;

            return React.cloneElement(child, {isFirst, isLast, isHeader: false})
        }) : [];

        console.log('body',rows, children)

        return(
            <React.Fragment>
                {
                    rows.map( row => row )
                }
            </React.Fragment>
        )
           
        
    }
}

export default Body;