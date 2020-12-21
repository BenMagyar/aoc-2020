import { read, run } from '../src/21';

describe('day 21', () => {
    let example;

    beforeEach(async () => {
        example = await read('21.example.txt');
    });

    it('should work with the example for part 1', () => {
        expect(run(example, true)).toEqual(5);
    });

    it('should work with the example for part 2', () => {
        expect(run(example, false)).toEqual('mxmxvkd,sqjhc,fvjkl');
    });
});


