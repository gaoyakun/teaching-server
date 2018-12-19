import { Utils} from '../../common/utils';
import { ErrorCode } from '../../common/errcodes';
import { Session } from '../lib/session';
import { Engine } from '../lib/engine';
import { Config } from '../config';
import * as express from 'express';

export const apiRouter = express.Router();

apiRouter.get('/auth', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    let session = req.session as Session;
    if (session.loginUserId) {
        res.json(Utils.httpResult(ErrorCode.kSuccess));
    } else {
        res.json(Utils.httpResult(ErrorCode.kAuthError));
    }
});

apiRouter.post('/login', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    let session: Session = req.session as Session;
    if (!session.loginUserId) {
        let account = req.body.account;
        let password = req.body.md5password;
        if (!account || !password) {
            res.json (Utils.httpResult(ErrorCode.kInvalidParameter));
        } else {
            const rows = await Config.engine.objects('user').filter([{ or:[['account', account],['email',account]] }, ['passwd', password]]).fields(['id','account','name']).all();
            if (rows.length === 1) {
                session.set ({
                    loginUserAccount: account,
                    loginUserId: rows[0].id
                });
                res.json (Utils.httpResult(ErrorCode.kSuccess));
            } else {
                res.json (Utils.httpResult(ErrorCode.kAuthError));
            }
        }
    } else {
        res.json (Utils.httpResult(ErrorCode.kSuccess));
    }
});

