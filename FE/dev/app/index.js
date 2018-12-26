import React from 'react';
import AppRouter from '../router'
import store from '../store';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components';
import theme from './theme';
import * as styles from './appStyles';

//import injectGlobal from './injectGlobal'

const App = () => (
    <styles.App>
        <ThemeProvider theme = {theme}>
            <Provider store = {store}>
                <AppRouter />
            </Provider>
        </ThemeProvider>
    </styles.App>

);



export default App;