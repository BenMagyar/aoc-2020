import path from 'path';
import fs from 'fs-extra';

type Open = '.';
type Tree = '#';
type Area = Open | Tree;
type Map = Area[][];
interface Coordinate { x: number, y: number };

export async function read(input: string) : Promise<Map> {
    return (await fs.readFile(path.resolve(__dirname, '../inputs/', input)))
        .toString()
        .split('\n')
        .map(line => line.split('') as Area[])
        .filter(line => !!line);
}

function coordinateToArea(map: Map, coordinate: Coordinate) : Area {
    return map[coordinate.y][coordinate.x % map[0].length];
}

export function findNumberOfHitTrees(map: Map, movement: Coordinate) {
    let current: Coordinate = { x: 0, y: 0 }
    let trees = 0;

    while (current.y + movement.y < map.length) {
        current = { x: current.x + movement.x, y: current.y + movement.y };
        if (coordinateToArea(map, current) === '#') {
            trees += 1;
        }
    }

    return trees;
}

export function findProductOfPaths(map: Map, movements: Coordinate[]) {
    return movements.map(m => findNumberOfHitTrees(map, m))
        .reduce((a, b) => a * b);
}
