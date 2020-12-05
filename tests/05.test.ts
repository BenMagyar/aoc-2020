import { read, findHighestSeatId, findMissingSeatIds } from '../src/05';

describe('day 03', () => {
    let example; 

    beforeEach(async () => {
        example = await read('05.example.txt');
    });

    it('should work with the example for part 1', () => {
        expect(findHighestSeatId(example)).toEqual(820);
    });

    it('should work with the example for part 2', () => {
        expect(findMissingSeatIds(example)).not.toBeNull();
    });
});


