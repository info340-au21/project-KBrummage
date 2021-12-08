import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import { getDatabase, ref, set as setDB } from 'firebase/database';


// import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const USERS = [null, "Ken", "Betty", "Erik"]

// const firebaseUiConfig = {
//   signInOptions: [
    
//     GoogleAuthProvider.PROVIDER_ID
//   ],
//   signInFlow: 'popup',  // don't redirect when signing in.
//   credentialHelper: 'none', // disable the account chooser
//   callbacks: {

//     signInSuccessWithAuthResult: () => {
//       return false; // don't redirect
//     }
//   }
// }

export const SignInPage = (props) => {
  const userName = props.user ? props.user.userName : null; //current userName
  // const auth = getAuth();

  const handleClick = (event) => {
    //do the login!

    const headers = {'Ocp-Apim-Subscription-Key': '4adaf8c309d94ec495083cd2f5b1a734'
  }
    
    const url = "https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/2021REG/14"
    fetch(url, {
      headers
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
    event.preventDefault();
    const db = getDatabase();
    const msgRef = ref(db, "post/message")
    console.log(msgRef);
    setDB(msgRef, "Wow.  This actually worked.")
    const userName = event.currentTarget.name;
    const userId = USERS.indexOf(userName)
    // props.loginFunction(userId, userName);
  }

  const userButtons = USERS.map((userName) => {
    return (
      <div>
        <button>Button</button>
      </div>
      // <Dropdown.Item name={userName} key={userName} onClick={handleClick}>
      //   <img src={'img/' + userName + '.png'} alt={userName + " avatar"} />&nbsp;{userName}
      // </Dropdown.Item>
    )
  })
  return (
      <div className='card bg-light'>
        <div className='container card-body'>
          <button className="btn btn-secondary" type="button" onClick={handleClick}>Button</button>
        {/* <StyledFirebaseAuth uiConfig={firebaseUiConfig} firebaseAuth={auth} /> */}
        </div>
      </div>
  )
}
