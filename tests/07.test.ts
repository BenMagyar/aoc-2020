import { read, numberOfColorsFor, numberOfBagsFor } from '../src/07';

describe('day 07', () => {
    let example; 

    beforeEach(async () => {
        example = await read('07.example.txt');
    });

    it('should work with the example for part 1', () => {
        expect(numberOfColorsFor(example, 'shiny gold')).toEqual(4);
    });

    it('should work with the example for part 2', () => {
        expect(numberOfBagsFor(example, 'shiny gold')).toEqual(32);
    });
});


