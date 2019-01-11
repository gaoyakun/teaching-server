/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";
var $protobuf = require("protobufjs/minimal");
// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
$root.room = (function () {
    /**
     * Namespace room.
     * @exports room
     * @namespace
     */
    var room = {};
    room.JoinRoomMessage = (function () {
        /**
         * Properties of a JoinRoomMessage.
         * @memberof room
         * @interface IJoinRoomMessage
         * @property {string|null} [account] JoinRoomMessage account
         * @property {number|null} [userId] JoinRoomMessage userId
         */
        /**
         * Constructs a new JoinRoomMessage.
         * @memberof room
         * @classdesc Represents a JoinRoomMessage.
         * @implements IJoinRoomMessage
         * @constructor
         * @param {room.IJoinRoomMessage=} [properties] Properties to set
         */
        function JoinRoomMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * JoinRoomMessage account.
         * @member {string} account
         * @memberof room.JoinRoomMessage
         * @instance
         */
        JoinRoomMessage.prototype.account = "";
        /**
         * JoinRoomMessage userId.
         * @member {number} userId
         * @memberof room.JoinRoomMessage
         * @instance
         */
        JoinRoomMessage.prototype.userId = 0;
        /**
         * Creates a new JoinRoomMessage instance using the specified properties.
         * @function create
         * @memberof room.JoinRoomMessage
         * @static
         * @param {room.IJoinRoomMessage=} [properties] Properties to set
         * @returns {room.JoinRoomMessage} JoinRoomMessage instance
         */
        JoinRoomMessage.create = function create(properties) {
            return new JoinRoomMessage(properties);
        };
        /**
         * Encodes the specified JoinRoomMessage message. Does not implicitly {@link room.JoinRoomMessage.verify|verify} messages.
         * @function encode
         * @memberof room.JoinRoomMessage
         * @static
         * @param {room.IJoinRoomMessage} message JoinRoomMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinRoomMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.account != null && message.hasOwnProperty("account"))
                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.account);
            if (message.userId != null && message.hasOwnProperty("userId"))
                writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.userId);
            return writer;
        };
        /**
         * Encodes the specified JoinRoomMessage message, length delimited. Does not implicitly {@link room.JoinRoomMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof room.JoinRoomMessage
         * @static
         * @param {room.IJoinRoomMessage} message JoinRoomMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        JoinRoomMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes a JoinRoomMessage message from the specified reader or buffer.
         * @function decode
         * @memberof room.JoinRoomMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {room.JoinRoomMessage} JoinRoomMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinRoomMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.room.JoinRoomMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.account = reader.string();
                        break;
                    case 2:
                        message.userId = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes a JoinRoomMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof room.JoinRoomMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {room.JoinRoomMessage} JoinRoomMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        JoinRoomMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies a JoinRoomMessage message.
         * @function verify
         * @memberof room.JoinRoomMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        JoinRoomMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.account != null && message.hasOwnProperty("account"))
                if (!$util.isString(message.account))
                    return "account: string expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isInteger(message.userId))
                    return "userId: integer expected";
            return null;
        };
        /**
         * Creates a JoinRoomMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof room.JoinRoomMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {room.JoinRoomMessage} JoinRoomMessage
         */
        JoinRoomMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.room.JoinRoomMessage)
                return object;
            var message = new $root.room.JoinRoomMessage();
            if (object.account != null)
                message.account = String(object.account);
            if (object.userId != null)
                message.userId = object.userId >>> 0;
            return message;
        };
        /**
         * Creates a plain object from a JoinRoomMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof room.JoinRoomMessage
         * @static
         * @param {room.JoinRoomMessage} message JoinRoomMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        JoinRoomMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.account = "";
                object.userId = 0;
            }
            if (message.account != null && message.hasOwnProperty("account"))
                object.account = message.account;
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            return object;
        };
        /**
         * Converts this JoinRoomMessage to JSON.
         * @function toJSON
         * @memberof room.JoinRoomMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        JoinRoomMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return JoinRoomMessage;
    })();
    room.LeaveRoomMessage = (function () {
        /**
         * Properties of a LeaveRoomMessage.
         * @memberof room
         * @interface ILeaveRoomMessage
         * @property {string|null} [account] LeaveRoomMessage account
         * @property {number|null} [userId] LeaveRoomMessage userId
         */
        /**
         * Constructs a new LeaveRoomMessage.
         * @memberof room
         * @classdesc Represents a LeaveRoomMessage.
         * @implements ILeaveRoomMessage
         * @constructor
         * @param {room.ILeaveRoomMessage=} [properties] Properties to set
         */
        function LeaveRoomMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * LeaveRoomMessage account.
         * @member {string} account
         * @memberof room.LeaveRoomMessage
         * @instance
         */
        LeaveRoomMessage.prototype.account = "";
        /**
         * LeaveRoomMessage userId.
         * @member {number} userId
         * @memberof room.LeaveRoomMessage
         * @instance
         */
        LeaveRoomMessage.prototype.userId = 0;
        /**
         * Creates a new LeaveRoomMessage instance using the specified properties.
         * @function create
         * @memberof room.LeaveRoomMessage
         * @static
         * @param {room.ILeaveRoomMessage=} [properties] Properties to set
         * @returns {room.LeaveRoomMessage} LeaveRoomMessage instance
         */
        LeaveRoomMessage.create = function create(properties) {
            return new LeaveRoomMessage(properties);
        };
        /**
         * Encodes the specified LeaveRoomMessage message. Does not implicitly {@link room.LeaveRoomMessage.verify|verify} messages.
         * @function encode
         * @memberof room.LeaveRoomMessage
         * @static
         * @param {room.ILeaveRoomMessage} message LeaveRoomMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LeaveRoomMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.account != null && message.hasOwnProperty("account"))
                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.account);
            if (message.userId != null && message.hasOwnProperty("userId"))
                writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.userId);
            return writer;
        };
        /**
         * Encodes the specified LeaveRoomMessage message, length delimited. Does not implicitly {@link room.LeaveRoomMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof room.LeaveRoomMessage
         * @static
         * @param {room.ILeaveRoomMessage} message LeaveRoomMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LeaveRoomMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes a LeaveRoomMessage message from the specified reader or buffer.
         * @function decode
         * @memberof room.LeaveRoomMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {room.LeaveRoomMessage} LeaveRoomMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LeaveRoomMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.room.LeaveRoomMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.account = reader.string();
                        break;
                    case 2:
                        message.userId = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes a LeaveRoomMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof room.LeaveRoomMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {room.LeaveRoomMessage} LeaveRoomMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LeaveRoomMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies a LeaveRoomMessage message.
         * @function verify
         * @memberof room.LeaveRoomMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LeaveRoomMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.account != null && message.hasOwnProperty("account"))
                if (!$util.isString(message.account))
                    return "account: string expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isInteger(message.userId))
                    return "userId: integer expected";
            return null;
        };
        /**
         * Creates a LeaveRoomMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof room.LeaveRoomMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {room.LeaveRoomMessage} LeaveRoomMessage
         */
        LeaveRoomMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.room.LeaveRoomMessage)
                return object;
            var message = new $root.room.LeaveRoomMessage();
            if (object.account != null)
                message.account = String(object.account);
            if (object.userId != null)
                message.userId = object.userId >>> 0;
            return message;
        };
        /**
         * Creates a plain object from a LeaveRoomMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof room.LeaveRoomMessage
         * @static
         * @param {room.LeaveRoomMessage} message LeaveRoomMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LeaveRoomMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.account = "";
                object.userId = 0;
            }
            if (message.account != null && message.hasOwnProperty("account"))
                object.account = message.account;
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            return object;
        };
        /**
         * Converts this LeaveRoomMessage to JSON.
         * @function toJSON
         * @memberof room.LeaveRoomMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LeaveRoomMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return LeaveRoomMessage;
    })();
    return room;
})();
$root.test = (function () {
    /**
     * Namespace test.
     * @exports test
     * @namespace
     */
    var test = {};
    test.TestMessage = (function () {
        /**
         * Properties of a TestMessage.
         * @memberof test
         * @interface ITestMessage
         * @property {string|null} [test_field] TestMessage test_field
         */
        /**
         * Constructs a new TestMessage.
         * @memberof test
         * @classdesc Represents a TestMessage.
         * @implements ITestMessage
         * @constructor
         * @param {test.ITestMessage=} [properties] Properties to set
         */
        function TestMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * TestMessage test_field.
         * @member {string} test_field
         * @memberof test.TestMessage
         * @instance
         */
        TestMessage.prototype.test_field = "";
        /**
         * Creates a new TestMessage instance using the specified properties.
         * @function create
         * @memberof test.TestMessage
         * @static
         * @param {test.ITestMessage=} [properties] Properties to set
         * @returns {test.TestMessage} TestMessage instance
         */
        TestMessage.create = function create(properties) {
            return new TestMessage(properties);
        };
        /**
         * Encodes the specified TestMessage message. Does not implicitly {@link test.TestMessage.verify|verify} messages.
         * @function encode
         * @memberof test.TestMessage
         * @static
         * @param {test.ITestMessage} message TestMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TestMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.test_field != null && message.hasOwnProperty("test_field"))
                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.test_field);
            return writer;
        };
        /**
         * Encodes the specified TestMessage message, length delimited. Does not implicitly {@link test.TestMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof test.TestMessage
         * @static
         * @param {test.ITestMessage} message TestMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TestMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes a TestMessage message from the specified reader or buffer.
         * @function decode
         * @memberof test.TestMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {test.TestMessage} TestMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TestMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.test.TestMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.test_field = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes a TestMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof test.TestMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {test.TestMessage} TestMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TestMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies a TestMessage message.
         * @function verify
         * @memberof test.TestMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TestMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.test_field != null && message.hasOwnProperty("test_field"))
                if (!$util.isString(message.test_field))
                    return "test_field: string expected";
            return null;
        };
        /**
         * Creates a TestMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof test.TestMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {test.TestMessage} TestMessage
         */
        TestMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.test.TestMessage)
                return object;
            var message = new $root.test.TestMessage();
            if (object.test_field != null)
                message.test_field = String(object.test_field);
            return message;
        };
        /**
         * Creates a plain object from a TestMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof test.TestMessage
         * @static
         * @param {test.TestMessage} message TestMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TestMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.test_field = "";
            if (message.test_field != null && message.hasOwnProperty("test_field"))
                object.test_field = message.test_field;
            return object;
        };
        /**
         * Converts this TestMessage to JSON.
         * @function toJSON
         * @memberof test.TestMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TestMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return TestMessage;
    })();
    return test;
})();
$root.test2 = (function () {
    /**
     * Namespace test2.
     * @exports test2
     * @namespace
     */
    var test2 = {};
    test2.Test2Message = (function () {
        /**
         * Properties of a Test2Message.
         * @memberof test2
         * @interface ITest2Message
         * @property {string|null} [test2_field] Test2Message test2_field
         */
        /**
         * Constructs a new Test2Message.
         * @memberof test2
         * @classdesc Represents a Test2Message.
         * @implements ITest2Message
         * @constructor
         * @param {test2.ITest2Message=} [properties] Properties to set
         */
        function Test2Message(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * Test2Message test2_field.
         * @member {string} test2_field
         * @memberof test2.Test2Message
         * @instance
         */
        Test2Message.prototype.test2_field = "";
        /**
         * Creates a new Test2Message instance using the specified properties.
         * @function create
         * @memberof test2.Test2Message
         * @static
         * @param {test2.ITest2Message=} [properties] Properties to set
         * @returns {test2.Test2Message} Test2Message instance
         */
        Test2Message.create = function create(properties) {
            return new Test2Message(properties);
        };
        /**
         * Encodes the specified Test2Message message. Does not implicitly {@link test2.Test2Message.verify|verify} messages.
         * @function encode
         * @memberof test2.Test2Message
         * @static
         * @param {test2.ITest2Message} message Test2Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Test2Message.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.test2_field != null && message.hasOwnProperty("test2_field"))
                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.test2_field);
            return writer;
        };
        /**
         * Encodes the specified Test2Message message, length delimited. Does not implicitly {@link test2.Test2Message.verify|verify} messages.
         * @function encodeDelimited
         * @memberof test2.Test2Message
         * @static
         * @param {test2.ITest2Message} message Test2Message message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Test2Message.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes a Test2Message message from the specified reader or buffer.
         * @function decode
         * @memberof test2.Test2Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {test2.Test2Message} Test2Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Test2Message.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.test2.Test2Message();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.test2_field = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes a Test2Message message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof test2.Test2Message
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {test2.Test2Message} Test2Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Test2Message.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies a Test2Message message.
         * @function verify
         * @memberof test2.Test2Message
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Test2Message.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.test2_field != null && message.hasOwnProperty("test2_field"))
                if (!$util.isString(message.test2_field))
                    return "test2_field: string expected";
            return null;
        };
        /**
         * Creates a Test2Message message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof test2.Test2Message
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {test2.Test2Message} Test2Message
         */
        Test2Message.fromObject = function fromObject(object) {
            if (object instanceof $root.test2.Test2Message)
                return object;
            var message = new $root.test2.Test2Message();
            if (object.test2_field != null)
                message.test2_field = String(object.test2_field);
            return message;
        };
        /**
         * Creates a plain object from a Test2Message message. Also converts values to other types if specified.
         * @function toObject
         * @memberof test2.Test2Message
         * @static
         * @param {test2.Test2Message} message Test2Message
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Test2Message.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.test2_field = "";
            if (message.test2_field != null && message.hasOwnProperty("test2_field"))
                object.test2_field = message.test2_field;
            return object;
        };
        /**
         * Converts this Test2Message to JSON.
         * @function toJSON
         * @memberof test2.Test2Message
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Test2Message.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return Test2Message;
    })();
    return test2;
})();
$root.whiteboard = (function () {
    /**
     * Namespace whiteboard.
     * @exports whiteboard
     * @namespace
     */
    var whiteboard = {};
    whiteboard.CommandMessage = (function () {
        /**
         * Properties of a CommandMessage.
         * @memberof whiteboard
         * @interface ICommandMessage
         * @property {string|null} [command] CommandMessage command
         */
        /**
         * Constructs a new CommandMessage.
         * @memberof whiteboard
         * @classdesc Represents a CommandMessage.
         * @implements ICommandMessage
         * @constructor
         * @param {whiteboard.ICommandMessage=} [properties] Properties to set
         */
        function CommandMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * CommandMessage command.
         * @member {string} command
         * @memberof whiteboard.CommandMessage
         * @instance
         */
        CommandMessage.prototype.command = "";
        /**
         * Creates a new CommandMessage instance using the specified properties.
         * @function create
         * @memberof whiteboard.CommandMessage
         * @static
         * @param {whiteboard.ICommandMessage=} [properties] Properties to set
         * @returns {whiteboard.CommandMessage} CommandMessage instance
         */
        CommandMessage.create = function create(properties) {
            return new CommandMessage(properties);
        };
        /**
         * Encodes the specified CommandMessage message. Does not implicitly {@link whiteboard.CommandMessage.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.CommandMessage
         * @static
         * @param {whiteboard.ICommandMessage} message CommandMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CommandMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.command != null && message.hasOwnProperty("command"))
                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.command);
            return writer;
        };
        /**
         * Encodes the specified CommandMessage message, length delimited. Does not implicitly {@link whiteboard.CommandMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.CommandMessage
         * @static
         * @param {whiteboard.ICommandMessage} message CommandMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CommandMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes a CommandMessage message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.CommandMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.CommandMessage} CommandMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CommandMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.CommandMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.command = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes a CommandMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.CommandMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.CommandMessage} CommandMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CommandMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies a CommandMessage message.
         * @function verify
         * @memberof whiteboard.CommandMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CommandMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.command != null && message.hasOwnProperty("command"))
                if (!$util.isString(message.command))
                    return "command: string expected";
            return null;
        };
        /**
         * Creates a CommandMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.CommandMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.CommandMessage} CommandMessage
         */
        CommandMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.CommandMessage)
                return object;
            var message = new $root.whiteboard.CommandMessage();
            if (object.command != null)
                message.command = String(object.command);
            return message;
        };
        /**
         * Creates a plain object from a CommandMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.CommandMessage
         * @static
         * @param {whiteboard.CommandMessage} message CommandMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CommandMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.command = "";
            if (message.command != null && message.hasOwnProperty("command"))
                object.command = message.command;
            return object;
        };
        /**
         * Converts this CommandMessage to JSON.
         * @function toJSON
         * @memberof whiteboard.CommandMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CommandMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return CommandMessage;
    })();
    return whiteboard;
})();
module.exports = $root;
//# sourceMappingURL=protocols.js.map