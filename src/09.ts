import path from 'path';
import fs from 'fs-extra';

export async function read(input: string) : Promise<number[]> {
    return (await fs.readFile(path.resolve(__dirname, '../inputs/', input)))
        .toString()
        .trim()
        .split('\n')
        .map(line => parseInt(line, 10));
}

export function findFirstMismatch(input: number[], windowSize: number) {
    for (let i = windowSize; i < input.length; i++) {
        const preamble = input.slice(i - windowSize, i);
        const isMismatch = !preamble.some((num, j) => {
            const removed = [...preamble];
            removed.splice(j, 1);
            return removed.includes(input[i] - num);
        });
        if (isMismatch) {
            return input[i];
        }
    }
}

export function findEncryptionWeakness(input: number[], windowSize: number) {
    const mismatch = findFirstMismatch(input, windowSize);
    for (let i = 0; i < input.length; i++) {
        let sum = input[i];
        for (let j = i + 1; j < input.length; j++) {
            sum += input[j];
            if (sum === mismatch) {
                const range = input.slice(i, j);
                return Math.min(...range) + Math.max(...range);
            } else if (sum > mismatch) {
                break;
            }
        }
    }
}
