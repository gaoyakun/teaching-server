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
const errcodes_1 = require("../../common/errcodes");
const utils_1 = require("../../common/utils");
const session_1 = require("../lib/session");
const SESSION_COOKIE = 'ts_session_id';
exports.middlewareAppAuth = function (req, res, next) {
    let session = req.session;
    if (!session || !session.loginUserId) {
        return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kAuthError));
    }
    else {
        next();
    }
};
exports.middlewareSession = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.session) {
            return next();
        }
        req.session = new session_1.Session();
        const sessionId = req.cookies[SESSION_COOKIE];
        res.cookie(SESSION_COOKIE, req.session.id);
        if (sessionId) {
            try {
                yield req.session.load(sessionId);
            }
            catch (e) {
                yield req.session.clear();
            }
        }
        return next();
    });
};
//# sourceMappingURL=middlewares.js.map