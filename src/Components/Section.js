import React from 'react';
import MaterialIcon from 'material-icons-react';

import { MatchTable } from './Table';

import 'bootstrap/dist/css/bootstrap.css';
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
      <div className="index-container">
        <h1>This Week's Results</h1>
        <h2>Week {weekNumber}</h2>
      </div>
    </header>
  );
}

export function ThisWeekMain(prop) {
  const correctCount = prop.correct;
  const wrongCount = prop.wrong;
  const percentage = (correctCount / (correctCount+wrongCount)).toFixed(4) * 100;
  const rank = prop.rank;

  const opponents = prop.opponents;

  return (
    <main>
    <div className="results">
      <p>This week you got <span className="text-success"><strong>{correctCount}</strong> right</span> and <span className="text-danger"><strong>{wrongCount}</strong> wrong</span> with a pct. of {percentage}%.  This put you in {rank}th place for the week.  Your current standing is 5th overall, dropping 1 place in the ranking this week.</p>
    </div>

    <div className="column-container">
      <div className="column this-week">
        <MatchTable opponents={opponents}/>
      </div>
      
      <div className="column standings">
      
      </div>
    </div>
  </main>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="index-container">
        <p className="contact-info">Contact Information:</p>
        <p className="contact-info ml-3 ml-md-0"><a href="mailto:kbrumm@uw.edu"><span
              className="material-icons">email</span>kbrumm@uw.edu</a></p>
        <p className="contact-info ml-3 ml-md-0"><a href="mailto:erikca28@uw.edu"><span
              className="material-icons">email</span>erikca@uw.edu</a></p>
        <p className="contact-info ml-3 ml-md-0"><a href="mailto:sunx28@uw.edu"><span
              className="material-icons">email</span>sunx28@uw.edu</a></p>

        <p className="copyright mt-2 mt-md-1">&copy; University of Washington INFO 340, Fall 2021</p>
      </div>
    </footer>
  );
}

