import { read, numberOfValidMsgs } from '../src/19';

(async () => {
    const input = await read('19.txt');
    console.log('Part 1', numberOfValidMsgs(input));
    console.log('Part 2', numberOfValidMsgs(input, true));
})();

