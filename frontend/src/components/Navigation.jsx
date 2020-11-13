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
import GameResults from './GameResults';

// change name to navigation

function Navigation() {
  return (
    // Routes to a component
    // Maybe generalize the join game
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
        <Game />
      </Route>
      <Route exact path='/game/:id/:sessionId/playgame/:playerId'>
        <PlayGame />
      </Route>
      <Route exact path='/results/:id'>
        <GameResults />
      </Route>
    </Switch>
  )
}

export default Navigation;