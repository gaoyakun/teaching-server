import { Utils} from '../../common/utils';
import { ErrorCode } from '../../common/errcodes';
import { Config } from '../config';
import { Engine } from '../lib/engine';
import * as express from 'express';

export const installRouter = express.Router();

installRouter.get('/', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const host = Config.databaseHost || '';
    const port = Config.databasePort ? String(Config.databasePort) : '';
    const user = Config.databaseUser || '';
    const password = Config.databasePassword || '';
    const name = Config.databaseName || '';
    res.render ('install', { db: {
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
            res.redirect ('/');
        } catch (err) {
            console.error (err);
            res.json ({
                err: ErrorCode.kDatabaseError
            });
        }
    }
});

