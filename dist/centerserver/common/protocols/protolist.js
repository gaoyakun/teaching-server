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
    MsgType[MsgType["whiteboard_AlignObjectsLeftMessage"] = 30006] = "whiteboard_AlignObjectsLeftMessage";
    MsgType[MsgType["whiteboard_AlignObjectsRightMessage"] = 30007] = "whiteboard_AlignObjectsRightMessage";
    MsgType[MsgType["whiteboard_AlignObjectsTopMessage"] = 30008] = "whiteboard_AlignObjectsTopMessage";
    MsgType[MsgType["whiteboard_AlignObjectsBottomMessage"] = 30009] = "whiteboard_AlignObjectsBottomMessage";
    MsgType[MsgType["whiteboard_ArrangeObjectsHorizontalMessage"] = 30010] = "whiteboard_ArrangeObjectsHorizontalMessage";
    MsgType[MsgType["whiteboard_ArrangeObjectsVerticalMessage"] = 30011] = "whiteboard_ArrangeObjectsVerticalMessage";
    MsgType[MsgType["whiteboard_SetObjectPropertyMessage"] = 30012] = "whiteboard_SetObjectPropertyMessage";
    MsgType[MsgType["whiteboard_StartDrawMessage"] = 30013] = "whiteboard_StartDrawMessage";
    MsgType[MsgType["whiteboard_DrawingMessage"] = 30014] = "whiteboard_DrawingMessage";
    MsgType[MsgType["whiteboard_DrawMessage"] = 30015] = "whiteboard_DrawMessage";
    MsgType[MsgType["whiteboard_EraseMessage"] = 30016] = "whiteboard_EraseMessage";
    MsgType[MsgType["whiteboard_SwapObjectMessage"] = 30017] = "whiteboard_SwapObjectMessage";
    MsgType[MsgType["whiteboard_ClearPageMessage"] = 30018] = "whiteboard_ClearPageMessage";
    MsgType[MsgType["whiteboard_ClearBoardMessage"] = 30019] = "whiteboard_ClearBoardMessage";
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
    30006: proto.whiteboard.AlignObjectsLeftMessage,
    30007: proto.whiteboard.AlignObjectsRightMessage,
    30008: proto.whiteboard.AlignObjectsTopMessage,
    30009: proto.whiteboard.AlignObjectsBottomMessage,
    30010: proto.whiteboard.ArrangeObjectsHorizontalMessage,
    30011: proto.whiteboard.ArrangeObjectsVerticalMessage,
    30012: proto.whiteboard.SetObjectPropertyMessage,
    30013: proto.whiteboard.StartDrawMessage,
    30014: proto.whiteboard.DrawingMessage,
    30015: proto.whiteboard.DrawMessage,
    30016: proto.whiteboard.EraseMessage,
    30017: proto.whiteboard.SwapObjectMessage,
    30018: proto.whiteboard.ClearPageMessage,
    30019: proto.whiteboard.ClearBoardMessage,
};
exports.msgMap = msgMap;
__export(require("./protocols"));
//# sourceMappingURL=protolist.js.map