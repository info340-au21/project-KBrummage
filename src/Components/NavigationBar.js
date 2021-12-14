import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

export default function NavigationBar(prop) {
  const accountName = prop.accountName;

  return (
    <div>
      <nav>
        <ul>
          <li className="d-inline d-sm-none">
            <div>
            <Dropdown>
              <Dropdown.Toggle variant="secondary">
                Menu
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1"><Link to="/lastweek">Last Week</Link></Dropdown.Item>
                <Dropdown.Item href="#/action-2"><Link to="/">This Week</Link></Dropdown.Item>
                <Dropdown.Item href="#/action-3"><Link to="/nextweek">Next Week</Link></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            </div>
          </li>
          <li className="nav-section"><span className="material-icons" aria-label="home">sports_football</span></li>
          <li className="nav-section"><Link to="/lastweek">Last Week</Link></li>
          <li className="nav-section"><Link to="/">This Week</Link></li>
          <li className="nav-section"><Link to="/nextweek">Next Week</Link></li>
          <li className="sign-in d-inline">
            <Link className="sign-in-button" to="/account">
              <span className="material-icons sign-in-content" aria-label="home">account_circle</span>
              <div className="d-inline username sign-in-content">{accountName}</div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}