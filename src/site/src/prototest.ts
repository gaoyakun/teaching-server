import * as proto from '../../common/protocols/protocols';
import { Packet } from '../../common/protoutils';

(function () {
    const packet = new Packet(proto.test.TestMessage, {
        testField: 'hello'
    });
    console.log (packet.decode ());
}());
