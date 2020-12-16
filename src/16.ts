import path from 'path';
import fs from 'fs-extra';

interface Field { name: string, ranges: [number, number][] }
interface Input {
    fields: Field[],
    ticket: number[],
    nearby: number[][],
}

export async function read(input: string) : Promise<Input> {
    const sections = (await fs.readFile(path.resolve(__dirname, '../inputs/', input)))
        .toString()
        .trim()
        .split('\n\n');

    const fields: Field[] = sections[0].split('\n').map(line => {
        const [name, ranges] = line.split(':');
        const groups = [...ranges.matchAll(/(?<low>\d+)-(?<high>\d+)/g)];
        return {
            name,
            ranges: groups.map(rule => [parseInt(rule.groups.low, 10), parseInt(rule.groups.high, 10)])
        };
    });

    const parseTicket = (line: string) => line.split(',').map(v => parseInt(v, 10));

    return {
        fields,
        ticket: parseTicket(sections[1].split('\n')[1]),
        nearby:  sections[2].split('\n').slice(1).map(parseTicket),
    }
}

function findInvalidValues(input: Input, ticket: number[]) : number | null {
    for (let i = 0; i < ticket.length; i++) {
        const isInvalid = input.fields.filter(field =>
            field.ranges.some(range => ticket[i] >= range[0] && ticket[i] <= range[1])
        ).length === 0;
        if (isInvalid) {
            return ticket[i];
        }
    }
    return null;
}

export function findInvalidFieldRate(input: Input) {
    const invalid: number[] = [];
    for (let i = 0; i < input.nearby.length; i++) {
        const value = findInvalidValues(input, input.nearby[i]);
        if (value !== null) {
            invalid.push(value);
        }
    }
    return invalid.reduce((a, b) => a + b, 0);
}

export function findColumnNames(input: Input) {
    const valid = input.nearby.filter(t => findInvalidValues(input, t) === null);
    const impossible: { [key: number]: Set<string> } = {};
    const possible: { [key: number]: Set<string> } = {};

    for (let i = 0; i < valid.length; i++) {
        for (let j = 0; j < valid[i].length; j++) {
            for (let k = 0; k < input.fields.length; k++) {
                const value = valid[i][j];
                const field = input.fields[k];
                const inRange = field.ranges.some(r => value >= r[0] && value <= r[1]);
                if (inRange) {
                    if (!(j in possible)) {
                        possible[j] = new Set();
                    }
                    possible[j].add(field.name);
                } else {
                    if (!(j in impossible)) {
                        impossible[j] = new Set();
                    }
                    impossible[j].add(field.name);
                }
            }
        }
    }

    const complete = new Set();
    let columns: { [name: string]: number } = {};
    let attempt = 0;
    while (complete.size < input.ticket.length) {
        const i = attempt % input.ticket.length;
        const names = [...possible[i].keys()].filter(p => {
            const set = impossible[i] || new Set();
            return !(complete.has(p) || set.has(p));
        });
        if (names.length === 1) {
            columns[names[0]] = i;
            complete.add(names[0]);
        }
        attempt += 1;
    }

    return columns;
}

export function multiplyDepartureColumns(input: Input) {
    const columns = findColumnNames(input);
    let product = 1;
    Object.keys(columns).forEach(column => {
        if (column.startsWith('departure')) {
            product *= input.ticket[columns[column]];
        }
    })
    return product;
}
