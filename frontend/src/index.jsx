import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// Imports for css library
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  // uncomment this later ***
  // <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById('root'),
);
