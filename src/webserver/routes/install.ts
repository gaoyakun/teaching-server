import { Utils} from '../../common/utils';
import { ErrorCode } from '../../common/errcodes';
import { Session } from '../lib/session';
import { Config } from '../config';
import { Engine } from '../lib/engine';
import * as express from 'express';

const router = express.Router();

router.get('/', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    let session = req.session as Session;
    if (session.loginUserId) {
        res.json(Utils.httpResult(ErrorCode.kSuccess));
    } else {
        res.json(Utils.httpResult(ErrorCode.kAuthError));
    }
});

router.post('/setup_database', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
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
            await session.query (`drop database if exists \`${req.body.name}\``);
            await session.query (`create database \`${req.body.name}\` default charset utf8mb4 collate utf8mb4_general_ci`);
            await session.query (`use \`${req.body.name}\``);
            await session.query (`create table \`user\` (
                \`id\` int auto_increment,
                \`account\` varchar(32) unique not null,
                \`passwd\` varchar(32) not null,
                \`name\` varchar(64) not null default '',
                \`state\` tinyint not null default 0,
                \`role\` tinyint not null default 0,
                primary key (\`id\`)
            ) engine=InnoDB default charset=utf8mb4;`);
            Config.databaseHost = opt.host;
            Config.databasePort = opt.port;
            Config.databaseUser = opt.user;
            Config.databasePassword = opt.password;
            Config.databaseName = req.body.name;
            Config.save ();
            res.redirect ('/');
        } catch (err) {
            res.json ({
                err: ErrorCode.kDatabaseError
            });
        }
    }
});

module.exports = router;
