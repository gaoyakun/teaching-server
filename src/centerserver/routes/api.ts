import { Utils} from '../../common/utils';
import { Config } from '../config';
import * as express from 'express';
import 'express-async-errors';

export const apiRouter = express.Router();

apiRouter.get('/config', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const cfg = {
        sessionToken: Config.sessionToken,
        redisSessionKey: Config.redisSessionKey,
        dataPath: Config.dataPath,
        redisType: Config.redisType,
        redisHost: Config.redisHost,
        redisPort: Config.redisPort,
        storageType: Config.storageType,
        storageHost: Config.storageHost,
        storagePort: Config.storagePort,
        databaseHost: Config.databaseHost,
        databasePort: Config.databasePort,
        databaseUser: Config.databaseUser,
        databasePassword: Config.databasePassword,
        databaseName: Config.databaseName
    }
    return res.json (cfg);
});

apiRouter.get('/roomservers', async (req:express.Request, res:express.Response, next:express.NextFunction) => {

});

