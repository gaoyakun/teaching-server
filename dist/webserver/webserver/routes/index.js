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
const assets_1 = require("../server/user/assets");
const config_1 = require("../../lib/config");
const servermgr_1 = require("../../lib/servermgr");
const constants_1 = require("../../lib/constants");
const requestwrapper_1 = require("../../lib/requestwrapper");
const express = require("express");
require("express-async-errors");
exports.indexRouter = express.Router();
exports.indexRouter.get('/', (req, res, next) => {
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
});
exports.indexRouter.get('/login', (req, res, next) => {
    res.render('login');
});
exports.indexRouter.get('/register', (req, res, next) => {
    res.render('register');
});
exports.indexRouter.get('/trust/settings/profile', (req, res, next) => {
    res.render('settings/userprofile', {
        user: {
            name: req.session.loginUserAccount
        }
    });
});
exports.indexRouter.get('/trust/settings/reset', (req, res, next) => {
    res.render('settings/resetpass', {
        user: {
            name: req.session.loginUserAccount
        }
    });
});
exports.indexRouter.get('/trust/assets/image', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const thumb = utils_1.Utils.safeParseInt(req.query.thumb) || 0;
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
}));
exports.indexRouter.get('/trust/settings/assets', (req, res, next) => {
    res.render('settings/assets', {
        user: {
            name: req.session.loginUserAccount
        }
    });
});
exports.indexRouter.get('/trust/settings/sessions', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const session = req.session;
    const sessionList = yield config_1.GetConfig.engine.objects('room').filter(['owner', session.loginUserId]).all();
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
}));
exports.indexRouter.get('/trust/publish_room', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const session = req.session;
    const roomId = utils_1.Utils.safeParseInt(req.query.room_id);
    if (roomId === null) {
        throw new Error('参数错误');
    }
    // Query room information
    const rooms = yield config_1.GetConfig.engine.objects('room').filter(['id', roomId]).all();
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
        yield requestwrapper_1.requestWrapper(`${serverInfo.ip}:${serverInfo.port}/publish_room`, 'POST', {
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
    res.render('room.ejs', {
        user: {
            name: req.session.loginUserAccount
        },
        serverinfo: {
            host: `${serverInfo.ip}:${serverInfo.port}?room=${roomId}`
        }
    });
}));
exports.indexRouter.get('/trust/settings/whiteboards', (req, res, next) => {
    res.render('settings/whiteboards', {
        user: {
            name: req.session.loginUserAccount,
        },
        whiteboards: []
    });
});
exports.indexRouter.get('/trust/create-whiteboard', (req, res, next) => {
    res.render('create_whiteboard');
});
//# sourceMappingURL=index.js.map