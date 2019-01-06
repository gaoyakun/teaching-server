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
class UserManager {
    static get redis() {
        return this._redis;
    }
    static init(config) {
        this._redis = config.redis;
    }
    static createRoom(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this._redis.lpush(`user-rooms:${userId}`);
        });
    }
}
exports.UserManager = UserManager;
//# sourceMappingURL=usermgr.js.map