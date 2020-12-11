import path from 'path';
import fs from 'fs-extra';

type Seats = number[][]

export async function read(input: string) : Promise<Seats> {
    return (await fs.readFile(path.resolve(__dirname, '../inputs/', input)))
        .toString()
        .trim()
        .split('\n')
        .map(line => line.split('').map(value => value === 'L' ? 0 : -1));
}

function get(input: Seats, x: number, y: number) {
    try {
        return input[y][x];
    } catch { 
        return -1;
    }
}

function countSeats(seats: Seats) {
    return seats.reduce((count, row) =>
        count + row.reduce((count, seat) => count + (seat > 0 ? 1 : 0), 0)    
    , 0);
}

function countAdjacent(input: Seats, x: number, y: number) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (!(i === 0 && j === 0)) {
                if (get(input, x + i , y + j) > 0) {
                    count += 1;
                }
            }
        }
    }
    return count;
}

function findSingleDirection(
    input: Seats,
    x: number,
    y:number,
    moveX: number,
    moveY: number
) {
    while (y <= input.length && y >= 0 && x <= input[0].length && x >= 0) {
        x += moveX;
        y += moveY;
        const area = get(input, x, y);
        if (area >= 0) {
            return area;
        }
    }
    return -1;
}

function countDirectionally(input: Seats, x: number, y: number) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (!(i === 0 && j === 0)) {
                if (findSingleDirection(input, x, y, i, j) > 0) {
                    count += 1;
                }
            }
        }
    }
    return count;
}

export function findSeatsStabalization(input: Seats) {
    let current: Seats;
    while (JSON.stringify(current) !== JSON.stringify(input)) {
        current = JSON.parse(JSON.stringify(input));
        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < input.length; j++) {
                if (current[i][j] === 0 && countAdjacent(current, j, i) === 0) {
                    input[i][j] = 1;
                } else if (current[i][j] === 1 && countAdjacent(current, j, i) >= 4) {
                    input[i][j] = 0;
                }
            }
        }
    }
    return countSeats(input);
}

export function findSeatsStabalizationWithDirection(input: Seats) {
    let current: Seats;
    while (JSON.stringify(current) !== JSON.stringify(input)) {
        current = JSON.parse(JSON.stringify(input));
        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < input.length; j++) {
                if (current[i][j] === 0 && countDirectionally(current, j, i) === 0) {
                    input[i][j] = 1;
                } else if (current[i][j] === 1 && countDirectionally(current, j, i) >= 5) {
                    input[i][j] = 0;
                }
            }
        }
    }
    return countSeats(input);
}
