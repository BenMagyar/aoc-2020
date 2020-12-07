import { read, numberOfColorsFor, numberOfBagsFor } from '../src/07';

(async () => {
    const input = await read('07.txt');
    console.log('Part 1', numberOfColorsFor(input, 'shiny gold'));
    console.log('Part 2', numberOfBagsFor(input, 'shiny gold'));
})();

