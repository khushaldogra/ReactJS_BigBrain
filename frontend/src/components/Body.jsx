import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './Landing';
import Login from './Login';
import Dashboard from './Dashboard';
import Register from './Register';
import Game from './Game'; // Maybe dont need this
import JoinGame from './JoinGame';
import EditGame from './EditGame';
import PlayGame from './PlayGame';
import EditQuestion from './EditQuestion';

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
                <EditGame />
            </Route>
            <Route exact path='/game/edit/:id/:questionID'>
                <EditQuestion />
            </Route>
            <Route exact path='/game/:id/:sessionId'>
                <Game/>
            </Route>
            <Route exact path='/game/:id/:sessionId/playgame'>
                <PlayGame/>
            </Route>
            {/* <Route exact path='/game/join'>
                <JoinGame/>
            </Route> */}
        </Switch>
    )
}

export default Body;