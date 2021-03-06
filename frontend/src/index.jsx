import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
// Imports for css library
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
  // uncomment this later ***
  // <React.StrictMode>
  <Router>
    <App />
  </Router>,
  // </React.StrictMode>,
  document.getElementById('root'),
);
