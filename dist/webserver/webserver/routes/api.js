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
const utils_1 = require("../../common/utils");
const errcodes_1 = require("../../common/errcodes");
const config_1 = require("../config");
const assets_1 = require("../server/user/assets");
const express = require("express");
require("express-async-errors");
exports.apiRouter = express.Router();
exports.apiRouter.get('/auth', (req, res, next) => {
    let session = req.session;
    if (session.loginUserId) {
        res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kSuccess));
    }
    else {
        res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kAuthError));
    }
});
exports.apiRouter.post('/login', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let session = req.session;
    if (!session.loginUserId) {
        let account = req.body.account;
        let password = req.body.md5password;
        if (!account || !password) {
            res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kParamError));
        }
        else {
            const rows = yield config_1.Config.engine.objects('user').filter([{ or: [['account', account], ['email', account]] }, ['passwd', password]]).fields(['id', 'account', 'name']).all();
            if (rows.length === 1) {
                session.set({
                    loginUserAccount: account,
                    loginUserId: rows[0].id
                });
                let remember = utils_1.Utils.safeParseInt(req.body.remember);
                res.cookie(config_1.Config.sessionToken, session.id, {
                    expires: remember ? new Date(Date.now() + 1000 * 3600 * 24 * 7) : undefined
                });
                res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kSuccess));
            }
            else {
                res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kAuthError));
            }
        }
    }
    else {
        res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kSuccess));
    }
}));
exports.apiRouter.post('/register', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let session = req.session;
    if (session.loginUserId) {
        return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kInvalidOperation));
    }
    let account = req.body.account;
    let email = req.body.email;
    let password = req.body.md5password;
    if (!account || !email || !password) {
        res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kParamError));
    }
    else {
        const rows = yield config_1.Config.engine.query({
            sql: 'insert into user (account, email, passwd, name) select ?, ?, ?, ? from dual where not exists (select id from user where account=? or email=?)',
            param: [account, email, password, account, account, email]
        });
        if (rows.affectedRows === 1) {
            return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kSuccess));
        }
        else {
            return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kAuthError));
        }
    }
}));
exports.apiRouter.get('/trust/asset', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const relPath = req.query.relPath || '/';
    const result = utils_1.Utils.httpResult(errcodes_1.ErrorCode.kSuccess);
    result.data = yield assets_1.AssetManager.loadAssetList(req.session.loginUserId, relPath);
    return res.json(result);
}));
exports.apiRouter.post('/trust/asset', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    if (req.files && req.files.content) {
        const file = req.files.content;
        yield assets_1.AssetManager.uploadAssetBuffer(req.session.loginUserId, '/', file.data, file.name);
    }
    return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kSuccess));
}));
//# sourceMappingURL=api.js.map