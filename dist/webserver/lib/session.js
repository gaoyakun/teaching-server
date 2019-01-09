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
const servermgr_1 = require("./servermgr");
const config_1 = require("../lib/config");
const redisSessionKey = config_1.REDIS_SESSION_KEY;
class Session {
    constructor(id) {
        this._id = id || uid_1.UID('sid');
        this._data = {};
    }
    static loadSession(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield servermgr_1.Server.redis.hget(redisSessionKey, id);
            if (data) {
                const session = new Session(id);
                session._data = JSON.parse(data);
                return session;
            }
            else {
                return null;
            }
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            yield servermgr_1.Server.redis.hset(redisSessionKey, this._id, JSON.stringify(this._data));
        });
    }
    ;
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield servermgr_1.Server.redis.hget(redisSessionKey, this._id);
                if (!data) {
                    this._data = {};
                }
                else {
                    this._data = JSON.parse(data);
                }
            }
            catch (e) {
                this._data = null;
            }
        });
    }
    ;
    remove() {
        return __awaiter(this, void 0, void 0, function* () {
            yield servermgr_1.Server.redis.hdel(redisSessionKey, this._id);
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            this._data = {};
            yield this.save();
        });
    }
    get id() {
        return this._id;
    }
    get loginUserId() {
        return this._data.loginUserId;
    }
    set loginUserId(value) {
        if (this._data.loginUserId !== value) {
            this._data.loginUserId = value;
            this.save().catch(reason => {
                throw new Error(reason);
            });
        }
    }
    get loginUserAccount() {
        return this._data.loginUserAccount;
    }
    set loginUserAccount(value) {
        if (this._data.loginUserAccount !== value) {
            this._data.loginUserAccount = value;
            this.save().catch(reason => {
                throw new Error(reason);
            });
        }
    }
    set(props) {
        return __awaiter(this, void 0, void 0, function* () {
            this._data = Object.assign(this._data, props);
            yield this.save();
        });
    }
}
exports.Session = Session;
/*
const Session = function (data) {
    this._data = data || {
        _loginUserId: null,
        _loginUserAccount: null,
        _loginUserRole: null,
        _loginUserStore: null,
        _sessionId: new UID().value,
        _regCode: null,
        _phone: null,
        _sessionToken: null,
        _codeTime:null
    };
    Object.defineProperties(this, {
        data: {
            configurable:false,
            enumerable:false,
            get: ()=>{
                return this._data;
            },
            set: newValue=>{
                this._data = newValue;
                this.save ();
            }
        },
        codeTime: {
            configurable:false,
            enumerable:false,
            get: ()=>{
                return this._data._codeTime;
            },
            set: newValue=>{
                this._data._codeTime = newValue;
                this.save ();
            }
        },
        sessionToken: {
            configurable:false,
            enumerable:false,
            get: ()=>{
                return this._data._sessionToken;
            },
            set: newValue=>{
                this._data._sessionToken = newValue;
                this.save ();
            }
        },
        phone: {
            configurable:false,
            enumerable:false,
            get: ()=>{
                return this._data._phone;
            },
            set: newValue=>{
                this._data._phone = newValue;
                this.save ();
            }
        },
        regCode: {
            configurable:false,
            enumerable:false,
            get: ()=>{
                return this._data._regCode;
            },
            set: newValue=>{
                this._data._regCode = newValue;
                this.save ();
            }
        },
        loginUserId: {
            configurable:false,
            enumerable:false,
            get: ()=>{
                return this._data._loginUserId;
            },
            set: newValue=>{
                this._data._loginUserId = newValue;
                this.save ();
            }
        },
        loginUserAccount: {
            configurable:false,
            enumerable:false,
            get: ()=>{
                return this._data._loginUserAccount;
            },
            set: newValue=>{
                this._data._loginUserAccount = newValue;
                this.save ();
            }
        },
        loginUserRole: {
            configurable:false,
            enumerable:false,
            get: ()=>{
                return this._data._loginUserRole;
            },
            set: newValue=>{
                this._data._loginUserRole = newValue;
                this.save ();
            }
        },
        loginUserStore: {
            configurable:false,
            enumerable:false,
            get: ()=>{
                return this._data._loginUserStore;
            },
            set: newValue=>{
                this._data._loginUserStore = newValue;
                this.save ();
            }
        },
        sessionId: {
            configurable:false,
            enumerable:false,
            get: ()=>{
                return this._data._sessionId;
            }
        }
    });
};

Session.prototype.clone = function() {
    let other = new Session();
    other._data = utils.deepCopy(this._data);
    return other;
};

Session.prototype.save = function(callback) {
    cache.set(this.sessionId, this._data, callback);
};

Session.prototype.load = function(callback) {
    cache.get(this.sessionId, (err,value)=>{
        if (!err) {
            this._data = value;
        }
        callback && callback(err);
    });
};

module.exports = Session;
*/ 
//# sourceMappingURL=session.js.map