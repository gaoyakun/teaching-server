import { Config } from '../config';
import { Session } from '../lib/session';
import { Utils } from '../../common/utils';
import { ErrorCode } from '../../common/errcodes';
import { AssetManager } from '../server/user/assets';
import * as express from 'express';
import 'express-async-errors';

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

indexRouter.get('/trust/settings/sessions', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    res.render ('settings/sessions', {
        user: {
            name: (req.session as Session).loginUserAccount
        },
        sessions: [{
            name: '算法导论',
            detail: '算法导论讲座，主要讲解《算法导论》第四版内容，现已开放。'
        }, {
            name: '如何养猪',
            detail: '讲解养猪经验，欢迎前来学习。'
        }]
    });
});

