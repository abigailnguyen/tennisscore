import {
    checkTieBreakScore,
    checkSet,
    checkAdvantageAndDeuce,
    checkTieBreak
} from "./checkers";

export class Match {
    private player1: Player;
    private player2: Player;
    private score: string = '';
    private end: boolean = false;
    private tieBreak: boolean = false;
    constructor(player1: string, player2: string) {
        this.player1 = new Player(player1);
        this.player2 = new Player(player2);
        this.score = `${this.player1.getPoints()}-${this.player2.getPoints()}`
    }

    getPlayer(name: string) {
        if (this.player1.getName() === name) return this.player1;
        if (this.player2.getName() === name) return this.player2;
        return undefined;
    }
    getScore() {
        return `${this.player1.getWins()}-${this.player2.getWins()},${this.score}`;
    }
    pointWonBy(player: string) {
        if (this.end) { return; }
        if (this.getPlayer(player)) {
            this.getPlayer(player)!.incrementPoints()
        } else {
            return;
        }
        if (checkTieBreak(this.player1, this.player2)) {
            this.score = checkTieBreakScore(this.player1, this.player2)
        } else {
            this.score = checkAdvantageAndDeuce(this.player1, this.player2);
        }
        this.end = checkSet(this.player1, this.player2)
    }
}


export class Player {
    private name: string;
    private wins: number;
    private points: number;
    constructor(name: string) {
        this.name = name;
        this.wins = 0;
        this.points = 0;
    }
    getWins() {
        return this.wins;
    }
    getPoints() {
        return this.points;
    }
    getFormattedPoints() {
        return Player.formatPoint(this.points);
    }
    getName() {
        return this.name;
    }
    incrementWins() {
        this.wins++;
    }
    incrementPoints() {
        this.points++;
    }
    resetPoints() {
        this.points = 0;
    }

    private static formatPoint(point: number) {
        if (point < 4) {
            const POINTS = [0, 15, 30, 40];
            return POINTS[point]
        }
        return point;
    }
}
