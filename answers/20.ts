import { read, solveMatrixPuzzle } from '../src/20';

(async () => {
    const input = await read('20.txt');
    // console.log('Part 1', solveMatrixPuzzle(input));
    console.log('Part 1', solveMatrixPuzzle(input, true));
    console.log('Part 2', solveMatrixPuzzle(input, false));
})();

