import path from 'path';
import fs from 'fs-extra';
import { exit } from 'process';

type Matrix = { title: number, value: number[][] };
type Input = Matrix[];
interface Coordinate { x: number, y: number };

const MONSTER = [
`                  # `,
`#    ##    ##    ###`,
` #  #  #  #  #  #   `,
];

export async function read(input: string) : Promise<Input> {
    return (await fs.readFile(path.resolve(__dirname, '../inputs/', input)))
        .toString()
        .trim()
        .split('\n\n')
        .map(group => ({
                title: parseInt(group.split('\n')[0].split(' ')[1], 10),
                value: group.split('\n').slice(1).map(line =>
                    line.split('').map(v => v === '#' ? 1 : 0))
        }));
}

function clone<T>(value: T) : T {
    return JSON.parse(JSON.stringify(value));
}

function createMonster(): Coordinate[] {
    return MONSTER.map((r, i) => (
        r.split('').map((c, j) => (
            c === '#' ? { x: j, y: i } : null
        ))
    )).flat().filter(c => c !== null);
}

function rotate(matrix: Matrix, degrees: number) {
    let rotated = clone(matrix);
    function rotate90(toRotate: Matrix) {
        return { 
            ...toRotate, 
            value: toRotate.value.map((r, i) => clone(toRotate).value.map(c => c[i]).reverse()) 
        };
    }

    for (let i = 0; i < (degrees/90); i++) {
        rotated = rotate90(rotated);
    }

    return rotated;
}

function flip(matrix: Matrix) {
    return { ...matrix, value: clone(matrix).value.reverse() };
}

function mirror(matrix: Matrix) {
    return { ...matrix, value: clone(matrix).value.map(row => row.reverse() )};
}

function column(matrix: Matrix, index: number) {
    return matrix.value.map(row => row[index]);
}

function isEqual(a: any, b: any) {
    return JSON.stringify(a) === JSON.stringify(b);
}

function log(matrix: Matrix) {
    console.log(matrix.value.map((row, i) =>
       `${i.toString().padStart(2, '0')} ` + 
       row.map((r, i) => `${r === 1 ? '#' : '.'}`).join('')
    ).join('\r\n'));
}

