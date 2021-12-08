import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import GoogleLogin from 'react-google-login';
import { getDatabase, ref } from 'firebase/database';


export default function NavigationBar(prop) {
  // Fetch user data when new user logs in
  const googleOauth = prop.googleOauth;
  const accountName = prop.accountName;
  const handleLogout = prop.logout;

  // User already logs in
  if (accountName) {

  }

  return (
    <nav>
      <ul>
        <li className="d-inline d-sm-none"><a href="#"><span className="material-icons" aria-label="home">list</span></a></li>
        <li className="nav-section"><a href="#"><span className="material-icons" aria-label="home">sports_football</span></a></li>
        <li className="nav-section"><Link to="/">This Week</Link></li>
        <li className="nav-section"><Link to="/nextweek">Next Week</Link></li>
        <li className="nav-section"><Link to="/league">League Standings</Link></li>
        <li className="nav-section sign-in d-inline">
          <div id="login">
            {googleOauth}
          </div>
        </li>
      </ul>
    </nav>
  );
}