
import * as proto from './protocols';

export enum MsgType {
	test_TestMessage = 10000,
	test2_Test2Message = 10001,
}

const msgMap: any = {
	10000: proto.test.TestMessage,
	10001: proto.test2.Test2Message,
};

export { msgMap };