import { read, findEarliestBus, findSubsequentTime } from '../src/13';

(async () => {
    const input = await read('13.txt');
    console.log('Part 1', findEarliestBus(input));
    console.log('Part 2', findSubsequentTime(input));
})();

