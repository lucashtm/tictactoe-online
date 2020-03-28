import React, { useEffect, useState } from 'react';
import Board from './Board';
import socketio from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

import './global.scss'

function App() {
  // const host = 'http://ec2-54-207-245-203.sa-east-1.compute.amazonaws.com:3333';
  const host = 'localhost:3333';
  const socket = socketio(host);
  const [result, setResult] = useState('');
  const [playerId, setPlayerId] = useState(localStorage.getItem('playerId'));
  const [board, setBoard] = useState([]);

  useEffect(() => {
    if(!playerId){
      const randomHex = crypto.randomBytes(20).toString('hex');
      localStorage.setItem('playerId', randomHex);
      setPlayerId(randomHex);
    }

    socket.on('connect', () => {
      socket.emit('player-register', { playerId });
    });

    socket.on('board-setup', board => {
      setBoard(board);
      setResult('');
    });
    
    socket.on('setwinner', data => {
      setResult(data.marker);
    });

    socket.on('draw', ()=>{
      setResult('draw');
    });
  }, []);

  return (
    <div className="app-container">
      {result === 'x' &&
        <h1 className="dialog">PLAYER X WON!</h1>
      }
      {result === 'o' &&
        <h1 className="dialog">PLAYER O WON!</h1>
      }
      {result === 'draw' &&
        <h1 className="dialog">DRAW!</h1>
      }
      <div className="board-container">
        <Board socket={socket} enabled={result === ''} structure={board} />
      </div>
    </div>
  );
}

export default App;
