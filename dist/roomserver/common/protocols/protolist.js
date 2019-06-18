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
    MsgType[MsgType["room_TurnServer"] = 20004] = "room_TurnServer";
    MsgType[MsgType["room_MediaOptionMessage"] = 20005] = "room_MediaOptionMessage";
    MsgType[MsgType["whiteboard_StrokeType"] = 30000] = "whiteboard_StrokeType";
    MsgType[MsgType["whiteboard_AlignType"] = 30001] = "whiteboard_AlignType";
    MsgType[MsgType["whiteboard_ArrangeType"] = 30002] = "whiteboard_ArrangeType";
    MsgType[MsgType["whiteboard_CommandMessage"] = 30003] = "whiteboard_CommandMessage";
    MsgType[MsgType["whiteboard_EventMessage"] = 30004] = "whiteboard_EventMessage";
    MsgType[MsgType["whiteboard_CreateObjectMessage"] = 30005] = "whiteboard_CreateObjectMessage";
    MsgType[MsgType["whiteboard_DeleteObjectMessage"] = 30006] = "whiteboard_DeleteObjectMessage";
    MsgType[MsgType["whiteboard_DeleteObjectsMessage"] = 30007] = "whiteboard_DeleteObjectsMessage";
    MsgType[MsgType["whiteboard_SetObjectPropertyMessage"] = 30008] = "whiteboard_SetObjectPropertyMessage";
    MsgType[MsgType["whiteboard_Point"] = 30009] = "whiteboard_Point";
    MsgType[MsgType["whiteboard_StrokeMessage"] = 30010] = "whiteboard_StrokeMessage";
    MsgType[MsgType["whiteboard_DrawMessage"] = 30011] = "whiteboard_DrawMessage";
    MsgType[MsgType["whiteboard_EraseMessage"] = 30012] = "whiteboard_EraseMessage";
    MsgType[MsgType["whiteboard_SwapObjectMessage"] = 30013] = "whiteboard_SwapObjectMessage";
    MsgType[MsgType["whiteboard_MoveObjectMessage"] = 30014] = "whiteboard_MoveObjectMessage";
    MsgType[MsgType["whiteboard_AlignObjectMessage"] = 30015] = "whiteboard_AlignObjectMessage";
    MsgType[MsgType["whiteboard_ArrangeObjectMessage"] = 30016] = "whiteboard_ArrangeObjectMessage";
    MsgType[MsgType["whiteboard_ClearPageMessage"] = 30017] = "whiteboard_ClearPageMessage";
    MsgType[MsgType["whiteboard_ClearBoardMessage"] = 30018] = "whiteboard_ClearBoardMessage";
    MsgType[MsgType["whiteboard_UndoMessage"] = 30019] = "whiteboard_UndoMessage";
})(MsgType = exports.MsgType || (exports.MsgType = {}));
const msgMap = {
    10000: proto.base.UberMessage,
    20000: proto.room.RoomUser,
    20001: proto.room.JoinRoomMessage,
    20002: proto.room.LeaveRoomMessage,
    20003: proto.room.ListUsersMessage,
    20004: proto.room.TurnServer,
    20005: proto.room.MediaOptionMessage,
    30000: proto.whiteboard.StrokeType,
    30001: proto.whiteboard.AlignType,
    30002: proto.whiteboard.ArrangeType,
    30003: proto.whiteboard.CommandMessage,
    30004: proto.whiteboard.EventMessage,
    30005: proto.whiteboard.CreateObjectMessage,
    30006: proto.whiteboard.DeleteObjectMessage,
    30007: proto.whiteboard.DeleteObjectsMessage,
    30008: proto.whiteboard.SetObjectPropertyMessage,
    30009: proto.whiteboard.Point,
    30010: proto.whiteboard.StrokeMessage,
    30011: proto.whiteboard.DrawMessage,
    30012: proto.whiteboard.EraseMessage,
    30013: proto.whiteboard.SwapObjectMessage,
    30014: proto.whiteboard.MoveObjectMessage,
    30015: proto.whiteboard.AlignObjectMessage,
    30016: proto.whiteboard.ArrangeObjectMessage,
    30017: proto.whiteboard.ClearPageMessage,
    30018: proto.whiteboard.ClearBoardMessage,
    30019: proto.whiteboard.UndoMessage,
};
exports.msgMap = msgMap;
__export(require("./protocols"));
//# sourceMappingURL=protolist.js.map