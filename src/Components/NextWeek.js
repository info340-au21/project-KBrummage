import React, {Component, useEffect, useState} from 'react';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import { getDatabase, ref, set as firebaseSet, onValue } from 'firebase/database';


export function NextWeekMain(props) {
  const [alert, setAlert] = useState(false);


  return (
    <Container>
        <FormComponent week={props.data} setAlert={setAlert} userProfile={props.userProfile}/>
        <AlertModal alert={alert} setAlert={setAlert}/>
    </Container>
  );
}

const FormComponent = ( {week, setAlert, userProfile} ) => {
    const [winningPicks, setWinningPicks] = useState([]);
    const [submissionControl, setSubmissionControl] = useState({button: "Submit", formFieldDisabled: "disabled"});

    const db = getDatabase();
  
    useEffect(() => {
        if (userProfile) {
            const dbPath = "default/" + week[0].Week + "/" + userProfile.uid;
            const lastPickRef = ref(db, dbPath);
            const offFunction = onValue(lastPickRef, (snapshot) => {
                const userPicksObj = snapshot.val();
                if (userPicksObj) {
                    const picksArray = JSON.parse(userPicksObj.results);
                    console.log("Fetch previous winning picks: ", picksArray);
                    setWinningPicks(picksArray);
                }
            });
            return () => offFunction;
        }
    }, []);

    const handleClick = (e) => {
        setSubmissionControl({button: "Submit", formFieldDisabled: ""});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            console.log("Invalid form input.")
        }
        
        const radios = document.getElementsByTagName("input");
        const winningTeamRadios = [];
        for (let radio of radios) {
            if(radio.checked) {
                winningTeamRadios.push(radio.id);
            }
        }
        if( (radios.length)/2 !== winningTeamRadios.length) {
           setAlert(true);
           return;
        }

        if (userProfile) {
            const dbPath = "default/" + week[0].Week + "/" + userProfile.uid;
            const pickRef = ref(db, dbPath);
            const pickResults = JSON.stringify(winningTeamRadios);
            const userPickObj = {name: userProfile.displayName, results: pickResults};
            firebaseSet(pickRef, userPickObj);

            setSubmissionControl({button: "Saved!", formFieldDisabled: "disabled"});
        } else {
            setAlert(true)
        }
    }

    const GameComponents = week.map( (game, index) => {
        return (
            <div key={index}>
                <GameComponent gameData={game} winPick={winningPicks ? winningPicks[index] : ""} />
            </div>
        );
    });

    return (
        <div>
            <button type="submit" className="form-btn form-edit-btn" value="Edit" onClick={handleClick}>Edit</button>
            <p className='text-center'>If you want to change a previous pick, double click to update your answer.</p>
            <Form onSubmit={handleSubmit}>
                <fieldset disabled={submissionControl.formFieldDisabled}>
                    <div className='next-week-form'>
                        {GameComponents}
                    </div>
                </fieldset>
                <button type="submit" className="form-btn" value={submissionControl.button}>{submissionControl.button}</button>
            </Form>
        </div>
    );  
}

const GameComponent = ( { gameData, winPick } ) => {
    const awayTeamPicked = winPick === gameData.AwayTeam;
    const awayTeamRadio = generateTeamRadio("away", gameData.AwayTeam, gameData.GameKey, awayTeamPicked);

    const homeTeamPicked = winPick === gameData.HomeTeam;
    const homeTeamRadio = generateTeamRadio("home", gameData.HomeTeam, gameData.GameKey, homeTeamPicked);

    return (
        <div className='game-input-row'>
            <div className="team-label away-team-pos">
                {awayTeamRadio}
            </div>
            <div className="location-label">
                {gameData.StadiumDetails.Name},
                <br/>
                {gameData.StadiumDetails.City}
            </div>
            <div className="team-label home-team-pos">
                {homeTeamRadio}
            </div>
        </div>
    );
}

const generateTeamRadio = (side, team, gameKey, checked) => {
    const input = checked 
        ? <input type="radio" value={team} id={team} name={gameKey} checked /> 
        : <input type="radio" value={team} id={team} name={gameKey} />;
    if (side === "away") {
        return (
            <label htmlFor={team} className="label-width">
                {input}
                {team}
            </label>
        );
    } else {
        return (
            <label htmlFor={team} className="label-width">
                {team}
                {input}
            </label>
        );
    }

}

const AlertModal = ({alert, setAlert}) => {
    if (alert) {
      return (
        <Alert variant="danger" onClose={() => setAlert(false)} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            Please sign in and predict results for all games!
          </p>
        </Alert>
      );
    } else {
        return null;
    }
}
  