"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const proto = require("./protocols");
var MsgType;
(function (MsgType) {
    MsgType[MsgType["test_TestMessage"] = 10000] = "test_TestMessage";
    MsgType[MsgType["test2_Test2Message"] = 10001] = "test2_Test2Message";
    MsgType[MsgType["whiteboard_CommandMessage"] = 10002] = "whiteboard_CommandMessage";
})(MsgType = exports.MsgType || (exports.MsgType = {}));
const msgMap = {
    10000: proto.test.TestMessage,
    10001: proto.test2.Test2Message,
    10002: proto.whiteboard.CommandMessage,
};
exports.msgMap = msgMap;
//# sourceMappingURL=protolist.js.map