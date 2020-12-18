import { read, calculateSums, calculateSumsWithOOO } from '../src/18';

describe('day 18', () => {
    let example;

    beforeEach(async () => {
        example = await read('18.example.txt');
    });

    it('should work with the example for part 1', () => {
        // expect(calculateSums(example)).toEqual(122);
        expect(calculateSums(['((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2'])).toEqual(13632);
    });

    it('should work with the example for part 2', () => {
        expect(calculateSumsWithOOO(
            ['1 + 2 * 3 + 4 * 5 + 6']
        )).toEqual(231);
    });
});


