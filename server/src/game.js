const score = require('./score');

module.exports = class Game{

  constructor() {
    this.board = ['', '', '', '', '', '', '', '', ''];
    this.turn = 'x';
    this.players = {};
    this.markers = ['o', 'x'];
    this.observers = []
  }

  subscribe(observerFunction){
    this.observers.push(observerFunction);
  }

  addPlayer(id){
    if(this.players[id]) return;
    if(this.markers.length <= 0) return;
    this.players[id] = { marker: this.markers.pop(), score: score() };
  }

  removePlayer(playerId){
    if(!this.players[playerId]) return;
    this.markers.push(this.players[playerId].marker);
    delete this.players[playerId];
  }

  play(place, playerId){
    if(!this.players[playerId]) return;
    if(this.players[playerId].marker === this.turn){
      this.board[place] = this.turn;
      this.notifyPlacement(place, this.board[place]);
      if(this.countScores(place, this.players[playerId].score)){
        return true
      }
      this.changeTurn();
    }
  }

  checkDraw(){
    return this.board.indexOf('') === -1;
  }

  countScores(place, stats){
    const col = place%3;
    const row = Math.floor(place/3);
    stats.rowCount[row]++;
    stats.colCount[col]++;
    if(col === row) stats.diagCount++;
    if(row+col === 2) stats.antiDiagCount++;
    return stats.rowCount[row] === 3 || stats.colCount[col] === 3 || stats.diagCount === 3 || stats.antiDiagCount === 3;
  }

  changeTurn(){
    if(this.turn === 'x') return this.turn = 'o'; 
    if(this.turn === 'o') return this.turn = 'x'; 
  }

  notifyPlacement(place, marker){
    for (const observerFunction of this.observers) {
      observerFunction(place, marker);
    }
  }
}
