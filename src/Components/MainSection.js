import React from 'react';

import { LeagueStatsTable, ThisWeekResultTable } from './Table';


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
          <ThisWeekResultTable results={mergedResults} />
        </div>
        
        <div className="column standings">
          <LeagueStatsTable />
        </div>
      </div>
    </main>
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

