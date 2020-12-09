import { read, findFirstMismatch, findEncryptionWeakness } from '../src/09';

(async () => {
    const input = await read('09.txt');
    console.log('Part 1', findFirstMismatch(input, 25));
    console.log('Part 2', findEncryptionWeakness(input, 25));
})();

