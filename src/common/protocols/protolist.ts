
import * as proto from './protocols';

export enum MsgType {
	base_UberMessage = 10000,
	room_RoomUser = 20000,
	room_JoinRoomMessage = 20001,
	room_LeaveRoomMessage = 20002,
	room_ListUsersMessage = 20003,
	whiteboard_StrokeType = 30000,
	whiteboard_CommandMessage = 30001,
	whiteboard_EventMessage = 30002,
	whiteboard_CreateObjectMessage = 30003,
	whiteboard_DeleteObjectMessage = 30004,
	whiteboard_DeleteObjectsMessage = 30005,
	whiteboard_SetObjectPropertyMessage = 30006,
	whiteboard_Point = 30007,
	whiteboard_StrokeMessage = 30008,
	whiteboard_DrawMessage = 30009,
	whiteboard_EraseMessage = 30010,
	whiteboard_SwapObjectMessage = 30011,
	whiteboard_MoveObjectMessage = 30012,
	whiteboard_ClearPageMessage = 30013,
	whiteboard_ClearBoardMessage = 30014,
	whiteboard_UndoMessage = 30015,
}

const msgMap: any = {
	10000: proto.base.UberMessage,
	20000: proto.room.RoomUser,
	20001: proto.room.JoinRoomMessage,
	20002: proto.room.LeaveRoomMessage,
	20003: proto.room.ListUsersMessage,
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

export { msgMap };
export * from './protocols';
