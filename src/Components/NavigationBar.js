import React from 'react';
import { Link } from 'react-router-dom';

export default function NavigationBar(prop) {
  const username = prop.username;
  return (
    <nav>
      <ul>
        <li className="d-inline d-sm-none"><a href="#"><span className="material-icons" aria-label="home">list</span></a></li>
        <li className="nav-section"><a href="#"><span className="material-icons" aria-label="home">sports_football</span></a></li>
        <li className="nav-section"><Link to="/">This Week</Link></li>
        <li className="nav-section"><Link to="/nextweek">Next Week</Link></li>
        <li className="nav-section"><Link to="/league">League Standings</Link></li>
        <li className="nav-section sign-in d-inline">
          <a href="#">
            <span className="material-icons" aria-label="home">account_circle</span>
            <div className="d-inline username">{username}</div>
          </a>
        </li>
      </ul>
    </nav>
  );
}