import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './Components/App';

import 'bootstrap/dist/css/bootstrap.css';
import 'material-icons/iconfont/material-icons.css';
import './CSS/index.css';
import './CSS/style.css';
import './CSS/nfl.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFJKOvoWwamMm54hTWx8_VWjVyjhA18fg",
  authDomain: "weeklypicks-e2844.firebaseapp.com",
  projectId: "weeklypicks-e2844",
  storageBucket: "weeklypicks-e2844.appspot.com",
  messagingSenderId: "58974952267",
  appId: "1:58974952267:web:5a6ec2cc7830008c08e6ce"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const headers = {'Ocp-Apim-Subscription-Key': '4adaf8c309d94ec495083cd2f5b1a734'
}
  
  const url = "https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/2021REG/14"
  fetch(url, {
    headers: headers
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err))

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
