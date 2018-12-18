import { ErrorCode } from '../../common/errcodes';
import { Utils } from '../../common/utils';
import { Session } from '../lib/session';

const SESSION_COOKIE = 'ts_session_id';

declare global {
    namespace Express {
        interface Request {
            session?: Session;
        }
    }
}

import * as express from 'express';

export const middlewareAppAuth = function (req: express.Request, res: express.Response, next: express.NextFunction) {
    let session = req.session;
    if (!session || !session.loginUserId) {
        return res.json (Utils.httpResult(ErrorCode.kAuthError));
    } else {
        next ();
    }
}

export const middlewareSession = async function (req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.session) {
        return next();
    }
    const sessionId = req.cookies[SESSION_COOKIE];
    if (sessionId) {
        req.session = await Session.loadSession(sessionId) || undefined;
    }
    if (!req.session) {
        req.session = new Session ();
        await req.session.save ();
        res.cookie(SESSION_COOKIE, req.session.id);
    }
    return next();
};
