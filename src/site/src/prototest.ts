import * as proto from '../../common/protocols/protolist';
import { Packet } from '../../common/protoutils';

(function () {
    const packet = Packet.create(proto.MsgType.test_TestMessage, {
        testField: 'hello'
    });
    const data: any = packet.getMsgData ();
    console.log (`type: ${data.type} data: ${data.data}`);
}());
