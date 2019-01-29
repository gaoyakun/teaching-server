
import * as proto from './protocols';

export enum MsgType {
	base_UberMessage = 10000,
	room_JoinRoomMessage = 20000,
	room_LeaveRoomMessage = 20001,
	whiteboard_CommandMessage = 30000,
	whiteboard_EventMessage = 30001,
	whiteboard_UseToolMessage = 30002,
	whiteboard_CreateObjectMessage = 30003,
	whiteboard_DeleteObjectMessage = 30004,
	whiteboard_DeleteObjectsMessage = 30005,
	whiteboard_SetObjectPropertyMessage = 30006,
	whiteboard_Point = 30007,
	whiteboard_DrawMessage = 30008,
	whiteboard_EraseMessage = 30009,
	whiteboard_SwapObjectMessage = 30010,
	whiteboard_MoveObjectMessage = 30011,
	whiteboard_ClearPageMessage = 30012,
	whiteboard_ClearBoardMessage = 30013,
	whiteboard_UndoMessage = 30014,
}

const msgMap: any = {
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

export { msgMap };
export * from './protocols';
