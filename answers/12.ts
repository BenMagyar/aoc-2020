import { read, navigate, navigateWaypoint } from '../src/12';

(async () => {
    const input = await read('12.txt');
    console.log('Part 1', navigate(input));
    console.log('Part 2', navigateWaypoint(input));
})();

