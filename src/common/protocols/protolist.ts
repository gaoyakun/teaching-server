
import * as proto from './protocols';

export enum MsgType {
	room_JoinRoomMessage = 10000,
	room_LeaveRoomMessage = 10001,
	test_TestMessage = 10002,
	test2_Test2Message = 10003,
	whiteboard_CommandMessage = 10004,
}

const msgMap: any = {
	10000: proto.room.JoinRoomMessage,
	10001: proto.room.LeaveRoomMessage,
	10002: proto.test.TestMessage,
	10003: proto.test2.Test2Message,
	10004: proto.whiteboard.CommandMessage,
};

export { msgMap };
