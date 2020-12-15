import path from 'path';
import fs from 'fs-extra';

export async function read(input: string) : Promise<number[]> {
    return (await fs.readFile(path.resolve(__dirname, '../inputs/', input)))
        .toString()
        .trim()
        .split(',')
        .map(value => parseInt(value.trim(), 10));
}

export function findNthNumber(input: number[], n: number) {
    const occurences: { [value: number]: number } = {};
    input.slice(0, input.length - 1).forEach((v, i) => occurences[v] = i);
    let pending: [number, number] = [input.length - 1, input[input.length - 1]];
    
    function speak(index: number) {
        const last = pending[1];
        const previousIndex = typeof occurences[last] !== "undefined" ? occurences[last] : -1;
        occurences[pending[1]] = pending[0];
        if (previousIndex < 0) {
            pending = [index, 0];
        } else {
            const value = index - previousIndex - 1;
            pending = [index, value];
        }
    }

    for (let i = input.length; i < n; i++) {
        speak(i);
    }

    return pending[1];
}
