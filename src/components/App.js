import React from "react";
import {BrowserRouter as Router, Route, Switch,} from 'react-router-dom';
import '../css/app.scss';
import Home from './Home';
import Stores from './Stores';
import StoreDetails from './StoreDetails';

/**
 * Main component of the App
 */
export default () => (
    <Router>
        <h1>Tech Test</h1>
        <div data-testid='main-layout'>
            <Switch>
                <Route path="/shops/:uuid">
                    <StoreDetails/>
                </Route>
                <Route path="/shops">
                    <Stores/>
                </Route>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>

        </div>
    </Router>
);
