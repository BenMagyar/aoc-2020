import path from 'path';
import fs from 'fs-extra';

export async function read(input: string) : Promise<string[]> {
    return (await fs.readFile(path.resolve(__dirname, '../inputs/', input)))
        .toString()
        .trim()
        .split('\n')
}

function runAllOp(input: string[], op: string, f: (b: number, a: number) => number) {
    const next = [];
    let i = 0;
    while (i < input.length) {
        if (input[i] === op) {
            const before = parseInt(next.pop(), 10);
            const after = parseInt(input[i + 1], 10);
            next.push(f(before, after));
            i += 1;
        } else {
            next.push(input[i]);
        }
        i += 1;
    }
    return next;
}

function calculate(input: string, order = false) {
    const clean = input.replace(/\(/g, "( ").replace(/\)/g, " )").split(' ');

    function run(input: string[]) {
        const inner = input.indexOf('(');
        if (inner >= 0) {
            let index = inner + 1;
            let parens = 1;
            let contents = [];
            while (parens > 0) {
                contents.push(input[index]);
                if (input[index] === '(') {
                    parens += 1;
                } else if (input[index] === ')') {
                    parens -= 1;
                }
                index += 1;
            }
            const reduced = run(contents.slice(0, contents.length - 1));
            const next = [...input];
            next.splice(inner, contents.length + 1, reduced);
            return run(next);
        }

        let result = parseInt(input[0], 10);
        let operand = null;
        if (!order) {
            for (let i = 1; i < input.length; i++) {
                if (['+','*'].includes(input[i])) {
                    operand = input[i];
                } else if (operand === '+') {
                    result += parseInt(input[i], 10);
                } else if (operand === '*') {
                    result *= parseInt(input[i], 10);
                }
            }   
        } else {
            let evaluated = runAllOp(input, '+', (b, a) => b + a);
            evaluated = runAllOp(evaluated, '*', (b, a) => b * a);
            result = evaluated[0];
        }
        return result;
    }

    return run(clean);
}


export function calculateSums(input: string[]) {
    return input.reduce((a, b) => a + calculate(b), 0); 
}

export function calculateSumsWithOOO(input: string[]) {
    return input.reduce((a, b) => a + calculate(b, true), 0); 
}
