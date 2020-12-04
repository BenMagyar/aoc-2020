import { read, validPassports } from '../src/04';

(async () => {
    const input = await read('04.txt');
    console.log('Part 1', validPassports(input));
    console.log('Part 2', validPassports(input));
})();

