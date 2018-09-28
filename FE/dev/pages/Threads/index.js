import React from 'react';
import {connect} from 'react-redux';
import axios from '~/commons/axios';



import ThreadsContainer from './containers/Threads';

class Threads extends React.Component {
    constructor(){
        super();
        this.state = {
            threads:[]
        }
    }
    componentDidMount(){


        axios.get('/api/threads/getThreads')
        .then( response => {
          console.log(response.data);
 
            this.setState({
                threads: response.data
            });

        })
        .catch( err => {
          console.log(err);
        });
      

    }

    render(){
        //let {threads} = this.state


        //temp
        const threads = [
            {id:1, title:'test1', username:'uname'},
            {id:2, title:'test2', username:'uname2'},
            {id:2, title:'test2', username:'uname2'},
            {id:2, title:'test2', username:'uname2'},
            {id:1, title:'test1', username:'uname'},
            {id:2, title:'test2', username:'uname2'},
            {id:2, title:'test2', username:'uname2'},
            {id:2, title:'test2', username:'uname2'},
            {id:2, title:'test2', username:'uname2'},
            {id:2, title:'test2', username:'uname3'},
            {id:2, title:'test2', username:'uname2'},
            {id:2, title:'test2', username:'uname3'},
        ]

        return(
            <div>
              
                    <ThreadsContainer threads = {threads}/>
         

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