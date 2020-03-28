const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const Game = require('./game');

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);

let game = createNewGame();

function createNewGame(){
  const game = new Game();
  game.subscribe((place, marker) => {
    sockets.emit('setmarker', { id: place, marker: marker });
  });
  return game;
}

sockets.on('connection', (socket) => {
  let playerId;
  socket.emit('board-setup', game.board);

  socket.on('player-register', data => {
    playerId = data.playerId;
    game.addPlayer(playerId);
  });

  socket.on('place-click', data => {
    if(game.play(data.place, data.playerId)){
      console.log(`Player ${game.turn} wins`);
      sockets.emit('setwinner', { marker: game.turn });
      game = createNewGame();
      setTimeout(() => {
        socket.emit('board-setup', game.board);
      }, 3000);
    }

    if(game.checkDraw()){
      sockets.emit('draw');
      game = createNewGame();
      setTimeout(() => {
        socket.emit('board-setup', game.board);
      }, 3000);
    }
  });

  socket.on('disconnect', () => {
    game.removePlayer(playerId);
  });
});

server.listen(3333, () => {
  console.log('Server listening on port 3333');
});
