import React from 'react';
import AppRouter from '../router'
import store from '../store';
import {Provider} from 'react-redux';

import styles from './App.scss';

import {actionTypes} from '~/commons/actionTypes';
import {getUserData} from '~/commons/actions/getUserData';

import axios from 'axios';
//if dev
axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.withCredentials = true;              //cors

const App = ()=>(
    <div>
        <div className = {styles.app}>
            <Provider store = {store}>
                <AppRouter />
            </Provider>
        </div>

    </div>

);

//load initial data
//store.dispatch({type: actionTypes.getUserData})
getUserData(store.dispatch);

export default App;