import React from 'react';

export function MatchTable(prop) {
  const opponentsArray = prop.opponents;
  const matchRows = opponentsArray.map((opponents, index) => <MatchRow key={index} away={opponents[0]} home={opponents[1]}/>);

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
  const awayTeam = prop.away;
  const homeTeam = prop.home;

  return (
    <tr>
      <td className="unpicked incorrect left">{awayTeam}</td>
      <td className="ind">
        <span className="right">&#10003;</span>
        {homeTeam}
      </td>
    </tr>
  );

}

export function LeagueStatsTable() {

}

export function LeagueStatsRow() {

}