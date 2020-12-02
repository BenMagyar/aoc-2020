import path from 'path';
import fs from 'fs-extra';
import { PRIORITY_LOW } from 'constants';

interface PasswordEntry {
    character: string;
    low: number;
    high: number;
    password: string;
}

export async function read(input: string) : Promise<PasswordEntry[]> {
    return (await fs.readFile(path.resolve(__dirname, '../inputs/', input)))
        .toString()
        .split('\n')
        .map(line => {
            const match = line.match(/(?<low>\d+)-(?<high>\d+) (?<character>\w): (?<password>\w+)/);
            if (match) {
                return {
                    low: parseInt(match.groups.low, 10),
                    high: parseInt(match.groups.high, 10),
                    character: match.groups.character,
                    password: match.groups.password
                }
            }
            return null;
        })
        .filter(match => !!match);
}

export function validPasswords(entries: PasswordEntry[]) {
    return entries.filter(entry => {
        const occurences = entry.password.split('')
            .filter(c => c === entry.character)
            .length;
        return entry.low <= occurences && entry.high >= occurences;
    }).length;
}

export function validPasswordsAtPosition(entries: PasswordEntry[]) {
    return entries.filter(entry => {
        const lowMatch = entry.password.charAt(entry.low - 1) === entry.character;
        const highMatch = entry.password.charAt(entry.high - 1) === entry.character;
        return (lowMatch && !highMatch) || (!lowMatch && highMatch);
    }).length;
}
