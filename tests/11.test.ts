import { read, findSeatsStabalization, findSeatsStabalizationWithDirection } from '../src/11';

describe('day 11', () => {
    let example;

    beforeEach(async () => {
        example = await read('11.example.txt');
    });

    it('should work with the example for part 1', () => {
        expect(findSeatsStabalization(example)).toEqual(37);
    });

    it('should work with the example for part 2', () => {
        expect(findSeatsStabalizationWithDirection(example)).toEqual(26);
    });
});


