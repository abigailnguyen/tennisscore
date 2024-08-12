import { Player } from "./match";

export function checkTieBreak(player1: Player, player2: Player) {
    return player1.getWins() === 6
        && player2.getWins() === 6;
}

const MAX_SET_POINT = 4
const ADVANTAGE_POINT = 1
const WINNING_POINT = 2
const MAX_TIE_BREAK_POINT = 7

export function checkAdvantageAndDeuce(player1: Player, player2: Player) {
    if (player1.getPoints() < MAX_SET_POINT && player2.getPoints() < MAX_SET_POINT) {
        return `${player1.getFormattedPoints()}-${player2.getFormattedPoints()}`
    }

    if (player1.getPoints() === player2.getPoints()) {
        return "Deuce";
    }

    if (player1.getPoints() - player2.getPoints() == ADVANTAGE_POINT) {
        return `Advantage by ${player1.getName()}`;
    }
    if (player2.getPoints() - player1.getPoints() == ADVANTAGE_POINT) {
        return `Advantage by ${player2.getName()}`;
    }

    if (player1.getPoints() - player2.getPoints() >= WINNING_POINT) {
        player1.incrementWins();
    }
    if (player2.getPoints() - player1.getPoints() >= WINNING_POINT) {
        player2.incrementWins();
    }
    player1.resetPoints();
    player2.resetPoints();
    return `${player1.getFormattedPoints()}-${player2.getFormattedPoints()}`
}

export function checkSet(player1: Player, player2: Player) {
    if (player1.getWins() === 6 && player1.getWins() - player2.getWins() >= 2) {
        return true;
    }
    if (player2.getWins() === 6 && player2.getWins() - player1.getWins() >= 2) {
        return true;
    }
    if (player1.getWins() === 7 || player2.getWins() === 7) {
        return true;
    }
    return false;
}


export function checkTieBreakScore(player1: Player, player2: Player) {
    if (player1.getPoints() < MAX_TIE_BREAK_POINT && player2.getPoints() < MAX_TIE_BREAK_POINT) {
        return `${player1.getPoints()}-${player2.getPoints()}`
    }
    if (player1.getPoints() - player2.getPoints() >= WINNING_POINT) {
        player1.incrementWins();
    }
    if (player2.getPoints() - player1.getPoints() >= WINNING_POINT) {
        player2.incrementWins();
    }
    return `${player1.getPoints()}-${player2.getPoints()}`
}

