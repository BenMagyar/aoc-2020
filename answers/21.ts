import { read, run } from '../src/21';

(async () => {
    const input = await read('21.txt');
    console.log('Part 1', run(input, true));
    console.log('Part 2', run(input, false));
})();

