import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './Landing';
import Login from './Login';
import Dashboard from './Dashboard';
import Register from './Register';
import Game from './Game';
import Edit from './Edit';

// change name to navigation

function Body() {
    return (
        // Routes to a component
        <Switch>
            <Route exact path='/'>
                <Landing />
            </Route>
            <Route path='/dashboard'>
                <Dashboard />
            </Route>
            <Route path='/login'>
                <Login />
            </Route>
            <Route path='/register'>
                <Register />
            </Route>
            <Route exact path='/game/edit/:id'>
                <Edit />
            </Route>
            <Route exact path='/game/:id'>
                <Game/>
            </Route>
        </Switch>
    )
}

export default Body;