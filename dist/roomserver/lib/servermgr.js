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
const utils_1 = require("../common/utils");
const readline = require("readline");
class Server {
    static get redis() {
        return this._redis;
    }
    static get id() {
        return Number(this._config.id);
    }
    static get address() {
        return this._ip;
    }
    static get port() {
        return this._port;
    }
    static pickServer(type) {
        return __awaiter(this, void 0, void 0, function* () {
            const rankKey = `server_rank:${type}`;
            while (true) {
                const serverId = yield this._redis.zrange(rankKey, 0, 0);
                if (serverId && serverId.length === 1) {
                    const info = yield this._redis.hmget(serverId[0], 'ip', 'port');
                    if (info && info[0] !== null && info[1] !== null) {
                        return { ip: info[0], port: info[1], id: parseInt(serverId[0].split(':')[2], 10) };
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
            const id = `svr:${type}:${serverId}`;
            const info = yield this._redis.hmget(id, 'ip', 'port');
            if (info && info[0] !== null && info[1] !== null) {
                return { ip: info[0], port: info[1], id: serverId };
            }
            else {
                return null;
            }
        });
    }
    static init(type, config, serverConfigJson) {
        this._type = type;
        this._rank = 0;
        this._postTimer = null;
        this._redis = config.redis;
        this._config = require(serverConfigJson);
        this._id = `svr:${type}:${this._config.id}`;
        this._ip = this._config.address;
        this._port = this._config.port;
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
            if (this._id !== '') {
                yield this._redis.multi().del(this._id).zrem(`server_rank:${this._type}`, this._id).exec();
            }
        });
    }
    static _post() {
        (() => __awaiter(this, void 0, void 0, function* () {
            yield this._redis.multi().hmset(this._id, {
                ip: this._ip,
                port: this._port,
                rank: this._rank
            }).expire(this._id, this._expireTime).zadd(`server_rank:${this._type}`, String(this._rank || 0), this._id).exec();
        }))().catch(err => {
            console.log(`ERR: [ServerInfo._post]: ${err}`);
            process.exit(-1);
        });
    }
}
Server._expireTime = 5;
Server._ackInterval = 3;
exports.Server = Server;
//# sourceMappingURL=servermgr.js.map