
import * as proto from './protocols';

export enum MsgType {
	room_JoinRoomMessage = 10000,
	room_LeaveRoomMessage = 10001,
	whiteboard_CommandMessage = 10002,
}

const msgMap: any = {
	10000: proto.room.JoinRoomMessage,
	10001: proto.room.LeaveRoomMessage,
	10002: proto.whiteboard.CommandMessage,
};

export { msgMap };
