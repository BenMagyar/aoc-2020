import { read, findNumberOfHitTrees, findProductOfPaths } from '../src/03';

(async () => {
    const input = await read('03.txt');
    console.log('Part 1', findNumberOfHitTrees(input, { x: 3, y: 1}));
    console.log('Part 2', findProductOfPaths(input, [
        { x: 1, y: 1 },
        { x: 3, y: 1 },
        { x: 5, y: 1 },
        { x: 7, y: 1 },
        { x: 1, y: 2 },
    ]));
})();

