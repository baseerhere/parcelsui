import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Kitchen from './Kitchen';
import Orders from './Orders';

export default function Content() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Orders />
                </Route>
                <Route path="/kitchen">
                    <Kitchen />
                </Route>
            </Switch>
        </Router>
    )
}
