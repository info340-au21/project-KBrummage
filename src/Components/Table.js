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
        <tr>
            <td >1</td>
            <td >Betty</td>
            <td >100</td>
            <td >0</td>
        </tr>
        <tr>
            <td >2</td>
            <td >Ken</td>
            <td >99</td>
            <td >1</td>
        </tr>
        <tr>
            <td >3</td>
            <td >Erik</td>
            <td >98</td>
            <td >2</td>
        </tr>
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
