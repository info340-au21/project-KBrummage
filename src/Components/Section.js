import React from 'react';
import MaterialIcon from 'material-icons-react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/style.css';
import '../CSS/nfl.css';

export function NavigationBar(prop) {
  const username = prop.username;
  return (
    <nav>
      <ul>
        <li className="d-inline d-sm-none"><a href="#"><MaterialIcon icon="list"/></a></li>
        <li className="nav-section"><a href="#"><MaterialIcon icon="sports_football"/></a></li>
        <li className="nav-section"><a>This Week</a></li>
        <li className="nav-section"><a href="nextweek.html">Next Week</a></li>
        <li className="nav-section"><a href="league.html">League Standings</a></li>
        <li className="nav-section sign-in d-inline">
          <a href="#">
            <MaterialIcon icon="account_circle"/>
            <div className="d-inline username">{username}</div>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export function Header(prop) {
  const weekNumber = prop.weekNumber;

  return (
    <header>
      <div class="index-container">
        <h1>This Week's Results</h1>
        <h2>Week {weekNumber}</h2>
      </div>
    </header>
  );
}

export function MainBody() {

}

export function Footer() {
  return (
    <div class="index-container">
      <p class="contact-info">Contant Information:</p>
      <p class="contact-info ml-3 ml-md-0"><a href="mailto:kbrumm@uw.edu"><span
            class="material-icons">email</span>kbrumm@uw.edu</a></p>
      <p class="contact-info ml-3 ml-md-0"><a href="mailto:erikca28@uw.edu"><span
            class="material-icons">email</span>erikca@uw.edu</a></p>
      <p class="contact-info ml-3 ml-md-0"><a href="mailto:sunx28@uw.edu"><span
            class="material-icons">email</span>sunx28@uw.edu</a></p>

      <p class="copyright mt-2 mt-md-1">&copy; University of Washington INFO 340, Fall 2021</p>
    </div>
  );
}

