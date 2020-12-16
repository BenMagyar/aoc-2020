import { read, findInvalidFieldRate, findColumnNames } from '../src/16';

describe('day 16', () => {
    let example;
    let exampleTwo;

    beforeEach(async () => {
        example = await read('16.example.txt');
        exampleTwo = await read('16.example.2.txt');
    });

    it('should work with the example for part 1', () => {
        expect(findInvalidFieldRate(example)).toEqual(71);
    });

    it('should work with the example for part 2', () => {
        expect(findColumnNames(exampleTwo)).toEqual({
            row: 0,
            class: 1,
            seat: 2,
        });
    });
});


