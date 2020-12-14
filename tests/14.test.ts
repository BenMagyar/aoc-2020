import { read, findFinalMemory, findFinalMemoryWithFloatingBits } from '../src/14';

describe('day 14', () => {
    let example;
    let exampleTwo;

    beforeEach(async () => {
        example = await read('14.example.txt');
        exampleTwo = await read('14.example.2.txt');
    });

    it('should work with the example for part 1', () => {
        expect(findFinalMemory(example)).toEqual(165);
    });

    it('should work with the example for part 2', () => {
        expect(findFinalMemoryWithFloatingBits(exampleTwo)).toEqual(208);
    });
});


