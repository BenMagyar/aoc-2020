import { read, validPasswords, validPasswordsAtPosition } from '../src/02';

(async () => {
    const input = await read('02.txt');
    console.log('Part 1', validPasswords(input));
    console.log('Part 2', validPasswordsAtPosition(input));
})();

