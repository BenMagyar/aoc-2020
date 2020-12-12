import path from 'path';
import fs from 'fs-extra';

type Direction = 'E' | 'S' | 'N' | 'W';
type Action = Direction | 'F' | 'R' | 'L';
interface Move { action: Action, value: number };
interface State { direction: Direction, x: number; y: number };
interface Waypoint { x: number, y: number };

const DIRECTIONS: Direction[] = ['N', 'E', 'S', 'W'];

export async function read(input: string) : Promise<Move[]> {
    return (await fs.readFile(path.resolve(__dirname, '../inputs/', input)))
        .toString()
        .trim()
        .split('\n')
        .map(line => ({ 
            action: line[0] as Action, 
            value: parseInt(line.substring(1), 10 )
        }));
}

export function navigate(input: Move[]) {
    const state: State = { direction: 'E', x: 0, y: 0 };

    function step(move: Move) {
        switch (move.action) {
            case 'F':
                step({ action: state.direction, value: move.value });
                break;
            case 'N':
                state.y += move.value;
                break;
            case 'S':
                state.y -= move.value;
                break;
            case 'E':
                state.x += move.value;
                break;
            case 'W':
                state.x -= move.value;
                break;
            case 'R':
                state.direction = DIRECTIONS[
                    (DIRECTIONS.indexOf(state.direction) + (move.value / 90)) % DIRECTIONS.length
                ];
                break;
            case 'L':
                const next = DIRECTIONS.indexOf(state.direction) - (move.value / 90);
                state.direction = next >= 0 ? DIRECTIONS[next] : DIRECTIONS[DIRECTIONS.length + next]; 
                break;
        }
    }

    for (let i = 0; i < input.length; i++) {
        step(input[i]);
    }

    return Math.abs(state.x) + Math.abs(state.y);
}

function round(value: number) {
    return Math.round(value) - value < 0.5 ? Math.round(value) : Math.floor(value);
}

export function navigateWaypoint(input: Move[]) {
    const state: State = { direction: 'E', x: 0, y: 0 };
    const waypoint: Waypoint = { x: 10, y: 1 };

    let radians: number, current: Waypoint;

    function step(move: Move) {
        switch (move.action) {
            case 'F':
                state.x += waypoint.x * move.value;
                state.y += waypoint.y * move.value;
                break;
            case 'N':
                waypoint.y += move.value;
                break;
            case 'S':
                waypoint.y -= move.value;
                break;
            case 'E':
                waypoint.x += move.value;
                break;
            case 'W':
                waypoint.x -= move.value;
                break;
            case 'R':
                current = { ...waypoint };
                radians = move.value * (Math.PI / 180);
                waypoint.x = round(current.x * Math.cos(radians) + current.y * Math.sin(radians));
                waypoint.y = round(-1 * current.x * Math.sin(radians) + current.y * Math.cos(radians));
                break;
            case 'L':
                current = { ...waypoint };
                radians = -1 * move.value * (Math.PI / 180);
                waypoint.x = round(current.x * Math.cos(radians) + current.y * Math.sin(radians));
                waypoint.y = round(-1 * current.x * Math.sin(radians) + current.y * Math.cos(radians));
                break;
        }
    }

    for (let i = 0; i < input.length; i++) {
        step(input[i]);
    }

    return Math.abs(state.x) + Math.abs(state.y);
}
