import { read, navigate, navigateWaypoint } from '../src/12';

describe('day 12', () => {
    let example;

    beforeEach(async () => {
        example = await read('12.example.txt');
    });

    it('should work with the example for part 1', () => {
        expect(navigate(example)).toEqual(25);
    });

    it('should work with the example for part 2', () => {
        expect(navigateWaypoint(example)).toEqual(286);
    });
});


