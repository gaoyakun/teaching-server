import * as proto from '../../common/protocols/protolist';
import { Packet, MessageAssembler } from '../../common/protoutils';

(function () {
    const packet = Packet.create(proto.MsgType.test_TestMessage, {
        testField: 'hello'
    });
    const packet2 = Packet.create(proto.MsgType.test2_Test2Message, {
        test2Field: 'hello2'
    });
    const msgAssembler = new MessageAssembler ();
    msgAssembler.put (packet.buffer as Uint8Array);
    msgAssembler.put (packet2.buffer as Uint8Array);
    console.log (msgAssembler.getMessage());
    console.log (msgAssembler.getMessage());
}());
