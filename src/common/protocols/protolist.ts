
import * as proto from './protocols';

export enum MsgType {
	base_UberMessage = 10000,
	room_JoinRoomMessage = 20000,
	room_LeaveRoomMessage = 20001,
	whiteboard_CommandMessage = 30000,
	whiteboard_EventMessage = 30001,
	whiteboard_CreateObjectMessage = 30002,
	whiteboard_DeleteObjectMessage = 30003,
	whiteboard_DeleteObjectsMessage = 30004,
	whiteboard_SetObjectPropertyMessage = 30005,
	whiteboard_Point = 30006,
	whiteboard_DrawMessage = 30007,
	whiteboard_EraseMessage = 30008,
	whiteboard_SwapObjectMessage = 30009,
	whiteboard_MoveObjectMessage = 30010,
	whiteboard_ClearPageMessage = 30011,
	whiteboard_ClearBoardMessage = 30012,
	whiteboard_UndoMessage = 30013,
}

const msgMap: any = {
	10000: proto.base.UberMessage,
	20000: proto.room.JoinRoomMessage,
	20001: proto.room.LeaveRoomMessage,
	30000: proto.whiteboard.CommandMessage,
	30001: proto.whiteboard.EventMessage,
	30002: proto.whiteboard.CreateObjectMessage,
	30003: proto.whiteboard.DeleteObjectMessage,
	30004: proto.whiteboard.DeleteObjectsMessage,
	30005: proto.whiteboard.SetObjectPropertyMessage,
	30006: proto.whiteboard.Point,
	30007: proto.whiteboard.DrawMessage,
	30008: proto.whiteboard.EraseMessage,
	30009: proto.whiteboard.SwapObjectMessage,
	30010: proto.whiteboard.MoveObjectMessage,
	30011: proto.whiteboard.ClearPageMessage,
	30012: proto.whiteboard.ClearBoardMessage,
	30013: proto.whiteboard.UndoMessage,
};

export { msgMap };
export * from './protocols';
