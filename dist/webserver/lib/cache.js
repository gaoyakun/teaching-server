"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../common/utils");
const errcodes_1 = require("../common/errcodes");
const Redis = require("redis");
class CacheStore {
    static init(redisConfig) {
        if (redisConfig) {
            this.redisClient = Redis.createClient(redisConfig.port, redisConfig.host, redisConfig.options || {});
            this.redisClient.on('error', err => {
                utils_1.Utils.debugOut(err);
            });
        }
    }
    static set(key, value) {
        return new Promise((resolve, reject) => {
            if (value === undefined || !utils_1.Utils.isString(key)) {
                reject(new Error(errcodes_1.ErrorCode[errcodes_1.ErrorCode.kParamError]));
            }
            else {
                if (this.redisClient) {
                    const s = JSON.stringify(value);
                    this.redisClient.set(key, s, err => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve();
                        }
                    });
                }
                else {
                    this.data[key] = utils_1.Utils.deepCopy(value);
                    resolve();
                }
            }
        });
    }
    static get(key) {
        return new Promise((resolve, reject) => {
            if (this.redisClient) {
                this.redisClient.get(key, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(JSON.parse(data));
                    }
                });
            }
            else {
                resolve(utils_1.Utils.deepCopy(this.data[key]));
            }
        });
    }
    static del(key) {
        return new Promise((resolve, reject) => {
            if (this.redisClient) {
                this.redisClient.del(key, (err, reply) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            }
            else {
                if (this.data[key] !== undefined) {
                    delete this.data[key];
                }
                resolve();
            }
        });
    }
    static hdel(key, field) {
        return new Promise((resolve, reject) => {
            if (this.redisClient) {
                this.redisClient.hdel(key, field, err => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            }
            else {
                const t = this.data[key];
                if (t && utils_1.Utils.isObject(t)) {
                    delete t[field];
                }
                resolve();
            }
        });
    }
    static hset(key, field, value) {
        return new Promise((resolve, reject) => {
            if (this.redisClient) {
                const s = JSON.stringify(value);
                this.redisClient.hset(key, field, s, err => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            }
            else {
                if (this.data[key] === undefined) {
                    this.data[key] = {};
                }
                else if (!utils_1.Utils.isObject(this.data[key])) {
                    reject(new Error(errcodes_1.ErrorCode[errcodes_1.ErrorCode.kValueError]));
                }
                else if (value === undefined) {
                    reject(new Error(errcodes_1.ErrorCode[errcodes_1.ErrorCode.kParamError]));
                }
                else {
                    this.data[key][field] = utils_1.Utils.deepCopy(value);
                    resolve();
                }
            }
        });
    }
    static hget(key, field) {
        return new Promise((resolve, reject) => {
            if (this.redisClient) {
                this.redisClient.hget(key, field, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(JSON.parse(result));
                    }
                });
            }
            else {
                let h = this.data[key] || {};
                resolve(utils_1.Utils.deepCopy(h[field]));
            }
        });
    }
}
CacheStore.redisClient = null;
CacheStore.data = {};
exports.CacheStore = CacheStore;
//# sourceMappingURL=cache.js.map