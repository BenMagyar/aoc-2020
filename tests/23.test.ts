import { play } from '../src/23';

describe('day 23', () => {
    it('should work with the example for part 1', () => {
        expect(play('389125467', 1)).toEqual('54673289');
        expect(play('389125467', 2)).toEqual('32546789');
        expect(play('389125467', 3)).toEqual('34672589');
        expect(play('389125467', 10)).toEqual('92658374');
        // expect(play('389125467', 100)).toEqual('67384529');
    });

    // it('should work with the example for part 2', () => {
        // expect(playRecursiveCombat(example)).toEqual(291);
    // });
});


