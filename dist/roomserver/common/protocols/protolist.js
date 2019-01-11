"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const proto = require("./protocols");
var MsgType;
(function (MsgType) {
    MsgType[MsgType["room_JoinRoomMessage"] = 10000] = "room_JoinRoomMessage";
    MsgType[MsgType["room_LeaveRoomMessage"] = 10001] = "room_LeaveRoomMessage";
    MsgType[MsgType["test_TestMessage"] = 10002] = "test_TestMessage";
    MsgType[MsgType["test2_Test2Message"] = 10003] = "test2_Test2Message";
    MsgType[MsgType["whiteboard_CommandMessage"] = 10004] = "whiteboard_CommandMessage";
})(MsgType = exports.MsgType || (exports.MsgType = {}));
const msgMap = {
    10000: proto.room.JoinRoomMessage,
    10001: proto.room.LeaveRoomMessage,
    10002: proto.test.TestMessage,
    10003: proto.test2.Test2Message,
    10004: proto.whiteboard.CommandMessage,
};
exports.msgMap = msgMap;
//# sourceMappingURL=protolist.js.map