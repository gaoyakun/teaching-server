import * as proto from '../common/protocols/protocols';

const testMessage = proto.test.TestMessage.create ({
    test_field: 'hello'
});

const msg = proto.test.TestMessage.fromObject ({
    test_field: 'hello'
});

const buf = proto.test.TestMessage.encode (testMessage).finish ();

export { testMessage };
