import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import NavigationBar from './NavigationBar';
import Header from './Header';
import Footer from './Footer';
import { ThisWeekMain } from './MainSection';
import { NextWeekMain } from './NextWeek';
import Account from './Account';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, push as firebasePush, onValue } from 'firebase/database';

// const teamData = require('../data/teamData.json');

export default function App(props) {
  // Results will be replaced with real data fetched by API calls later
  const userPicks = ["Indianapolis", "Cincinnati"];

  // Store user data collected after logging in
  const [userProfile, setUserProfile] = useState(undefined);
  const accountName = userProfile ? userProfile.displayName : "Sign In";

  const db = getDatabase();

  useEffect(() => {
    const signInAuth = getAuth();
    const unregisterAuthListener = onAuthStateChanged(signInAuth, (firebaseUser) => {
      if (firebaseUser) {   
        console.log("User logged in as: ", firebaseUser.displayName);

        const userRef = ref(db, "users");
        let userData = null;
        
        onValue(userRef, (snapshot) => {
          const allUsers = snapshot.val();
          // Checking if user has a record in database. 
          // If not, user will be added to database and assigned to the default league.
          if (allUsers) {
            for (const key of Object.keys(allUsers)) {
              if (allUsers[key].email === firebaseUser.email) {
                userData = allUsers[key];
                break;
              }
            }
          } 
          if (!userData) {
            userData = {
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              league: "default",
              uid: firebaseUser.uid
            }
            firebasePush(userRef, userData);
          }
          setUserProfile(userData);
        });

      } else {
        console.log("User logged out.");
        setUserProfile(null);
      }
    });

    return () => {
      unregisterAuthListener();
    }
  }, []);
  
  return (
    <div>
      <NavigationBar accountName={accountName}/>

      <Switch>
        <Route exact path="/">
          <Header title="This Week's Results" subtitle="Week 8"/>
          {/* Hard coded user stats, will replace with user object later */}
          <ThisWeekMain correct={8} wrong={6} rank={9} thisWeekResults={props.lastWeek} userPicks={userPicks}/>
        </Route>
       
        <Route path="/nextweek">
          <Header title={"Next Week : Week " + props.nextWeek[0].Week} subtitle="Make Your Picks!" />
          <NextWeekMain data={props.nextWeek} userProfile={userProfile}/>
        </Route>

        <Route path="/league">
          <Header title="The League" subtitle="Through Week 8"/>
        </Route>

        <Route path="/account">
          <Account userProfile={userProfile}/>
        </Route>
      </Switch>
      
      <Footer />
    </div>
  );
}

