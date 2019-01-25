// tslint:disable:2531
import { DoubleList } from '../src/common/linkedlist';

function randomInt () {
    return Math.floor(Math.random () * 10000);
}

function randomIndex (length: number) {
    return Math.floor(Math.random() * length);
}

function nth (dl: DoubleList, n: number): DoubleList.Node {
    if (dl.length === 0) {
        throw new Error('Invalid index');
    }
    let node = dl.head;
    for (let i = 0; i < n; i++) {
        node = node!.next;
    }
    return node!;
}

interface IOp {
    (arr: number[], dl: DoubleList): boolean;
}

const op: IOp[] = [
    // prepend
    (arr: number[], dl: DoubleList):boolean => {
        const num = randomInt ();
        // console.log (`test prepend ${num}`);
        arr.unshift (num);
        dl.prepend (num);
        return true;
    },
    // append
    (arr: number[], dl: DoubleList):boolean => {
        const num = randomInt ();
        // console.log (`test append ${num}`);
        arr.push (num);
        dl.append (num);
        return true;
    },
    // insert
    (arr: number[], dl: DoubleList):boolean => {
        if (arr.length !== dl.length) {
            console.log (`Length not equal: arr.length=${arr.length}, list.length=${dl.length}`);
            return false;
        }
        const num = randomInt ();
        if (arr.length === 0) {
            // console.log (`test insert ${num} to empty list`);
            arr.push (num);
            dl.append (num);
        } else {
            const index = randomIndex (arr.length);
            // console.log (`test insert ${num} at ${index}`);
            arr.splice (index, 0, num);
            dl.insertAt (nth(dl, index), num);
        }
        return true;
    },
    // remove
    (arr: number[], dl: DoubleList):boolean => {
        if (arr.length !== dl.length) {
            console.log (`Length not equal: arr.length=${arr.length}, list.length=${dl.length}`);
            return false;
        }
        if (arr.length > 0) {
            const index = randomIndex (arr.length);
            // console.log (`test remove at ${index}`);
            arr.splice (index, 1);
            dl.remove (nth(dl, index));
        }
        return true;
    }
];

function compare (arr: number[], dl: DoubleList): boolean {
    if (arr.length !== dl.length) {
        console.log (`Length not equal: arr.length=${arr.length}, list.length=${dl.length}`);
        return false;
    }
    let node = dl.head;
    for (let i = 0; i < arr.length; i++, node = node!.next) {
        if (arr[i] !== node!.data) {
            /*
            console.log ('Compare failed');
            console.log ('*** array ***');
            arr.forEach (val => {
                console.log (val);
            });
            console.log ('*** list ***');
            dl.each (val => {
                console.log (val);
            });
            */
            return false;
        }
    }
    return true;
}

test('test linked list', () => {
    const list = new DoubleList();
    const arr: number[] = [];
    expect (list.length).toBe (0);
    for (let i = 0; i < 10000; i++) {
        const opIndex = Math.floor(Math.random() * op.length);
        op[opIndex] (arr, list);
    }
    expect (compare(arr, list)).toBeTruthy ();
});
/*
test('test create table', async () => {
    const engine = getEngine (testDatabaseName);
    try {
        await engine.query (`create table if not exists ${testTableNameA} (
            id int not null auto_increment,
            str_col varchar(32),
            num_col int,
            primary key (id)
        ) engine=InnoDB default charset=utf8mb4`);
        await engine.query (`create table if not exists ${testTableNameB} (
            id int not null auto_increment,
            str_col varchar(32),
            num_col int,
            primary key (id)
        ) engine=InnoDB default charset=utf8mb4`);
        await engine.close ();
    } catch (e) {
        await engine.close ();
        throw e;
    }
});

test('test insert data', async () => {
    const engine = getEngine (testDatabaseName);
    try {
        await engine.objects(testTableNameA).add ([{
            str_col: 'hello',
            num_col: 123    
        }, {
            str_col: 'world',
            num_col: 456
        }]);
        await engine.close ();
    } catch (e) {
        await engine.close ();
        throw e;
    }
});

test('test query data', async () => {
    const engine = getEngine (testDatabaseName);
    try {
        const rows = await engine.objects(testTableNameA).all ();
        await engine.close ();
        expect(rows).not.toBeNull();
        expect(rows.length).toBe(2);
    } catch (e) {
        await engine.close ();
        throw e;
    }
});

test('test delete data', async () => {
    const engine = getEngine (testDatabaseName);
    try {
        await engine.objects(testTableNameA).delete (null);
        await engine.close ();
    } catch (e) {
        await engine.close ();
        throw e;
    }
});

test('test drop database', async () => {
    const engine = getEngine();
    try {
        await engine.query (`drop database if exists ${testDatabaseName}`);
        await engine.close ();
    } catch (e) {
        await engine.close ();
        throw e;
    }
});

*/