"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const proto = require("../common/protocols/protocols");
const testMessage = proto.test.TestMessage.create({
    test_field: 'hello'
});
exports.testMessage = testMessage;
const msg = proto.test.TestMessage.fromObject({
    test_field: 'hello'
});
const buf = proto.test.TestMessage.encode(testMessage).finish();
//# sourceMappingURL=prototest.js.map