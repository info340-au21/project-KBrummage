import React from 'react';

import {Footer, Header, ThisWeekMain, NavigationBar} from './Section'

import 'bootstrap/dist/css/bootstrap.css';
import '../CSS/style.css';
import '../CSS/nfl.css';

export default function App() {
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
