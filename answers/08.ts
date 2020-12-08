import { read, run, runUntilFixed } from '../src/08';

(async () => {
    const input = await read('08.txt');
    console.log('Part 1', run(input).accumulator);
    console.log('Part 2', runUntilFixed(input).accumulator);
})();

