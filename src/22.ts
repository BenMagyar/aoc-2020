import path from 'path';
import fs from 'fs-extra';

interface Game { player1: number[], player2: number[] };

export async function read(input: string) : Promise<Game> {
    const sections = (await fs.readFile(path.resolve(__dirname, '../inputs/', input)))
        .toString()
        .trim()
        .split('\n\n');
    return {
        player1: sections[0].split('\n').slice(1).map(v => parseInt(v, 10)),
        player2: sections[1].split('\n').slice(1).map(v => parseInt(v, 10)),
    }
}

export function play(input: Game) {
    const { player1, player2 }: Game = JSON.parse(JSON.stringify(input));
    while (player1.length > 0 && player2.length > 0) {
        const card1 = player1.shift();
        const card2 = player2.shift();
        if (card1 > card2) {
            player1.push(...[card1, card2]);
        } else {
            player2.push(...[card2, card1]);
        }
    }

    return [...player1, ...player2].reverse()
        .map((c, i) => c * (i + 1))
        .reduce((a, b) => a + b);
}

export function playRecursiveCombat(input: Game) {
    const result = playRecursiveCombatGame(input);
    return [...result.player1, ...result.player2].reverse()
        .map((c, i) => c * (i + 1))
        .reduce((a, b) => a + b);
}

export function playRecursiveCombatGame(input: Game) {
    const { player1, player2 }: Game = JSON.parse(JSON.stringify(input));

    const rounds = {};
    while (player1.length > 0 && player2.length) {
        let playerOneWins = true;
        const round = JSON.stringify({ player1, player2 });
        if (round in rounds) {
            return { player1: [1], player2: [], };
        }
        const card1 = player1.shift();
        const card2 = player2.shift();
        if (player1.length >= card1 && player2.length >= card2) {
            playerOneWins = playRecursiveCombatGame({
                player1: player1.slice(0, card1),
                player2: player2.slice(0, card2),
            }).player1.length > 0;
        } else if (card1 > card2) {
            playerOneWins = true;
        } else {
            playerOneWins = false;
        }
        
        if (playerOneWins) {
            player1.push(...[card1, card2]);
        } else {
            player2.push(...[card2, card1]);
        }
        
        rounds[round] = true;
    }

    return { player1, player2, };
}
