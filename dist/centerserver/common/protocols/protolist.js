"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const proto = require("./protocols");
var MsgType;
(function (MsgType) {
    MsgType[MsgType["room_JoinRoomMessage"] = 10000] = "room_JoinRoomMessage";
    MsgType[MsgType["room_LeaveRoomMessage"] = 10001] = "room_LeaveRoomMessage";
    MsgType[MsgType["whiteboard_CommandMessage"] = 10002] = "whiteboard_CommandMessage";
})(MsgType = exports.MsgType || (exports.MsgType = {}));
const msgMap = {
    10000: proto.room.JoinRoomMessage,
    10001: proto.room.LeaveRoomMessage,
    10002: proto.whiteboard.CommandMessage,
};
exports.msgMap = msgMap;
//# sourceMappingURL=protolist.js.map