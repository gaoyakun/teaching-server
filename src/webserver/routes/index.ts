import { Utils} from '../../common/utils';
import { ErrorCode } from '../../common/errcodes';
import { Config } from '../config';
import { Session } from '../lib/session';
import { Engine } from '../lib/engine';
import * as express from 'express';
import { RSA_NO_PADDING } from 'constants';

export const indexRouter = express.Router();

indexRouter.get('/', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    if(!Config.test()) {
        res.redirect ('/install/database');
    } else {
        const session:Session = req.session as Session;
        const data: any = {};
        if (session.loginUserId) {
            data.user = {
                name: session.loginUserAccount
            }
            res.render ('index', data);
        } else {
            res.render ('login');
        }
    }
});

indexRouter.get('/login', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    res.render ('login');
});

indexRouter.get('/register', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    res.render ('register');
});

indexRouter.get('/profile', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const session:Session = req.session as Session;
    if (!session.loginUserId) {
        res.redirect ('/login');
    } else {
        res.render ('settings/userprofile', {
            user: {
                name: session.loginUserAccount
            }
        });
    }
});