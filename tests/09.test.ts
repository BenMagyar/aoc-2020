import { read, findFirstMismatch, findEncryptionWeakness } from '../src/09';

describe('day 09', () => {
    let example; 

    beforeEach(async () => {
        example = await read('09.example.txt');
    });

    it('should work with the example for part 1', () => {
        expect(findFirstMismatch(example, 5)).toEqual(127);
    });

    it('should work with the example for part 2', () => {
        expect(findEncryptionWeakness(example, 5)).toEqual(62);
    });
});


