import React from 'react';

import {Footer, Header, ThisWeekMain, NavigationBar} from './Section'


export default function App() {
  // Results will be replaced with real data fetched by API calls later, and so does value of userPicks.
  const r1 = getWeekResult("NY Jets", "Indianapolis", true);
  const r2 = getWeekResult("Cleveland", "Cincinnati", true);
  const thisWeekResults = [r1, r2];

  const userPicks = ["Indianapolis", "Cincinnati"];

  return (
    <div>
      <NavigationBar username="MudDauber"/>
      <Header weekNumber={8}/>

      <ThisWeekMain correct={8} wrong={6} rank={9} thisWeekResults={thisWeekResults} userPicks={userPicks}/>

      <Footer />
    </div>
  );
}

function getWeekResult(awayTeam, homeTeam, homeWin) {
  return {
    awayTeam: awayTeam,
    homeTeam: homeTeam,
    homeWin: homeWin,
  }
}
