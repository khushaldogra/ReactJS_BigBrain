import React from 'react';
import './App.css';
import { Button } from 'semantic-ui-react';
import {BrowserRouter as Router, Switch, Route, useHistory, Redirect} from 'react-router-dom';
import Landing from './components/Landing';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  const history = useHistory()
  return (
      <Router>
        <Switch>
          <Redirect exact from='/' to='/landing'/>
          <Route path='/landing' component={Landing}/>
          <Route path='/login' component={Login}/>
          <Route path='/home' component={Home}/>
        </Switch>
      </Router>
  );
}

export default App;
