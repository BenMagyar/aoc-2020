import { read, findProductOfDifferences, findNumberOfPaths } from '../src/10';

describe('day 10', () => {
    let example;
    let secondExample;

    beforeEach(async () => {
        example = await read('10.example.txt');
        secondExample = await read('10.example.2.txt');
    });

    it('should work with the example for part 1', () => {
        expect(findProductOfDifferences(example)).toEqual(35);
    });

    it('should work with the example for part 2', () => {
        expect(findNumberOfPaths(example)).toEqual(8);
        expect(findNumberOfPaths(secondExample)).toEqual(19208);
    });
});


