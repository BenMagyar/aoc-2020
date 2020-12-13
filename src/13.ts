import path from 'path';
import fs from 'fs-extra';

interface Notes { time: number; buses: string[];  }
interface IndexedBus { bus: number; index: number }

export async function read(input: string) : Promise<Notes> {
    const lines = (await fs.readFile(path.resolve(__dirname, '../inputs/', input)))
        .toString()
        .trim()
        .split('\n')
    return { 
        time: parseInt(lines[0], 10),
        buses: lines[1].split(','),
    }
}

export function findEarliestBus(input: Notes) {
    let time = input.time;
    const buses = input.buses.filter(b => b !== 'x').map(b => parseInt(b, 10));
    let bus: number | undefined = undefined;
    
    while (bus === undefined) {
        bus = buses.find(id => time % id === 0);
        if (bus === undefined) {
            time += 1;
        }
    }

    return (time - input.time) * bus;
}

function mod(value: number, modulo: number) {
    return ((value % modulo) + modulo) % modulo;
}

export function findSubsequentTime(input: Notes) {
    const buses: IndexedBus[] = input.buses
        .map((bus, index) => ({ bus: parseInt(bus, 10), index }))
        .filter(b => !isNaN(b.bus))
        .sort((a, b) => b.bus - a.bus);

    let index = 0;
    let result = mod(-1 * buses[0].index, buses[0].bus);
    let complete = buses[0].bus;
    while (index < buses.length - 1) {
        const next = buses[index + 1];
        if (mod(result, next.bus) === mod(next.bus - next.index, next.bus)) {
            complete *= next.bus;
            index += 1;
        } else {
            result += complete;
        }
    }

    return result;
}
