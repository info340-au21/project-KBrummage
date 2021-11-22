import React from 'react';

export default function NavigationBar(prop) {
  const username = prop.username;
  return (
    <nav>
      <ul>
        <li className="d-inline d-sm-none"><a href="#"><span className="material-icons" aria-label="home">list</span></a></li>
        <li className="nav-section"><a href="#"><span className="material-icons" aria-label="home">sports_football</span></a></li>
        <li className="nav-section"><a>This Week</a></li>
        <li className="nav-section"><a href="nextweek.html">Next Week</a></li>
        <li className="nav-section"><a href="league.html">League Standings</a></li>
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