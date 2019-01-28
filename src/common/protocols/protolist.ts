
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
	whiteboard_AlignObjectsLeftMessage = 30006,
	whiteboard_AlignObjectsRightMessage = 30007,
	whiteboard_AlignObjectsTopMessage = 30008,
	whiteboard_AlignObjectsBottomMessage = 30009,
	whiteboard_ArrangeObjectsHorizontalMessage = 30010,
	whiteboard_ArrangeObjectsVerticalMessage = 30011,
	whiteboard_SetObjectPropertyMessage = 30012,
	whiteboard_StartDrawMessage = 30013,
	whiteboard_DrawingMessage = 30014,
	whiteboard_DrawMessage = 30015,
	whiteboard_EraseMessage = 30016,
	whiteboard_SwapObjectMessage = 30017,
	whiteboard_ClearPageMessage = 30018,
	whiteboard_ClearBoardMessage = 30019,
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

export { msgMap };
export * from './protocols';
