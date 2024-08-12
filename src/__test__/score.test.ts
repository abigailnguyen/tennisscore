import { checkAdvantageAndDeuce, checkSet, checkTieBreakScore } from "../checkers";
import { Match, Player } from "../match";
describe("new match", () => {
    const match = new Match('player1', 'player2');
    it("should return 0-0 when the game starts", () => {
        expect(match.getScore()).toBe('0-0,0-0');
    });

    it("should increase player score correctly", () => {
        match.pointWonBy("player1");
        expect(match.getPlayer("player1")?.getPoints()).toBe(1)
        expect(match.getPlayer("player2")?.getPoints()).toBe(0)
    })
})

describe("checkTieBreak rule", () => {

    it.concurrent.each`
        points1 | points2 | wins1 | wins2
        ${1}    | ${1}    | ${6}  | ${6}
        ${7}    | ${0}    | ${7}  | ${6}
        ${5}    | ${7}    | ${6}  | ${7}
        ${8}    | ${7}    | ${6}  | ${6}
        ${8}    | ${9}    | ${6}  | ${6}
        ${15}    | ${13}    | ${7}  | ${6}
    `("should win game when reach 7 or more with at least 2 points ahead, $points1-$points2, $wins1-$wins2", ({ points1, points2, wins1, wins2 }) => {
        const player1 = Object.assign(new Player('player1'), {
            name: "player1",
            points: points1,
            wins: 6
        }) as Player
        const player2 = Object.assign(new Player('player2'), {
            name: "player2",
            points: points2,
            wins: 6
        }) as Player

        expect(checkTieBreakScore(player1, player2)).toBe(`${points1}-${points2}`);
        expect(player1.getWins()).toBe(wins1);
        expect(player2.getWins()).toBe(wins2);
    })
})
describe("checSet", () => {
    it.concurrent.each`
    sets1   | sets2   | expected
    ${6}    | ${2}    | ${true}
    ${4}    | ${6}    | ${true}
    ${6}    | ${4}    | ${true}
    ${0}    | ${6}    | ${true}
    ${1}    | ${0}    | ${false}
    ${6}    | ${5}    | ${false}
    ${6}    | ${6}    | ${false}
    ${7}    | ${6}    | ${true}
    ${6}    | ${7}    | ${true}
`("should check that should end the set, $sets1, $sets2, $expected", async ({ sets1, sets2, expected }) => {
        const player1 = {
            name: "player1",
            wins: sets1,
        }
        const player2 = {
            name: "player2",
            wins: sets2,
        }
        expect(checkSet(
            Object.assign(new Player('player1'), player1),
            Object.assign(new Player('player2'), player2)
        )).toBe(expected);

    })
})

describe("checkAdvantageAndDeuce", () => {
    it.concurrent.each`
        points1 | points2 | expected
        ${4} | ${5} | ${"Advantage by player2"}
        ${6} | ${5} | ${"Advantage by player1"}
        ${6} | ${7} | ${"Advantage by player2"}
        ${4} | ${4} | ${"Deuce"}
        ${5} | ${5} | ${"Deuce"}
    `("should check Advantage and Deuce, $points1, $points2, $expected", async ({ points1, points2, expected }) => {
        const player1 = {
            name: "player1",
            points: points1
        }
        const player2 = {
            name: "player2",
            points: points2
        }
        expect(checkAdvantageAndDeuce(
            Object.assign(new Player('player1'), player1),
            Object.assign(new Player('player2'), player2)
        )).toBe(expected);
    })

    it.concurrent.each`
        points1 | points2 | expected
        ${1}    | ${3}    | ${"15-40"}
        ${2}    | ${3}    | ${"30-40"}
        ${3}    | ${0}    | ${"40-0"}
    `("should not end game and format score correctly, $points1, $points2, $expected", async ({ points1, points2, expected }) => {
        const player1 = Object.assign(new Player('player1'), {
            name: "player1",
            points: points1,
            wins: 0
        }) as Player
        const player2 = Object.assign(new Player('player2'), {
            name: "player2",
            points: points2,
            wins: 0
        }) as Player

        expect(checkAdvantageAndDeuce(player1, player2)).toBe(expected);
        expect(player1.getWins()).toBe(0);
        expect(player2.getWins()).toBe(0);
    })

    it.concurrent.each`
        points1 | points2 | wins1 | wins2 
        ${1}    | ${4}    | ${0}  | ${1}
        ${4}    | ${1}    | ${1}  | ${0}
        ${4}    | ${0}    | ${1}  | ${0}
        ${6}    | ${4}    | ${1}  | ${0}
        ${8}    | ${6}    | ${1}  | ${0}
    `("should reset the points with the winner with 2 points ahead, $points1, $points2, $wins1-$wins2",
        async ({ points1, points2, wins1, wins2 }) => {
            const player1 = Object.assign(new Player('player1'), {
                name: "player1",
                points: points1,
                wins: 0
            }) as Player
            const player2 = Object.assign(new Player('player2'), {
                name: "player2",
                points: points2,
                wins: 0
            }) as Player

            expect(checkAdvantageAndDeuce(player1, player2)).toBe("0-0");
            expect(player1.getWins()).toBe(wins1);
            expect(player2.getWins()).toBe(wins2);
        })
})
