import { read, sumOfAllYes, sumOfYes } from '../src/06';

(async () => {
    const input = await read('06.txt');
    console.log('Part 1', sumOfYes(input));
    console.log('Part 2', sumOfAllYes(input));
})();

