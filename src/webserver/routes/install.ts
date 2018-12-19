import { Utils} from '../../common/utils';
import { ErrorCode } from '../../common/errcodes';
import { Config } from '../config';
import { Engine } from '../lib/engine';
import * as express from 'express';

export const installRouter = express.Router();

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
            const sqlCreateTable = `create table \`user\` (
                \`id\` int auto_increment,
                \`account\` varchar(32) unique not null,
                \`passwd\` varchar(32) not null,
                \`name\` varchar(64) not null default '',
                \`state\` tinyint not null default 0,
                \`role\` tinyint not null default 0,
                primary key (\`id\`)
            ) engine=InnoDB default charset=utf8mb4;`;
            await session.query (sqlCreateTable);
            Config.databaseHost = opt.host;
            Config.databasePort = opt.port;
            Config.databaseUser = opt.user;
            Config.databasePassword = opt.password;
            Config.databaseName = req.body.name;
            Config.save ();
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
    res.render ('install_account');
});

installRouter.post('/setup_admin', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    if (!req.body.account || !req.body.md5password) {
        res.json ({
            err: ErrorCode.kParamError
        });
    } else {
        const engine = Config.engine;
        try {
            await engine.query ({
                sql: 'insert into `user` (account, passwd, name) values (?, ?, "管理员")',
                param: [ req.body.account, req.body.md5password ]
            });
            res.redirect ('/install/storage');
        } catch (err) {
            console.error (err);
            res.json ({
                err: ErrorCode.kDatabaseError
            });
        }
    }
});

installRouter.get('/storage', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    res.render ('install_storage', {
        storage: {
            external: Config.storageType || false,
            host: Config.storageHost || '',
            port: Config.storagePort || 0
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

