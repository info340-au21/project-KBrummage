import React from 'react';


export function ThisWeekResultTable(prop) {
  const results = prop.results;
  const thisWeekResultRows = results.map((result, index) => {
    let awayClasses, homeClasses = "unpicked";

    if (result.homeWin) {
      homeClasses = TeamColorSwitch(result.homeTeam);
      awayClasses = "unpicked incorrect"
    } else if (result.homeWin !== undefined) {
      homeClasses = "unpicked incorrect"
      awayClasses = TeamColorSwitch(result.awayTeam);
    }

    return <ThisWeekResultRow key={index} awayTeam={result.awayTeam} awayClasses={awayClasses} homeTeam={result.homeTeam} homeClasses={homeClasses} userPickCorrect={result.userPickCorrect}/>
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
  const {awayTeam, awayClasses, homeTeam, homeClasses, userPickCorrect} = prop;
  const marker = userPickCorrect ? <span className="correct ">&#10003;</span> : <span className="wrong">&#10008;</span>;
  
  return (
    <tr>
      <td className={awayClasses + " cell-format"}>{awayTeam}</td>
      <td className={homeClasses + " cell-format"}>
        {homeTeam}
      </td>
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
        <th scope="col">#</th>
        <th scope="col" className='none-when-small'>Team</th>
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
      <td className='cell-format user-table-bg none-when-small'>{team}</td>
      <td className='cell-format user-table-bg'>{wins}</td>
      <td className='cell-format user-table-bg'>{losses}</td>
    </tr>
  );
}

function TeamColorSwitch(team) {
  switch(team) {
    // case "Indianapolis":
    //   return "ind";
    // case "Cincinnati":
    //   return "cin";

    default:
      return "win-team";
  }
}
