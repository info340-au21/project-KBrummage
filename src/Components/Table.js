import React from 'react';

export function MatchTable(prop) {
  const results = prop.results;
  const matchRows = results.map((result, index) => {
    let awayClasses, homeClasses = "unpicked";

    if (result.homeWin) {
      homeClasses = TeamColorSwitch(result.homeTeam);
      awayClasses = "unpicked incorrect"
    } else if (result.homeWin !== undefined) {
      homeClasses = "unpicked incorrect"
      awayClasses = TeamColorSwitch(result.awayTeam);
    }

    return <MatchRow key={index} awayTeam={result.awayTeam} awayClasses={awayClasses} homeTeam={result.homeTeam} homeClasses={homeClasses} userPickCorrect={result.userPickCorrect}/>
  });

  return(
    <table className="table table-hover">
      <MatchHeader />
      <tbody>
        {matchRows}
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

export function MatchRow(prop) {
  const {awayTeam, awayClasses, homeTeam, homeClasses, userPickCorrect} = prop;
  const marker = userPickCorrect ? <span class="correct">&#10003;</span> : <span class="wrong">&#10008;</span>;
  
  return (
    <tr>
      <td className={awayClasses}>{awayTeam}</td>
      <td className={homeClasses}>
        {marker}
        {homeTeam}
      </td>
    </tr>
  );
}

export function LeagueStatsTable() {
  return (
    <table class="table table-hover">
      <LeagueStatsHeader />
      <tbody>
        
      </tbody>
    </table>
  );
}

export function LeagueStatsHeader() {
  return (
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Team</th>
        <th scope="col">Wins</th>
        <th scope="col">Losses</th>
      </tr>
    </thead>
  );
}

export function LeagueStatsRow() {

}

function TeamColorSwitch(team) {
  switch(team) {
    case "Indianapolis":
      return "ind";
    case "Cincinnati":
      return "cin";

    default:
      return "unpicked";
  }
}
