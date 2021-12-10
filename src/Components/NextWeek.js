import React, {useState} from 'react';

// import { LeagueStatsTable, ThisWeekResultTable } from './Table';


export function NextWeekMain(props) {
  return (
    <main>
      <div className="results">
        <p>Next week </p>
      </div>

        <FormComponent week={props.data} />
      <div className="column-container">
        <div className="column this-week">
        <p>lorem</p>
        </div>
        
        <div className="column standings">
         <p>lorem ipsum</p>
        </div>
      </div>
    </main>
  );
}



const FormComponent = ( props ) => {

    const [winningTeams, setWinningTeams] = useState({})
    console.log(winningTeams);
    const handleSubmit = (e) => {
        e.preventDefault();
        const radios = document.getElementsByTagName("input");
        console.log(radios);
        const winningTeamRadios = [];
        for (let radio of radios){
            if(radio.checked) {
                console.log(radio.id)
                winningTeamRadios.push(radio.id);
            }
        }
        if( (radios.length)/2 != winningTeamRadios.length){
            console.log("ALERT")
        } else {
            setWinningTeams(winningTeamRadios)
        }
        console.log(winningTeamRadios)
       
    }

    const GameComponents = props.week.map( (game) => {
        return <GameComponent gameData = {game} />
    })
 

        return (
          <form onSubmit={handleSubmit}>
              <div className='form-group'>
              {GameComponents}
              </div>
              <button type="submit"  className="btn btn-primary">Submit</button>
          </form>
        );
      
}

const GameComponent = ( { gameData } ) => {
    return (
        <div className="btn-group" id="group2"> 
            <label className="btn btn-outline-primary" htmlFor={gameData.AwayTeam}>{gameData.AwayTeam}</label>
            <input type="radio" className="" value="value1" id={gameData.AwayTeam} name={gameData.GameKey} />
            <input type="radio" className="" value="value2" id={gameData.HomeTeam} name={gameData.GameKey} />
            <label className="btn btn-outline-primary" htmlFor={gameData.HomeTeam}>{gameData.HomeTeam}</label>
        </div>
       
     
    )
}