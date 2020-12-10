import path from 'path';
import fs from 'fs-extra';

export async function read(input: string) : Promise<[]> {
    return (await fs.readFile(path.resolve(__dirname, '../inputs/', input)))
        .toString()
        .trim()
        .split('\n')
        .map(line => );
}

export function run(input: []) {
    
}
