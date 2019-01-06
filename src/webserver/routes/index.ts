import { Session } from '../../lib/session';
import { Utils } from '../../common/utils';
import { ErrorCode } from '../../common/errcodes';
import { AssetManager } from '../server/user/assets';
import { GetConfig } from '../../lib/config';
import * as express from 'express';
import 'express-async-errors';

export const indexRouter = express.Router();

indexRouter.get('/', (req:express.Request, res:express.Response, next:express.NextFunction) => {
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
});

indexRouter.get('/login', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    res.render ('login');
});

indexRouter.get('/register', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    res.render ('register');
});

indexRouter.get('/trust/settings/profile', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    res.render ('settings/userprofile', {
        user: {
            name: (req.session as Session).loginUserAccount
        }
    });
});

indexRouter.get('/trust/settings/reset', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    res.render ('settings/resetpass', {
        user: {
            name: (req.session as Session).loginUserAccount
        }
    });
});

indexRouter.get('/trust/assets/image', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const thumb = Utils.safeParseInt(req.query.thumb) || 0;
    const relPath = req.query.relPath;
    const name = req.query.name;
    if (!name || !relPath) {
        return res.status(404).json (Utils.httpResult(ErrorCode.kParamError));
    }
    const content = await AssetManager.readAssetContent((req.session as Session).loginUserId, relPath, name, thumb !== 0);
    if (!content) {
        return res.status(404).json (Utils.httpResult(ErrorCode.kFileNotFound));
    } else {
        res.writeHead (200, {
            'Content-Type': 'image/jpeg'
        });
        res.end (content);
    }
});

indexRouter.get('/trust/settings/assets', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    res.render ('settings/assets', {
        user: {
            name: (req.session as Session).loginUserAccount
        }
    });
});

indexRouter.get('/trust/settings/sessions', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const session = req.session as Session;
    const sessionList:any = await GetConfig.engine.objects('room').filter(['owner', session.loginUserId]).all();
    const sessionArray: any[] = [];
    for (let i = 0; i < sessionList.length; i++) {
        sessionArray.push ({
            name: sessionList[i].name,
            detail: sessionList[i].desc
        });
    }
    res.render ('settings/sessions', {
        user: {
            name: (req.session as Session).loginUserAccount
        },
        sessions: sessionArray
    });
});

indexRouter.get('/trust/settings/whiteboards', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    res.render ('settings/whiteboards', {
        user: {
            name: (req.session as Session).loginUserAccount,
        },
        whiteboards: []
    });
});

indexRouter.get('/trust/create-whiteboard', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    res.render ('create_whiteboard');
});

