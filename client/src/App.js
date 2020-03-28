import React, { useEffect, useState } from 'react';
import Board from './Board';
import socketio from 'socket.io-client';

import './global.scss'

function App() {

  const socket = socketio('http://ec2-54-207-245-203.sa-east-1.compute.amazonaws.com:3333');
  const [winner, setWinner] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
    });

    socket.on('setwinner', data => {
      setWinner(data.marker);
    })
  }, []);

  return (
    <div className="app-container">
      {winner === 'x' &&
        <h1 className="dialog">Player X won!</h1>
      }
      {winner === 'o' &&
        <h1 className="dialog">Player O won!</h1>
      }
      <div className="board-container">
        <Board socket={socket} enabled={winner === ''} />
      </div>
    </div>
  );
}

export default App;
