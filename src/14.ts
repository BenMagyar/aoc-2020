import path from 'path';
import fs from 'fs-extra';

interface Mask { type: string, value: string; }
interface Assigment {  type: string, address: number; value: number; }
type Instruction = Mask | Assigment

export async function read(input: string) : Promise<Instruction[]> {
    return (await fs.readFile(path.resolve(__dirname, '../inputs/', input)))
        .toString()
        .trim()
        .split('\n')
        .map(line => {
            let match = line.match(/mem\[(?<address>\d+)\] = (?<value>\d+)/);
            if (match) {
                return { 
                    type: 'assign',
                    address: parseInt(match.groups.address, 10),
                    value: parseInt(match.groups.value, 10),
                }
            }
            match = line.match(/mask = (?<value>[01X]+)/);
            if (match) {
                return { type: 'mask', value: match.groups.value } 
            }
        })
}

function toBinaryArray(value: number) {
    return value.toString(2).padStart(36, "0").split('').map(v => parseInt(v, 2));
}

export function findFinalMemory(input: Instruction[]): number {
    const memory: { [index: number]: number[] } = {};
    const empty = toBinaryArray(0);
    let mask: string = "";
    input.forEach(instruction => {
        switch (instruction.type) {
            case 'mask':
                mask = (instruction as Mask).value;
                break;
            case 'assign': {
                const binary = toBinaryArray((instruction as Assigment).value);
                let assignment = (instruction as Assigment).address in memory ? memory[(instruction as Assigment).address] : empty;        

                for (let i = 0; i < binary.length; i++) {
                    switch (mask[i]) {
                        case 'X':
                            assignment[i] = binary[i];
                            break;
                        case '1':
                        case '0':
                            assignment[i] = parseInt(mask[i], 2);
                            break;
                    }
                }
                memory[(instruction as Assigment).address] = [...assignment];

                break;
            }
                
        }
    });


    return Object.values(memory)
        .map(v => parseInt(v.join(''), 2))
        .reduce((a, b) => a + b, 0);
}

export function findFinalMemoryWithFloatingBits(input: Instruction[]): number {
    const memory: { [index: number]: number[] } = {};
    const empty = toBinaryArray(0);
    let mask: string = "";
    input.forEach(instruction => {
        switch (instruction.type) {
            case 'mask':
                mask = (instruction as Mask).value;
                break;
            case 'assign': {
                const binary = toBinaryArray((instruction as Assigment).address);
                let floating = [];
                for (let i = 0; i < binary.length; i++) {
                    switch (mask[i]) {
                        case 'X':
                            binary[i] = -1;
                            floating.push(i);
                            break;
                        case '0':
                            binary[i] = binary[i];
                            break;
                        case '1':
                            binary[i] = 1;
                            break;
                    }
                }

                const assignment = toBinaryArray((instruction as Assigment).value);
                if (floating.length) {
                    for (let i = 0; i < 2**floating.length; i++) {
                        const value = i.toString(2).padStart(floating.length, "0");
                        const floated = [...binary];
                        floating.forEach((f, j) => {
                            floated[f] = parseInt(value[j], 2);
                        });
                        memory[parseInt(floated.join(''), 2)] = assignment;
                    }
                } else {
                    memory[parseInt(binary.join(''), 2)] = assignment;
                }
                
                break;
            }
                
        }
    });


    return Object.values(memory)
        .map(v => parseInt(v.join(''), 2))
        .reduce((a, b) => a + b, 0);
}
