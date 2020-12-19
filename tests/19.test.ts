import { read, numberOfValidMsgs } from '../src/19';

describe('day 19', () => {
    let example;

    beforeEach(async () => {
        example = await read('19.example.txt');
    });

    it('should work with the example for part 1', () => {
        expect(numberOfValidMsgs(example)).toEqual(225);
    });

    it('should work with the example for part 2', () => {
        // expect(findNthNumber(example, 30000000)).toEqual(208);
    });
});


