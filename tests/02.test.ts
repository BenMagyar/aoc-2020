import { read, validPasswords, validPasswordsAtPosition } from '../src/02';

describe('day 02', () => {
    let example; 

    beforeEach(async () => {
        example = await read('02.example.txt');
    });

    it('should work with the example for part 1', () => {
        expect(validPasswords(example)).toEqual(2);
    });

    it('should work with the example for part 2', () => {
        expect(validPasswordsAtPosition(example)).toEqual(1);
    });
});


