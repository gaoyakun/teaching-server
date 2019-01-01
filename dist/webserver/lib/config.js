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
const http = require("http");
const path = require("path");
const engine_1 = require("./engine");
const utils_1 = require("../common/utils");
const REDIS_SESSION_KEY = 'session_list';
exports.REDIS_SESSION_KEY = REDIS_SESSION_KEY;
const MAX_USER_ID_LENGTH = 8;
class GetConfig {
    static load() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const options = {
                    hostname: 'localhost',
                    port: 9000,
                    path: '/api/config',
                    method: 'GET'
                };
                let response = '';
                const req = http.request(options, res => {
                    res.setEncoding('utf8');
                    res.on('data', trunk => {
                        response += trunk;
                    });
                    res.on('end', () => {
                        this._config = JSON.parse(response);
                        resolve(this._config);
                    });
                });
                req.on('error', err => {
                    reject(err);
                });
                req.end();
            });
        });
    }
    static getUserDataPathById(userId) {
        if (!utils_1.Utils.isInt(userId)) {
            throw new Error(`[Config.getUserDataPathById]: Invalid user id ${userId}`);
        }
        let strId = String(userId);
        if (strId.length > MAX_USER_ID_LENGTH) {
            throw new Error(`[Config.getUserDataPathById]: Invalid user id ${userId}`);
        }
        for (let i = 0; i < MAX_USER_ID_LENGTH; i++) {
            strId = '0' + strId;
        }
        return path.join(this.dataPath, strId);
    }
    static get sessionToken() {
        return this._config && this._config.sessionToken || '';
    }
    static get redisSessionKey() {
        return this._config && this._config.redisSessionKey || '';
    }
    static get dataPath() {
        return this._config && this._config.dataPath || '';
    }
    static get redisType() {
        return this._config && this._config.redisType || '';
    }
    static get redisHost() {
        return this._config && this._config.redisHost || '';
    }
    static get redisPort() {
        return this._config && this._config.redisPort || 0;
    }
    static get storageType() {
        return this._config && this._config.storageType || '';
    }
    static get storageHost() {
        return this._config && this._config.storageHost || '';
    }
    static get storagePort() {
        return this._config && this._config.storagePort || 0;
    }
    static get databaseHost() {
        return this._config && this._config.databaseHost || '';
    }
    static get databasePort() {
        return this._config && this._config.databasePort || 0;
    }
    static get databaseUser() {
        return this._config && this._config.databaseUser || '';
    }
    static get databasePassword() {
        return this._config && this._config.databasePassword || '';
    }
    static get databaseName() {
        return this._config && this._config.databaseName || '';
    }
    static get engine() {
        if (!this._engine) {
            const opt = {
                host: this.databaseHost,
                port: this.databasePort,
                user: this.databaseUser,
                password: this.databasePassword,
                database: this.databaseName
            };
            this._engine = new engine_1.Engine(opt);
        }
        return this._engine;
    }
}
GetConfig._config = null;
GetConfig._engine = null;
exports.GetConfig = GetConfig;
//# sourceMappingURL=config.js.map