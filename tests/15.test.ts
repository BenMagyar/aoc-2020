import { read, findNthNumber } from '../src/15';

describe('day 15', () => {
    let example;

    beforeEach(async () => {
        example = await read('15.example.txt');
    });

    it('should work with the example for part 1', () => {
        expect(findNthNumber(example, 2020)).toEqual(436);
    });

    it('should work with the example for part 2', () => {
        // expect(findNthNumber(example, 30000000)).toEqual(208);
    });
});


