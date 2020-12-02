import path from 'path';
import fs from 'fs-extra';

const SUM = 2020;

export async function read(input: string) : Promise<number[]> {
    return (await fs.readFile(path.resolve(__dirname, '../inputs/', input)))
        .toString()
        .split('\n')
        .map(line => parseFloat(line))
        .filter(line => !isNaN(line));
}

export function findProduct(input: number[], size: number, subset: number[] = []) : Boolean | number {
    let answer: number;

    if (subset.length === size) {
        if (subset.reduce((a, b) => a + b) === SUM) {
            return subset.reduce((a, b) => a * b);
        }
        return false;
    }

    input.some((i, j) => {
        const output = findProduct(input.slice(j), size, [...subset, i]);
        if (typeof output === "number") {
            answer = output;
            return true;
        }
    });

    return answer;
}
