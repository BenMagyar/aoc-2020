import { read, findHighestSeatId, findMissingSeatIds } from '../src/05';

(async () => {
    const input = await read('05.txt');
    console.log('Part 1', findHighestSeatId(input));
    console.log('Part 2', findMissingSeatIds(input));
})();

