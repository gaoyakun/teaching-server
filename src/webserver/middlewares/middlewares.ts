import { ErrorCode } from '../../common/errcodes';
import { Utils } from '../../common/utils';
import { Session } from '../lib/session';
import { Config } from '../config';

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
    const sessionId = req.cookies[Config.sessionToken];
    if (sessionId) {
        req.session = await Session.loadSession(sessionId) || undefined;
        if (req.session) {
            console.log (`*** <${req.url}> session loaded from cookie ${sessionId}`);
        } else {
            console.log (`*** <${req.url}> session not loaded from cookie ${sessionId}`);
        }
    }
    if (!req.session) {
        req.session = new Session ();
        await req.session.save ();
        console.log (`*** <${req.url}> session created and cookie set to ${req.session.id}`);
        res.cookie(Config.sessionToken, req.session.id, {
            expires: new Date(Date.now() + 1000*3600*24*7)
        });
    }
    return next();
};
