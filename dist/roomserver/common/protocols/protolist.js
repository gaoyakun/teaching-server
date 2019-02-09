"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const proto = require("./protocols");
var MsgType;
(function (MsgType) {
    MsgType[MsgType["base_UberMessage"] = 10000] = "base_UberMessage";
    MsgType[MsgType["room_RoomUser"] = 20000] = "room_RoomUser";
    MsgType[MsgType["room_JoinRoomMessage"] = 20001] = "room_JoinRoomMessage";
    MsgType[MsgType["room_LeaveRoomMessage"] = 20002] = "room_LeaveRoomMessage";
    MsgType[MsgType["room_ListUsersMessage"] = 20003] = "room_ListUsersMessage";
    MsgType[MsgType["room_MediaOptionMessage"] = 20004] = "room_MediaOptionMessage";
    MsgType[MsgType["whiteboard_StrokeType"] = 30000] = "whiteboard_StrokeType";
    MsgType[MsgType["whiteboard_CommandMessage"] = 30001] = "whiteboard_CommandMessage";
    MsgType[MsgType["whiteboard_EventMessage"] = 30002] = "whiteboard_EventMessage";
    MsgType[MsgType["whiteboard_CreateObjectMessage"] = 30003] = "whiteboard_CreateObjectMessage";
    MsgType[MsgType["whiteboard_DeleteObjectMessage"] = 30004] = "whiteboard_DeleteObjectMessage";
    MsgType[MsgType["whiteboard_DeleteObjectsMessage"] = 30005] = "whiteboard_DeleteObjectsMessage";
    MsgType[MsgType["whiteboard_SetObjectPropertyMessage"] = 30006] = "whiteboard_SetObjectPropertyMessage";
    MsgType[MsgType["whiteboard_Point"] = 30007] = "whiteboard_Point";
    MsgType[MsgType["whiteboard_StrokeMessage"] = 30008] = "whiteboard_StrokeMessage";
    MsgType[MsgType["whiteboard_DrawMessage"] = 30009] = "whiteboard_DrawMessage";
    MsgType[MsgType["whiteboard_EraseMessage"] = 30010] = "whiteboard_EraseMessage";
    MsgType[MsgType["whiteboard_SwapObjectMessage"] = 30011] = "whiteboard_SwapObjectMessage";
    MsgType[MsgType["whiteboard_MoveObjectMessage"] = 30012] = "whiteboard_MoveObjectMessage";
    MsgType[MsgType["whiteboard_ClearPageMessage"] = 30013] = "whiteboard_ClearPageMessage";
    MsgType[MsgType["whiteboard_ClearBoardMessage"] = 30014] = "whiteboard_ClearBoardMessage";
    MsgType[MsgType["whiteboard_UndoMessage"] = 30015] = "whiteboard_UndoMessage";
})(MsgType = exports.MsgType || (exports.MsgType = {}));
const msgMap = {
    10000: proto.base.UberMessage,
    20000: proto.room.RoomUser,
    20001: proto.room.JoinRoomMessage,
    20002: proto.room.LeaveRoomMessage,
    20003: proto.room.ListUsersMessage,
    20004: proto.room.MediaOptionMessage,
    30000: proto.whiteboard.StrokeType,
    30001: proto.whiteboard.CommandMessage,
    30002: proto.whiteboard.EventMessage,
    30003: proto.whiteboard.CreateObjectMessage,
    30004: proto.whiteboard.DeleteObjectMessage,
    30005: proto.whiteboard.DeleteObjectsMessage,
    30006: proto.whiteboard.SetObjectPropertyMessage,
    30007: proto.whiteboard.Point,
    30008: proto.whiteboard.StrokeMessage,
    30009: proto.whiteboard.DrawMessage,
    30010: proto.whiteboard.EraseMessage,
    30011: proto.whiteboard.SwapObjectMessage,
    30012: proto.whiteboard.MoveObjectMessage,
    30013: proto.whiteboard.ClearPageMessage,
    30014: proto.whiteboard.ClearBoardMessage,
    30015: proto.whiteboard.UndoMessage,
};
exports.msgMap = msgMap;
__export(require("./protocols"));
//# sourceMappingURL=protolist.js.map