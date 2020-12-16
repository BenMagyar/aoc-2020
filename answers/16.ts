import { read, findInvalidFieldRate, multiplyDepartureColumns } from '../src/16';

(async () => {
    const input = await read('16.txt');
    console.log('Part 1', findInvalidFieldRate(input));
    console.log('Part 2', multiplyDepartureColumns(input));
})();

