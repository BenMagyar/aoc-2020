import { read, findFinalMemory, findFinalMemoryWithFloatingBits } from '../src/14';

(async () => {
    const input = await read('14.txt');
    console.log('Part 1', findFinalMemory(input));
    console.log('Part 2', findFinalMemoryWithFloatingBits(input));
})();

