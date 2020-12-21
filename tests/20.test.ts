import { read, solveMatrixPuzzle } from '../src/20';

describe('day 20', () => {
    let example;

    beforeEach(async () => {
        example = await read('20.example.txt');
    });

    it('should work with the example for part 1', () => {
        expect(solveMatrixPuzzle(example)).toEqual(20899048083289);
    });

    it('should work with the example for part 2', () => {
        // expect(findNthNumber(example, 30000000)).toEqual(208);
    });
});


