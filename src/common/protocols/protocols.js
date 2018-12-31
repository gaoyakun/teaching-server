/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.test = (function() {

    /**
     * Namespace test.
     * @exports test
     * @namespace
     */
    var test = {};

    test.TestMessage = (function() {

        /**
         * Properties of a TestMessage.
         * @memberof test
         * @interface ITestMessage
         * @property {string|null} [testField] TestMessage testField
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
         * TestMessage testField.
         * @member {string} testField
         * @memberof test.TestMessage
         * @instance
         */
        TestMessage.prototype.testField = "";

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
            if (message.testField != null && message.hasOwnProperty("testField"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.testField);
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
                    message.testField = reader.string();
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
            if (message.testField != null && message.hasOwnProperty("testField"))
                if (!$util.isString(message.testField))
                    return "testField: string expected";
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
            if (object.testField != null)
                message.testField = String(object.testField);
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
                object.testField = "";
            if (message.testField != null && message.hasOwnProperty("testField"))
                object.testField = message.testField;
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

$root.test2 = (function() {

    /**
     * Namespace test2.
     * @exports test2
     * @namespace
     */
    var test2 = {};

    test2.Test2Message = (function() {

        /**
         * Properties of a Test2Message.
         * @memberof test2
         * @interface ITest2Message
         * @property {string|null} [test2Field] Test2Message test2Field
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
         * Test2Message test2Field.
         * @member {string} test2Field
         * @memberof test2.Test2Message
         * @instance
         */
        Test2Message.prototype.test2Field = "";

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
            if (message.test2Field != null && message.hasOwnProperty("test2Field"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.test2Field);
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
                    message.test2Field = reader.string();
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
            if (message.test2Field != null && message.hasOwnProperty("test2Field"))
                if (!$util.isString(message.test2Field))
                    return "test2Field: string expected";
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
            if (object.test2Field != null)
                message.test2Field = String(object.test2Field);
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
                object.test2Field = "";
            if (message.test2Field != null && message.hasOwnProperty("test2Field"))
                object.test2Field = message.test2Field;
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

module.exports = $root;
