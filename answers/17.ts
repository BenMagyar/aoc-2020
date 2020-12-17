import { read, findActiveSatellites } from '../src/17';

(async () => {
    const input = await read('17.txt');
    console.log('Part 1', findActiveSatellites(input, 6));
    // console.log('Part 2', multiplyDepartureColumns(input));
})();

