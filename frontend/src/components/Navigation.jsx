import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './Landing';
import Login from './Login';
import Dashboard from './Dashboard';
import Register from './Register';
import Admin from './Admin';
import JoinGame from './JoinGame';
import EditGame from './EditGame';
import PlayGame from './PlayGame';
import EditQuestion from './EditQuestion';
import PlayerResults from './PlayerResults';
import GameResults from './GameResults';

function Navigation() {
  return (
    // Routes to a component
    <Switch>
      <Route exact path="/">
        <Landing />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <Route exact path="/game/join">
        <JoinGame />
      </Route>
      <Route exact path="/game/edit/:id">
        <EditGame />
      </Route>
      <Route exact path="/game/edit/:id/:questionId">
        <EditQuestion />
      </Route>
      <Route exact path="/game/:id/:sessionId">
        <Admin />
      </Route>
      <Route exact path="/game/:sessionId/playgame/:playerId">
        <PlayGame />
      </Route>
      <Route exact path="/results/player/:playerId">
        <PlayerResults />
      </Route>
      <Route exact path="/results/:id">
        <GameResults />
      </Route>
    </Switch>
  );
}

export default Navigation;
