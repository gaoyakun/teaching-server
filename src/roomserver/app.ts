import * as path from 'path';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import * as middlewares from '../lib/middlewares';
import { Utils } from '../common/utils';
import { ErrorCode } from '../common/errcodes';
import { GetConfig } from '../lib/config';
import { ServerType } from '../lib/constants';
import 'express-async-errors';
import { Server } from '../lib/servermgr';
import { indexRouter } from './routes/index';

const app = express ();

async function initializeApp () {
    await GetConfig.load ();
    Server.init (ServerType.Room, GetConfig, path.join(__dirname, 'conf', 'config.json'));

    app.set ('views', path.join(__dirname, 'views'));
    app.set ('view engine', 'ejs');

    app.use (logger('dev'));
    app.use (express.urlencoded({ extended: false }));
    app.use (express.json());
    app.use (cookieParser());
    app.use (express.static(path.join(__dirname, '../../site')));
    app.use (middlewares.middlewareSession);

    app.use ((req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.set ('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        next ();
    });
    
    app.use ('/', indexRouter);
    
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
}

export { app, initializeApp };

