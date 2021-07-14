import * as Chess from 'chess.js'
import { useEffect, useState } from 'react';
import './App.css';
import Game from './Game/Game';

function App() {

  const [chess, setChess] = useState()
  const [message, setMessage] = useState("Click play to start a new Game")
  
  const newGame = () => {
    // board defaults to the starting position when called with no parameters
    const chess = new Chess()
    setChess(chess);
  }

  return (
    <div className="App">
      {!chess && 
        <div className="MenuContainer">
          <div className="Menu">
            <div className='playButton' onClick={() => newGame()}>Play</div>
            <p>{message}</p>
          </div>
        </div>
      }
        {chess &&
          <div className="MenuContainer">
            <div>
              <Game chess={chess} setChess={setChess} playAs="white" setMessage={setMessage} />
            </div>
          </div>
        }
    </div>
  );
}

export default App;
