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
const express = require("express");
require("express-async-errors");
const utils_1 = require("../../common/utils");
const errcodes_1 = require("../../common/errcodes");
const roommgr_1 = require("../roommgr");
exports.indexRouter = express.Router();
exports.indexRouter.get('/rooms', (req, res, next) => {
    const rooms = roommgr_1.RoomManager.instance().rooms;
    const ret = utils_1.Utils.httpResult(errcodes_1.ErrorCode.kSuccess);
    ret.data = [];
    for (const id in rooms) {
        ret.data.push(id);
    }
    res.json(ret);
});
exports.indexRouter.post('/publish_room', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const roomId = utils_1.Utils.safeParseInt(req.body.room);
    if (!roomId) {
        return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kParamError));
    }
    if (roommgr_1.RoomManager.instance().findRoom(roomId)) {
        return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kInvalidOperation));
    }
    if (yield roommgr_1.RoomManager.instance().createRoom(roomId)) {
        return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kSuccess));
    }
    else {
        return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kServerError));
    }
}));
exports.indexRouter.post('/close_room', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const roomId = utils_1.Utils.safeParseInt(req.body.room);
    if (!roomId) {
        return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kParamError));
    }
    if (!roommgr_1.RoomManager.instance().findRoom(roomId)) {
        return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kInvalidOperation));
    }
    yield roommgr_1.RoomManager.instance().closeRoom(roomId);
    return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kSuccess));
}));
//# sourceMappingURL=index.js.map