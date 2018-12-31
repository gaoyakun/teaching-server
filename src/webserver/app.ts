import * as express from 'express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as fileUpload from 'express-fileupload';
import * as logger from 'morgan';
import * as middlewares from './middlewares/middlewares';
import { Config } from './config';
import { CacheStore } from './lib/cache';
import { Utils } from '../common/utils';
import { ErrorCode } from '../common/errcodes';
import { installRouter } from './routes/install';
import { indexRouter } from './routes/index';
import { apiRouter } from './routes/api';
import 'express-async-errors';

Config.load ();

const redisConfig = (Config.redisType && Config.redisType !== 'local') ? {
    port: Config.redisPort,
    host: Config.redisHost
} : null;
CacheStore.init (redisConfig);

export const app = express ();
app.set ('views', path.join(__dirname, 'views'));
app.set ('view engine', 'ejs');

app.use (logger('dev'));
app.use (express.urlencoded({ extended: false }));
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));
app.use (express.json());
app.use (cookieParser());
app.use (express.static(path.join(__dirname, '../../site')));
app.use (middlewares.middlewareSession);

app.use ('/trust', middlewares.middlewareAuth);
app.use ('/api/trust', middlewares.middlewareAuth);
app.use ('/api', apiRouter);
app.use ('/install', installRouter);
app.use ('/', indexRouter);

app.use ((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const session = req.session;
    res.render ('error', {
        user: session && session.loginUserId ? { name: session.loginUserAccount } : undefined,
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
        const session = req.session;
        res.render ('error', {
            user: session && session.loginUserId ? { name: session.loginUserAccount } : undefined,
            error: {
                code: err.code ? Number(err.code) : 500,
                message: String(err.message) || '对不起，服务器错误，请联系客服。'
            }
        });
    }
});

export default { app };

