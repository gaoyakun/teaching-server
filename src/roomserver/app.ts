import * as path from 'path';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import { Utils } from '../common/utils';
import { ErrorCode } from '../common/errcodes';
import { GetConfig } from '../lib/config';
import { ServerType } from '../lib/constants';
import 'express-async-errors';
import { Server } from '../lib/servermgr';

const app = express ();

GetConfig.load ().then (cfg => {
    const redisConfig = (cfg.redisType && cfg.redisType !== 'local') ? {
        port: cfg.redisPort,
        host: cfg.redisHost
    } : null;
    Server.init (ServerType.Room, 'localhost', 8900, GetConfig);

    app.set ('views', path.join(__dirname, 'views'));
    app.set ('view engine', 'ejs');

    app.use (logger('dev'));
    app.use (express.urlencoded({ extended: false }));
    app.use (express.json());
    app.use (cookieParser());
    app.use (express.static(path.join(__dirname, '../../site')));

    app.use ((req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.render ('error', {
            error: {
                code: 404,
                message: '对不起，您访问的页面不存在。'
            }
        });
    });

    app.use ((err:any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.error (err.stack);
        if (req.xhr) {
            res.status(500).json (Utils.httpResult(ErrorCode.kServerError));
        } else {
            res.render ('error', {
                error: {
                    code: err.code ? Number(err.code) : 500,
                    message: String(err.message) || '对不起，服务器错误，请联系客服。'
                }
            });
        }
    });
}).catch (err => {
    console.log (`Load configuration failed: ${err}`);
    process.exit (1);
});

export { app };

