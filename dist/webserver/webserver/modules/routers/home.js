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
const utils_1 = require("../../../common/utils");
const errcodes_1 = require("../../../common/errcodes");
const assets_1 = require("../../server/user/assets");
const config_1 = require("../../../lib/config");
const servermgr_1 = require("../../../lib/servermgr");
const constants_1 = require("../../../lib/constants");
const requestwrapper_1 = require("../../../lib/requestwrapper");
require("express-async-errors");
function homePage(req, res) {
    const session = req.session;
    const data = {};
    if (session.loginUserId) {
        data.user = {
            name: session.loginUserAccount
        };
        res.render('index', data);
    }
    else {
        res.render('login');
    }
}
exports.homePage = homePage;
function loginPage(req, res) {
    res.render('login');
}
exports.loginPage = loginPage;
function registerPage(req, res) {
    res.render('register');
}
exports.registerPage = registerPage;
function profileSettingPage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = req.session;
        const user = yield config_1.Config.engine.query({
            sql: 'select u.name as name, u.email as email, p.gender as gender, p.mobile as mobile, p.avatar as avatar from user u inner join user_profile p on u.id=p.user_id where u.id=?',
            param: [session.loginUserId]
        });
        if (!user || user.length !== 1) {
            throw new Error('未找到该用户');
        }
        res.render('settings/userprofile', {
            user: {
                id: session.loginUserId,
                name: user[0].name,
                email: user[0].email,
                gender: user[0].gender,
                mobile: user[0].mobile,
                avatar: user[0].avatar
            }
        });
    });
}
exports.profileSettingPage = profileSettingPage;
function resetPassSettingPage(req, res) {
    res.render('settings/resetpass', {
        user: {
            name: req.session.loginUserAccount
        }
    });
}
exports.resetPassSettingPage = resetPassSettingPage;
function getImageAsset(req, res, next, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const thumb = params.thumb;
        const relPath = req.query.relPath;
        const name = req.query.name;
        if (!name || !relPath) {
            return res.status(404).json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kParamError));
        }
        const content = yield assets_1.AssetManager.readAssetContent(req.session.loginUserId, relPath, name, thumb !== 0);
        if (!content) {
            return res.status(404).json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kFileNotFound));
        }
        else {
            res.writeHead(200, {
                'Content-Type': 'image/jpeg'
            });
            res.end(content);
        }
    });
}
exports.getImageAsset = getImageAsset;
function getAvatar(req, res, next, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = params.id;
        try {
            const content = yield assets_1.AssetManager.readAvatarImage(userId);
            if (!content) {
                return res.status(404).json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kFileNotFound));
            }
            else {
                res.writeHead(200, {
                    'Content-Type': 'image/jpeg'
                });
                res.end(content);
            }
        }
        catch (err) {
            res.redirect('/images/face.jpg');
        }
    });
}
exports.getAvatar = getAvatar;
function assetsSettingPage(req, res) {
    res.render('settings/assets', {
        user: {
            name: req.session.loginUserAccount
        }
    });
}
exports.assetsSettingPage = assetsSettingPage;
function sessionsSettingPage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = req.session;
        const sessionList = yield config_1.Config.engine.objects('room').filter(['owner', session.loginUserId]).all();
        const sessionArray = [];
        for (let i = 0; i < sessionList.length; i++) {
            sessionArray.push({
                id: sessionList[i].id,
                name: sessionList[i].name,
                detail: sessionList[i].detail,
                type: sessionList[i].type,
                state: sessionList[i].state
            });
        }
        res.render('settings/sessions', {
            user: {
                name: req.session.loginUserAccount
            },
            sessions: sessionArray
        });
    });
}
exports.sessionsSettingPage = sessionsSettingPage;
function publishRoomPage(req, res, next, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = req.session;
        const roomId = params.room_id;
        // Query room information
        const rooms = yield config_1.Config.engine.objects('room').filter(['id', roomId]).all();
        if (rooms.length !== 1) {
            throw new Error('没有可以进入的房间');
        }
        let serverInfo = null;
        if (rooms[0].server === 0) {
            // room has not been published
            if (Number(rooms[0].owner) !== session.loginUserId) {
                throw new Error('房间已关闭');
            }
            serverInfo = yield servermgr_1.Server.pickServer(constants_1.ServerType.Room);
            if (!serverInfo) {
                throw new Error('服务器维护中，目前无法进入房间');
            }
            yield requestwrapper_1.requestWrapper(`${serverInfo.host}:${serverInfo.port}/publish_room`, 'POST', {
                room: roomId
            });
        }
        else {
            // room has been published
            serverInfo = yield servermgr_1.Server.getServerInfo(constants_1.ServerType.Room, Number(rooms[0].server));
            if (!serverInfo) {
                throw new Error('服务器维护中，目前无法进入房间');
            }
        }
        res.render('create_whiteboard', {
            user: {
                name: req.session.loginUserAccount
            },
            serverinfo: {
                host: `${serverInfo.host}:${serverInfo.port}?room=${roomId}&token=${req.session.id}`
            }
        });
    });
}
exports.publishRoomPage = publishRoomPage;
function whiteboardsSettingPage(req, res) {
    res.render('settings/whiteboards', {
        user: {
            name: req.session.loginUserAccount,
        },
        whiteboards: []
    });
}
exports.whiteboardsSettingPage = whiteboardsSettingPage;
function createWhiteboardPage(req, res) {
    res.render('create_whiteboard', {
        user: {
            name: req.session.loginUserAccount,
        },
        serverinfo: null
    });
}
exports.createWhiteboardPage = createWhiteboardPage;
//# sourceMappingURL=home.js.map