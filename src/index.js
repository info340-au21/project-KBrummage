import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { initializeApp } from "firebase/app";

import App from './Components/App';

import 'bootstrap/dist/css/bootstrap.css';
import 'material-icons/iconfont/material-icons.css';
import './CSS/index.css';
import './CSS/style.css';
import './CSS/nfl.css';

const data = require('./data/gameData.json');

const firebaseConfig = {
  apiKey: "AIzaSyBg2bN3AIZFbB_q1HNJwl-hY9Rplxcp9tg",
  authDomain: "weekly-nfl-picks-project.firebaseapp.com",
  projectId: "weekly-nfl-picks-project",
  storageBucket: "weekly-nfl-picks-project.appspot.com",
  messagingSenderId: "31559234035",
  appId: "1:31559234035:web:6fb2ff2b1562f6c320a286",
  measurementId: "${config.measurementId}",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <BrowserRouter>
 
    <App lastWeek={data.week14} nextWeek={data.week15} />
  </BrowserRouter>,
  document.getElementById('root')
);