"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../common/utils");
const errcodes_1 = require("../../common/errcodes");
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
                    this.redisClient.set(key, s, (err, reply) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve('Ok');
                        }
                    });
                }
                else {
                    this.data[key] = utils_1.Utils.deepCopy(value);
                    resolve('Ok');
                }
            }
        });
    }
    static get(key) {
        return new Promise((resolve, reject) => {
            if (!utils_1.Utils.isString(key)) {
                reject(new Error(errcodes_1.ErrorCode[errcodes_1.ErrorCode.kParamError]));
            }
            else if (this.redisClient) {
                this.redisClient.get(key, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(utils_1.Utils.isString(data) ? JSON.parse(data) : null);
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
            if (!utils_1.Utils.isString(key)) {
                reject(new Error(errcodes_1.ErrorCode[errcodes_1.ErrorCode.kParamError]));
            }
            else if (this.redisClient) {
                this.redisClient.del(key, (err, reply) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve('Ok');
                    }
                });
            }
            else {
                if (this.data[key] !== undefined) {
                    delete this.data[key];
                }
                resolve('Ok');
            }
        });
    }
}
CacheStore.redisClient = null;
CacheStore.data = {};
exports.CacheStore = CacheStore;
/*
cache_store.prototype.hset = function cache_hset (key, field, value, callback) {
    if (this.data[key] === undefined) {
        this.data[key] = {};
    } else if (!utils.isObject(this.data[key])) {
        return this.error(`object for key ${key} is not an object`, callback);
    } else if (value === undefined) {
        return this.error('Value cannot be undefined', callback);
    }
    this.data[key][field] = utils.deepCopy(value);
    callback && callback (null);
};

cache_store.prototype.hget = function cache_hget (key, field, callback) {
    let h = this.data[key] || {};
    callback && callback (null, utils.deepCopy(h[field]));
};

cache_store.prototype.llen = function cache_llen (key, callback) {
    if (!utils.isArray(this.data[key])) {
        return this.error (`object for key ${key} is not an array`, callback);
    }
    callback && callback (null, this.data[key].length);
};

cache_store.prototype.lpush = function cache_lpush (key, value, callback) {
    if (this.data[key] === undefined) {
        this.data[key] = [];
    } else if (!utils.isArray(this.data[key])) {
        return this.error(`object for key ${key} is not an array`, callback);
    } else if (value === undefined) {
        return this.error('Value cannot be undefined', callback);
    }
    if (utils.isArray(value)) {
        for (var i = value.length-1; i >= 0; i--) {
            this.data[key].unshift(utils.deepCopy(value[i]));
        }
    } else {
        this.data[key].unshift(utils.deepCopy(value));
    }
    callback && callback (null);
};

cache_store.prototype.rpush = function cache_lpush (key, value, callback) {
    if (this.data[key] === undefined) {
        this.data[key] = [];
    } else if (!utils.isArray(this.data[key])) {
        return this.error(`object for key ${key} is not an array`, callback);
    } else if (value === undefined) {
        return this.error('Value cannot be undefined', callback);
    }
    if (utils.isArray(value)) {
        for (var i = 0; i < value.length; i++) {
            this.data[key].push(utils.deepCopy(value[i]));
        }
    } else {
        this.data[key].push(utils.deepCopy(value));
    }
    callback && callback (null);
};

cache_store.prototype.lpop = function cache_lpop (key, callback) {
    if (!utils.isArray(this.data[key])) {
        return this.error(`object for key ${key} is not an array`, callback);
    } else if (this.data[key].length == 0) {
        return this.error('array is empty', callback);
    }
    let val = this.data[key].shift();
    callback && callback (null, utils.deepCopy(val));
};

cache_store.prototype.rpop = function cache_lpop (key, callback) {
    if (!utils.isArray(this.data[key])) {
        return this.error(`object for key ${key} is not an array`, callback);
    } else if (this.data[key].length == 0) {
        return this.error('array is empty', callback);
    }
    let val = this.data[key].pop();
    callback && callback (null, utils.deepCopy(val));
};

cache_store.prototype.linsert = function cache_linsert (key, index, value, callback) {
    if (!utils.isArray(this.data[key])) {
        return this.error(`object for key ${key} is not an array`, callback);
    } else if (index < 0 || index > this.data[key].length) {
        return this.error(`index (${index}) out of range`, callback);
    } else if (value === undefined) {
        return this.error('Value cannot be undefined', callback);
    }
    this.data[key].splice(index, 0, utils.deepCopy(value));
    callback && callback (null);
};

cache_store.prototype.lremove = function cache_lremove (key, index, callback) {
    if (!utils.isArray(this.data[key])) {
        return this.error(`object for key ${key} is not an array`, callback);
    } else if (index < 0 || index >= this.data[key].length) {
        return this.error(`index (${index}) out of range`, callback);
    }
    this.data[key].splice(index, 1);
    callback && callback (null);
};

cache_store.prototype.lindex = function cache_lindex (key, index, callback) {
    if (!utils.isArray(this.data[key])) {
        return this.error(`object for key ${key} is not an array`, callback);
    } else if (index < 0 || index >= this.data[key].length) {
        return this.error(`index (${index}) out of range`, callback);
    }
    callback && callback (null, utils.deepCopy(this.data[key][index]));
};

cache_store.prototype.lrange = function cache_lrange (key, start, end, callback) {
    if (!utils.isArray(this.data[key])) {
        return this.error(`object for key ${key} is not an array`, callback);
    } else {
        const len = this.data[key].length;
        if (len == 0) {
            callback && callback (null, []);
            return;
        }
        if (start < 0) {
            start = len + start;
        }
        if (end < 0) {
            end = len + end;
        }
        if (start < 0) {
            start = 0;
        }
        if (end >= len) {
            end = len - 1;
        }
        if (end < 0 || start > end) {
            callback && callback (null, []);
            return;
        }
        let result = [];
        for (let i = start; i <= end; i++) {
            result.push (utils.deepCopy(this.data[key][i]));
        }
        callback && callback (null, result);
    }
};

cache_store.prototype.ltrim = function cache_lrange (key, start, end, callback) {
    if (!utils.isArray(this.data[key])) {
        return this.error(`object for key ${key} is not an array`, callback);
    } else {
        const len = this.data[key].length;
        if (len == 0) {
            callback && callback (null, []);
            return;
        }
        if (start < 0) {
            start = len + start;
        }
        if (end < 0) {
            end = len + end;
        }
        if (start < 0) {
            start = 0;
        }
        if (end >= len) {
            end = len - 1;
        }
        if (end < 0 || start > end) {
            callback && callback (null, []);
            return;
        }
        let result = [];
        for (let i = start; i <= end; i++) {
            result.push (utils.deepCopy(this.data[key][i]));
        }
        callback && callback (null, result);
    }
};
*/
//# sourceMappingURL=cache.js.map