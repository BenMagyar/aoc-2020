import { read, validPassports } from '../src/04';

describe('day 04', () => {
    let example;
    let secondExample;

    beforeEach(async () => {
        example = await read('04.example.txt');
        secondExample = await read('04.example.2.txt');
    });

    it('should work with the example for part 1', () => {
        expect(validPassports(example)).toEqual(2);
    });

    it('should work with the example for part 2', () => {
        expect(validPassports(secondExample)).toEqual(4);
    });
});


