import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import NavigationBar from './NavigationBar';
import Header from './Header';
import Footer from './Footer';
import { ThisWeekMain } from './MainSection';
import { NextWeekMain } from './NextWeek';
import Account from './Account';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set as firebaseSet, push as firebasePush, onValue } from 'firebase/database';

const teamData = require('../data/teamData.json');
const gameData = require('../data/gameData.json')
console.log(teamData.ARI.mascot)

export default function App(props) {
  // Results will be replaced with real data fetched by API calls later
  const r1 = getWeekResult("NY Jets", "Indianapolis", true);
  const r2 = getWeekResult("Cleveland", "Cincinnati", true);
  const thisWeekResults = [r1, r2];
  const userPicks = ["Indianapolis", "Cincinnati"];

  // Store user data collected after logging in
  const [userProfile, setUserProfile] = useState(undefined);
  const accountName = userProfile ? userProfile.displayName : "Sign In";

  // Store league data that user belongs to
  const [userLeagueRecord, setUserLeagueRecord] = useState([]);

  const db = getDatabase();

  const gameDataRef = ref(db, "gameData")
  onValue(gameDataRef,(snap) =>{
    console.log(snap.val());
  } )
  // const inputGameData = (db, data) => {
  //   const dataRef = ref(db, 'gameData')
  //   console.log({dataRef})
  //   firebaseSet(dataRef, data);
  // }
  
  // inputGameData(db, gameData);

  console.log({userProfile})
  useEffect(() => {
    const signInAuth = getAuth();
    const unregisterAuthListener = onAuthStateChanged(signInAuth, (firebaseUser) => {
      if (firebaseUser) {   
        console.log("User logged in as: ", firebaseUser.displayName);
        console.log(firebaseUser);
        const userRef = ref(db, "users");
        let userData = null;
        
        const offFunctionForUser = onValue(userRef, (snapshot) => {
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
        });

        setUserProfile(userData);
      } else {
        console.log("User logged out.");
        setUserProfile(null);
      }
    });
    
    const leagueRef = ref(db, userProfile ? userProfile.league : "default");
    const offFunctionForLeague = onValue(leagueRef, (snapshot) => {
      const leagueRecords = snapshot.val();
      console.log("League records for current user: ", leagueRecords);
      
      setUserLeagueRecord(leagueRecords);
    })

    return () => {
      unregisterAuthListener();
      // offFunctionForUser();
      offFunctionForLeague();
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
          <Header title={"Week " + props.nextWeek[0].Week} subtitle="Make Your Picks!"/>
          <NextWeekMain data={props.nextWeek} />
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



function getWeekResult(awayTeam, homeTeam, homeWin) {
  return {
    awayTeam: awayTeam,
    homeTeam: homeTeam,
    homeWin: homeWin,
  }
}
