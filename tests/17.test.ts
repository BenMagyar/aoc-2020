import { read, findActiveSatellites } from '../src/17';

describe('day 17', () => {
    let example;
    // let exampleTwo;

    beforeEach(async () => {
        example = await read('17.example.txt');
        // exampleTwo = await read('16.example.2.txt');
    });

    it('should work with the example for part 1', () => {
        expect(findActiveSatellites(example, 6)).toEqual(848);
    });

    it('should work with the example for part 2', () => {

    });
});


