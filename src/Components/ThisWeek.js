import React, { useEffect, useState } from 'react';
import { getDatabase, ref, push as firebasePush, onValue } from 'firebase/database';

import { LeagueStatsTable, ThisWeekResultTable } from './ThisWeekTables';


export function ThisWeekMain(props) {
  // Might delete later
  const thisWeekResults = props.thisWeekResults;
  const userPicks = props.userPicks;
  const mergedResults = MergeResults(thisWeekResults, userPicks);

  const [userWeeklyResults, setUserWeeklyResults] = useState([]);

  const weekNumber = props.weekNumber;
  const userProfile = props.userProfile;

  const totalPicks = 0;
  const correctCount = 0;
  const wrongCount = 0;
  const percentage = 0;
  const rank = 0;

  const db = getDatabase();

  useEffect(() => {
    const dbPath = "default/" + weekNumber;
    const pickRef = ref(db, dbPath);
    const offFunction = onValue(pickRef, (snapshot) => {
        const allUserPicks = snapshot.val();
        if (allUserPicks) {
            console.log("This week predictions: ", allUserPicks);
            const thisWeekResults = [];
            for (const userKey of Object.keys(allUserPicks)) {
              thisWeekResults.push(allUserPicks[userKey]);
            }
            setUserWeeklyResults(thisWeekResults);
        }
    });
    return () => offFunction;
  }, []);

  return (
    <main>
      <div className="results">
        <p>This week you got <span className="text-success"><strong>{correctCount}</strong> right</span> and <span className="text-danger"><strong>{wrongCount}</strong> wrong</span> with a pct. of {percentage}%.  This put you in {rank}th place for the week.</p>
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

