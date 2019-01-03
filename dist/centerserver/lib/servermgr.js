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
const uid_1 = require("./uid");
const Redis = require("ioredis");
class Server {
    static get redis() {
        return this._redis;
    }
    static init(type, ip, port, config) {
        this._type = type;
        this._id = '';
        this._ip = ip;
        this._port = port;
        this._rank = 0;
        this._postTimer = null;
        this._redis = new Redis(config.redisPort, config.redisHost);
        this._postTimer = setInterval(() => {
            this._post();
        }, this._ackInterval * 1000);
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
            if (this._id === '') {
                const serverId = yield this._redis.incr(`server_id:${this._type}`);
                this._id = uid_1.UID('SVR', serverId);
            }
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