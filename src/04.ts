import path from 'path';
import fs from 'fs-extra';

type BatchEntry = { [key: string]: any };
const FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid'];
const ALLOWED_MISSING = ['cid'];

const TESTS: { [key: string]: RegExp } = {
    'byr': /^(19[2-9]\d)|(200[0-2])$/,
    'iyr': /^(201\d)|(2020)$/,
    'eyr': /^(202\d)|(2030)$/,
    'hgt': /^(((1[5-8]\d)|(19[0-3]))cm)|(((59)|(6\d)|(7[0-6]))in)$/,
    'hcl': /^#[0-9a-f]{6}$/,
    'ecl': /^(amb)|(blu)|(brn)|(gry)|(grn)|(hzl)|(oth)$/,
    'pid': /^[0-9]{9}$/,
}

export async function read(input: string) : Promise<BatchEntry[]> {
    return (await fs.readFile(path.resolve(__dirname, '../inputs/', input)))
        .toString()
        .split('\n\n')
        .map(group => {
            const pairs = group.split(/[\s\r\n]+/);
            return pairs.map(pair => { 
                const parts = pair.split(':');
                return { [parts[0]]: parts[1] };
            }).reduce((a, b) => ({ ...a, ...b }), {});
        })
        .filter(line => !!line);
}

export function validPassports(input: BatchEntry[]) {
    const required = FIELDS.filter(f => !ALLOWED_MISSING.includes(f));
    return input.filter(batch => 
        required.filter(r => {
            if (Object.keys(batch).includes(r)) {
                return TESTS[r].test(batch[r]);
            }
            return false;
        }).length === required.length
    ).length;
}
