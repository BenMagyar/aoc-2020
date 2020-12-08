import path from 'path';
import fs from 'fs-extra';

type Operation = 'acc' | 'jmp' | 'nop';
interface Instruction { op: Operation, arg: number };
interface State { line: number, accumulator: number, stack: number[] };

export async function read(input: string) : Promise<Instruction[]> {
    return (await fs.readFile(path.resolve(__dirname, '../inputs/', input)))
        .toString()
        .trim()
        .split('\n')
        .map(line => { 
            const parts = line.split(' '); 
            return { op: parts[0] as Operation, arg: parseInt(parts[1], 10) }
        });
}

export function run(input: Instruction[], state: State = { line: 0, accumulator: 0, stack: [] }) : State {
    if (state.line >= input.length) {
        return state;
    }

    if (state.stack.includes(state.line)) {
        return state;
    }

    state.stack.push(state.line);
    const instruction = input[state.line];
    switch (instruction.op) {
        case 'acc':
            return run(
                input,
                { ...state, line: state.line + 1, accumulator: state.accumulator + instruction.arg}
            );
        case 'jmp':
            return run(
                input,
                { ...state, line: state.line + instruction.arg }
            );
        case 'nop':
            return run(
                input,
                { ...state, line: state.line + 1 }
            );  
    }
}

export function runUntilFixed(input: Instruction[]): State {
    for (let i = 0; i < input.length; i++) {
        if (['jmp', 'nop'].includes(input[i].op)) {
            const original = { ...input[i] };
            input[i].op = input[i].op === 'jmp' ? 'nop' : 'jmp';
            const result = run(input);
            
            if (result.line >= input.length) {
                return result;
            }

            input[i] = original;
        }
    }
}
