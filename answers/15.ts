import { read, findNthNumber } from '../src/15';

(async () => {
    const input = await read('15.txt');
    console.log('Part 1', findNthNumber(input, 2020));
    console.log('Part 2', findNthNumber(input, 30000000));
})();

