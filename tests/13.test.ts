import { read, findEarliestBus, findSubsequentTime } from '../src/13';

describe('day 13', () => {
    let example;

    beforeEach(async () => {
        example = await read('13.example.txt');
    });

    it('should work with the example for part 1', () => {
        expect(findEarliestBus(example)).toEqual(295);
    });

    it('should work with the example for part 2', () => {
        expect(findSubsequentTime(example)).toEqual(1068781);
    });
});


