import { Utils} from '../../common/utils';
import { ErrorCode } from '../../common/errcodes';
import { Session } from '../lib/session';
import { Config } from '../config';
import { AssetManager } from '../server/user/assets';
import { WhiteboardManager } from '../server/user/whiteboards';
import * as fileUpload from 'express-fileupload';
import * as express from 'express';
import 'express-async-errors';

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
            res.json (Utils.httpResult(ErrorCode.kParamError));
        } else {
            const rows = await Config.engine.objects('user').filter([{ or:[['account', account],['email',account]] }, ['passwd', password]]).fields(['id','account','name']).all();
            if (rows.length === 1) {
                session.set ({
                    loginUserAccount: account,
                    loginUserId: rows[0].id
                });
                let remember = Utils.safeParseInt(req.body.remember);
                res.cookie(Config.sessionToken, session.id, {
                    expires: remember ? new Date(Date.now() + 1000*3600*24*7) : undefined
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

apiRouter.post('/register', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    let session: Session = req.session as Session;
    if (session.loginUserId) {
        return res.json (Utils.httpResult(ErrorCode.kInvalidOperation));
    }
    let account = req.body.account;
    let email = req.body.email;
    let password = req.body.md5password;
    if (!account || !email || !password) {
        res.json (Utils.httpResult(ErrorCode.kParamError));
    } else {
        const rows = await Config.engine.query({
            sql:'insert into user (account, email, passwd, name) select ?, ?, ?, ? from dual where not exists (select id from user where account=? or email=?)',
            param:[account, email, password, account, account, email]
        });
        if (rows.affectedRows === 1) {
            return res.json (Utils.httpResult(ErrorCode.kSuccess));
        } else {
            return res.json (Utils.httpResult(ErrorCode.kAuthError));
        }
    }
});

apiRouter.get('/trust/asset', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const relPath = req.query.relPath || '/';
    const result = Utils.httpResult(ErrorCode.kSuccess);
    result.data = await AssetManager.loadAssetList ((req.session as Session).loginUserId, relPath);
    return res.json (result);
});

apiRouter.post('/trust/asset', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    if (req.files && req.files.content) {
        const file = req.files.content as fileUpload.UploadedFile;
        await AssetManager.uploadAssetBuffer ((req.session as Session).loginUserId, '/', file.data, file.name);
    }
    return res.json (Utils.httpResult(ErrorCode.kSuccess));
});

apiRouter.get('/trust/whiteboard', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const relPath = req.query.relPath || '/';
    const result = Utils.httpResult(ErrorCode.kSuccess);
    result.data = await WhiteboardManager.loadAssetList ((req.session as Session).loginUserId, relPath);
    return res.json (result);
});

