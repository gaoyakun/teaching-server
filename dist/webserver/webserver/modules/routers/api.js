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
const config_1 = require("../../../lib/config");
const utils_1 = require("../../../common/utils");
const errcodes_1 = require("../../../common/errcodes");
const assets_1 = require("../../server/user/assets");
const defines_1 = require("../../../common/defines");
const constants_1 = require("../../../lib/constants");
const servermgr_1 = require("../../../lib/servermgr");
const requestwrapper_1 = require("../../../lib/requestwrapper");
require("express-async-errors");
function auth(req, res) {
    let session = req.session;
    if (session.loginUserId) {
        res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kSuccess));
    }
    else {
        res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kAuthError));
    }
}
exports.auth = auth;
function login(req, res, next, params) {
    return __awaiter(this, void 0, void 0, function* () {
        let session = req.session;
        if (!session.loginUserId) {
            const rows = yield config_1.Config.engine.objects('user').filter([['account', params.account], ['passwd', params.md5password]]).fields(['id', 'account', 'name']).all();
            if (rows.length === 1) {
                session.set({
                    loginUserAccount: params.account,
                    loginUserId: rows[0].id
                });
                let remember = utils_1.Utils.safeParseInt(req.body.remember);
                res.cookie(config_1.Config.sessionToken, session.id, {
                    expires: remember ? new Date(Date.now() + 1000 * 3600 * 24 * 7) : undefined
                });
                return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kSuccess));
            }
            else {
                return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kAuthError));
            }
        }
        else {
            return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kSuccess));
        }
    });
}
exports.login = login;
function register(req, res, next, params) {
    return __awaiter(this, void 0, void 0, function* () {
        let session = req.session;
        if (session.loginUserId) {
            return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kInvalidOperation));
        }
        const dbSession = yield config_1.Config.engine.beginSession();
        try {
            const res1 = yield dbSession.query({
                sql: 'insert into user (account, email, passwd, name) select ?, ?, ?, ? from dual where not exists (select id from user where account=? or email=?)',
                param: [params.account, params.email, params.md5password, params.account, params.account, params.email]
            });
            if (res1.affectedRows === 0) {
                yield dbSession.cancel();
                return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kAuthError));
            }
            const res2 = yield dbSession.query({
                sql: 'insert into `user_profile` (user_id, gender, mobile, avatar) values (?, ?, ?, ?)',
                param: [res1.insertId, 0, '', '']
            });
            if (res2.affectedRows === 0) {
                yield dbSession.cancel();
                return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kAuthError));
            }
            yield dbSession.end();
            return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kSuccess));
        }
        catch (err) {
            yield dbSession.cancel();
            return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kAuthError));
        }
    });
}
exports.register = register;
function getAssetList(req, res, next, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = utils_1.Utils.httpResult(errcodes_1.ErrorCode.kSuccess);
        result.data = yield assets_1.AssetManager.loadAssetList(req.session.loginUserId, params.relPath);
        return res.json(result);
    });
}
exports.getAssetList = getAssetList;
function updateProfile(req, res, next, params) {
    return __awaiter(this, void 0, void 0, function* () {
        let session = req.session;
        const result = yield config_1.Config.engine.query({
            sql: 'update user u, user_profile p set u.name=?, u.email=?, p.mobile=?, p.gender=? where u.id=? and p.user_id=u.id',
            param: [params.name, params.email, params.mobile, params.gender, session.loginUserId]
        });
        if (result.affectedRows === 0) {
            return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kServerError));
        }
        if (req.files && req.files.avatar) {
            const file = req.files.avatar;
            yield assets_1.AssetManager.uploadUserAvatar(req.session.loginUserId, file.data, 'avatar.jpg');
        }
        return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kSuccess));
    });
}
exports.updateProfile = updateProfile;
function uploadAsset(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.files && req.files.content) {
            const file = req.files.content;
            yield assets_1.AssetManager.uploadAssetBuffer(req.session.loginUserId, '/', file.data, file.name);
        }
        return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kSuccess));
    });
}
exports.uploadAsset = uploadAsset;
function createRoom(req, res, next, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = req.session;
        const lastInsertId = (yield config_1.Config.engine.objects('room').add({
            owner: session.loginUserId,
            creation_time: Math.round(Date.now() / 1000),
            close_time: 0,
            type: params.type,
            state: 0,
            name: params.name,
            detail: params.desc
        })).insertId;
        const result = utils_1.Utils.httpResult(errcodes_1.ErrorCode.kSuccess);
        result.data = {
            room_id: Number(lastInsertId)
        };
        return res.json(result);
    });
}
exports.createRoom = createRoom;
function getPublicRooms(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const rooms = yield config_1.Config.engine.query({
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
    });
}
exports.getPublicRooms = getPublicRooms;
function closeRoom(req, res, next, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = req.session;
        const rooms = yield config_1.Config.engine.objects('room').filter([['id', params.room_id], ['owner', session.loginUserId]]).all();
        if (rooms.length !== 1) {
            throw new Error('没有可以结束的房间');
        }
        const serverInfo = yield servermgr_1.Server.getServerInfo(constants_1.ServerType.Room, Number(rooms[0].server));
        if (!serverInfo) {
            throw new Error('没有可以结束的房间');
        }
        const result = yield requestwrapper_1.requestWrapper(`${serverInfo.host}:${serverInfo.port}/close_room`, 'POST', {
            room: params.room_id
        });
        console.log(JSON.stringify(result));
        return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kSuccess));
    });
}
exports.closeRoom = closeRoom;
//# sourceMappingURL=api.js.map