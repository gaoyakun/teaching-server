import { Engine } from '../src/webserver/lib/engine';
const testDatabaseName = '__test__';
const testTableNameA = 'a';
const testTableNameB = 'b';

function getEngine (database?:string) {
    const opt: any = {
        user: 'root',
        password: '123456'
    };
    if (database) {
        opt.database = database;
    }
    return new Engine (opt);
}

test('test create database', async () => {
    const engine = getEngine ();
    try {
        await engine.query (`create database if not exists ${testDatabaseName}`)
        await engine.close ();
    } catch (e) {
        await engine.close ();
        throw e;
    }
});

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

