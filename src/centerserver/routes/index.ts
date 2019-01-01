import { Config } from '../config';
import { Utils } from '../../common/utils';
import { ErrorCode } from '../../common/errcodes';
import * as express from 'express';
import 'express-async-errors';

export const indexRouter = express.Router();

indexRouter.get('/', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    if(!Config.test()) {
        res.redirect ('/install/database');
    } else {
        res.render ('index');
    }
});

