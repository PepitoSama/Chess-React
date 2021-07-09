import * as Chess from 'chess.js'
import { useState } from 'react';
import './App.css';
import Game from './Game/Game';

function App() {

  const [chess, setChess] = useState()
  
  const newGame = () => {
    // board defaults to the starting position when called with no parameters
    const chess = new Chess()
    setChess(chess);
  }

  return (
    <div className="App">
        {!chess && <p className='playButton' onClick={() => newGame()}>Play</p>}
        {chess && <Game chess={chess} setChess={setChess}/>}
    </div>
  );
}

export default App;
