import path from 'path';
import fs from 'fs-extra';
import { count } from 'console';
import { validPasswordsAtPosition } from './02';
 
interface RuleGroup { color: string; amount: number };
interface Rule { color: string, contains: RuleGroup[] };
interface AdjacencyMatrix { order: string[], value: number[][] }

export async function read(input: string) : Promise<Rule[]> {
    return (await fs.readFile(path.resolve(__dirname, '../inputs/', input)))
        .toString()
        .trim()
        .split('\n')
        .map(line => {
            const match = line.match(/(?<color>[a-z\s]+) bags contain (?<contains>.+)/);
            if (match) {
                const rules = [...match.groups.contains.matchAll(/(?<count>\d+) (?<color>[a-z\s]+) bags?/g)];
                if (rules) {
                    return {
                        color: match.groups.color,
                        contains: rules.map(rule => ({
                            color: rule.groups.color,
                            amount: parseInt(rule.groups.count, 10),
                        }))
                    }
                }
            }
        })
        .filter(rule => !!rule);
}

function buildAdjacencyMatrix(input: Rule[]) : AdjacencyMatrix {
    const order = input.map(rule => rule.color);
    const value = order.map(_ => (order.map(_ => 0)));
    
    input.forEach((rule, i) => {
        rule.contains.forEach(relationship => {
            value[i][order.indexOf(relationship.color)] = relationship.amount;
        })
    });

    return { order, value };
}


export function numberOfColorsFor(input: Rule[], color: string): number {
    const matrix = buildAdjacencyMatrix(input);
    const start = matrix.order.indexOf(color);

    const containers = new Set();
    function traverse(index: number) {
        matrix.value.forEach((node, i) => {
            if (node[index] > 0) {
                containers.add(i);
                traverse(i);
            }
        })
    }

    traverse(start)
    
    return containers.size;
}

export function numberOfBagsFor(input: Rule[], color: string) : number {
    const matrix = buildAdjacencyMatrix(input);
    const start = matrix.order.indexOf(color);

    let count = 0;
    function traverse(index: number, multiplier: number) {
        matrix.value[index].forEach((node, i) => {
            if (node > 0) {
                count += node * multiplier;
                traverse(i, node * multiplier);
            }
        })
    }

    traverse(start, 1);

    return count;
}
