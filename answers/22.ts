import { read, play, playRecursiveCombat } from '../src/22';

(async () => {
    const input = await read('22.txt');
    console.log('Part 1', play(input));
    console.log('Part 2', playRecursiveCombat(input));
})();

