import { read, calculateSums, calculateSumsWithOOO } from '../src/18';

(async () => {
    const input = await read('18.txt');
    console.log('Part 1', calculateSums(input));
    console.log('Part 2', calculateSumsWithOOO(input));
})();

