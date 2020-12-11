import { read, findSeatsStabalization, findSeatsStabalizationWithDirection } from '../src/11';

(async () => {
    let input = await read('11.txt');
    console.log('Part 1', findSeatsStabalization(input));
    input = await read('11.txt');
    console.log('Part 2', findSeatsStabalizationWithDirection(input));
})();

