"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const os = require("os");
const engine_1 = require("../lib/engine");
const utils_1 = require("../common/utils");
const configFileDir = path.join(os.homedir(), '.open_teaching');
const jsonConfigFileName = path.join(configFileDir, 'server_config.json');
const defaultDataPath = path.join(configFileDir, 'data');
const defaultSessionToken = 'ts_session_id';
const defaultRedisSessionKey = 'session_list';
const MAX_USER_ID_LENGTH = 8;
class Config {
    static load() {
        try {
            if (fs.existsSync(jsonConfigFileName)) {
                const content = fs.readFileSync(jsonConfigFileName, 'utf-8');
                this._config = JSON.parse(content);
            }
        }
        catch (err) {
            console.log('load configurations failed: ' + err);
            this._config = null;
        }
    }
    static save() {
        if (this._config) {
            try {
                if (!fs.existsSync(configFileDir)) {
                    fs.mkdirSync(configFileDir);
                }
                const content = JSON.stringify(this._config);
                fs.writeFileSync(jsonConfigFileName, content, 'utf-8');
            }
            catch (err) {
                console.log('save configurations failed: ' + err);
            }
        }
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
        return this._config && this._config.sessionToken || defaultSessionToken;
    }
    static get redisSessionKey() {
        return this._config && this._config.redisSessionKey || defaultRedisSessionKey;
    }
    static get dataPath() {
        return this._config && this._config.dataPath || defaultDataPath;
    }
    static get redisType() {
        return this._config && this._config.redisConfig ? (this._config.redisConfig.type || null) : null;
    }
    static set redisType(type) {
        if (!this._config) {
            this._config = {};
        }
        if (!this._config.redisConfig) {
            this._config.redisConfig = {};
        }
        this._config.redisConfig.type = type;
    }
    static get redisHost() {
        return this._config && this._config.redisConfig ? (this._config.redisConfig.host || null) : null;
    }
    static set redisHost(host) {
        if (!this._config) {
            this._config = {};
        }
        if (!this._config.redisConfig) {
            this._config.redisConfig = {};
        }
        this._config.redisConfig.host = host;
    }
    static get redisPort() {
        return this._config && this._config.redisConfig ? (this._config.redisConfig.port || null) : null;
    }
    static set redisPort(port) {
        if (!this._config) {
            this._config = {};
        }
        if (!this._config.redisConfig) {
            this._config.redisConfig = {};
        }
        this._config.redisConfig.port = port;
    }
    static get storageType() {
        return this._config && this._config.storageConfig ? (this._config.storageConfig.type || null) : null;
    }
    static set storageType(type) {
        if (!this._config) {
            this._config = {};
        }
        if (!this._config.storageConfig) {
            this._config.storageConfig = {};
        }
        this._config.storageConfig.type = type;
    }
    static get storageHost() {
        return this._config && this._config.storageConfig ? (this._config.storageConfig.host || null) : null;
    }
    static set storageHost(host) {
        if (!this._config) {
            this._config = {};
        }
        if (!this._config.storageConfig) {
            this._config.storageConfig = {};
        }
        this._config.storageConfig.host = host;
    }
    static get storagePort() {
        return this._config && this._config.storageConfig ? (this._config.storageConfig.port || null) : null;
    }
    static set storagePort(port) {
        if (!this._config) {
            this._config = {};
        }
        if (!this._config.storageConfig) {
            this._config.storageConfig = {};
        }
        this._config.storageConfig.port = port;
    }
    static get databaseHost() {
        return this._config && this._config.databaseConfig ? (this._config.databaseConfig.host || null) : null;
    }
    static set databaseHost(host) {
        if (!this._config) {
            this._config = {};
        }
        if (!this._config.databaseConfig) {
            this._config.databaseConfig = {};
        }
        this._config.databaseConfig.host = host;
    }
    static get databasePort() {
        return this._config && this._config.databaseConfig ? (this._config.databaseConfig.port || null) : null;
    }
    static set databasePort(port) {
        if (!this._config) {
            this._config = {};
        }
        if (!this._config.databaseConfig) {
            this._config.databaseConfig = {};
        }
        this._config.databaseConfig.port = port;
    }
    static get databaseUser() {
        return this._config && this._config.databaseConfig ? (this._config.databaseConfig.user || null) : null;
    }
    static set databaseUser(user) {
        if (!this._config) {
            this._config = {};
        }
        if (!this._config.databaseConfig) {
            this._config.databaseConfig = {};
        }
        this._config.databaseConfig.user = user;
    }
    static get databasePassword() {
        return this._config && this._config.databaseConfig ? (this._config.databaseConfig.password || null) : null;
    }
    static set databasePassword(password) {
        if (!this._config) {
            this._config = {};
        }
        if (!this._config.databaseConfig) {
            this._config.databaseConfig = {};
        }
        this._config.databaseConfig.password = password;
    }
    static get databaseName() {
        return this._config && this._config.databaseConfig ? (this._config.databaseConfig.name || null) : null;
    }
    static set databaseName(name) {
        if (!this._config) {
            this._config = {};
        }
        if (!this._config.databaseConfig) {
            this._config.databaseConfig = {};
        }
        this._config.databaseConfig.name = name;
    }
    static get engine() {
        if (!this._engine) {
            if (this.testDatabaseConfig()) {
                const opt = {
                    host: this.databaseHost,
                    port: this.databasePort,
                    user: this.databaseUser,
                    password: this.databasePassword,
                    database: this.databaseName
                };
                this._engine = new engine_1.Engine(opt);
            }
        }
        if (!this._engine) {
            throw new Error('Database engine not initialized');
        }
        return this._engine;
    }
    static testDatabaseConfig() {
        if (this.databaseHost && this.databasePort && this.databaseUser && this.databasePassword && this.databaseName) {
            return true;
        }
        return false;
    }
    static testStorageConfig() {
        const storageType = this.storageType;
        if (!storageType) {
            return false;
        }
        if (storageType !== 'local' && (this.storageHost === null || this.storagePort === null)) {
            return false;
        }
        return true;
    }
    static test() {
        return this.testStorageConfig() && this.testDatabaseConfig();
    }
}
Config._config = null;
Config._engine = null;
exports.Config = Config;
//# sourceMappingURL=config.js.map