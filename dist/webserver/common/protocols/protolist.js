"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const proto = require("./protocols");
var MsgType;
(function (MsgType) {
    MsgType[MsgType["base_UberMessage"] = 10000] = "base_UberMessage";
    MsgType[MsgType["room_JoinRoomMessage"] = 20000] = "room_JoinRoomMessage";
    MsgType[MsgType["room_LeaveRoomMessage"] = 20001] = "room_LeaveRoomMessage";
    MsgType[MsgType["whiteboard_CommandMessage"] = 30000] = "whiteboard_CommandMessage";
})(MsgType = exports.MsgType || (exports.MsgType = {}));
const msgMap = {
    10000: proto.base.UberMessage,
    20000: proto.room.JoinRoomMessage,
    20001: proto.room.LeaveRoomMessage,
    30000: proto.whiteboard.CommandMessage,
};
exports.msgMap = msgMap;
//# sourceMappingURL=protolist.js.map