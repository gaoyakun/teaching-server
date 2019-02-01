"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const express = require("express");
require("express-async-errors");
exports.apiRouter = express.Router();
exports.apiRouter.get('/config', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const cfg = {
        sessionToken: config_1.Config.sessionToken,
        redisSessionKey: config_1.Config.redisSessionKey,
        dataPath: config_1.Config.dataPath,
        redisType: config_1.Config.redisType,
        redisHost: config_1.Config.redisHost,
        redisPort: config_1.Config.redisPort,
        storageType: config_1.Config.storageType,
        storageHost: config_1.Config.storageHost,
        storagePort: config_1.Config.storagePort,
        databaseHost: config_1.Config.databaseHost,
        databasePort: config_1.Config.databasePort,
        databaseUser: config_1.Config.databaseUser,
        databasePassword: config_1.Config.databasePassword,
        databaseName: config_1.Config.databaseName
    };
    return res.json(cfg);
}));
exports.apiRouter.get('/roomservers', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
}));
//# sourceMappingURL=api.js.map