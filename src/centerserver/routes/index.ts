import * as express from 'express';
import 'express-async-errors';

export const indexRouter = express.Router();

indexRouter.get('/', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    res.render ('index');
});

