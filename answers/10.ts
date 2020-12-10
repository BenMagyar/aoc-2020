import { read, findProductOfDifferences, findNumberOfPaths } from '../src/10';

(async () => {
    const input = await read('10.txt');
    console.log('Part 1', findProductOfDifferences(input));
    console.log('Part 2', findNumberOfPaths(input));
})();

