"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const proto = require("../common/protocols/protocols");
const testMessage = proto.test.TestMessage.create({
    testField: 'hello'
});
exports.testMessage = testMessage;
const msg = proto.test.TestMessage.fromObject({
    testField: 'hello'
});
const buf = proto.test.TestMessage.encode(testMessage).finish();
//# sourceMappingURL=prototest.js.map