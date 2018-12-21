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
const config_1 = require("../config");
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
        const sessionId = req.cookies[config_1.Config.sessionToken];
        if (sessionId) {
            req.session = (yield session_1.Session.loadSession(sessionId)) || undefined;
            if (req.session) {
                console.log(`*** <${req.url}> session loaded from cookie ${sessionId}`);
            }
            else {
                console.log(`*** <${req.url}> session not loaded from cookie ${sessionId}`);
            }
        }
        if (!req.session) {
            req.session = new session_1.Session();
            yield req.session.save();
            console.log(`*** <${req.url}> session created and cookie set to ${req.session.id}`);
            res.cookie(config_1.Config.sessionToken, req.session.id, {
                expires: new Date(Date.now() + 1000 * 3600 * 24 * 7)
            });
        }
        return next();
    });
};
//# sourceMappingURL=middlewares.js.map