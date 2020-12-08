import { read, run, runUntilFixed } from '../src/08';

describe('day 08', () => {
    let example; 

    beforeEach(async () => {
        example = await read('08.example.txt');
    });

    it('should work with the example for part 1', () => {
        expect(run(example).accumulator).toEqual(5);
    });

    it('should work with the example for part 2', () => {
        expect(runUntilFixed(example).accumulator).toEqual(8);
    });
});


