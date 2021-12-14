import React, { useEffect, useState } from 'react';
import { getDatabase, ref, set as firebaseSet, onValue } from 'firebase/database';

import { LeagueStatsTable, ThisWeekResultTable } from './ThisWeekTables';
// const gameData = require('../data/gameData.json');


export function WeekResultsMain(props) {
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
            // console.log("This week user predictions: ", allUserPicks);
            const userResults = [];
            for (const userKey of Object.keys(allUserPicks)) {
              userResults.push(allUserPicks[userKey]);
            }
            setUserWeeklyResults(userResults);
        }
    });

    const resultPath = "results/" + weekNumber;
    const resultRef = ref(db, resultPath);

    //const updateData = "gameData";
    // const updateDataRef = ref(db, updateData)
    // firebaseSet(updateDataRef, gameData)

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
        // console.log("This week results: ", weeklyResults);
        setThisWeekResults(weeklyResults);
    });

    return () => {
      offFunctionForPredictions();
      offFunctionForResults();
    }
  }, [weekNumber]);

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
      gameTime: game.Date,
      awayTeam: game.AwayTeam, 
      homeTeam: game.HomeTeam, 
      HasStarted: game.HasStarted,
      IsOver: game.IsOver,
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
    const lossCounts = thisWeekResults.reduce((count, singleResult, index) => {
      const loss = singleResult === resultArray[index] ? 0 : 1;
      return count + loss;
    }, 0)
    // const lossCounts = totalCounts - winCounts;

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

      // console.log(singleUserStats);
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



function MergeResults(thisWeekResults, userPicks) {
  const mergedResults = thisWeekResults.map((result, index) => {
    const {gameTime, IsOver, awayTeam, homeTeam, homeWin} = result;
    const userPick = userPicks[index];
    const userPickCorrect = userPicks ? ((homeWin) ? userPick === homeTeam : userPick === awayTeam) : false;
    return {gameTime, IsOver, awayTeam, homeTeam, homeWin, userPick, userPickCorrect};
  });
  return mergedResults;
}

