type Node = { previous: number | undefined, value: number, next: number | undefined };
type DoublyLinkedList = Map<number, Node>;

function mod(value: number, modulo: number) {
    return ((value % modulo) + modulo) % modulo;
}

export function play(input: string, moves: number = 100, extra: number = 0) {
    const loop: DoublyLinkedList = new Map();

    function set(current: number, previous: number, next: number) {
        loop.set(current, { next, previous, value: current });
    }

    function getNext(current: number) {
        const at = loop.get(current);
        return loop.get(at.next);
    }

    function splice(current: number) {
        const value = loop.get(current);
        const previous = loop.get(value.previous);
        const next = loop.get(value.next);
        loop.set(previous.value, { ...previous, next: next.value });
        loop.set(next.value, { ...next, previous: previous.value });
        return value;
    }

    function insert(current: number, node: Node) {
        const at = loop.get(current);
        const next = loop.get(getNext(current).value);
        loop.set(at.value, { ...at, next: node.value });
        loop.set(node.value, { ...node, previous: at.value, next: next.value });
        loop.set(next.value, { ...next, previous: node.value });
    }

    const max = Math.max(input.length - 1, extra - 1);

    function inputAt(index: number) {
        return index < input.length ? parseInt(input.charAt(index), 10) : index + 1;
    }

    set(inputAt(0), inputAt(max), inputAt(1));
    for (let i = 1; i < max; i++) {
        set(inputAt(i), inputAt(i - 1), inputAt(i + 1))
    }
    set(inputAt(max), inputAt(max - 1), inputAt(0));

    function findInsertion(next: number, excluded: number[]) {
        let index = mod(next, max + 3);
        while (true) {
            if (index !== 0 && !excluded.includes(index) && loop.has(index)) {
                return index;
            }
            index = mod(index - 1, max + 3);
        }
    }
    
    let current = loop.get(parseInt(input.charAt(0), 10));
    for (let i = 0; i < moves; i++) {
        const one = splice(getNext(current.value).value);
        const two = splice(getNext(current.value).value);
        const three = splice(getNext(current.value).value);
        const insertion = findInsertion(current.value - 1, [one.value, two.value, three.value]);
        insert(insertion, three);
        insert(insertion, two);
        insert(insertion, one);
        current = getNext(current.value);
    }

    if (extra > 0) {
        return getNext(loop.get(1).value).value * getNext(getNext(loop.get(1).value).value).value;
    }

    let result = "";
    let at = getNext(loop.get(1).value).value;
    while (at !== 1) {
        result += at;
        at = getNext(at).value;
    }
    return result;
}
