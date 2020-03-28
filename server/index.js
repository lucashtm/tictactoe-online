const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);

const board = ['', '', '', '', '', '', '', '', ''];
turn = 'x';
xStats = {
  rowCount: [0,0,0],
  colCount: [0,0,0],
  diagCount: 0,
  antiDiagCount: 0
};

oStats = {
  rowCount: [0,0,0],
  colCount: [0,0,0],
  diagCount: 0,
  antiDiagCount: 0
};

stats = {
  x: xStats,
  o: oStats
}

function resetStats(stats){
  stats.rowCount = [0,0,0];
  stats.colCount = [0,0,0];
  stats.diagCount = 0;
  stats.antiDiagCount = 0;
}

function nextTurn(){
  if(turn === 'x') return 'o'; 
  if(turn === 'o') return 'x'; 
}

function checkWin(board, place, stats){
  col = place%3;
  row = Math.floor(place/3);
  stats.rowCount[row]++;
  stats.colCount[col]++;
  if(col === row) stats.diagCount++;
  if(row+col === 2) stats.antiDiagCount++;
  return stats.rowCount[row] === 3 || stats.colCount[col] === 3 || stats.diagCount === 3 || stats.antiDiagCount === 3;
}

sockets.on('connection', (socket) => {
  console.log(`Player ${socket.id} connected`);
  socket.on('place-click', data => {
    board[data.id] = turn;
    if(checkWin(board, data.id, stats[turn])){
      console.log(`Player ${turn} wins`);
      sockets.emit('setwinner', { marker: turn });
      resetStats(xStats);
      resetStats(oStats);
    }
    sockets.emit('setmarker', { id: data.id, marker: turn });
    turn = nextTurn();
  })
})

server.listen(3333, () => {
  console.log('Server listening on port 3333');
});
