import path from 'path';
import fs from 'fs-extra';

interface Input { rules: Map<number, string>; messages: string[]; }

export async function read(input: string) : Promise<Input> {
    const sections = (await fs.readFile(path.resolve(__dirname, '../inputs/', input)))
        .toString()
        .trim()
        .split('\n\n');
    const rules = new Map<number, string>();
    sections[0].split('\n').forEach(line => {
        const parts = line.split(':');
        rules.set(parseInt(parts[0], 10), parts[1].trim());
    });
    return { rules, messages: sections[1].split('\n') }
}

export function numberOfValidMsgs(input: Input, shouldFix = false) {
    function createRegex(rule: number) : string {
        const value = input.rules.get(rule);

        if (isNaN(rule)) {
            return '';
        }

        if (shouldFix) {
            if (rule === 8) {
                return `(${createRegex(42)})+`;
            }
    
            if (rule === 11) {
                // hopefully this doesnt repeat more than 20 times...
                return `(${Array.from(Array(20).keys()).map(n =>
                    `((${createRegex(42)}){${n + 1}}(${createRegex(31)}){${n + 1}})`
                ).join('|')})`;
            }
        }
        
        let match = value.match(/"(?<str>\w)"/);
        if (match) {
            return match.groups.str;
        }

        const ors = value.split(' | ');
        const combined = ors.map(condition => {
            const ands = condition.split(' ')
                .map(r => `(${createRegex(parseInt(r, 10))})`)
                .join('');
            return `(${ands})`;
        });
        return combined.join('|');
        
    }
    const regex = new RegExp(`^${createRegex(0)}$`);
    return input.messages.filter(m => regex.test(m)).length;
}
