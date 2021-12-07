import React from 'react';
import { Link, NavLink } from 'react-router-dom';


export default function NavigationBar(props) {
  const userName = props.user ? props.user.userName : null;

  const handleSignOut = (event) => {
    //sign out here
  }
  
  return (
    <header className="container-fluid text-light bg-primary px-1 d-flex justify-content-between">
       <h1>{"NFL Weekly Pick'ems"}</h1>
      <ul className='nav nav-pills'> 
        <li className="nav-item">
          <NavLink exact to="/" className="nav-link">Home</NavLink>
          {/* <a href="#"><span className="material-icons" aria-label="home">list</span></a> */}
          </li>
        <li className="nav-item">
          {/* <a href="#"><span className="material-icons" aria-label="home">sports_football</span></a> */}
        </li>
        <li className="nav-item">
          <NavLink to="/">This Week</NavLink>
        </li>
        <li className="nav-item">
          <Link to="/nextweek">Next Week</Link>
        </li>
        <li className="nav-item">
          <NavLink to="/league">League Standings</NavLink>
        </li>
        {!props.user &&
        <li className="nav-item">
          <NavLink to="/signin" className="nav-link">Sign In</NavLink>
        </li>
        }
        {props.user && <>
        {/* <li className="nav-item">
          <NavLink to="/profile" className="nav-link">Profile</NavLink>
        </li> */}
        <li className="nav-item">
          <button className="btn btn-secondary ms-2" onClick={handleSignOut}>Sign Out</button>
        </li>
        </>}
        {/* <li className="nav-section sign-in d-inline">
          <a href="#">
            <span className="material-icons" aria-label="home">account_circle</span>
            <div className="d-inline username">{userName}</div>
          </a>
        </li> */}
      </ul>
    </header>
  );
}