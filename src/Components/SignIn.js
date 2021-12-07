import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

// import firebase from 'firebase';
// import firebase from "firebase/app"
// import "firebase/auth"
// // import {auth} from '../firebase';
// // import { Button } from '@material-ui/core';

// import firebase from 'firebase/app';
// import 'firebase/auth';

import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const USERS = [null, "Ken", "Betty", "Erik"]

const firebaseUiConfig = {
  signInOptions: [
    
    GoogleAuthProvider.PROVIDER_ID
  ],
  signInFlow: 'popup',  // don't redirect when signing in.
  credentialHelper: 'none', // disable the account chooser
  callbacks: {

    signInSuccessWithAuthResult: () => {
      return false; // don't redirect
    }
  }
}

export const SignInPage = (props) => {
  const userName = props.user ? props.user.userName : null; //current userName
  const auth = getAuth();

  const handleClick = (event) => {
    //do the login!
    const userName = event.currentTarget.name;
    const userId = USERS.indexOf(userName)
    props.loginFunction(userId, userName);
  }

  const userButtons = USERS.map((userName) => {
    return (
      <Dropdown.Item name={userName} key={userName} onClick={handleClick}>
        <img src={'img/' + userName + '.png'} alt={userName + " avatar"} />&nbsp;{userName}
      </Dropdown.Item>
    )
  })
  return (
      <div className='card bg-light'>
        <div className='container card-body'>
        <StyledFirebaseAuth uiConfig={firebaseUiConfig} firebaseAuth={auth} />
        </div>
      </div>
  )
}
