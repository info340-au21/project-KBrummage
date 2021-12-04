import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './Components/App';

import 'bootstrap/dist/css/bootstrap.css';
import 'material-icons/iconfont/material-icons.css';
import './CSS/index.css';
import './CSS/style.css';
import './CSS/nfl.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
