import path from 'path';
import fs from 'fs-extra';

type AdjacencyMatrix = number[][];

export async function read(input: string) : Promise<number[]> {
    return (await fs.readFile(path.resolve(__dirname, '../inputs/', input)))
        .toString()
        .trim()
        .split('\n')
        .map(line => parseInt(line, 10));
}

function buildAdjacencyMatrix(input: number[]) : AdjacencyMatrix {
    return input.map(a => input.map(b => [1,2,3].includes(b - a) ? b - a : 0));
}

export function findProductOfDifferences(input: number[]) {
    let current = Math.max(...input);
    let remaining = [...input];
    let moves = { 1: 0, 2: 0, 3: 1 };
    remaining.splice(input.indexOf(current), 1);

    while (remaining.length > 0) {
        const next = Math.max(...remaining);
        remaining.splice(remaining.indexOf(next), 1);
        moves[current - next] += 1;
        current = next;
    }

    moves[current] += 1;

    return moves[1] * moves[3];
}

export function findNumberOfPaths(input: number[]) {
    const values = [...input, 0];
    const matrix = buildAdjacencyMatrix(values);
    const current = values.indexOf(0);
    const target = values.indexOf(Math.max(...values));
    const reached = { [current]: 1 };
    
    function traverse(index: number) {
        if (index === target) {
            return 1;
        }

        const children = matrix[index].map((node, i) => {
            if (node > 0) {
                if (i in reached) {
                    return reached[i];
                }
                return traverse(i);
            }
            return 0;
        });

        const paths = children.reduce((a, b) => a + b, 0);
        reached[index] = paths;        

        return paths;
    }

    return traverse(current);
}
