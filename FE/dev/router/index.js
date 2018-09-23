import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import routes from './routes';
import * as styles from './routerStyles';

// / <NavLink exact activeClassName = {styles.routeActive} to="/Thread" >ThreadComponent</NavLink>

import AppTopMenu from '../others/components/AppTopMenu';


const AppRouter = () =>(
    <Router>
        <styles.AppBody>

            <styles.AppWrapper>
                <styles.AppMainContainer>
                    <Switch >
                        {routes.map( (route, index) => 
                            <Route key= {index} path={route.path} component = {route.component} />
                        )}                        
                        <Route path="/" render = {()=> <div>Null /</div>} />
                    </Switch> 
                </styles.AppMainContainer>
                <styles.AppSideMenu>
                    <Route path="/" render = {()=>
                            <div>Common </div>
                        }
                    />
                </styles.AppSideMenu>
            </styles.AppWrapper>

            <AppTopMenu>
                {routes.map( (route, index) => 
                    <NavLink key= {index} exact to={route.path}>{route.label}</NavLink>
                )}
                <NavLink exact  to="/" >null</NavLink>
            </AppTopMenu>

        </styles.AppBody>
    </Router>
)

export default AppRouter;