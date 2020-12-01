import { read, findProduct } from '../src/01';

describe('day 01', () => {
    let example; 

    beforeEach(async () => {
        example = await read('01.example.txt');
    });

    it('should work with the example for part 1', () => {
        const product = findProduct(example, 2);
        expect(product).toEqual(514579);
    });

    it('should work for the examaple for part 2', () => {
        const product = findProduct(example, 3);
        expect(product).toEqual(241861950);
    });

});


