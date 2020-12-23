import { play } from '../src/23';

(async () => {
    const input = '589174263';
    console.log('Part 1', play(input, 100));
    console.log('Part 2', play(input, 10000000, 1000000));
})();

