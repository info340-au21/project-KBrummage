import React from 'react';


export function ThisWeekResultTable(prop) {
  // console.log(prop);
  const results = prop.results;
  console.log(results);
  const thisWeekResultRows = results.map((result, index) => {
    let awayClasses = "";
    let homeClasses = "";
    // console.log(awayClasses);
    if(result.IsOver){
      // if hometeam won
      if (result.homeWin) {
        // if you correctly picked that the home team won...
        if(result.homeTeam === result.userPick){
          homeClasses = "picked win-team";
          awayClasses = "unpicked loss-team";
        } else {
          homeClasses = "unpicked win-team";
          awayClasses = "picked loss-team";
        }
        //if the away team won
      } else {
        if(result.awayTeam === result.userPick) {
          homeClasses = "unpicked loss-team";
          awayClasses = "picked win-team"
        } else {
          homeClasses = "picked loss-team";
          awayClasses = "unpicked win-team"
        }
      }

      // if the game is not over
      } else {
       if(result.homeTeam === result.userPick){
        homeClasses = "picked";
        awayClasses = "unpicked";
       } else {
        homeClasses = "unpicked";
        awayClasses = "picked";
       }
      }
     console.log(result.gameTime);
    // console.log(awayClasses);
    return <ThisWeekResultRow key={index} gameTime={result.gameTime} IsOver={result.IsOver} awayTeam={result.awayTeam} awayClasses={awayClasses} homeTeam={result.homeTeam} homeClasses={homeClasses} userPickCorrect={result.userPickCorrect}/>
  });

  return(
    <table className="table-hover">
      <MatchHeader />
      <tbody>
        {thisWeekResultRows}
      </tbody>
    </table>
  );
}

export function MatchHeader() {
  return (
    <thead>
      <tr>
        <th scope="col" className='left'>Away</th>
        <th scope="col">Home</th>
      </tr>
    </thead>
  );
}

export function ThisWeekResultRow(prop) {

  const {gameTime, IsOver, awayTeam, awayClasses, homeTeam, homeClasses, userPickCorrect} = prop;
    // console.log(gameTime);
    const gameDate = gameTime.split("T")[0]
  const marker = IsOver ? (userPickCorrect ? <span className="correct ">&#10003;</span> : <span className="wrong">&#10008;</span>) :  <span className="" >{gameDate}</span> ;
    
    return (
      <tr>
        <td className={awayClasses + " cell-format"}>{awayTeam}</td>
        <td className={homeClasses + " cell-format"}>{homeTeam}</td>
        <td className="marker-pos">{marker}</td>
      </tr>
    );
}

export function LeagueStatsTable(prop) {
  const userStats = prop.userStats;

  const userTableRows = userStats.map((singleStats, index) => {
    // const resultArray = JSON.parse(userResult.results);
    // const winCounts = thisWeekResults.reduce((count, singleResult, index) => {
    //   const win = singleResult === resultArray[index] ? 1 : 0;
    //   return count + win;
    // }, 0);
    // const lossCounts = totalCounts - winCounts;
    
    // const userStats = {
    //   name: userResult.name,
    //   team: "default",
    //   wins: winCounts,
    //   losses: lossCounts,
    // };
    return <LeagueStatsRow key={index} userStats={singleStats} />
  });

  return (
    <table className="table-hover">
      <LeagueStatsHeader />
      <tbody className='user-table-bg'>
        {userTableRows}
      </tbody>
    </table>
  );
}

export function LeagueStatsHeader() {
  return (
    <thead>
      <tr>
        <th scope="col" >Team</th>
        <th scope="col">Wins</th>
        <th scope="col">Losses</th>
      </tr>
    </thead>
  );
}

export function LeagueStatsRow(prop) {
  const {name, team, wins, losses} = prop.userStats;

  return (
    <tr key={name}>
      <td className='cell-format user-table-bg'>{name}</td>
      <td className='cell-format user-table-bg'>{wins}</td>
      <td className='cell-format user-table-bg'>{losses}</td>
    </tr>
  );
}

function TeamColorSwitch(team) {
 
    // case "Indianapolis":
    //   return "ind";
    // case "Cincinnati":
    //   return "cin";

  
      return "picked win-team";
  
}
