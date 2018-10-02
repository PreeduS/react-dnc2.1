import React from 'react';
import {connect} from 'react-redux';
import axios from '~/commons/axios';



import ThreadsContainer from './containers/Threads';

class Threads extends React.Component {


    render(){
        //let {threads} = this.state

        return(
            <div>
              
                    <ThreadsContainer/>
         

            </div>
        );
    }
}

/*
                {threadData.length > 0 && threadData.map(t => 
                    <Threads key = {t.id} {...t}/>
                )}
*/

export default Threads;