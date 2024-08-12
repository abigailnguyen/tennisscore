import { Match } from "./match";

const player1 = 'player1'
const player2 = 'player2'
const match = new Match('player1', 'player2');
match.pointWonBy(player1);
match.pointWonBy(player1);
match.pointWonBy(player2);
console.log(match.getScore());
match.pointWonBy(player2);
match.pointWonBy(player1);
match.pointWonBy(player1);
console.log(match.getScore());
match.pointWonBy(player1);
match.pointWonBy(player1);
match.pointWonBy(player2);
match.pointWonBy(player2);
match.pointWonBy(player1);
match.pointWonBy(player2);
console.log(match.getScore());
match.pointWonBy(player2);
console.log(match.getScore());
match.pointWonBy(player1);
console.log(match.getScore());
match.pointWonBy(player1);
console.log(match.getScore());
match.pointWonBy(player1);
console.log(match.getScore());
