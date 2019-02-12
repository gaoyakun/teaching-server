"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
require("express-async-errors");
exports.apiRouter = express.Router();
/*
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

*/ 
//# sourceMappingURL=api.js.map