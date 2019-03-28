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
const config_1 = require("./config");
const utils_1 = require("../common/utils");
const readline = require("readline");
class Server {
    static get redis() {
        return this._redis;
    }
    static pickServer(type) {
        return __awaiter(this, void 0, void 0, function* () {
            const rankKey = this._makeRankKey(type);
            while (true) {
                const serverId = yield this._redis.zrange(rankKey, 0, 0);
                if (serverId && serverId.length === 1) {
                    const info = yield this._redis.hmget(serverId[0], 'host', 'port');
                    if (info && info[0] !== null && info[1] !== null) {
                        return { host: info[0], port: info[1], id: parseInt(serverId[0].split(':')[2], 10) };
                    }
                    else {
                        yield this._redis.zrem(rankKey, serverId);
                        continue;
                    }
                }
                else {
                    break;
                }
            }
            return null;
        });
    }
    static getServerInfo(type, serverId) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = this._makeId(type, serverId);
            const info = yield this._redis.hmget(id, 'host', 'port');
            if (info && info[0] !== null && info[1] !== null) {
                return { host: info[0], port: info[1], id: serverId };
            }
            else {
                return null;
            }
        });
    }
    static init(type) {
        this._type = type;
        this._rank = 0;
        this._postTimer = null;
        this._id = this._makeId(type, config_1.Config.serverId);
        this._redis = config_1.Config.redis;
        this._postTimer = setInterval(() => {
            this._post();
        }, this._ackInterval * 1000);
    }
    static startCli(callback) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: '>'
        });
        rl.prompt();
        rl.on('line', line => {
            if (utils_1.Utils.isString(line)) {
                const cmdline = line.trim().split(/\s+/);
                const command = cmdline.shift();
                if (command === 'exit' || command === 'quit') {
                    process.exit(0);
                }
                else {
                    command && callback && callback(command, cmdline);
                }
            }
            rl.prompt();
        }).on('close', () => {
            process.exit(0);
        });
    }
    static shutdown() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._postTimer) {
                clearTimeout(this._postTimer);
                this._postTimer = null;
            }
            yield this._redis.multi().del(this._id).zrem(this._makeRankKey(this._type), this._id).exec();
        });
    }
    static _post() {
        (() => __awaiter(this, void 0, void 0, function* () {
            yield this._redis.multi().hmset(this._id, {
                host: config_1.Config.serverHost,
                port: config_1.Config.serverPort,
                rank: this._rank
            }).expire(this._id, this._expireTime).zadd(this._makeRankKey(this._type), String(this._rank || 0), this._id).exec();
        }))().catch(err => {
            console.log(`ERR: [ServerInfo._post]: ${err}`);
            process.exit(-1);
        });
    }
    static _makeId(type, id) {
        return `${config_1.Config.redisKeyPrefix}:svr:${type}:${id}`;
    }
    static _makeRankKey(type) {
        return `${config_1.Config.redisKeyPrefix}:server_rank:${type}`;
    }
}
Server._expireTime = 5;
Server._ackInterval = 3;
exports.Server = Server;
//# sourceMappingURL=servermgr.js.map