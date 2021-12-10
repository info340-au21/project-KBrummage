import React from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { getAuth, EmailAuthProvider, GoogleAuthProvider, signOut } from 'firebase/auth';
import { getDatabase, ref, set as firebaseSet, push as firebasePush, onValue } from 'firebase/database';

const firebaseUIConfig = {
  signInOptions: [
    {provider: EmailAuthProvider.PROVIDER_ID, requiredDisplayName: true},
    GoogleAuthProvider.PROVIDER_ID
  ],
  signInFlow: 'popup',
  credentialHelper: 'none',
  callbacks: {
    signInSuccessWithAuthResult: () => {
      return false;
    }
  },
};

export default function Account(prop) {
  const userProfile = prop.userProfile;
  const db = getDatabase();

  const handleSignOut = () => {
    signOut(getAuth());
  }

  if (userProfile) {
    return (
      <div id="sign-in-option" className="sign-in-popup">
        <ul>
          <li className="account-list">
            <button className="account-button">Join League</button>
          </li>
          <li className="account-list">
            <button className="account-button" onClick={handleSignOut}>Sign Out</button>
          </li>
        </ul>
      </div>
    );
  } else {
    const signInAuth = getAuth();
    return (
      <div id="sign-in-option" className="sign-in-popup">
        <StyledFirebaseAuth uiConfig={firebaseUIConfig} firebaseAuth={signInAuth} />
      </div>
    );
  }
}