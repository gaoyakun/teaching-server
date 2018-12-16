import { Utils} from '../../common/utils';
import { ErrorCode } from '../../common/errcodes';
import { Session } from '../lib/session';
import { UID } from '../lib/uid';
import { Engine } from '../lib/engine';
import { CacheStore } from '../lib/cache';
import * as express from 'express';

const router = express.Router();

router.get('/auth', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    let session = req.session as Session;
    if (session.loginUserId) {
        res.json(Utils.httpResult(ErrorCode.kSuccess));
    } else {
        res.json(Utils.httpResult(ErrorCode.kAuthError));
    }
});

module.exports = router;
