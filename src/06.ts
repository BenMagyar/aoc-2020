import path from 'path';
import fs from 'fs-extra';

type Group = string[][];

export async function read(input: string) : Promise<Group[]> {
    return (await fs.readFile(path.resolve(__dirname, '../inputs/', input)))
        .toString()
        .trim()
        .split('\n\n')
        .map(group => group.split('\n').map(answers => answers.split('')))
        .filter(group => !!group);
}

export function sumOfYes(input: Group[]) {
    return input.reduce((count, group) =>  
        count + group.reduce((set, answers) => { 
            answers.forEach(answer => set.add(answer));
            return set;
        }, new Set()).size
    , 0);
}

export function sumOfAllYes(input: Group[]) {
    return input.reduce((count, group) =>  {
        const counts: { [key: string]: number } = group.reduce((map, answers) => {
            answers.forEach(answer => {
                map[answer] = answer in map ? map[answer] + 1 : 1;
            });
            return map;
        }, {});
        const groupSum = Object.values(counts)
            .filter(c => c === group.length)
            .length;
        return count + groupSum;
    }, 0)
}
