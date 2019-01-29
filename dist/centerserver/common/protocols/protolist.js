"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const proto = require("./protocols");
var MsgType;
(function (MsgType) {
    MsgType[MsgType["base_UberMessage"] = 10000] = "base_UberMessage";
    MsgType[MsgType["room_JoinRoomMessage"] = 20000] = "room_JoinRoomMessage";
    MsgType[MsgType["room_LeaveRoomMessage"] = 20001] = "room_LeaveRoomMessage";
    MsgType[MsgType["whiteboard_CommandMessage"] = 30000] = "whiteboard_CommandMessage";
    MsgType[MsgType["whiteboard_EventMessage"] = 30001] = "whiteboard_EventMessage";
    MsgType[MsgType["whiteboard_UseToolMessage"] = 30002] = "whiteboard_UseToolMessage";
    MsgType[MsgType["whiteboard_CreateObjectMessage"] = 30003] = "whiteboard_CreateObjectMessage";
    MsgType[MsgType["whiteboard_DeleteObjectMessage"] = 30004] = "whiteboard_DeleteObjectMessage";
    MsgType[MsgType["whiteboard_DeleteObjectsMessage"] = 30005] = "whiteboard_DeleteObjectsMessage";
    MsgType[MsgType["whiteboard_SetObjectPropertyMessage"] = 30006] = "whiteboard_SetObjectPropertyMessage";
    MsgType[MsgType["whiteboard_Point"] = 30007] = "whiteboard_Point";
    MsgType[MsgType["whiteboard_DrawMessage"] = 30008] = "whiteboard_DrawMessage";
    MsgType[MsgType["whiteboard_EraseMessage"] = 30009] = "whiteboard_EraseMessage";
    MsgType[MsgType["whiteboard_SwapObjectMessage"] = 30010] = "whiteboard_SwapObjectMessage";
    MsgType[MsgType["whiteboard_MoveObjectMessage"] = 30011] = "whiteboard_MoveObjectMessage";
    MsgType[MsgType["whiteboard_ClearPageMessage"] = 30012] = "whiteboard_ClearPageMessage";
    MsgType[MsgType["whiteboard_ClearBoardMessage"] = 30013] = "whiteboard_ClearBoardMessage";
    MsgType[MsgType["whiteboard_UndoMessage"] = 30014] = "whiteboard_UndoMessage";
})(MsgType = exports.MsgType || (exports.MsgType = {}));
const msgMap = {
    10000: proto.base.UberMessage,
    20000: proto.room.JoinRoomMessage,
    20001: proto.room.LeaveRoomMessage,
    30000: proto.whiteboard.CommandMessage,
    30001: proto.whiteboard.EventMessage,
    30002: proto.whiteboard.UseToolMessage,
    30003: proto.whiteboard.CreateObjectMessage,
    30004: proto.whiteboard.DeleteObjectMessage,
    30005: proto.whiteboard.DeleteObjectsMessage,
    30006: proto.whiteboard.SetObjectPropertyMessage,
    30007: proto.whiteboard.Point,
    30008: proto.whiteboard.DrawMessage,
    30009: proto.whiteboard.EraseMessage,
    30010: proto.whiteboard.SwapObjectMessage,
    30011: proto.whiteboard.MoveObjectMessage,
    30012: proto.whiteboard.ClearPageMessage,
    30013: proto.whiteboard.ClearBoardMessage,
    30014: proto.whiteboard.UndoMessage,
};
exports.msgMap = msgMap;
__export(require("./protocols"));
//# sourceMappingURL=protolist.js.map