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
