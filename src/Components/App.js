import React from 'react';

import {Footer, Header, NavigationBar} from './Section'


import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/style.css';
import '../CSS/nfl.css';

export default function App() {
  return (
    <div>
      <nav>
        <NavigationBar username="MudDauber"/>
      </nav>
      <header>
        <Header weekNumber="8"/>
      </header>


      <footer>
        <Footer />
      </footer>

    </div>
  );
}
