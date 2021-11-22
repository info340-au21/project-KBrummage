import React from 'react';

import NavigationBar from './NavigationBar';
import Header from './Header';
import Footer from './Footer';
import {ThisWeekMain} from './MainSection';


export default function App() {
  // Results will be replaced with real data fetched by API calls later
  const r1 = getWeekResult("NY Jets", "Indianapolis", true);
  const r2 = getWeekResult("Cleveland", "Cincinnati", true);
  const thisWeekResults = [r1, r2];

  const userPicks = ["Indianapolis", "Cincinnati"];

  return (
    <div>
      <NavigationBar username="MudDauber"/>
      <Header subtitle="Week 8"/>
      
      {/* Hard coded user stats, will replace with user object later */}
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
