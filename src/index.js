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

// Calculate week data
const week1 = new Date(2021, 8, 9, 17, 20, 0);
console.log(week1);
const thisWeek = Math.round((new Date - week1) / (7 * 24 * 60 * 60 * 1000)); // This makes it this week.
console.log(thisWeek);
const lastWeek = thisWeek - 1;
const nextWeek = thisWeek + 1;

const lastWeekKey = "week" + lastWeek;
const thisWeekKey = "week" + thisWeek;
const nextWeekKey = "week" + nextWeek;
console.log("Currently in: ", thisWeekKey);

ReactDOM.render(
  <BrowserRouter>
    <App lastWeek={data[lastWeekKey]} thisWeek={data[thisWeekKey]} nextWeek={data[nextWeekKey]} />
  </BrowserRouter>,
  document.getElementById('root')
);