import React from 'react';

import {Footer, Header, ThisWeekMain, NavigationBar} from './Section'

export default function App() {
  // Opponents will be replaced with real data fetched by API calls later.
  const opponents = [["NY Jets", "Indianapolis"]];

  return (
    <div>
      <NavigationBar username="MudDauber"/>
      <Header weekNumber={8}/>

      <ThisWeekMain correct={8} wrong={6} rank={9} opponents={opponents}/>

      <Footer />
    </div>
  );
}
