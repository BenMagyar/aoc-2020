import { read, findProduct } from '../src/01';

(async () => {
    const input = await read('01.txt');
    console.log('Part 1', findProduct(input, 2));
    console.log('Part 2', findProduct(input, 3));
})();

