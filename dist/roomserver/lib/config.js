"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const engine_1 = require("./engine");
const utils_1 = require("../common/utils");
const os = require("os");
const path = require("path");
const Redis = require("ioredis");
const MAX_USER_ID_LENGTH = 8;
let cmdlineParams = null;
function getCommandLineParams() {
    const [node, path, ...argv] = process.argv;
    let result = {};
    let key = '';
    let val = '';
    for (let i = 0; i < argv.length; i++) {
        if (argv[i].startsWith('--')) {
            if (key !== '') {
                result[key] = val;
            }
            key = argv[i].slice(2);
            val = '';
        }
        else if (val !== '') {
            throw new Error(`Invalid command line parameter ${val}`);
        }
        else {
            val = argv[i];
        }
    }
    if (key !== '') {
        result[key] = val;
    }
    return result;
}
function getParam(name, defaultValue) {
    if (!cmdlineParams) {
        cmdlineParams = getCommandLineParams();
    }
    return cmdlineParams[name] || process.env[`OT_${name.toUpperCase()}`] || (utils_1.Utils.isString(defaultValue) ? defaultValue : defaultValue(name));
}
function dieForParam(param) {
    throw new Error(`Parameter required: ${param}`);
}
function useSSL() {
    return getParam('ssl', 'off') === 'on';
}
class Config {
    static get redis() {
        if (!this._redis) {
            this._redis = new Redis(this.redisPort, this.redisHost);
        }
        if (!this._redis) {
            throw new Error('Redis not initialized');
        }
        return this._redis;
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
Config.sessionToken = getParam('session_token', 'ts_session_id');
Config.redisSessionKey = getParam('redis_session_key', 'session_list');
Config.serverId = Number(getParam('server_id', dieForParam));
Config.useSSL = useSSL();
Config.sslCertFile = useSSL() ? getParam('ssl_cert', dieForParam) : '';
Config.sslKeyFile = useSSL() ? getParam('ssl_key', dieForParam) : '';
Config.serverHost = `${useSSL() ? 'https://' : 'http://'}${getParam('server_host', 'localhost')}`;
Config.serverPort = getParam('server_port', dieForParam);
Config.dataPath = getParam('data_path', path.join(os.homedir(), '.open_teaching', 'data'));
Config.redisHost = getParam('redis_host', 'localhost');
Config.redisPort = Number(getParam('redis_port', '6379'));
Config.storageType = getParam('storage_type', 'local');
Config.storageHost = getParam('storage_host', 'localhost');
Config.storagePort = Number(getParam('storage_port', '8000'));
Config.databaseHost = getParam('database_host', 'localhost');
Config.databasePort = Number(getParam('database_port', '3306'));
Config.databaseUser = getParam('database_user', 'root');
Config.databasePassword = getParam('database_pass', dieForParam);
Config.databaseName = getParam('database_name', 'open_teaching_web');
Config.rtcAnnouncedIPv4 = getParam('rtc_announced_ipv4', '');
Config.rtcAnnouncedIPv6 = getParam('rtc_announced_ipv6', '');
Config._engine = null;
Config._redis = null;
exports.Config = Config;
//# sourceMappingURL=config.js.map