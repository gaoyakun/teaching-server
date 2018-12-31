import * as proto from '../common/protocols/protocols';

const testMessage = proto.test.TestMessage.create ({
    testField: 'hello'
});

const msg = proto.test.TestMessage.fromObject ({
    testField: 'hello'
});

const buf = proto.test.TestMessage.encode (testMessage).finish ();

export { testMessage };
