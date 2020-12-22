import { read, play, playRecursiveCombat } from '../src/22';

describe('day 22', () => {
    let example;

    beforeEach(async () => {
        example = await read('22.example.txt');
    });

    it('should work with the example for part 1', () => {
        expect(play(example)).toEqual(306);
    });

    it('should work with the example for part 2', () => {
        expect(playRecursiveCombat(example)).toEqual(291);
    });
});


