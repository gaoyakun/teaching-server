import { Utils} from '../../common/utils';
import { ErrorCode } from '../../common/errcodes';
import { Config } from '../../lib/config';
import { Engine } from '../../lib/engine';
import * as express from 'express';
import 'express-async-errors';

export const installRouter = express.Router();

installRouter.get('/',  (req:express.Request, res:express.Response, next:express.NextFunction) => {
    res.redirect ('/install/database');
});

installRouter.get('/database', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const host = Config.databaseHost || '';
    const port = Config.databasePort ? String(Config.databasePort) : '';
    const user = Config.databaseUser || '';
    const password = Config.databasePassword || '';
    const name = Config.databaseName || '';
    res.render ('install_db', { db: {
        host: host,
        port: port,
        user: user,
        password: password,
        name: name
    }});
});

installRouter.post('/setup_database', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    if (!req.body.host || !Utils.safeParseInt(req.body.port) || !req.body.username || !req.body.password || !req.body.name) {
        res.json ({
            err: ErrorCode.kParamError
        });
    } else {
        const opt = {
            host: req.body.host,
            port: Utils.safeParseInt(req.body.port) as number,
            user: req.body.username,
            password: req.body.password,
        };
        const engine = new Engine (opt);
        try {
            const session: Engine.Session = await engine.beginSession ();
            const sqlDropDb = `drop database if exists \`${req.body.name}\``;
            await session.query (sqlDropDb);
            const sqlCreateDb = `create database \`${req.body.name}\` default charset utf8mb4 collate utf8mb4_general_ci`;
            await session.query (sqlCreateDb);
            const sqlUseDb = `use \`${req.body.name}\``;
            await session.query (sqlUseDb);
            // create user table
            await session.query (`create table \`user\` (
                \`id\` int auto_increment,
                \`account\` varchar(32) not null,
                \`email\` varchar(255) not null,
                \`passwd\` varchar(32) not null,
                \`name\` varchar(64) not null default '',
                \`state\` tinyint not null default 0,
                \`role\` tinyint not null default 0,
                \`server\` varchar(32) not null default '',
                primary key (\`id\`)
            ) engine=InnoDB default charset=utf8mb4`);
            // create user profile table
            await session.query (`create table \`user_profile\` (
                \`id\` int auto_increment,
                \`user_id\` int not null,
                \`gender\` tinyint not null default 0,
                \`mobile\` varchar(20) not null default '',
                \`avatar\` varchar(64) not null default '',
                primary key (\`id\`)
            ) engine=InnoDB default charset=utf8mb4`);
            // create room table
            await session.query (`create table \`room\` (
                \`id\` int auto_increment,
                \`owner\` int not null,
                \`creation_time\` int not null,
                \`close_time\` int not null default 0,
                \`type\` int not null default 0,
                \`state\` int not null default 0,
                \`server\` int not null default 0,
                \`name\` varchar(64) not null default '',
                \`detail\` varchar(256) not null default '',
                primary key (\`id\`)
            ) engine=InnoDB default charset=utf8mb4`);
            res.redirect ('/install/account');
        } catch (err) {
            console.error (err);
            res.json ({
                err: ErrorCode.kDatabaseError
            });
        }
    }
});

installRouter.get('/account', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    res.render ('install_account', {
        admin: {
            user: '',
            email: ''
        }
    });
});

installRouter.post('/setup_admin', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    if (!req.body.account || !req.body.email || !req.body.md5password) {
        res.json ({
            err: ErrorCode.kParamError
        });
    } else {
        const engine = Config.engine;
        const session = await engine.beginSession ();
        const id = 1;
        try {
            await session.query ({
                sql: 'insert into `user` (id, account, email, passwd, name) values (?, ?, ?, ?, "管理员")',
                param: [ id, req.body.account, req.body.email, req.body.md5password ]
            });
            await session.query ({
                sql: 'insert into `user_profile` (user_id, gender, mobile, avatar) values (?, ?, ?, ?)',
                param: [ id, 0, '', '' ]
            });
            await session.end ();
            res.redirect ('/');
        } catch (err) {
            await session.cancel ();
            console.error (err);
            res.json ({
                err: ErrorCode.kDatabaseError
            });
        }
    }
});
/*
installRouter.get('/storage', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    res.render ('install_storage', {
        storage: {
            external: (Config.storageType || 'local') !== 'local',
            host: Config.storageHost || '',
            port: Config.storagePort || ''
        }
    });
});

installRouter.post('/setup_storage', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    let storageType = req.body.type;
    let storageHost = '';
    let storagePort = 0;
    if (storageType !== 'local') {
        const host = req.body.host;
        const port = Utils.safeParseInt(req.body.port);
        if (!host || !port) {
            return res.json ({
                err: ErrorCode.kParamError
            });
        } else {
            storageHost = host;
            storagePort = port;
        }
    }
    Config.storageType = storageType;
    Config.storageHost = storageHost;
    Config.storagePort = storagePort;
    Config.save ();

    res.redirect ('/');
});

*/
