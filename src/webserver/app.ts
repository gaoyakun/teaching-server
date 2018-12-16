import * as express from 'express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import * as middlewares from './middlewares/middlewares';
import { Config } from './config';
import 'express-async-errors';

Config.load ();

export const app = express ();
app.set ('views', path.join(__dirname, 'views'));
app.set ('view engine', 'ejs');

app.use (logger('dev'));
app.use (express.urlencoded({ extended: false }));
app.use (express.json());
app.use (cookieParser());
app.use (express.static(path.join(__dirname, '../../site')));
app.use (middlewares.middlewareSession);

app.use ('/install', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.render ('install');
});

app.use ((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.send(err.message);
});

export default { app };

