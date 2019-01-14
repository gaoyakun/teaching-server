
import * as proto from './protocols';

export enum MsgType {
	base_UberMessage = 10000,
	room_JoinRoomMessage = 20000,
	room_LeaveRoomMessage = 20001,
	whiteboard_CommandMessage = 30000,
}

const msgMap: any = {
	10000: proto.base.UberMessage,
	20000: proto.room.JoinRoomMessage,
	20001: proto.room.LeaveRoomMessage,
	30000: proto.whiteboard.CommandMessage,
};

export { msgMap };
