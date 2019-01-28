import { DoubleList, DoubleListIterator } from '../src/common/linkedlist';

function randomInt () {
    return Math.floor(Math.random () * 10000);
}

function randomIndex (length: number) {
    return Math.floor(Math.random() * length);
}

function nth (dl: DoubleList, n: number): DoubleListIterator {
    if (dl.length <= n) {
        throw new Error('Invalid index');
    }
    let it = dl.begin();
    for (let i = 0; i < n; i++) {
        it.next();
    }
    return it;
}

interface IOp {
    (arr: number[], dl: DoubleList): boolean;
}

const op: IOp[] = [
    // prepend
    (arr: number[], dl: DoubleList):boolean => {
        const num = randomInt ();
        arr.unshift (num);
        dl.prepend (num);
        return true;
    },
    // append
    (arr: number[], dl: DoubleList):boolean => {
        const num = randomInt ();
        arr.push (num);
        dl.append (num);
        return true;
    },
    // insert
    (arr: number[], dl: DoubleList):boolean => {
        if (arr.length !== dl.length) {
            return false;
        }
        const num = randomInt ();
        if (arr.length === 0) {
            arr.push (num);
            dl.append (num);
        } else {
            const index = randomIndex (arr.length);
            arr.splice (index, 0, num);
            dl.insertAt (nth(dl, index), num);
        }
        return true;
    },
    // remove
    (arr: number[], dl: DoubleList):boolean => {
        if (arr.length !== dl.length) {
            return false;
        }
        if (arr.length > 0) {
            const index = randomIndex (arr.length);
            arr.splice (index, 1);
            dl.remove (nth(dl, index));
        }
        return true;
    }
];

function compare (arr: number[], dl: DoubleList): boolean {
    if (arr.length !== dl.length) {
        return false;
    }
    let index = 0;
    for (let it = dl.begin(); it.valid(); index++, it.next()) {
        if (arr[index] !== it.data) {
            return false;
        }
    }
    return true;
}

test('test linked list', () => {
    const list = new DoubleList<number>();
    const arr: number[] = [];
    expect (list.length).toBe (0);
    expect (list.begin().valid()).toBeFalsy ();
    expect (list.begin().next().valid()).toBeFalsy ();
    expect (list.begin().data).toBeUndefined ();
    expect (list.rbegin().valid()).toBeFalsy ();
    expect (list.rbegin().next().valid()).toBeFalsy ();
    expect (list.rbegin().data).toBeUndefined ();
    list.insertAt (list.begin(), 1);
    expect (list.length).toBe (1);
    expect (list.begin().data).toBe (1);
    list.insertAt (list.begin(), 2);
    expect (list.length).toBe (2);
    expect (list.begin().data).toBe (2);
    expect (list.begin().next().data).toBe (1);
    list.insertAt (list.rbegin(), 6);
    expect (list.rbegin().data).toBe (6);
    const it = list.begin();
    while (it.valid()) {
        list.remove (it);
    }
    expect (list.length).toBe (0);
    
    for (let i = 0; i < 10000; i++) {
        const opIndex = Math.floor(Math.random() * op.length);
        op[opIndex] (arr, list);
    }
    expect (compare(arr, list)).toBeTruthy ();
});
