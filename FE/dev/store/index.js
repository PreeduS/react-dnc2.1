import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger'
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import loadInitialData from './loadInitialData'
import rootReducers from './rootReducers';

const store = createStore(
    combineReducers({
        ...rootReducers
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(logger,thunk,promise())

);

loadInitialData(store);

export default store;