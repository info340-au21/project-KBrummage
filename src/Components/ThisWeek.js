import React, { useEffect, useState } from 'react';
import { getDatabase, ref, set as firebaseSet, onValue } from 'firebase/database';

import { LeagueStatsTable, ThisWeekResultTable } from './ThisWeekTables';


export function ThisWeekMain(props) {
  const gameData = props.gameData;
  const weekNumber = props.weekNumber;
  const userProfile = props.userProfile;

  const [userWeeklyResults, setUserWeeklyResults] = useState([]);
  const [thisWeekResults, setThisWeekResults] = useState([]);

  const db = getDatabase();

  useEffect(() => {
    const pickPath = "default/" + weekNumber;
    const pickRef = ref(db, pickPath);
    const offFunctionForPredictions = onValue(pickRef, (snapshot) => {
        const allUserPicks = snapshot.val();
        if (allUserPicks) {
            console.log("This week user predictions: ", allUserPicks);
            const userResults = [];
            for (const userKey of Object.keys(allUserPicks)) {
              userResults.push(allUserPicks[userKey]);
            }
            setUserWeeklyResults(userResults);
        }
    });

    const resultPath = "results/" + weekNumber;
    const resultRef = ref(db, resultPath);
    const offFunctionForResults = onValue(resultRef, (snapshot) => {
        let weeklyResults = snapshot.val();
        if (!weeklyResults) {
          weeklyResults = gameData.map((game) => {
            const randomInt = GetRandomInt(2);
            if (randomInt === 0) {
              return game.AwayTeam;
            } else {
              return game.HomeTeam;
            }
          });
          firebaseSet(resultRef, JSON.stringify(weeklyResults));
        } else {
          weeklyResults = JSON.parse(weeklyResults);
        }
        console.log("This week results: ", weeklyResults);
        setThisWeekResults(weeklyResults);
    });

    return () => {
      offFunctionForPredictions();
      offFunctionForResults();
    }
  }, []);

  const getCurrentUserPick = () => {
    if (!userProfile || !userWeeklyResults) {
      return [];
    }
    for (const userPick of userWeeklyResults) {
      if (userPick.name === userProfile.displayName) {
        return JSON.parse(userPick.results);
      }
    }
    return [];
  }
  const currentUserPick = getCurrentUserPick();

  const weeklyGameInfo = gameData.map((game, index) => {
    return {
      awayTeam: game.AwayTeam, 
      homeTeam: game.HomeTeam, 
      homeWin: game.HomeTeam === thisWeekResults[index],
    }
  });
  const mergedResults = MergeResults(weeklyGameInfo, currentUserPick);

  // Calculate user stats within the league
  const totalCounts = thisWeekResults.length;
  const userStats = userWeeklyResults.map((userResult) => {
    const resultArray = JSON.parse(userResult.results);
    const winCounts = thisWeekResults.reduce((count, singleResult, index) => {
      const win = singleResult === resultArray[index] ? 1 : 0;
      return count + win;
    }, 0);
    const lossCounts = totalCounts - winCounts;

    return {
      name: userResult.name,
      team: "default",
      wins: winCounts,
      losses: lossCounts,
    };
  });

  let currentUserStats = {wins: "NaN", losses: "NaN"};
  let percentage = "NaN";
  if (userProfile) {
    for (const singleUserStats of userStats) {
      if (singleUserStats.name === userProfile.displayName) {
        currentUserStats = singleUserStats;
        break;
      }
    }
    percentage = (currentUserStats.wins / totalCounts * 100).toFixed(2);
  }

  return (
    <main>
      <div className="results">
        <p>This week you got <span className="text-success"><strong>{currentUserStats.wins}</strong> right</span> and <span className="text-danger"><strong>{currentUserStats.losses}</strong> wrong</span> with a pct. of {percentage}%. </p>
      </div>

      <div className="column-container">
        <div className="column this-week">
          <ThisWeekResultTable results={mergedResults} />
        </div>
        
        <div className="column standings">
          <LeagueStatsTable userStats={userStats} />
        </div>
      </div>
    </main>
  );
}

function GetRandomInt(upperBound) {
  return Math.floor(Math.random() * upperBound);
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
    const userPickCorrect = userPicks ? ((homeWin) ? userPicks[index] === homeTeam : userPicks[index] === awayTeam) : false;
    return GetMergedResult(awayTeam, homeTeam, homeWin, userPickCorrect);
  });
  return mergedResults;
}

