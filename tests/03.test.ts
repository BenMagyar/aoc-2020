import { read, findNumberOfHitTrees, findProductOfPaths } from '../src/03';

describe('day 03', () => {
    let example; 

    beforeEach(async () => {
        example = await read('03.example.txt');
    });

    it('should work with the example for part 1', () => {
        expect(findNumberOfHitTrees(example, { x: 3, y: 1 })).toEqual(7);
    });

    it('should work with the example for part 2', () => {
        expect(findProductOfPaths(example, [
            { x: 1, y: 1 },
            { x: 3, y: 1 },
            { x: 5, y: 1 },
            { x: 7, y: 1 },
            { x: 1, y: 2 },
        ])).toEqual(336);
    });
});


