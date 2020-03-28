import React, { useEffect, useState } from 'react';
import Board from './Board';
import socketio from 'socket.io-client';

import './global.scss'

function App() {

  const socket = socketio('localhost:3333');
  const [winner, setWinner] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('AAAAA');
    });
    socket.on('setwinner', data => {
      setWinner(data.marker);
    })
  }, []);

  return (
    <div className="app-container">
      {winner === 'x' &&
        <h1 className="winner-title">Player X won!</h1>
      }
      {winner === 'o' &&
        <h1 className="winner-title">Player O won!</h1>
      }
      <div className="board-container">
        <Board socket={socket} enabled={winner === ''} />
      </div>
    </div>
  );
}

export default App;
