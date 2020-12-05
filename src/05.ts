import path from 'path';
import fs from 'fs-extra';

type Seat = string[];

export async function read(input: string) : Promise<Seat[]> {
    return (await fs.readFile(path.resolve(__dirname, '../inputs/', input)))
        .toString()
        .split('\n')
        .map(line => line.split('') as string[])
        .filter(line => !!line);
}

function findSeatId(seat: Seat) {
    let row = [0, 127];
    let column = [0, 7];

    for (let i = 0; i < seat.length; i++) {
        switch (seat[i]) {
            case 'F':
                row[1] = row[1] - Math.ceil((row[1] - row[0]) / 2);
                break;
            case 'B':
                row[0] = row[0] + Math.ceil((row[1] - row[0]) / 2);
                break;
            case 'L':
                column[1] = column[1] - Math.ceil((column[1] - column[0]) / 2);
                break;
            case 'R':
                column[0] = column[0] + Math.ceil((column[1] - column[0]) / 2);
                break;
        }
    }

    return row[0] * 8 + column[1];
}

export function findHighestSeatId(seats: Seat[]) {
    return Math.max(...seats.map(findSeatId));
}

export function findMissingSeatIds(seats: Seat[]) {
    const seatIds = seats.map(findSeatId);

    let plane = Array.from(Array(127 * 8 + 7).keys());
    plane = plane.filter(seatId => 
        seatId > 7 && seatId < (127 * 8) &&
        !seatIds.includes(seatId) &&
        seatIds.includes(seatId - 1) && 
        seatIds.includes(seatId + 1)
    );
    
    return plane[0];
}
