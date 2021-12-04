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
  const marker = userPickCorrect ? <span className="correct">&#10003;</span> : <span className="wrong">&#10008;</span>;
  
  return (
    <tr>
      <td className={awayClasses + " cell-format"}>{awayTeam}</td>
      <td className={homeClasses + " cell-format"}>
        {marker}
        {homeTeam}
      </td>
    </tr>
  );
}

export function LeagueStatsTable() {
  return (
    <table className="table table-hover">
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
