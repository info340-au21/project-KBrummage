import React, {useState} from 'react';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getDatabase, ref, set as firebaseSet, push as firebasePush, onValue } from 'firebase/database';
// import { LeagueStatsTable, ThisWeekResultTable } from './Table';



export function NextWeekMain(props) {
  console.log(props.userProfile);
  const [alert, setAlert] = useState(false);

  return (
    <Container>
      <div className="results">
        <p>Next week </p>
      </div>
        <FormComponent week={props.data} setAlert={setAlert} userProfile={props.userProfile}/>
        <AlertModal alert={alert} setAlert={setAlert}/>
    </Container>
  );
}



const FormComponent = ( {week, setAlert, userProfile} ) => {
    const db = getDatabase();

    const [winningTeams, setWinningTeams] = useState({})
    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            console.log("Not valid")
    }
        const radios = document.getElementsByTagName("input");
        const winningTeamRadios = [];
        for (let radio of radios){
            if(radio.checked) {
                winningTeamRadios.push(radio.id);
            }
        }
        if( (radios.length)/2 !== winningTeamRadios.length){
           setAlert(true);
        } 
        // else {
        //     setWinningTeams(winningTeamRadios)
        // }
        console.log(winningTeamRadios)
        console.log({week});
        console.log(userProfile);
        if (userProfile) {
            const dbPath = "default/" + week[0].Week + "/" + userProfile.uid;
            console.log(dbPath);
            const pickRef = ref(db, dbPath);
            firebaseSet(pickRef, winningTeamRadios);
        }
       
    }

    const GameComponents = week.map( (game) => {
        return (
            <div className="justify-content-sm-center">
                <GameComponent gameData = {game} key={game.gameData} />
            </div>
        )
    })
 

        return (
            <div>
          <Form onSubmit={handleSubmit}>
              <div className='form-group'>
              {GameComponents}
              </div>
              <button type="submit"  className="btn btn-primary">Submit</button>
          </Form>
          </div>
        );
      
}

const GameComponent = ( { gameData } ) => {
    return (
        // <div className="btn-group" id="group2"> 
        <InputGroup className='justify-content-md-center'>
                <Row style={rowStyle}>
                <Col style={awayTeam}
                className="justify-content-md-right">
                <label className="btn btn-outline-primary justify-content-md-right" 
                    htmlFor={gameData.AwayTeam}>
                <input type="radio" className="" value="value1" 
                id={gameData.AwayTeam} name={gameData.GameKey} />
                {gameData.AwayTeam}</label>
                </Col>
                <Col style={Location}>
                    {gameData.StadiumDetails.Name}
                    <br/>
                    {gameData.StadiumDetails.City}
                </Col>
                <Col style={homeTeam}>
                <label className="btn btn-outline-primary" htmlFor={gameData.HomeTeam}>{gameData.HomeTeam}
                <input type="radio" className="" value="value2" id={gameData.HomeTeam} name={gameData.GameKey} />
            </label>
                </Col>
            </Row>
            </InputGroup>
    )
}

const AlertModal = ({alert, setAlert}) => {
    if (alert) {
      return (
        <Alert variant="danger" onClose={() => setAlert(false)} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            Change this and that and try again. Duis mollis, est non commodo
            luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
            Cras mattis consectetur purus sit amet fermentum.
          </p>
        </Alert>
      );
    } else {
        return null;
    }
}
  

const Location = {
    display: 'flex',
    flexDirection: 'column',
    wrap: 'no-wrap'
  }
  
const homeTeam = {
    display: 'flex',
    justifyContent: 'left'
}

const awayTeam = {
    display: 'flex',
    justifyContent: 'right'
}

const rowStyle = {
    margin: "1rem"
}