export function solveMatrixPuzzle(input: Input, isPartOne: boolean = true) {
    const moves = [
        (matrix: Matrix) => matrix,
        (matrix: Matrix) => rotate(matrix, 90),
        (matrix: Matrix) => rotate(matrix, 270),
        (matrix: Matrix) => rotate(matrix, 180),
        (matrix: Matrix) => mirror(matrix),
        (matrix: Matrix) => flip(matrix),
    ];

    const graph = new Map<string, Matrix>();
    const serialize = (c: Coordinate) => `${c.x} ${c.y}`;
    const deserialize = (s: String) : Coordinate => {
        const parts = s.split(' ');
        return { x: parseInt(parts[0], 10), y: parseInt(parts[1], 10) } 
    }

    function bounds() {
        const coordinates = [...graph.keys()].map(deserialize);
        return {
            x: [Math.min(...coordinates.map(c => c.x)), Math.max(...coordinates.map(c => c.x))],
            y: [Math.min(...coordinates.map(c => c.y)), Math.max(...coordinates.map(c => c.y))],
        }
    }
    
    function get(coordinate: Coordinate) {
        return graph.get(serialize(coordinate));
    }

    const open = new Set<string>()
    const used = new Set<number>();

    function isInSquare(coordinate: Coordinate) {
        const boundary = bounds();
        const max = Math.sqrt(input.length);
        return Math.max(coordinate.x, boundary.x[1]) - Math.min(coordinate.x, boundary.x[0]) < max &&
            Math.max(coordinate.y, boundary.y[1]) - Math.min(coordinate.y, boundary.y[0]) < max;
    }

    function neighbors(coordinate: Coordinate): Coordinate[] {
        return [
            { x: coordinate.x - 1, y: coordinate.y },
            { x: coordinate.x + 1, y: coordinate.y },
            { x: coordinate.x, y: coordinate.y - 1 },
            { x: coordinate.x, y: coordinate.y + 1 },
        ].filter(isInSquare);
    }

    function set(coordinate: Coordinate, matrix: Matrix) {
        graph.set(serialize(coordinate), matrix);
        used.add(matrix.title);
        open.delete(serialize(coordinate));
        neighbors(coordinate).forEach(neighbor => {
            if (!graph.has(serialize(neighbor))) {
                open.add(serialize(neighbor));
            }
        });
        open.forEach(coordinate => {
            if (!isInSquare(deserialize(coordinate))) {
                open.delete(coordinate);
            }
        })
    }

    function exists(coordinate: Coordinate) {
        return typeof get(coordinate) !== "undefined";
    }

    function isFit(coordinate: Coordinate, matrix: Matrix) {
        return neighbors(coordinate).filter(exists).every(neighbor => {
            // left
            if (neighbor.x < coordinate.x) {
                const left = get(neighbor);
                return isEqual(column(left, left.value[0].length - 1), column(matrix, 0));
            }
            // right
            else if (neighbor.x > coordinate.x) {
                const right = get(neighbor);
                return isEqual(column(right, 0), column(matrix, matrix.value[0].length - 1));
            } 
            // up
            else if (neighbor.y < coordinate.y) {
                const up = get(neighbor);
                return isEqual(up.value[up.value.length - 1], matrix.value[0]);
            } 
            // down
            else if (neighbor.y > coordinate.y) {
                const down = get(neighbor);
                return isEqual(down.value[0], matrix.value[matrix.value.length - 1]);
            }
        });
    }

    set({ x: 0, y: 0 }, input[0]);
    
    while(graph.size < input.length) {
        for (let i = 0; i < input.length; i++) {
            for (let j = 0; j < moves.length; j++) {
                for (let k = 0; k < moves.length; k++) {
                    if (!used.has(input[i].title)) {
                        const changed = moves[k](moves[j](input[i]));
                        const possible = [...open.keys()];
                        for (let l = 0; l < possible.length; l++) {
                            const position = deserialize(possible[l]);
                            if (isFit(position, changed)) {
                                set(position, changed);
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
    
    const boundaries = bounds();
    if (isPartOne) {
        return get({ x: boundaries.x[0], y: boundaries.y[0]}).title * 
            get({ x: boundaries.x[1], y: boundaries.y[1]}).title * 
            get({ x: boundaries.x[0], y: boundaries.y[1]}).title * 
            get({ x: boundaries.x[1], y: boundaries.y[0]}).title;
    }

    const map: Matrix = { title: 0, value: [] };
    for (let y = boundaries.y[0]; y <= boundaries.y[1]; y++) {
        for (let y2 = 1; y2 < input[0].value.length - 1; y2++) {
            const row = [];
            for (let x = boundaries.x[0]; x <= boundaries.x[1]; x++) {
                let value = get({ x, y, }).value[y2];
                row.push(...value.slice(1, value.length - 1));
            }
            map.value.push(row);
        }
    }

    const monster = createMonster();
    const monsterWidth = Math.max(...monster.map(c => c.x));
    const monsterHeight = MONSTER.length;
    function scanForMonster(matrix: Matrix) {
        let monsters = 0;
        for (let i = 0; i < matrix.value.length - monsterHeight; i++) {    
            for (let j = 0; j < matrix.value[i].length - monsterWidth; j++) {                
                const isMonster = monster.every(coordinate => {
                    return matrix.value[i + coordinate.y][j + coordinate.x] === 1;
                });
                if (isMonster) {
                    monsters += 1;
                }
            }       
        }
        return monsters;
    }

    const pounds = map.value.reduce((c, row) => c + row.reduce((d, cell) => d + cell, 0), 0);
    for (let i = 0; i < moves.length; i++) {
        for (let j = 0; j < moves.length; j++) {
            const changed = moves[i](moves[j](map));
            const monsters = scanForMonster(changed);
            if (monsters > 0) {
                return pounds - (monsters * monster.length);
            }
        }
    }

    return null;
}
