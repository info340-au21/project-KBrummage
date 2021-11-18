import React from 'react';

import {Footer, Header, NavigationBar} from './Section'


import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/style.css';
import '../CSS/nfl.css';

export default function App() {
  return (
    <div>
      <NavigationBar username="MudDauber"/>
      <Header weekNumber="8"/>
      
      <Footer />
    </div>
  );
}
