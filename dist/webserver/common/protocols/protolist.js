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
    MsgType[MsgType["whiteboard_DeleteSelected"] = 30004] = "whiteboard_DeleteSelected";
    MsgType[MsgType["whiteboard_CloneSelected"] = 30005] = "whiteboard_CloneSelected";
    MsgType[MsgType["whiteboard_AlignSelected"] = 30006] = "whiteboard_AlignSelected";
    MsgType[MsgType["whiteboard_ArrangeSelected"] = 30007] = "whiteboard_ArrangeSelected";
    MsgType[MsgType["whiteboard_DeleteObjectMessage"] = 30008] = "whiteboard_DeleteObjectMessage";
    MsgType[MsgType["whiteboard_DeleteObjectsMessage"] = 30009] = "whiteboard_DeleteObjectsMessage";
    MsgType[MsgType["whiteboard_AlignObjectsLeftMessage"] = 30010] = "whiteboard_AlignObjectsLeftMessage";
    MsgType[MsgType["whiteboard_AlignObjectsRightMessage"] = 30011] = "whiteboard_AlignObjectsRightMessage";
    MsgType[MsgType["whiteboard_AlignObjectsTopMessage"] = 30012] = "whiteboard_AlignObjectsTopMessage";
    MsgType[MsgType["whiteboard_AlignObjectsBottomMessage"] = 30013] = "whiteboard_AlignObjectsBottomMessage";
    MsgType[MsgType["whiteboard_ArrangeObjectsHorizontalMessage"] = 30014] = "whiteboard_ArrangeObjectsHorizontalMessage";
    MsgType[MsgType["whiteboard_ArrangeObjectsVerticalMessage"] = 30015] = "whiteboard_ArrangeObjectsVerticalMessage";
    MsgType[MsgType["whiteboard_SetObjectPropertyMessage"] = 30016] = "whiteboard_SetObjectPropertyMessage";
    MsgType[MsgType["whiteboard_AddPageMessage"] = 30017] = "whiteboard_AddPageMessage";
    MsgType[MsgType["whiteboard_RenamePageMessage"] = 30018] = "whiteboard_RenamePageMessage";
    MsgType[MsgType["whiteboard_DeletePageMessage"] = 30019] = "whiteboard_DeletePageMessage";
    MsgType[MsgType["whiteboard_StartDrawMessage"] = 30020] = "whiteboard_StartDrawMessage";
    MsgType[MsgType["whiteboard_DrawingMessage"] = 30021] = "whiteboard_DrawingMessage";
    MsgType[MsgType["whiteboard_DrawMessage"] = 30022] = "whiteboard_DrawMessage";
    MsgType[MsgType["whiteboard_EraseMessage"] = 30023] = "whiteboard_EraseMessage";
    MsgType[MsgType["whiteboard_SwapObjectMessage"] = 30024] = "whiteboard_SwapObjectMessage";
    MsgType[MsgType["whiteboard_ClearPageMessage"] = 30025] = "whiteboard_ClearPageMessage";
    MsgType[MsgType["whiteboard_ClearBoardMessage"] = 30026] = "whiteboard_ClearBoardMessage";
})(MsgType = exports.MsgType || (exports.MsgType = {}));
const msgMap = {
    10000: proto.base.UberMessage,
    20000: proto.room.JoinRoomMessage,
    20001: proto.room.LeaveRoomMessage,
    30000: proto.whiteboard.CommandMessage,
    30001: proto.whiteboard.EventMessage,
    30002: proto.whiteboard.UseToolMessage,
    30003: proto.whiteboard.CreateObjectMessage,
    30004: proto.whiteboard.DeleteSelected,
    30005: proto.whiteboard.CloneSelected,
    30006: proto.whiteboard.AlignSelected,
    30007: proto.whiteboard.ArrangeSelected,
    30008: proto.whiteboard.DeleteObjectMessage,
    30009: proto.whiteboard.DeleteObjectsMessage,
    30010: proto.whiteboard.AlignObjectsLeftMessage,
    30011: proto.whiteboard.AlignObjectsRightMessage,
    30012: proto.whiteboard.AlignObjectsTopMessage,
    30013: proto.whiteboard.AlignObjectsBottomMessage,
    30014: proto.whiteboard.ArrangeObjectsHorizontalMessage,
    30015: proto.whiteboard.ArrangeObjectsVerticalMessage,
    30016: proto.whiteboard.SetObjectPropertyMessage,
    30017: proto.whiteboard.AddPageMessage,
    30018: proto.whiteboard.RenamePageMessage,
    30019: proto.whiteboard.DeletePageMessage,
    30020: proto.whiteboard.StartDrawMessage,
    30021: proto.whiteboard.DrawingMessage,
    30022: proto.whiteboard.DrawMessage,
    30023: proto.whiteboard.EraseMessage,
    30024: proto.whiteboard.SwapObjectMessage,
    30025: proto.whiteboard.ClearPageMessage,
    30026: proto.whiteboard.ClearBoardMessage,
};
exports.msgMap = msgMap;
__export(require("./protocols"));
//# sourceMappingURL=protolist.js.map