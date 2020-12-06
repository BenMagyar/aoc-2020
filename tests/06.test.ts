import { read, sumOfAllYes, sumOfYes } from '../src/06';

describe('day 06', () => {
    let example; 

    beforeEach(async () => {
        example = await read('06.example.txt');
    });

    it('should work with the example for part 1', () => {
        expect(sumOfYes(example)).toEqual(11);
    });

    it('should work with the example for part 2', () => {
        expect(sumOfAllYes(example)).toEqual(6);
    });
});


