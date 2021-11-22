import React from 'react';

import { LeagueStatsTable, MatchTable } from './Table';


export function NavigationBar(prop) {
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

  const thisWeekResults = prop.thisWeekResults;
  const userPicks = prop.userPicks;
  const mergedResults = MergeResults(thisWeekResults, userPicks);

  return (
    <main>
      <div className="results">
        <p>This week you got <span className="text-success"><strong>{correctCount}</strong> right</span> and <span className="text-danger"><strong>{wrongCount}</strong> wrong</span> with a pct. of {percentage}%.  This put you in {rank}th place for the week.  Your current standing is 5th overall, dropping 1 place in the ranking this week.</p>
      </div>

      <div className="column-container">
        <div className="column this-week">
          <MatchTable results={mergedResults} />
        </div>
        
        <div className="column standings">
          <LeagueStatsTable />
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

function GetMergedResult(awayTeam, homeTeam, homeWin, userPickCorrect) {
  return {
    awayTeam: awayTeam,
    homeTeam: homeTeam,
    homeWin: homeWin,
    userPickCorrect: userPickCorrect,
  }
}

function MergeResults(thisWeekResults, userPicks) {
  const mergedResults = thisWeekResults.map((result, index) => {
    const {awayTeam, homeTeam, homeWin} = result;
    const userPickCorrect = (homeWin) ? userPicks[index] === homeTeam : userPicks[index] === awayTeam;
    return GetMergedResult(awayTeam, homeTeam, homeWin, userPickCorrect);
  });

  return mergedResults;
}

