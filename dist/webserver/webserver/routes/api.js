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
const config_1 = require("../../lib/config");
const utils_1 = require("../../common/utils");
const errcodes_1 = require("../../common/errcodes");
const assets_1 = require("../server/user/assets");
const whiteboards_1 = require("../server/user/whiteboards");
const defines_1 = require("../../common/defines");
const express = require("express");
const xss = require("xss");
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
            return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kParamError));
        }
        else if (account !== xss(account) || password !== xss(password)) {
            return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kInvalidContent));
        }
        else {
            const rows = yield config_1.GetConfig.engine.objects('user').filter([{ or: [['account', account], ['email', account]] }, ['passwd', password]]).fields(['id', 'account', 'name']).all();
            if (rows.length === 1) {
                session.set({
                    loginUserAccount: account,
                    loginUserId: rows[0].id
                });
                let remember = utils_1.Utils.safeParseInt(req.body.remember);
                res.cookie(config_1.GetConfig.sessionToken, session.id, {
                    expires: remember ? new Date(Date.now() + 1000 * 3600 * 24 * 7) : undefined
                });
                return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kSuccess));
            }
            else {
                return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kAuthError));
            }
        }
    }
    else {
        return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kSuccess));
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
        return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kParamError));
    }
    else if (account !== xss(account) || email !== xss(email) || password !== xss(password)) {
        return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kInvalidContent));
    }
    else {
        const rows = yield config_1.GetConfig.engine.query({
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
    if (relPath !== xss(relPath)) {
        return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kInvalidContent));
    }
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
exports.apiRouter.get('/trust/whiteboard', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const relPath = req.query.relPath || '/';
    if (relPath !== xss(relPath)) {
        return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kInvalidContent));
    }
    const result = utils_1.Utils.httpResult(errcodes_1.ErrorCode.kSuccess);
    result.data = yield whiteboards_1.WhiteboardManager.loadAssetList(req.session.loginUserId, relPath);
    return res.json(result);
}));
exports.apiRouter.post('/trust/create_room', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const roomName = req.body.name;
    const roomDesc = req.body.desc || '';
    if (roomName !== xss(roomName) || roomDesc !== xss(roomDesc) || roomDesc.length > 250) {
        return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kInvalidContent));
    }
    const roomType = utils_1.Utils.safeParseInt(req.body.type);
    const session = req.session;
    const lastInsertId = (yield config_1.GetConfig.engine.objects('room').add({
        owner: session.loginUserId,
        creation_time: Math.round(Date.now() / 1000),
        close_time: 0,
        type: roomType || 0,
        state: 0,
        name: roomName,
        detail: roomDesc
    })).insertId;
    const result = utils_1.Utils.httpResult(errcodes_1.ErrorCode.kSuccess);
    result.data = {
        room_id: Number(lastInsertId)
    };
    return res.json(result);
}));
exports.apiRouter.get('/trust/public_rooms', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const rooms = yield config_1.GetConfig.engine.query({
        sql: 'select a.id as id, a.name as name, a.detail as detail, b.account as account from room a inner join user b on a.owner=b.id where a.state=?',
        param: [defines_1.RoomState.Active]
    });
    const roomlist = [];
    for (let i = 0; i < rooms.length; i++) {
        roomlist.push({
            id: rooms[i].id,
            name: rooms[i].name,
            detail: rooms[i].detail,
            account: rooms[i].account
        });
    }
    const result = utils_1.Utils.httpResult(errcodes_1.ErrorCode.kSuccess);
    result.data = roomlist;
    res.json(result);
}));
//# sourceMappingURL=api.js.map