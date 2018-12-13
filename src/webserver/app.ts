import * as express from 'express';
import * as path from 'path';
import * as engine from './lib/engine';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import * as middlewares from './middlewares/middlewares';

require ('express-async-errors');

export const app = express ();
app.set ('views', path.join(__dirname, 'views'));
app.set ('view engine', 'ejs');

app.use (logger('dev'));
app.use (express.urlencoded({ extended: false }));
app.use (express.json());
app.use (cookieParser());
app.use (express.static(path.join(__dirname, 'public')));
app.use (middlewares.middlewareSession);

app.use (async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const e = new engine.Engine({ user:'root', password:'123456' });
    const databases = await e.query ('show databases');
    console.log (databases);
    await e.close ();
    throw Error('aysnc error test');
});

app.use ((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.send(err.message);
});

export default { app };

