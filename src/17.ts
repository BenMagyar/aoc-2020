import path from 'path';
import fs from 'fs-extra';

type Space = Map<number, Map<number, Map<number, Map<number, boolean>>>>;

function set(space: Space, x: number, y: number, z: number, w: number, value: boolean) {
    if (!space.has(x)) {
        space.set(x, new Map());        
    }
    if (!space.get(x).has(y)) {
        space.get(x).set(y, new Map());
    }
    if (!space.get(x).get(y).has(z)) {
        space.get(x).get(y).set(z, new Map());
    }
    space.get(x).get(y).get(z).set(w, value);
}

function get(space: Space, x: number, y: number, z: number, w: number) {
    if (space.has(x) && space.get(x).has(y) && space.get(x).get(y).has(z) && space.get(x).get(y).get(z).has(w)) {
        return space.get(x).get(y).get(z).get(w);
    };
    return false;
}

export async function read(input: string) : Promise<Space> {
    let space: Space = new Map();
    (await fs.readFile(path.resolve(__dirname, '../inputs/', input)))
        .toString()
        .trim()
        .split('\n')
        .forEach((line, y) => {
            line.split('').forEach((value, x) => {
                set(space, y, x, 0, 0, value === '#');
            });
        });
    return space;
}

function findNeighbors(x: number, y: number, z: number, w: number) {
    let neighbors = [];
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            for (let k = -1; k <= 1; k++) {
                for (let l = -1; l <= 1; l++) {
                    if (!([i,j,k,l].every(v => v === 0))) {
                        neighbors.push([x + i, y + j, z + k, w + l]);
                    }
                }
            }
        }
    }
    return neighbors;
}


function clone(input: Space) {
    const next: Space = new Map();
    [...input.keys()].forEach(x => {
        [...input.get(x).keys()].forEach(y => {
            [...input.get(x).get(y).keys()].forEach(z => {
                [...input.get(x).get(y).get(z).keys()].forEach(w => {
                    set(next, x, y, z, w, input.get(x).get(y).get(z).get(w));
                });
            })
        })
    });
    return next;
}

export function findActiveSatellites(input: Space, cycles: number = 1) {
    let active = 0;
    const space: Space = clone(input);

    for (let i = 0; i < cycles; i++) {
        active = 0;
        const start: Space = clone(space);
        const checked: Map<string, boolean> = new Map();

        function nextState(x: number, y: number, z: number, w: number) {
            const serialized = `${x}|${y}|${z}|${w}`;
            if (checked.has(serialized)) {
                return checked.get(serialized);
            }
            const neighbors = findNeighbors(x, y, z, w)
                .filter(([i, j, k, l]) => get(start, i, j, k, l)).length;
            const isActive = get(start, x, y, z, w);
            if (isActive && [2,3].includes(neighbors)) {
                checked.set(serialized, true);
                set(space, x, y, z, w, true);
                active += 1;
            } else if (isActive) {
                checked.set(serialized, false);
                set(space, x, y, z, w, false);
            } else if (!isActive && neighbors === 3) {
                checked.set(serialized, true);
                set(space, x, y, z, w, true);
                active += 1;
            } else {
                checked.set(serialized, false);
                set(space, x, y, z, w, false);
            } 
        }

        [...start.keys()].forEach(x => {
            [...start.get(x).keys()].forEach(y => {
                [...start.get(x).get(y).keys()].forEach(z => {
                    [...start.get(x).get(y).get(z).keys()].forEach(w => {
                        const neighbors = findNeighbors(x, y, z, w);
                        neighbors.forEach(([x, y, z, w]) => nextState(x, y, z, w));
                        nextState(x, y, z, w);
                    });                    
                });
            });
        })

    }

    return active;
}
