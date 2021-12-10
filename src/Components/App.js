import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import NavigationBar from './NavigationBar';
import Header from './Header';
import Footer from './Footer';
import { ThisWeekMain } from './MainSection';

import GoogleLogin from 'react-google-login';
import { getDatabase, ref, set as firebaseSet, push as firebasePush, onValue } from 'firebase/database';


export default function App() {
  // Results will be replaced with real data fetched by API calls later
  const r1 = getWeekResult("NY Jets", "Indianapolis", true);
  const r2 = getWeekResult("Cleveland", "Cincinnati", true);
  const thisWeekResults = [r1, r2];
  const userPicks = ["Indianapolis", "Cincinnati"];

  // Store user data collected after logging in
  const [userProfile, setUserProfile] = useState(undefined)
  // Store league data that user belongs to
  const [userLeagueStats, setUserLeagueStats] = useState([]);

  const userDB = getDatabase();
  const accountName = userProfile 
    ? (userProfile.givenName ? userProfile.givenName : userProfile.email.replace("@uw.edu", "")) 
    : "Log In";

  // Create log in/out workflow
  const googleOauth = setUpGoogleOauth(userProfile, setUserProfile, accountName);
  const logout = handleLogout();

  // Update new user data in DB
  useEffect(() => {
    console.log("Current user: ", userProfile);

    if (userProfile) {
      const userRef = ref(userDB, userProfile.googleId)
      const offFunction = onValue(userRef, (snapshot) => {
        if (!snapshot.exists()) {
          console.log("New user logged in.");
          const userData = {
            googleId: userProfile.googleId,
            email: userProfile.email,
            name: userProfile.name,
            firstName: userProfile.givenName,
            lastName: userProfile.familyName,
            league: "default"
          }
          firebaseSet(userRef, userData);
        } else {
          console.log("Existing user logged in.");
        }
        
        // Fetch and store league data that the user belongs to
        const league = userProfile.league;
        const leagueStats = [];


        setUserLeagueStats(leagueStats);
      });

      function cleanUp() {
        offFunction();  // Turn the listener off
      }
      return cleanUp;
    }
  }, [userProfile]);
  
  return (
    <div>
      <NavigationBar googleOauth={googleOauth} accountName={accountName} logout={logout}/>
      
      <Switch>
        <Route exact path="/">
          <Header title="This Week's Results" subtitle="Week 8"/>
          {/* Hard coded user stats, will replace with user object later */}
          <ThisWeekMain correct={8} wrong={6} rank={9} thisWeekResults={thisWeekResults} userPicks={userPicks}/>
        </Route>

        <Route path="/nextweek">
          <Header title="Week 9" subtitle="Make Your Picks!"/>
        </Route>

        <Route path="/league">
          <Header title="The League" subtitle="Through Week 8"/>
        </Route>
      </Switch>
      
      <Footer />
    </div>
  );
}

function setUpGoogleOauth(userProfile, setUserProfile, accountName) {
  const responseGoogleSuccess = (response) => {
    const logedInUser = response.profileObj;
    if (!userProfile || userProfile.googleId !== logedInUser.googleId) {
      setUserProfile(logedInUser)
    }   
  };
  const responseGoogleFailure = (error) => {
    console.log(error);
  };

  const googleOauth = (
    <GoogleLogin
      clientId="836308764225-9i7vltdnhrr4p48resrma403335mge47.apps.googleusercontent.com"
      render={renderProps => (
        <div className="d-inline sign-in-holder">
          <button className="sign-in-content" onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <span className="material-icons sign-in-content" aria-label="home">account_circle</span>
            <span> {accountName} </span>
          </button>
        </div>  
      )}
      buttonText="Log in"
      onSuccess={responseGoogleSuccess}
      onFailure={responseGoogleFailure}
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
    />
  );

  return googleOauth;
}

function handleLogout() {

}

function getWeekResult(awayTeam, homeTeam, homeWin) {
  return {
    awayTeam: awayTeam,
    homeTeam: homeTeam,
    homeWin: homeWin,
  }
}
