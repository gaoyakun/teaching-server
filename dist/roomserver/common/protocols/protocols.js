/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";
var $protobuf = require("protobufjs/minimal");
// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
$root.base = (function () {
    /**
     * Namespace base.
     * @exports base
     * @namespace
     */
    var base = {};
    /**
     * MessageID enum.
     * @name base.MessageID
     * @enum {string}
     * @property {number} Start=10000 Start value
     */
    base.MessageID = (function () {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[10000] = "Start"] = 10000;
        return values;
    })();
    base.UberMessage = (function () {
        /**
         * Properties of an UberMessage.
         * @memberof base
         * @interface IUberMessage
         * @property {Array.<Uint8Array>|null} [subMessages] UberMessage subMessages
         */
        /**
         * Constructs a new UberMessage.
         * @memberof base
         * @classdesc Represents an UberMessage.
         * @implements IUberMessage
         * @constructor
         * @param {base.IUberMessage=} [properties] Properties to set
         */
        function UberMessage(properties) {
            this.subMessages = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * UberMessage subMessages.
         * @member {Array.<Uint8Array>} subMessages
         * @memberof base.UberMessage
         * @instance
         */
        UberMessage.prototype.subMessages = $util.emptyArray;
        /**
         * Creates a new UberMessage instance using the specified properties.
         * @function create
         * @memberof base.UberMessage
         * @static
         * @param {base.IUberMessage=} [properties] Properties to set
         * @returns {base.UberMessage} UberMessage instance
         */
        UberMessage.create = function create(properties) {
            return new UberMessage(properties);
        };
        /**
         * Encodes the specified UberMessage message. Does not implicitly {@link base.UberMessage.verify|verify} messages.
         * @function encode
         * @memberof base.UberMessage
         * @static
         * @param {base.IUberMessage} message UberMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UberMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.subMessages != null && message.subMessages.length)
                for (var i = 0; i < message.subMessages.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/ 10).bytes(message.subMessages[i]);
            return writer;
        };
        /**
         * Encodes the specified UberMessage message, length delimited. Does not implicitly {@link base.UberMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof base.UberMessage
         * @static
         * @param {base.IUberMessage} message UberMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UberMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes an UberMessage message from the specified reader or buffer.
         * @function decode
         * @memberof base.UberMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {base.UberMessage} UberMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UberMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.base.UberMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        if (!(message.subMessages && message.subMessages.length))
                            message.subMessages = [];
                        message.subMessages.push(reader.bytes());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes an UberMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof base.UberMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {base.UberMessage} UberMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UberMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies an UberMessage message.
         * @function verify
         * @memberof base.UberMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UberMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.subMessages != null && message.hasOwnProperty("subMessages")) {
                if (!Array.isArray(message.subMessages))
                    return "subMessages: array expected";
                for (var i = 0; i < message.subMessages.length; ++i)
                    if (!(message.subMessages[i] && typeof message.subMessages[i].length === "number" || $util.isString(message.subMessages[i])))
                        return "subMessages: buffer[] expected";
            }
            return null;
        };
        /**
         * Creates an UberMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof base.UberMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {base.UberMessage} UberMessage
         */
        UberMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.base.UberMessage)
                return object;
            var message = new $root.base.UberMessage();
            if (object.subMessages) {
                if (!Array.isArray(object.subMessages))
                    throw TypeError(".base.UberMessage.subMessages: array expected");
                message.subMessages = [];
                for (var i = 0; i < object.subMessages.length; ++i)
                    if (typeof object.subMessages[i] === "string")
                        $util.base64.decode(object.subMessages[i], message.subMessages[i] = $util.newBuffer($util.base64.length(object.subMessages[i])), 0);
                    else if (object.subMessages[i].length)
                        message.subMessages[i] = object.subMessages[i];
            }
            return message;
        };
        /**
         * Creates a plain object from an UberMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof base.UberMessage
         * @static
         * @param {base.UberMessage} message UberMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UberMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.subMessages = [];
            if (message.subMessages && message.subMessages.length) {
                object.subMessages = [];
                for (var j = 0; j < message.subMessages.length; ++j)
                    object.subMessages[j] = options.bytes === String ? $util.base64.encode(message.subMessages[j], 0, message.subMessages[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.subMessages[j]) : message.subMessages[j];
            }
            return object;
        };
        /**
         * Converts this UberMessage to JSON.
         * @function toJSON
         * @memberof base.UberMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UberMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return UberMessage;
    })();
    return base;
})();
$root.room = (function () {
    /**
     * Namespace room.
     * @exports room
     * @namespace
     */
    var room = {};
    /**
     * MessageID enum.
     * @name room.MessageID
     * @enum {string}
     * @property {number} Start=20000 Start value
     */
    room.MessageID = (function () {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[20000] = "Start"] = 20000;
        return values;
    })();
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
$root.whiteboard = (function () {
    /**
     * Namespace whiteboard.
     * @exports whiteboard
     * @namespace
     */
    var whiteboard = {};
    /**
     * MessageID enum.
     * @name whiteboard.MessageID
     * @enum {string}
     * @property {number} Start=30000 Start value
     */
    whiteboard.MessageID = (function () {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[30000] = "Start"] = 30000;
        return values;
    })();
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
    whiteboard.EventMessage = (function () {
        /**
         * Properties of an EventMessage.
         * @memberof whiteboard
         * @interface IEventMessage
         * @property {Uint8Array|null} [message] EventMessage message
         * @property {string|null} [object] EventMessage object
         */
        /**
         * Constructs a new EventMessage.
         * @memberof whiteboard
         * @classdesc Represents an EventMessage.
         * @implements IEventMessage
         * @constructor
         * @param {whiteboard.IEventMessage=} [properties] Properties to set
         */
        function EventMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * EventMessage message.
         * @member {Uint8Array} message
         * @memberof whiteboard.EventMessage
         * @instance
         */
        EventMessage.prototype.message = $util.newBuffer([]);
        /**
         * EventMessage object.
         * @member {string} object
         * @memberof whiteboard.EventMessage
         * @instance
         */
        EventMessage.prototype.object = "";
        /**
         * Creates a new EventMessage instance using the specified properties.
         * @function create
         * @memberof whiteboard.EventMessage
         * @static
         * @param {whiteboard.IEventMessage=} [properties] Properties to set
         * @returns {whiteboard.EventMessage} EventMessage instance
         */
        EventMessage.create = function create(properties) {
            return new EventMessage(properties);
        };
        /**
         * Encodes the specified EventMessage message. Does not implicitly {@link whiteboard.EventMessage.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.EventMessage
         * @static
         * @param {whiteboard.IEventMessage} message EventMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EventMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.message != null && message.hasOwnProperty("message"))
                writer.uint32(/* id 1, wireType 2 =*/ 10).bytes(message.message);
            if (message.object != null && message.hasOwnProperty("object"))
                writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.object);
            return writer;
        };
        /**
         * Encodes the specified EventMessage message, length delimited. Does not implicitly {@link whiteboard.EventMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.EventMessage
         * @static
         * @param {whiteboard.IEventMessage} message EventMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EventMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes an EventMessage message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.EventMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.EventMessage} EventMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EventMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.EventMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.message = reader.bytes();
                        break;
                    case 2:
                        message.object = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes an EventMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.EventMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.EventMessage} EventMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EventMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies an EventMessage message.
         * @function verify
         * @memberof whiteboard.EventMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EventMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.message != null && message.hasOwnProperty("message"))
                if (!(message.message && typeof message.message.length === "number" || $util.isString(message.message)))
                    return "message: buffer expected";
            if (message.object != null && message.hasOwnProperty("object"))
                if (!$util.isString(message.object))
                    return "object: string expected";
            return null;
        };
        /**
         * Creates an EventMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.EventMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.EventMessage} EventMessage
         */
        EventMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.EventMessage)
                return object;
            var message = new $root.whiteboard.EventMessage();
            if (object.message != null)
                if (typeof object.message === "string")
                    $util.base64.decode(object.message, message.message = $util.newBuffer($util.base64.length(object.message)), 0);
                else if (object.message.length)
                    message.message = object.message;
            if (object.object != null)
                message.object = String(object.object);
            return message;
        };
        /**
         * Creates a plain object from an EventMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.EventMessage
         * @static
         * @param {whiteboard.EventMessage} message EventMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EventMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.message = "";
                else {
                    object.message = [];
                    if (options.bytes !== Array)
                        object.message = $util.newBuffer(object.message);
                }
                object.object = "";
            }
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = options.bytes === String ? $util.base64.encode(message.message, 0, message.message.length) : options.bytes === Array ? Array.prototype.slice.call(message.message) : message.message;
            if (message.object != null && message.hasOwnProperty("object"))
                object.object = message.object;
            return object;
        };
        /**
         * Converts this EventMessage to JSON.
         * @function toJSON
         * @memberof whiteboard.EventMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EventMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return EventMessage;
    })();
    whiteboard.UseToolMessage = (function () {
        /**
         * Properties of a UseToolMessage.
         * @memberof whiteboard
         * @interface IUseToolMessage
         * @property {string|null} [name] UseToolMessage name
         * @property {string|null} [paramsJson] UseToolMessage paramsJson
         */
        /**
         * Constructs a new UseToolMessage.
         * @memberof whiteboard
         * @classdesc Represents a UseToolMessage.
         * @implements IUseToolMessage
         * @constructor
         * @param {whiteboard.IUseToolMessage=} [properties] Properties to set
         */
        function UseToolMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * UseToolMessage name.
         * @member {string} name
         * @memberof whiteboard.UseToolMessage
         * @instance
         */
        UseToolMessage.prototype.name = "";
        /**
         * UseToolMessage paramsJson.
         * @member {string} paramsJson
         * @memberof whiteboard.UseToolMessage
         * @instance
         */
        UseToolMessage.prototype.paramsJson = "";
        /**
         * Creates a new UseToolMessage instance using the specified properties.
         * @function create
         * @memberof whiteboard.UseToolMessage
         * @static
         * @param {whiteboard.IUseToolMessage=} [properties] Properties to set
         * @returns {whiteboard.UseToolMessage} UseToolMessage instance
         */
        UseToolMessage.create = function create(properties) {
            return new UseToolMessage(properties);
        };
        /**
         * Encodes the specified UseToolMessage message. Does not implicitly {@link whiteboard.UseToolMessage.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.UseToolMessage
         * @static
         * @param {whiteboard.IUseToolMessage} message UseToolMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UseToolMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.name);
            if (message.paramsJson != null && message.hasOwnProperty("paramsJson"))
                writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.paramsJson);
            return writer;
        };
        /**
         * Encodes the specified UseToolMessage message, length delimited. Does not implicitly {@link whiteboard.UseToolMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.UseToolMessage
         * @static
         * @param {whiteboard.IUseToolMessage} message UseToolMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UseToolMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes a UseToolMessage message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.UseToolMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.UseToolMessage} UseToolMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UseToolMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.UseToolMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;
                    case 2:
                        message.paramsJson = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes a UseToolMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.UseToolMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.UseToolMessage} UseToolMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UseToolMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies a UseToolMessage message.
         * @function verify
         * @memberof whiteboard.UseToolMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UseToolMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.paramsJson != null && message.hasOwnProperty("paramsJson"))
                if (!$util.isString(message.paramsJson))
                    return "paramsJson: string expected";
            return null;
        };
        /**
         * Creates a UseToolMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.UseToolMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.UseToolMessage} UseToolMessage
         */
        UseToolMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.UseToolMessage)
                return object;
            var message = new $root.whiteboard.UseToolMessage();
            if (object.name != null)
                message.name = String(object.name);
            if (object.paramsJson != null)
                message.paramsJson = String(object.paramsJson);
            return message;
        };
        /**
         * Creates a plain object from a UseToolMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.UseToolMessage
         * @static
         * @param {whiteboard.UseToolMessage} message UseToolMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UseToolMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.name = "";
                object.paramsJson = "";
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.paramsJson != null && message.hasOwnProperty("paramsJson"))
                object.paramsJson = message.paramsJson;
            return object;
        };
        /**
         * Converts this UseToolMessage to JSON.
         * @function toJSON
         * @memberof whiteboard.UseToolMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UseToolMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return UseToolMessage;
    })();
    whiteboard.CreateObjectMessage = (function () {
        /**
         * Properties of a CreateObjectMessage.
         * @memberof whiteboard
         * @interface ICreateObjectMessage
         * @property {string|null} [type] CreateObjectMessage type
         * @property {number|null} [x] CreateObjectMessage x
         * @property {number|null} [y] CreateObjectMessage y
         * @property {string|null} [name] CreateObjectMessage name
         * @property {boolean|null} [failOnExists] CreateObjectMessage failOnExists
         * @property {string|null} [paramsJson] CreateObjectMessage paramsJson
         */
        /**
         * Constructs a new CreateObjectMessage.
         * @memberof whiteboard
         * @classdesc Represents a CreateObjectMessage.
         * @implements ICreateObjectMessage
         * @constructor
         * @param {whiteboard.ICreateObjectMessage=} [properties] Properties to set
         */
        function CreateObjectMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * CreateObjectMessage type.
         * @member {string} type
         * @memberof whiteboard.CreateObjectMessage
         * @instance
         */
        CreateObjectMessage.prototype.type = "";
        /**
         * CreateObjectMessage x.
         * @member {number} x
         * @memberof whiteboard.CreateObjectMessage
         * @instance
         */
        CreateObjectMessage.prototype.x = 0;
        /**
         * CreateObjectMessage y.
         * @member {number} y
         * @memberof whiteboard.CreateObjectMessage
         * @instance
         */
        CreateObjectMessage.prototype.y = 0;
        /**
         * CreateObjectMessage name.
         * @member {string} name
         * @memberof whiteboard.CreateObjectMessage
         * @instance
         */
        CreateObjectMessage.prototype.name = "";
        /**
         * CreateObjectMessage failOnExists.
         * @member {boolean} failOnExists
         * @memberof whiteboard.CreateObjectMessage
         * @instance
         */
        CreateObjectMessage.prototype.failOnExists = false;
        /**
         * CreateObjectMessage paramsJson.
         * @member {string} paramsJson
         * @memberof whiteboard.CreateObjectMessage
         * @instance
         */
        CreateObjectMessage.prototype.paramsJson = "";
        /**
         * Creates a new CreateObjectMessage instance using the specified properties.
         * @function create
         * @memberof whiteboard.CreateObjectMessage
         * @static
         * @param {whiteboard.ICreateObjectMessage=} [properties] Properties to set
         * @returns {whiteboard.CreateObjectMessage} CreateObjectMessage instance
         */
        CreateObjectMessage.create = function create(properties) {
            return new CreateObjectMessage(properties);
        };
        /**
         * Encodes the specified CreateObjectMessage message. Does not implicitly {@link whiteboard.CreateObjectMessage.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.CreateObjectMessage
         * @static
         * @param {whiteboard.ICreateObjectMessage} message CreateObjectMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CreateObjectMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && message.hasOwnProperty("type"))
                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.type);
            if (message.x != null && message.hasOwnProperty("x"))
                writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.x);
            if (message.y != null && message.hasOwnProperty("y"))
                writer.uint32(/* id 3, wireType 0 =*/ 24).uint32(message.y);
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.name);
            if (message.failOnExists != null && message.hasOwnProperty("failOnExists"))
                writer.uint32(/* id 5, wireType 0 =*/ 40).bool(message.failOnExists);
            if (message.paramsJson != null && message.hasOwnProperty("paramsJson"))
                writer.uint32(/* id 6, wireType 2 =*/ 50).string(message.paramsJson);
            return writer;
        };
        /**
         * Encodes the specified CreateObjectMessage message, length delimited. Does not implicitly {@link whiteboard.CreateObjectMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.CreateObjectMessage
         * @static
         * @param {whiteboard.ICreateObjectMessage} message CreateObjectMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CreateObjectMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes a CreateObjectMessage message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.CreateObjectMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.CreateObjectMessage} CreateObjectMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CreateObjectMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.CreateObjectMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.type = reader.string();
                        break;
                    case 2:
                        message.x = reader.uint32();
                        break;
                    case 3:
                        message.y = reader.uint32();
                        break;
                    case 4:
                        message.name = reader.string();
                        break;
                    case 5:
                        message.failOnExists = reader.bool();
                        break;
                    case 6:
                        message.paramsJson = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes a CreateObjectMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.CreateObjectMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.CreateObjectMessage} CreateObjectMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CreateObjectMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies a CreateObjectMessage message.
         * @function verify
         * @memberof whiteboard.CreateObjectMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CreateObjectMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isString(message.type))
                    return "type: string expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (!$util.isInteger(message.x))
                    return "x: integer expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (!$util.isInteger(message.y))
                    return "y: integer expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.failOnExists != null && message.hasOwnProperty("failOnExists"))
                if (typeof message.failOnExists !== "boolean")
                    return "failOnExists: boolean expected";
            if (message.paramsJson != null && message.hasOwnProperty("paramsJson"))
                if (!$util.isString(message.paramsJson))
                    return "paramsJson: string expected";
            return null;
        };
        /**
         * Creates a CreateObjectMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.CreateObjectMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.CreateObjectMessage} CreateObjectMessage
         */
        CreateObjectMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.CreateObjectMessage)
                return object;
            var message = new $root.whiteboard.CreateObjectMessage();
            if (object.type != null)
                message.type = String(object.type);
            if (object.x != null)
                message.x = object.x >>> 0;
            if (object.y != null)
                message.y = object.y >>> 0;
            if (object.name != null)
                message.name = String(object.name);
            if (object.failOnExists != null)
                message.failOnExists = Boolean(object.failOnExists);
            if (object.paramsJson != null)
                message.paramsJson = String(object.paramsJson);
            return message;
        };
        /**
         * Creates a plain object from a CreateObjectMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.CreateObjectMessage
         * @static
         * @param {whiteboard.CreateObjectMessage} message CreateObjectMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CreateObjectMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.type = "";
                object.x = 0;
                object.y = 0;
                object.name = "";
                object.failOnExists = false;
                object.paramsJson = "";
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = message.y;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.failOnExists != null && message.hasOwnProperty("failOnExists"))
                object.failOnExists = message.failOnExists;
            if (message.paramsJson != null && message.hasOwnProperty("paramsJson"))
                object.paramsJson = message.paramsJson;
            return object;
        };
        /**
         * Converts this CreateObjectMessage to JSON.
         * @function toJSON
         * @memberof whiteboard.CreateObjectMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CreateObjectMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return CreateObjectMessage;
    })();
    whiteboard.DeleteSelected = (function () {
        /**
         * Properties of a DeleteSelected.
         * @memberof whiteboard
         * @interface IDeleteSelected
         */
        /**
         * Constructs a new DeleteSelected.
         * @memberof whiteboard
         * @classdesc Represents a DeleteSelected.
         * @implements IDeleteSelected
         * @constructor
         * @param {whiteboard.IDeleteSelected=} [properties] Properties to set
         */
        function DeleteSelected(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * Creates a new DeleteSelected instance using the specified properties.
         * @function create
         * @memberof whiteboard.DeleteSelected
         * @static
         * @param {whiteboard.IDeleteSelected=} [properties] Properties to set
         * @returns {whiteboard.DeleteSelected} DeleteSelected instance
         */
        DeleteSelected.create = function create(properties) {
            return new DeleteSelected(properties);
        };
        /**
         * Encodes the specified DeleteSelected message. Does not implicitly {@link whiteboard.DeleteSelected.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.DeleteSelected
         * @static
         * @param {whiteboard.IDeleteSelected} message DeleteSelected message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeleteSelected.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };
        /**
         * Encodes the specified DeleteSelected message, length delimited. Does not implicitly {@link whiteboard.DeleteSelected.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.DeleteSelected
         * @static
         * @param {whiteboard.IDeleteSelected} message DeleteSelected message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeleteSelected.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes a DeleteSelected message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.DeleteSelected
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.DeleteSelected} DeleteSelected
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeleteSelected.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.DeleteSelected();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes a DeleteSelected message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.DeleteSelected
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.DeleteSelected} DeleteSelected
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeleteSelected.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies a DeleteSelected message.
         * @function verify
         * @memberof whiteboard.DeleteSelected
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DeleteSelected.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };
        /**
         * Creates a DeleteSelected message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.DeleteSelected
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.DeleteSelected} DeleteSelected
         */
        DeleteSelected.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.DeleteSelected)
                return object;
            return new $root.whiteboard.DeleteSelected();
        };
        /**
         * Creates a plain object from a DeleteSelected message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.DeleteSelected
         * @static
         * @param {whiteboard.DeleteSelected} message DeleteSelected
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DeleteSelected.toObject = function toObject() {
            return {};
        };
        /**
         * Converts this DeleteSelected to JSON.
         * @function toJSON
         * @memberof whiteboard.DeleteSelected
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DeleteSelected.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return DeleteSelected;
    })();
    whiteboard.CloneSelected = (function () {
        /**
         * Properties of a CloneSelected.
         * @memberof whiteboard
         * @interface ICloneSelected
         */
        /**
         * Constructs a new CloneSelected.
         * @memberof whiteboard
         * @classdesc Represents a CloneSelected.
         * @implements ICloneSelected
         * @constructor
         * @param {whiteboard.ICloneSelected=} [properties] Properties to set
         */
        function CloneSelected(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * Creates a new CloneSelected instance using the specified properties.
         * @function create
         * @memberof whiteboard.CloneSelected
         * @static
         * @param {whiteboard.ICloneSelected=} [properties] Properties to set
         * @returns {whiteboard.CloneSelected} CloneSelected instance
         */
        CloneSelected.create = function create(properties) {
            return new CloneSelected(properties);
        };
        /**
         * Encodes the specified CloneSelected message. Does not implicitly {@link whiteboard.CloneSelected.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.CloneSelected
         * @static
         * @param {whiteboard.ICloneSelected} message CloneSelected message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CloneSelected.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };
        /**
         * Encodes the specified CloneSelected message, length delimited. Does not implicitly {@link whiteboard.CloneSelected.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.CloneSelected
         * @static
         * @param {whiteboard.ICloneSelected} message CloneSelected message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CloneSelected.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes a CloneSelected message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.CloneSelected
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.CloneSelected} CloneSelected
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CloneSelected.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.CloneSelected();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes a CloneSelected message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.CloneSelected
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.CloneSelected} CloneSelected
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CloneSelected.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies a CloneSelected message.
         * @function verify
         * @memberof whiteboard.CloneSelected
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CloneSelected.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };
        /**
         * Creates a CloneSelected message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.CloneSelected
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.CloneSelected} CloneSelected
         */
        CloneSelected.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.CloneSelected)
                return object;
            return new $root.whiteboard.CloneSelected();
        };
        /**
         * Creates a plain object from a CloneSelected message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.CloneSelected
         * @static
         * @param {whiteboard.CloneSelected} message CloneSelected
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CloneSelected.toObject = function toObject() {
            return {};
        };
        /**
         * Converts this CloneSelected to JSON.
         * @function toJSON
         * @memberof whiteboard.CloneSelected
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CloneSelected.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return CloneSelected;
    })();
    whiteboard.AlignSelected = (function () {
        /**
         * Properties of an AlignSelected.
         * @memberof whiteboard
         * @interface IAlignSelected
         * @property {string|null} [mode] AlignSelected mode
         */
        /**
         * Constructs a new AlignSelected.
         * @memberof whiteboard
         * @classdesc Represents an AlignSelected.
         * @implements IAlignSelected
         * @constructor
         * @param {whiteboard.IAlignSelected=} [properties] Properties to set
         */
        function AlignSelected(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * AlignSelected mode.
         * @member {string} mode
         * @memberof whiteboard.AlignSelected
         * @instance
         */
        AlignSelected.prototype.mode = "";
        /**
         * Creates a new AlignSelected instance using the specified properties.
         * @function create
         * @memberof whiteboard.AlignSelected
         * @static
         * @param {whiteboard.IAlignSelected=} [properties] Properties to set
         * @returns {whiteboard.AlignSelected} AlignSelected instance
         */
        AlignSelected.create = function create(properties) {
            return new AlignSelected(properties);
        };
        /**
         * Encodes the specified AlignSelected message. Does not implicitly {@link whiteboard.AlignSelected.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.AlignSelected
         * @static
         * @param {whiteboard.IAlignSelected} message AlignSelected message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AlignSelected.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.mode != null && message.hasOwnProperty("mode"))
                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.mode);
            return writer;
        };
        /**
         * Encodes the specified AlignSelected message, length delimited. Does not implicitly {@link whiteboard.AlignSelected.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.AlignSelected
         * @static
         * @param {whiteboard.IAlignSelected} message AlignSelected message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AlignSelected.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes an AlignSelected message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.AlignSelected
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.AlignSelected} AlignSelected
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AlignSelected.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.AlignSelected();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.mode = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes an AlignSelected message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.AlignSelected
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.AlignSelected} AlignSelected
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AlignSelected.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies an AlignSelected message.
         * @function verify
         * @memberof whiteboard.AlignSelected
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AlignSelected.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.mode != null && message.hasOwnProperty("mode"))
                if (!$util.isString(message.mode))
                    return "mode: string expected";
            return null;
        };
        /**
         * Creates an AlignSelected message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.AlignSelected
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.AlignSelected} AlignSelected
         */
        AlignSelected.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.AlignSelected)
                return object;
            var message = new $root.whiteboard.AlignSelected();
            if (object.mode != null)
                message.mode = String(object.mode);
            return message;
        };
        /**
         * Creates a plain object from an AlignSelected message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.AlignSelected
         * @static
         * @param {whiteboard.AlignSelected} message AlignSelected
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AlignSelected.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.mode = "";
            if (message.mode != null && message.hasOwnProperty("mode"))
                object.mode = message.mode;
            return object;
        };
        /**
         * Converts this AlignSelected to JSON.
         * @function toJSON
         * @memberof whiteboard.AlignSelected
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AlignSelected.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return AlignSelected;
    })();
    whiteboard.ArrangeSelected = (function () {
        /**
         * Properties of an ArrangeSelected.
         * @memberof whiteboard
         * @interface IArrangeSelected
         * @property {string|null} [mode] ArrangeSelected mode
         */
        /**
         * Constructs a new ArrangeSelected.
         * @memberof whiteboard
         * @classdesc Represents an ArrangeSelected.
         * @implements IArrangeSelected
         * @constructor
         * @param {whiteboard.IArrangeSelected=} [properties] Properties to set
         */
        function ArrangeSelected(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * ArrangeSelected mode.
         * @member {string} mode
         * @memberof whiteboard.ArrangeSelected
         * @instance
         */
        ArrangeSelected.prototype.mode = "";
        /**
         * Creates a new ArrangeSelected instance using the specified properties.
         * @function create
         * @memberof whiteboard.ArrangeSelected
         * @static
         * @param {whiteboard.IArrangeSelected=} [properties] Properties to set
         * @returns {whiteboard.ArrangeSelected} ArrangeSelected instance
         */
        ArrangeSelected.create = function create(properties) {
            return new ArrangeSelected(properties);
        };
        /**
         * Encodes the specified ArrangeSelected message. Does not implicitly {@link whiteboard.ArrangeSelected.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.ArrangeSelected
         * @static
         * @param {whiteboard.IArrangeSelected} message ArrangeSelected message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ArrangeSelected.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.mode != null && message.hasOwnProperty("mode"))
                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.mode);
            return writer;
        };
        /**
         * Encodes the specified ArrangeSelected message, length delimited. Does not implicitly {@link whiteboard.ArrangeSelected.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.ArrangeSelected
         * @static
         * @param {whiteboard.IArrangeSelected} message ArrangeSelected message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ArrangeSelected.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes an ArrangeSelected message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.ArrangeSelected
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.ArrangeSelected} ArrangeSelected
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ArrangeSelected.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.ArrangeSelected();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.mode = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes an ArrangeSelected message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.ArrangeSelected
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.ArrangeSelected} ArrangeSelected
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ArrangeSelected.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies an ArrangeSelected message.
         * @function verify
         * @memberof whiteboard.ArrangeSelected
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ArrangeSelected.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.mode != null && message.hasOwnProperty("mode"))
                if (!$util.isString(message.mode))
                    return "mode: string expected";
            return null;
        };
        /**
         * Creates an ArrangeSelected message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.ArrangeSelected
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.ArrangeSelected} ArrangeSelected
         */
        ArrangeSelected.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.ArrangeSelected)
                return object;
            var message = new $root.whiteboard.ArrangeSelected();
            if (object.mode != null)
                message.mode = String(object.mode);
            return message;
        };
        /**
         * Creates a plain object from an ArrangeSelected message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.ArrangeSelected
         * @static
         * @param {whiteboard.ArrangeSelected} message ArrangeSelected
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ArrangeSelected.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.mode = "";
            if (message.mode != null && message.hasOwnProperty("mode"))
                object.mode = message.mode;
            return object;
        };
        /**
         * Converts this ArrangeSelected to JSON.
         * @function toJSON
         * @memberof whiteboard.ArrangeSelected
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ArrangeSelected.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return ArrangeSelected;
    })();
    whiteboard.DeleteObjectMessage = (function () {
        /**
         * Properties of a DeleteObjectMessage.
         * @memberof whiteboard
         * @interface IDeleteObjectMessage
         * @property {string|null} [name] DeleteObjectMessage name
         */
        /**
         * Constructs a new DeleteObjectMessage.
         * @memberof whiteboard
         * @classdesc Represents a DeleteObjectMessage.
         * @implements IDeleteObjectMessage
         * @constructor
         * @param {whiteboard.IDeleteObjectMessage=} [properties] Properties to set
         */
        function DeleteObjectMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * DeleteObjectMessage name.
         * @member {string} name
         * @memberof whiteboard.DeleteObjectMessage
         * @instance
         */
        DeleteObjectMessage.prototype.name = "";
        /**
         * Creates a new DeleteObjectMessage instance using the specified properties.
         * @function create
         * @memberof whiteboard.DeleteObjectMessage
         * @static
         * @param {whiteboard.IDeleteObjectMessage=} [properties] Properties to set
         * @returns {whiteboard.DeleteObjectMessage} DeleteObjectMessage instance
         */
        DeleteObjectMessage.create = function create(properties) {
            return new DeleteObjectMessage(properties);
        };
        /**
         * Encodes the specified DeleteObjectMessage message. Does not implicitly {@link whiteboard.DeleteObjectMessage.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.DeleteObjectMessage
         * @static
         * @param {whiteboard.IDeleteObjectMessage} message DeleteObjectMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeleteObjectMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.name);
            return writer;
        };
        /**
         * Encodes the specified DeleteObjectMessage message, length delimited. Does not implicitly {@link whiteboard.DeleteObjectMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.DeleteObjectMessage
         * @static
         * @param {whiteboard.IDeleteObjectMessage} message DeleteObjectMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeleteObjectMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes a DeleteObjectMessage message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.DeleteObjectMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.DeleteObjectMessage} DeleteObjectMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeleteObjectMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.DeleteObjectMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes a DeleteObjectMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.DeleteObjectMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.DeleteObjectMessage} DeleteObjectMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeleteObjectMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies a DeleteObjectMessage message.
         * @function verify
         * @memberof whiteboard.DeleteObjectMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DeleteObjectMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            return null;
        };
        /**
         * Creates a DeleteObjectMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.DeleteObjectMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.DeleteObjectMessage} DeleteObjectMessage
         */
        DeleteObjectMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.DeleteObjectMessage)
                return object;
            var message = new $root.whiteboard.DeleteObjectMessage();
            if (object.name != null)
                message.name = String(object.name);
            return message;
        };
        /**
         * Creates a plain object from a DeleteObjectMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.DeleteObjectMessage
         * @static
         * @param {whiteboard.DeleteObjectMessage} message DeleteObjectMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DeleteObjectMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.name = "";
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            return object;
        };
        /**
         * Converts this DeleteObjectMessage to JSON.
         * @function toJSON
         * @memberof whiteboard.DeleteObjectMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DeleteObjectMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return DeleteObjectMessage;
    })();
    whiteboard.DeleteObjectsMessage = (function () {
        /**
         * Properties of a DeleteObjectsMessage.
         * @memberof whiteboard
         * @interface IDeleteObjectsMessage
         * @property {Array.<string>|null} [names] DeleteObjectsMessage names
         */
        /**
         * Constructs a new DeleteObjectsMessage.
         * @memberof whiteboard
         * @classdesc Represents a DeleteObjectsMessage.
         * @implements IDeleteObjectsMessage
         * @constructor
         * @param {whiteboard.IDeleteObjectsMessage=} [properties] Properties to set
         */
        function DeleteObjectsMessage(properties) {
            this.names = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * DeleteObjectsMessage names.
         * @member {Array.<string>} names
         * @memberof whiteboard.DeleteObjectsMessage
         * @instance
         */
        DeleteObjectsMessage.prototype.names = $util.emptyArray;
        /**
         * Creates a new DeleteObjectsMessage instance using the specified properties.
         * @function create
         * @memberof whiteboard.DeleteObjectsMessage
         * @static
         * @param {whiteboard.IDeleteObjectsMessage=} [properties] Properties to set
         * @returns {whiteboard.DeleteObjectsMessage} DeleteObjectsMessage instance
         */
        DeleteObjectsMessage.create = function create(properties) {
            return new DeleteObjectsMessage(properties);
        };
        /**
         * Encodes the specified DeleteObjectsMessage message. Does not implicitly {@link whiteboard.DeleteObjectsMessage.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.DeleteObjectsMessage
         * @static
         * @param {whiteboard.IDeleteObjectsMessage} message DeleteObjectsMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeleteObjectsMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.names != null && message.names.length)
                for (var i = 0; i < message.names.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.names[i]);
            return writer;
        };
        /**
         * Encodes the specified DeleteObjectsMessage message, length delimited. Does not implicitly {@link whiteboard.DeleteObjectsMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.DeleteObjectsMessage
         * @static
         * @param {whiteboard.IDeleteObjectsMessage} message DeleteObjectsMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeleteObjectsMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes a DeleteObjectsMessage message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.DeleteObjectsMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.DeleteObjectsMessage} DeleteObjectsMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeleteObjectsMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.DeleteObjectsMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        if (!(message.names && message.names.length))
                            message.names = [];
                        message.names.push(reader.string());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes a DeleteObjectsMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.DeleteObjectsMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.DeleteObjectsMessage} DeleteObjectsMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeleteObjectsMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies a DeleteObjectsMessage message.
         * @function verify
         * @memberof whiteboard.DeleteObjectsMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DeleteObjectsMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.names != null && message.hasOwnProperty("names")) {
                if (!Array.isArray(message.names))
                    return "names: array expected";
                for (var i = 0; i < message.names.length; ++i)
                    if (!$util.isString(message.names[i]))
                        return "names: string[] expected";
            }
            return null;
        };
        /**
         * Creates a DeleteObjectsMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.DeleteObjectsMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.DeleteObjectsMessage} DeleteObjectsMessage
         */
        DeleteObjectsMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.DeleteObjectsMessage)
                return object;
            var message = new $root.whiteboard.DeleteObjectsMessage();
            if (object.names) {
                if (!Array.isArray(object.names))
                    throw TypeError(".whiteboard.DeleteObjectsMessage.names: array expected");
                message.names = [];
                for (var i = 0; i < object.names.length; ++i)
                    message.names[i] = String(object.names[i]);
            }
            return message;
        };
        /**
         * Creates a plain object from a DeleteObjectsMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.DeleteObjectsMessage
         * @static
         * @param {whiteboard.DeleteObjectsMessage} message DeleteObjectsMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DeleteObjectsMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.names = [];
            if (message.names && message.names.length) {
                object.names = [];
                for (var j = 0; j < message.names.length; ++j)
                    object.names[j] = message.names[j];
            }
            return object;
        };
        /**
         * Converts this DeleteObjectsMessage to JSON.
         * @function toJSON
         * @memberof whiteboard.DeleteObjectsMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DeleteObjectsMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return DeleteObjectsMessage;
    })();
    whiteboard.AlignObjectsLeftMessage = (function () {
        /**
         * Properties of an AlignObjectsLeftMessage.
         * @memberof whiteboard
         * @interface IAlignObjectsLeftMessage
         * @property {Array.<string>|null} [names] AlignObjectsLeftMessage names
         */
        /**
         * Constructs a new AlignObjectsLeftMessage.
         * @memberof whiteboard
         * @classdesc Represents an AlignObjectsLeftMessage.
         * @implements IAlignObjectsLeftMessage
         * @constructor
         * @param {whiteboard.IAlignObjectsLeftMessage=} [properties] Properties to set
         */
        function AlignObjectsLeftMessage(properties) {
            this.names = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * AlignObjectsLeftMessage names.
         * @member {Array.<string>} names
         * @memberof whiteboard.AlignObjectsLeftMessage
         * @instance
         */
        AlignObjectsLeftMessage.prototype.names = $util.emptyArray;
        /**
         * Creates a new AlignObjectsLeftMessage instance using the specified properties.
         * @function create
         * @memberof whiteboard.AlignObjectsLeftMessage
         * @static
         * @param {whiteboard.IAlignObjectsLeftMessage=} [properties] Properties to set
         * @returns {whiteboard.AlignObjectsLeftMessage} AlignObjectsLeftMessage instance
         */
        AlignObjectsLeftMessage.create = function create(properties) {
            return new AlignObjectsLeftMessage(properties);
        };
        /**
         * Encodes the specified AlignObjectsLeftMessage message. Does not implicitly {@link whiteboard.AlignObjectsLeftMessage.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.AlignObjectsLeftMessage
         * @static
         * @param {whiteboard.IAlignObjectsLeftMessage} message AlignObjectsLeftMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AlignObjectsLeftMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.names != null && message.names.length)
                for (var i = 0; i < message.names.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.names[i]);
            return writer;
        };
        /**
         * Encodes the specified AlignObjectsLeftMessage message, length delimited. Does not implicitly {@link whiteboard.AlignObjectsLeftMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.AlignObjectsLeftMessage
         * @static
         * @param {whiteboard.IAlignObjectsLeftMessage} message AlignObjectsLeftMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AlignObjectsLeftMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes an AlignObjectsLeftMessage message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.AlignObjectsLeftMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.AlignObjectsLeftMessage} AlignObjectsLeftMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AlignObjectsLeftMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.AlignObjectsLeftMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        if (!(message.names && message.names.length))
                            message.names = [];
                        message.names.push(reader.string());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes an AlignObjectsLeftMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.AlignObjectsLeftMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.AlignObjectsLeftMessage} AlignObjectsLeftMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AlignObjectsLeftMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies an AlignObjectsLeftMessage message.
         * @function verify
         * @memberof whiteboard.AlignObjectsLeftMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AlignObjectsLeftMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.names != null && message.hasOwnProperty("names")) {
                if (!Array.isArray(message.names))
                    return "names: array expected";
                for (var i = 0; i < message.names.length; ++i)
                    if (!$util.isString(message.names[i]))
                        return "names: string[] expected";
            }
            return null;
        };
        /**
         * Creates an AlignObjectsLeftMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.AlignObjectsLeftMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.AlignObjectsLeftMessage} AlignObjectsLeftMessage
         */
        AlignObjectsLeftMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.AlignObjectsLeftMessage)
                return object;
            var message = new $root.whiteboard.AlignObjectsLeftMessage();
            if (object.names) {
                if (!Array.isArray(object.names))
                    throw TypeError(".whiteboard.AlignObjectsLeftMessage.names: array expected");
                message.names = [];
                for (var i = 0; i < object.names.length; ++i)
                    message.names[i] = String(object.names[i]);
            }
            return message;
        };
        /**
         * Creates a plain object from an AlignObjectsLeftMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.AlignObjectsLeftMessage
         * @static
         * @param {whiteboard.AlignObjectsLeftMessage} message AlignObjectsLeftMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AlignObjectsLeftMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.names = [];
            if (message.names && message.names.length) {
                object.names = [];
                for (var j = 0; j < message.names.length; ++j)
                    object.names[j] = message.names[j];
            }
            return object;
        };
        /**
         * Converts this AlignObjectsLeftMessage to JSON.
         * @function toJSON
         * @memberof whiteboard.AlignObjectsLeftMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AlignObjectsLeftMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return AlignObjectsLeftMessage;
    })();
    whiteboard.AlignObjectsRightMessage = (function () {
        /**
         * Properties of an AlignObjectsRightMessage.
         * @memberof whiteboard
         * @interface IAlignObjectsRightMessage
         * @property {Array.<string>|null} [names] AlignObjectsRightMessage names
         */
        /**
         * Constructs a new AlignObjectsRightMessage.
         * @memberof whiteboard
         * @classdesc Represents an AlignObjectsRightMessage.
         * @implements IAlignObjectsRightMessage
         * @constructor
         * @param {whiteboard.IAlignObjectsRightMessage=} [properties] Properties to set
         */
        function AlignObjectsRightMessage(properties) {
            this.names = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * AlignObjectsRightMessage names.
         * @member {Array.<string>} names
         * @memberof whiteboard.AlignObjectsRightMessage
         * @instance
         */
        AlignObjectsRightMessage.prototype.names = $util.emptyArray;
        /**
         * Creates a new AlignObjectsRightMessage instance using the specified properties.
         * @function create
         * @memberof whiteboard.AlignObjectsRightMessage
         * @static
         * @param {whiteboard.IAlignObjectsRightMessage=} [properties] Properties to set
         * @returns {whiteboard.AlignObjectsRightMessage} AlignObjectsRightMessage instance
         */
        AlignObjectsRightMessage.create = function create(properties) {
            return new AlignObjectsRightMessage(properties);
        };
        /**
         * Encodes the specified AlignObjectsRightMessage message. Does not implicitly {@link whiteboard.AlignObjectsRightMessage.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.AlignObjectsRightMessage
         * @static
         * @param {whiteboard.IAlignObjectsRightMessage} message AlignObjectsRightMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AlignObjectsRightMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.names != null && message.names.length)
                for (var i = 0; i < message.names.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.names[i]);
            return writer;
        };
        /**
         * Encodes the specified AlignObjectsRightMessage message, length delimited. Does not implicitly {@link whiteboard.AlignObjectsRightMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.AlignObjectsRightMessage
         * @static
         * @param {whiteboard.IAlignObjectsRightMessage} message AlignObjectsRightMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AlignObjectsRightMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes an AlignObjectsRightMessage message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.AlignObjectsRightMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.AlignObjectsRightMessage} AlignObjectsRightMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AlignObjectsRightMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.AlignObjectsRightMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        if (!(message.names && message.names.length))
                            message.names = [];
                        message.names.push(reader.string());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes an AlignObjectsRightMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.AlignObjectsRightMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.AlignObjectsRightMessage} AlignObjectsRightMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AlignObjectsRightMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies an AlignObjectsRightMessage message.
         * @function verify
         * @memberof whiteboard.AlignObjectsRightMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AlignObjectsRightMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.names != null && message.hasOwnProperty("names")) {
                if (!Array.isArray(message.names))
                    return "names: array expected";
                for (var i = 0; i < message.names.length; ++i)
                    if (!$util.isString(message.names[i]))
                        return "names: string[] expected";
            }
            return null;
        };
        /**
         * Creates an AlignObjectsRightMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.AlignObjectsRightMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.AlignObjectsRightMessage} AlignObjectsRightMessage
         */
        AlignObjectsRightMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.AlignObjectsRightMessage)
                return object;
            var message = new $root.whiteboard.AlignObjectsRightMessage();
            if (object.names) {
                if (!Array.isArray(object.names))
                    throw TypeError(".whiteboard.AlignObjectsRightMessage.names: array expected");
                message.names = [];
                for (var i = 0; i < object.names.length; ++i)
                    message.names[i] = String(object.names[i]);
            }
            return message;
        };
        /**
         * Creates a plain object from an AlignObjectsRightMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.AlignObjectsRightMessage
         * @static
         * @param {whiteboard.AlignObjectsRightMessage} message AlignObjectsRightMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AlignObjectsRightMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.names = [];
            if (message.names && message.names.length) {
                object.names = [];
                for (var j = 0; j < message.names.length; ++j)
                    object.names[j] = message.names[j];
            }
            return object;
        };
        /**
         * Converts this AlignObjectsRightMessage to JSON.
         * @function toJSON
         * @memberof whiteboard.AlignObjectsRightMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AlignObjectsRightMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return AlignObjectsRightMessage;
    })();
    whiteboard.AlignObjectsTopMessage = (function () {
        /**
         * Properties of an AlignObjectsTopMessage.
         * @memberof whiteboard
         * @interface IAlignObjectsTopMessage
         * @property {Array.<string>|null} [names] AlignObjectsTopMessage names
         */
        /**
         * Constructs a new AlignObjectsTopMessage.
         * @memberof whiteboard
         * @classdesc Represents an AlignObjectsTopMessage.
         * @implements IAlignObjectsTopMessage
         * @constructor
         * @param {whiteboard.IAlignObjectsTopMessage=} [properties] Properties to set
         */
        function AlignObjectsTopMessage(properties) {
            this.names = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * AlignObjectsTopMessage names.
         * @member {Array.<string>} names
         * @memberof whiteboard.AlignObjectsTopMessage
         * @instance
         */
        AlignObjectsTopMessage.prototype.names = $util.emptyArray;
        /**
         * Creates a new AlignObjectsTopMessage instance using the specified properties.
         * @function create
         * @memberof whiteboard.AlignObjectsTopMessage
         * @static
         * @param {whiteboard.IAlignObjectsTopMessage=} [properties] Properties to set
         * @returns {whiteboard.AlignObjectsTopMessage} AlignObjectsTopMessage instance
         */
        AlignObjectsTopMessage.create = function create(properties) {
            return new AlignObjectsTopMessage(properties);
        };
        /**
         * Encodes the specified AlignObjectsTopMessage message. Does not implicitly {@link whiteboard.AlignObjectsTopMessage.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.AlignObjectsTopMessage
         * @static
         * @param {whiteboard.IAlignObjectsTopMessage} message AlignObjectsTopMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AlignObjectsTopMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.names != null && message.names.length)
                for (var i = 0; i < message.names.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.names[i]);
            return writer;
        };
        /**
         * Encodes the specified AlignObjectsTopMessage message, length delimited. Does not implicitly {@link whiteboard.AlignObjectsTopMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.AlignObjectsTopMessage
         * @static
         * @param {whiteboard.IAlignObjectsTopMessage} message AlignObjectsTopMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AlignObjectsTopMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes an AlignObjectsTopMessage message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.AlignObjectsTopMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.AlignObjectsTopMessage} AlignObjectsTopMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AlignObjectsTopMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.AlignObjectsTopMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        if (!(message.names && message.names.length))
                            message.names = [];
                        message.names.push(reader.string());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes an AlignObjectsTopMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.AlignObjectsTopMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.AlignObjectsTopMessage} AlignObjectsTopMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AlignObjectsTopMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies an AlignObjectsTopMessage message.
         * @function verify
         * @memberof whiteboard.AlignObjectsTopMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AlignObjectsTopMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.names != null && message.hasOwnProperty("names")) {
                if (!Array.isArray(message.names))
                    return "names: array expected";
                for (var i = 0; i < message.names.length; ++i)
                    if (!$util.isString(message.names[i]))
                        return "names: string[] expected";
            }
            return null;
        };
        /**
         * Creates an AlignObjectsTopMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.AlignObjectsTopMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.AlignObjectsTopMessage} AlignObjectsTopMessage
         */
        AlignObjectsTopMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.AlignObjectsTopMessage)
                return object;
            var message = new $root.whiteboard.AlignObjectsTopMessage();
            if (object.names) {
                if (!Array.isArray(object.names))
                    throw TypeError(".whiteboard.AlignObjectsTopMessage.names: array expected");
                message.names = [];
                for (var i = 0; i < object.names.length; ++i)
                    message.names[i] = String(object.names[i]);
            }
            return message;
        };
        /**
         * Creates a plain object from an AlignObjectsTopMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.AlignObjectsTopMessage
         * @static
         * @param {whiteboard.AlignObjectsTopMessage} message AlignObjectsTopMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AlignObjectsTopMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.names = [];
            if (message.names && message.names.length) {
                object.names = [];
                for (var j = 0; j < message.names.length; ++j)
                    object.names[j] = message.names[j];
            }
            return object;
        };
        /**
         * Converts this AlignObjectsTopMessage to JSON.
         * @function toJSON
         * @memberof whiteboard.AlignObjectsTopMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AlignObjectsTopMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return AlignObjectsTopMessage;
    })();
    whiteboard.AlignObjectsBottomMessage = (function () {
        /**
         * Properties of an AlignObjectsBottomMessage.
         * @memberof whiteboard
         * @interface IAlignObjectsBottomMessage
         * @property {Array.<string>|null} [names] AlignObjectsBottomMessage names
         */
        /**
         * Constructs a new AlignObjectsBottomMessage.
         * @memberof whiteboard
         * @classdesc Represents an AlignObjectsBottomMessage.
         * @implements IAlignObjectsBottomMessage
         * @constructor
         * @param {whiteboard.IAlignObjectsBottomMessage=} [properties] Properties to set
         */
        function AlignObjectsBottomMessage(properties) {
            this.names = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * AlignObjectsBottomMessage names.
         * @member {Array.<string>} names
         * @memberof whiteboard.AlignObjectsBottomMessage
         * @instance
         */
        AlignObjectsBottomMessage.prototype.names = $util.emptyArray;
        /**
         * Creates a new AlignObjectsBottomMessage instance using the specified properties.
         * @function create
         * @memberof whiteboard.AlignObjectsBottomMessage
         * @static
         * @param {whiteboard.IAlignObjectsBottomMessage=} [properties] Properties to set
         * @returns {whiteboard.AlignObjectsBottomMessage} AlignObjectsBottomMessage instance
         */
        AlignObjectsBottomMessage.create = function create(properties) {
            return new AlignObjectsBottomMessage(properties);
        };
        /**
         * Encodes the specified AlignObjectsBottomMessage message. Does not implicitly {@link whiteboard.AlignObjectsBottomMessage.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.AlignObjectsBottomMessage
         * @static
         * @param {whiteboard.IAlignObjectsBottomMessage} message AlignObjectsBottomMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AlignObjectsBottomMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.names != null && message.names.length)
                for (var i = 0; i < message.names.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.names[i]);
            return writer;
        };
        /**
         * Encodes the specified AlignObjectsBottomMessage message, length delimited. Does not implicitly {@link whiteboard.AlignObjectsBottomMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.AlignObjectsBottomMessage
         * @static
         * @param {whiteboard.IAlignObjectsBottomMessage} message AlignObjectsBottomMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AlignObjectsBottomMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes an AlignObjectsBottomMessage message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.AlignObjectsBottomMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.AlignObjectsBottomMessage} AlignObjectsBottomMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AlignObjectsBottomMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.AlignObjectsBottomMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        if (!(message.names && message.names.length))
                            message.names = [];
                        message.names.push(reader.string());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes an AlignObjectsBottomMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.AlignObjectsBottomMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.AlignObjectsBottomMessage} AlignObjectsBottomMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AlignObjectsBottomMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies an AlignObjectsBottomMessage message.
         * @function verify
         * @memberof whiteboard.AlignObjectsBottomMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AlignObjectsBottomMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.names != null && message.hasOwnProperty("names")) {
                if (!Array.isArray(message.names))
                    return "names: array expected";
                for (var i = 0; i < message.names.length; ++i)
                    if (!$util.isString(message.names[i]))
                        return "names: string[] expected";
            }
            return null;
        };
        /**
         * Creates an AlignObjectsBottomMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.AlignObjectsBottomMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.AlignObjectsBottomMessage} AlignObjectsBottomMessage
         */
        AlignObjectsBottomMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.AlignObjectsBottomMessage)
                return object;
            var message = new $root.whiteboard.AlignObjectsBottomMessage();
            if (object.names) {
                if (!Array.isArray(object.names))
                    throw TypeError(".whiteboard.AlignObjectsBottomMessage.names: array expected");
                message.names = [];
                for (var i = 0; i < object.names.length; ++i)
                    message.names[i] = String(object.names[i]);
            }
            return message;
        };
        /**
         * Creates a plain object from an AlignObjectsBottomMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.AlignObjectsBottomMessage
         * @static
         * @param {whiteboard.AlignObjectsBottomMessage} message AlignObjectsBottomMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AlignObjectsBottomMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.names = [];
            if (message.names && message.names.length) {
                object.names = [];
                for (var j = 0; j < message.names.length; ++j)
                    object.names[j] = message.names[j];
            }
            return object;
        };
        /**
         * Converts this AlignObjectsBottomMessage to JSON.
         * @function toJSON
         * @memberof whiteboard.AlignObjectsBottomMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AlignObjectsBottomMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return AlignObjectsBottomMessage;
    })();
    whiteboard.ArrangeObjectsHorizontalMessage = (function () {
        /**
         * Properties of an ArrangeObjectsHorizontalMessage.
         * @memberof whiteboard
         * @interface IArrangeObjectsHorizontalMessage
         * @property {Array.<string>|null} [names] ArrangeObjectsHorizontalMessage names
         */
        /**
         * Constructs a new ArrangeObjectsHorizontalMessage.
         * @memberof whiteboard
         * @classdesc Represents an ArrangeObjectsHorizontalMessage.
         * @implements IArrangeObjectsHorizontalMessage
         * @constructor
         * @param {whiteboard.IArrangeObjectsHorizontalMessage=} [properties] Properties to set
         */
        function ArrangeObjectsHorizontalMessage(properties) {
            this.names = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * ArrangeObjectsHorizontalMessage names.
         * @member {Array.<string>} names
         * @memberof whiteboard.ArrangeObjectsHorizontalMessage
         * @instance
         */
        ArrangeObjectsHorizontalMessage.prototype.names = $util.emptyArray;
        /**
         * Creates a new ArrangeObjectsHorizontalMessage instance using the specified properties.
         * @function create
         * @memberof whiteboard.ArrangeObjectsHorizontalMessage
         * @static
         * @param {whiteboard.IArrangeObjectsHorizontalMessage=} [properties] Properties to set
         * @returns {whiteboard.ArrangeObjectsHorizontalMessage} ArrangeObjectsHorizontalMessage instance
         */
        ArrangeObjectsHorizontalMessage.create = function create(properties) {
            return new ArrangeObjectsHorizontalMessage(properties);
        };
        /**
         * Encodes the specified ArrangeObjectsHorizontalMessage message. Does not implicitly {@link whiteboard.ArrangeObjectsHorizontalMessage.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.ArrangeObjectsHorizontalMessage
         * @static
         * @param {whiteboard.IArrangeObjectsHorizontalMessage} message ArrangeObjectsHorizontalMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ArrangeObjectsHorizontalMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.names != null && message.names.length)
                for (var i = 0; i < message.names.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.names[i]);
            return writer;
        };
        /**
         * Encodes the specified ArrangeObjectsHorizontalMessage message, length delimited. Does not implicitly {@link whiteboard.ArrangeObjectsHorizontalMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.ArrangeObjectsHorizontalMessage
         * @static
         * @param {whiteboard.IArrangeObjectsHorizontalMessage} message ArrangeObjectsHorizontalMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ArrangeObjectsHorizontalMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes an ArrangeObjectsHorizontalMessage message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.ArrangeObjectsHorizontalMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.ArrangeObjectsHorizontalMessage} ArrangeObjectsHorizontalMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ArrangeObjectsHorizontalMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.ArrangeObjectsHorizontalMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        if (!(message.names && message.names.length))
                            message.names = [];
                        message.names.push(reader.string());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes an ArrangeObjectsHorizontalMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.ArrangeObjectsHorizontalMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.ArrangeObjectsHorizontalMessage} ArrangeObjectsHorizontalMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ArrangeObjectsHorizontalMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies an ArrangeObjectsHorizontalMessage message.
         * @function verify
         * @memberof whiteboard.ArrangeObjectsHorizontalMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ArrangeObjectsHorizontalMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.names != null && message.hasOwnProperty("names")) {
                if (!Array.isArray(message.names))
                    return "names: array expected";
                for (var i = 0; i < message.names.length; ++i)
                    if (!$util.isString(message.names[i]))
                        return "names: string[] expected";
            }
            return null;
        };
        /**
         * Creates an ArrangeObjectsHorizontalMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.ArrangeObjectsHorizontalMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.ArrangeObjectsHorizontalMessage} ArrangeObjectsHorizontalMessage
         */
        ArrangeObjectsHorizontalMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.ArrangeObjectsHorizontalMessage)
                return object;
            var message = new $root.whiteboard.ArrangeObjectsHorizontalMessage();
            if (object.names) {
                if (!Array.isArray(object.names))
                    throw TypeError(".whiteboard.ArrangeObjectsHorizontalMessage.names: array expected");
                message.names = [];
                for (var i = 0; i < object.names.length; ++i)
                    message.names[i] = String(object.names[i]);
            }
            return message;
        };
        /**
         * Creates a plain object from an ArrangeObjectsHorizontalMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.ArrangeObjectsHorizontalMessage
         * @static
         * @param {whiteboard.ArrangeObjectsHorizontalMessage} message ArrangeObjectsHorizontalMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ArrangeObjectsHorizontalMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.names = [];
            if (message.names && message.names.length) {
                object.names = [];
                for (var j = 0; j < message.names.length; ++j)
                    object.names[j] = message.names[j];
            }
            return object;
        };
        /**
         * Converts this ArrangeObjectsHorizontalMessage to JSON.
         * @function toJSON
         * @memberof whiteboard.ArrangeObjectsHorizontalMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ArrangeObjectsHorizontalMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return ArrangeObjectsHorizontalMessage;
    })();
    whiteboard.ArrangeObjectsVerticalMessage = (function () {
        /**
         * Properties of an ArrangeObjectsVerticalMessage.
         * @memberof whiteboard
         * @interface IArrangeObjectsVerticalMessage
         * @property {Array.<string>|null} [names] ArrangeObjectsVerticalMessage names
         */
        /**
         * Constructs a new ArrangeObjectsVerticalMessage.
         * @memberof whiteboard
         * @classdesc Represents an ArrangeObjectsVerticalMessage.
         * @implements IArrangeObjectsVerticalMessage
         * @constructor
         * @param {whiteboard.IArrangeObjectsVerticalMessage=} [properties] Properties to set
         */
        function ArrangeObjectsVerticalMessage(properties) {
            this.names = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * ArrangeObjectsVerticalMessage names.
         * @member {Array.<string>} names
         * @memberof whiteboard.ArrangeObjectsVerticalMessage
         * @instance
         */
        ArrangeObjectsVerticalMessage.prototype.names = $util.emptyArray;
        /**
         * Creates a new ArrangeObjectsVerticalMessage instance using the specified properties.
         * @function create
         * @memberof whiteboard.ArrangeObjectsVerticalMessage
         * @static
         * @param {whiteboard.IArrangeObjectsVerticalMessage=} [properties] Properties to set
         * @returns {whiteboard.ArrangeObjectsVerticalMessage} ArrangeObjectsVerticalMessage instance
         */
        ArrangeObjectsVerticalMessage.create = function create(properties) {
            return new ArrangeObjectsVerticalMessage(properties);
        };
        /**
         * Encodes the specified ArrangeObjectsVerticalMessage message. Does not implicitly {@link whiteboard.ArrangeObjectsVerticalMessage.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.ArrangeObjectsVerticalMessage
         * @static
         * @param {whiteboard.IArrangeObjectsVerticalMessage} message ArrangeObjectsVerticalMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ArrangeObjectsVerticalMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.names != null && message.names.length)
                for (var i = 0; i < message.names.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.names[i]);
            return writer;
        };
        /**
         * Encodes the specified ArrangeObjectsVerticalMessage message, length delimited. Does not implicitly {@link whiteboard.ArrangeObjectsVerticalMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.ArrangeObjectsVerticalMessage
         * @static
         * @param {whiteboard.IArrangeObjectsVerticalMessage} message ArrangeObjectsVerticalMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ArrangeObjectsVerticalMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes an ArrangeObjectsVerticalMessage message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.ArrangeObjectsVerticalMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.ArrangeObjectsVerticalMessage} ArrangeObjectsVerticalMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ArrangeObjectsVerticalMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.ArrangeObjectsVerticalMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        if (!(message.names && message.names.length))
                            message.names = [];
                        message.names.push(reader.string());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes an ArrangeObjectsVerticalMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.ArrangeObjectsVerticalMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.ArrangeObjectsVerticalMessage} ArrangeObjectsVerticalMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ArrangeObjectsVerticalMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies an ArrangeObjectsVerticalMessage message.
         * @function verify
         * @memberof whiteboard.ArrangeObjectsVerticalMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ArrangeObjectsVerticalMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.names != null && message.hasOwnProperty("names")) {
                if (!Array.isArray(message.names))
                    return "names: array expected";
                for (var i = 0; i < message.names.length; ++i)
                    if (!$util.isString(message.names[i]))
                        return "names: string[] expected";
            }
            return null;
        };
        /**
         * Creates an ArrangeObjectsVerticalMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.ArrangeObjectsVerticalMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.ArrangeObjectsVerticalMessage} ArrangeObjectsVerticalMessage
         */
        ArrangeObjectsVerticalMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.ArrangeObjectsVerticalMessage)
                return object;
            var message = new $root.whiteboard.ArrangeObjectsVerticalMessage();
            if (object.names) {
                if (!Array.isArray(object.names))
                    throw TypeError(".whiteboard.ArrangeObjectsVerticalMessage.names: array expected");
                message.names = [];
                for (var i = 0; i < object.names.length; ++i)
                    message.names[i] = String(object.names[i]);
            }
            return message;
        };
        /**
         * Creates a plain object from an ArrangeObjectsVerticalMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.ArrangeObjectsVerticalMessage
         * @static
         * @param {whiteboard.ArrangeObjectsVerticalMessage} message ArrangeObjectsVerticalMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ArrangeObjectsVerticalMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.names = [];
            if (message.names && message.names.length) {
                object.names = [];
                for (var j = 0; j < message.names.length; ++j)
                    object.names[j] = message.names[j];
            }
            return object;
        };
        /**
         * Converts this ArrangeObjectsVerticalMessage to JSON.
         * @function toJSON
         * @memberof whiteboard.ArrangeObjectsVerticalMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ArrangeObjectsVerticalMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return ArrangeObjectsVerticalMessage;
    })();
    whiteboard.SetObjectPropertyMessage = (function () {
        /**
         * Properties of a SetObjectPropertyMessage.
         * @memberof whiteboard
         * @interface ISetObjectPropertyMessage
         * @property {string|null} [name] SetObjectPropertyMessage name
         * @property {string|null} [propName] SetObjectPropertyMessage propName
         * @property {string|null} [propValueJson] SetObjectPropertyMessage propValueJson
         */
        /**
         * Constructs a new SetObjectPropertyMessage.
         * @memberof whiteboard
         * @classdesc Represents a SetObjectPropertyMessage.
         * @implements ISetObjectPropertyMessage
         * @constructor
         * @param {whiteboard.ISetObjectPropertyMessage=} [properties] Properties to set
         */
        function SetObjectPropertyMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * SetObjectPropertyMessage name.
         * @member {string} name
         * @memberof whiteboard.SetObjectPropertyMessage
         * @instance
         */
        SetObjectPropertyMessage.prototype.name = "";
        /**
         * SetObjectPropertyMessage propName.
         * @member {string} propName
         * @memberof whiteboard.SetObjectPropertyMessage
         * @instance
         */
        SetObjectPropertyMessage.prototype.propName = "";
        /**
         * SetObjectPropertyMessage propValueJson.
         * @member {string} propValueJson
         * @memberof whiteboard.SetObjectPropertyMessage
         * @instance
         */
        SetObjectPropertyMessage.prototype.propValueJson = "";
        /**
         * Creates a new SetObjectPropertyMessage instance using the specified properties.
         * @function create
         * @memberof whiteboard.SetObjectPropertyMessage
         * @static
         * @param {whiteboard.ISetObjectPropertyMessage=} [properties] Properties to set
         * @returns {whiteboard.SetObjectPropertyMessage} SetObjectPropertyMessage instance
         */
        SetObjectPropertyMessage.create = function create(properties) {
            return new SetObjectPropertyMessage(properties);
        };
        /**
         * Encodes the specified SetObjectPropertyMessage message. Does not implicitly {@link whiteboard.SetObjectPropertyMessage.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.SetObjectPropertyMessage
         * @static
         * @param {whiteboard.ISetObjectPropertyMessage} message SetObjectPropertyMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SetObjectPropertyMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.name);
            if (message.propName != null && message.hasOwnProperty("propName"))
                writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.propName);
            if (message.propValueJson != null && message.hasOwnProperty("propValueJson"))
                writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.propValueJson);
            return writer;
        };
        /**
         * Encodes the specified SetObjectPropertyMessage message, length delimited. Does not implicitly {@link whiteboard.SetObjectPropertyMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.SetObjectPropertyMessage
         * @static
         * @param {whiteboard.ISetObjectPropertyMessage} message SetObjectPropertyMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SetObjectPropertyMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes a SetObjectPropertyMessage message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.SetObjectPropertyMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.SetObjectPropertyMessage} SetObjectPropertyMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SetObjectPropertyMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.SetObjectPropertyMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;
                    case 2:
                        message.propName = reader.string();
                        break;
                    case 3:
                        message.propValueJson = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes a SetObjectPropertyMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.SetObjectPropertyMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.SetObjectPropertyMessage} SetObjectPropertyMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SetObjectPropertyMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies a SetObjectPropertyMessage message.
         * @function verify
         * @memberof whiteboard.SetObjectPropertyMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SetObjectPropertyMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.propName != null && message.hasOwnProperty("propName"))
                if (!$util.isString(message.propName))
                    return "propName: string expected";
            if (message.propValueJson != null && message.hasOwnProperty("propValueJson"))
                if (!$util.isString(message.propValueJson))
                    return "propValueJson: string expected";
            return null;
        };
        /**
         * Creates a SetObjectPropertyMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.SetObjectPropertyMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.SetObjectPropertyMessage} SetObjectPropertyMessage
         */
        SetObjectPropertyMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.SetObjectPropertyMessage)
                return object;
            var message = new $root.whiteboard.SetObjectPropertyMessage();
            if (object.name != null)
                message.name = String(object.name);
            if (object.propName != null)
                message.propName = String(object.propName);
            if (object.propValueJson != null)
                message.propValueJson = String(object.propValueJson);
            return message;
        };
        /**
         * Creates a plain object from a SetObjectPropertyMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.SetObjectPropertyMessage
         * @static
         * @param {whiteboard.SetObjectPropertyMessage} message SetObjectPropertyMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SetObjectPropertyMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.name = "";
                object.propName = "";
                object.propValueJson = "";
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.propName != null && message.hasOwnProperty("propName"))
                object.propName = message.propName;
            if (message.propValueJson != null && message.hasOwnProperty("propValueJson"))
                object.propValueJson = message.propValueJson;
            return object;
        };
        /**
         * Converts this SetObjectPropertyMessage to JSON.
         * @function toJSON
         * @memberof whiteboard.SetObjectPropertyMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SetObjectPropertyMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return SetObjectPropertyMessage;
    })();
    whiteboard.AddPageMessage = (function () {
        /**
         * Properties of an AddPageMessage.
         * @memberof whiteboard
         * @interface IAddPageMessage
         */
        /**
         * Constructs a new AddPageMessage.
         * @memberof whiteboard
         * @classdesc Represents an AddPageMessage.
         * @implements IAddPageMessage
         * @constructor
         * @param {whiteboard.IAddPageMessage=} [properties] Properties to set
         */
        function AddPageMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * Creates a new AddPageMessage instance using the specified properties.
         * @function create
         * @memberof whiteboard.AddPageMessage
         * @static
         * @param {whiteboard.IAddPageMessage=} [properties] Properties to set
         * @returns {whiteboard.AddPageMessage} AddPageMessage instance
         */
        AddPageMessage.create = function create(properties) {
            return new AddPageMessage(properties);
        };
        /**
         * Encodes the specified AddPageMessage message. Does not implicitly {@link whiteboard.AddPageMessage.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.AddPageMessage
         * @static
         * @param {whiteboard.IAddPageMessage} message AddPageMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AddPageMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };
        /**
         * Encodes the specified AddPageMessage message, length delimited. Does not implicitly {@link whiteboard.AddPageMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.AddPageMessage
         * @static
         * @param {whiteboard.IAddPageMessage} message AddPageMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AddPageMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes an AddPageMessage message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.AddPageMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.AddPageMessage} AddPageMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AddPageMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.AddPageMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes an AddPageMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.AddPageMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.AddPageMessage} AddPageMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AddPageMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies an AddPageMessage message.
         * @function verify
         * @memberof whiteboard.AddPageMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AddPageMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };
        /**
         * Creates an AddPageMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.AddPageMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.AddPageMessage} AddPageMessage
         */
        AddPageMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.AddPageMessage)
                return object;
            return new $root.whiteboard.AddPageMessage();
        };
        /**
         * Creates a plain object from an AddPageMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.AddPageMessage
         * @static
         * @param {whiteboard.AddPageMessage} message AddPageMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AddPageMessage.toObject = function toObject() {
            return {};
        };
        /**
         * Converts this AddPageMessage to JSON.
         * @function toJSON
         * @memberof whiteboard.AddPageMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AddPageMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return AddPageMessage;
    })();
    whiteboard.RenamePageMessage = (function () {
        /**
         * Properties of a RenamePageMessage.
         * @memberof whiteboard
         * @interface IRenamePageMessage
         * @property {string|null} [newName] RenamePageMessage newName
         */
        /**
         * Constructs a new RenamePageMessage.
         * @memberof whiteboard
         * @classdesc Represents a RenamePageMessage.
         * @implements IRenamePageMessage
         * @constructor
         * @param {whiteboard.IRenamePageMessage=} [properties] Properties to set
         */
        function RenamePageMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * RenamePageMessage newName.
         * @member {string} newName
         * @memberof whiteboard.RenamePageMessage
         * @instance
         */
        RenamePageMessage.prototype.newName = "";
        /**
         * Creates a new RenamePageMessage instance using the specified properties.
         * @function create
         * @memberof whiteboard.RenamePageMessage
         * @static
         * @param {whiteboard.IRenamePageMessage=} [properties] Properties to set
         * @returns {whiteboard.RenamePageMessage} RenamePageMessage instance
         */
        RenamePageMessage.create = function create(properties) {
            return new RenamePageMessage(properties);
        };
        /**
         * Encodes the specified RenamePageMessage message. Does not implicitly {@link whiteboard.RenamePageMessage.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.RenamePageMessage
         * @static
         * @param {whiteboard.IRenamePageMessage} message RenamePageMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RenamePageMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.newName != null && message.hasOwnProperty("newName"))
                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.newName);
            return writer;
        };
        /**
         * Encodes the specified RenamePageMessage message, length delimited. Does not implicitly {@link whiteboard.RenamePageMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.RenamePageMessage
         * @static
         * @param {whiteboard.IRenamePageMessage} message RenamePageMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RenamePageMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes a RenamePageMessage message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.RenamePageMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.RenamePageMessage} RenamePageMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RenamePageMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.RenamePageMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.newName = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes a RenamePageMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.RenamePageMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.RenamePageMessage} RenamePageMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RenamePageMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies a RenamePageMessage message.
         * @function verify
         * @memberof whiteboard.RenamePageMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RenamePageMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.newName != null && message.hasOwnProperty("newName"))
                if (!$util.isString(message.newName))
                    return "newName: string expected";
            return null;
        };
        /**
         * Creates a RenamePageMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.RenamePageMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.RenamePageMessage} RenamePageMessage
         */
        RenamePageMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.RenamePageMessage)
                return object;
            var message = new $root.whiteboard.RenamePageMessage();
            if (object.newName != null)
                message.newName = String(object.newName);
            return message;
        };
        /**
         * Creates a plain object from a RenamePageMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.RenamePageMessage
         * @static
         * @param {whiteboard.RenamePageMessage} message RenamePageMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RenamePageMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.newName = "";
            if (message.newName != null && message.hasOwnProperty("newName"))
                object.newName = message.newName;
            return object;
        };
        /**
         * Converts this RenamePageMessage to JSON.
         * @function toJSON
         * @memberof whiteboard.RenamePageMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RenamePageMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return RenamePageMessage;
    })();
    whiteboard.DeletePageMessage = (function () {
        /**
         * Properties of a DeletePageMessage.
         * @memberof whiteboard
         * @interface IDeletePageMessage
         */
        /**
         * Constructs a new DeletePageMessage.
         * @memberof whiteboard
         * @classdesc Represents a DeletePageMessage.
         * @implements IDeletePageMessage
         * @constructor
         * @param {whiteboard.IDeletePageMessage=} [properties] Properties to set
         */
        function DeletePageMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * Creates a new DeletePageMessage instance using the specified properties.
         * @function create
         * @memberof whiteboard.DeletePageMessage
         * @static
         * @param {whiteboard.IDeletePageMessage=} [properties] Properties to set
         * @returns {whiteboard.DeletePageMessage} DeletePageMessage instance
         */
        DeletePageMessage.create = function create(properties) {
            return new DeletePageMessage(properties);
        };
        /**
         * Encodes the specified DeletePageMessage message. Does not implicitly {@link whiteboard.DeletePageMessage.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.DeletePageMessage
         * @static
         * @param {whiteboard.IDeletePageMessage} message DeletePageMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeletePageMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };
        /**
         * Encodes the specified DeletePageMessage message, length delimited. Does not implicitly {@link whiteboard.DeletePageMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.DeletePageMessage
         * @static
         * @param {whiteboard.IDeletePageMessage} message DeletePageMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeletePageMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes a DeletePageMessage message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.DeletePageMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.DeletePageMessage} DeletePageMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeletePageMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.DeletePageMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes a DeletePageMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.DeletePageMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.DeletePageMessage} DeletePageMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeletePageMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies a DeletePageMessage message.
         * @function verify
         * @memberof whiteboard.DeletePageMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DeletePageMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };
        /**
         * Creates a DeletePageMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.DeletePageMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.DeletePageMessage} DeletePageMessage
         */
        DeletePageMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.DeletePageMessage)
                return object;
            return new $root.whiteboard.DeletePageMessage();
        };
        /**
         * Creates a plain object from a DeletePageMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.DeletePageMessage
         * @static
         * @param {whiteboard.DeletePageMessage} message DeletePageMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DeletePageMessage.toObject = function toObject() {
            return {};
        };
        /**
         * Converts this DeletePageMessage to JSON.
         * @function toJSON
         * @memberof whiteboard.DeletePageMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DeletePageMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return DeletePageMessage;
    })();
    whiteboard.StartDrawMessage = (function () {
        /**
         * Properties of a StartDrawMessage.
         * @memberof whiteboard
         * @interface IStartDrawMessage
         * @property {number|null} [x] StartDrawMessage x
         * @property {number|null} [y] StartDrawMessage y
         */
        /**
         * Constructs a new StartDrawMessage.
         * @memberof whiteboard
         * @classdesc Represents a StartDrawMessage.
         * @implements IStartDrawMessage
         * @constructor
         * @param {whiteboard.IStartDrawMessage=} [properties] Properties to set
         */
        function StartDrawMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * StartDrawMessage x.
         * @member {number} x
         * @memberof whiteboard.StartDrawMessage
         * @instance
         */
        StartDrawMessage.prototype.x = 0;
        /**
         * StartDrawMessage y.
         * @member {number} y
         * @memberof whiteboard.StartDrawMessage
         * @instance
         */
        StartDrawMessage.prototype.y = 0;
        /**
         * Creates a new StartDrawMessage instance using the specified properties.
         * @function create
         * @memberof whiteboard.StartDrawMessage
         * @static
         * @param {whiteboard.IStartDrawMessage=} [properties] Properties to set
         * @returns {whiteboard.StartDrawMessage} StartDrawMessage instance
         */
        StartDrawMessage.create = function create(properties) {
            return new StartDrawMessage(properties);
        };
        /**
         * Encodes the specified StartDrawMessage message. Does not implicitly {@link whiteboard.StartDrawMessage.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.StartDrawMessage
         * @static
         * @param {whiteboard.IStartDrawMessage} message StartDrawMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StartDrawMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.x != null && message.hasOwnProperty("x"))
                writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.x);
            if (message.y != null && message.hasOwnProperty("y"))
                writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.y);
            return writer;
        };
        /**
         * Encodes the specified StartDrawMessage message, length delimited. Does not implicitly {@link whiteboard.StartDrawMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.StartDrawMessage
         * @static
         * @param {whiteboard.IStartDrawMessage} message StartDrawMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StartDrawMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes a StartDrawMessage message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.StartDrawMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.StartDrawMessage} StartDrawMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StartDrawMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.StartDrawMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.x = reader.uint32();
                        break;
                    case 2:
                        message.y = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes a StartDrawMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.StartDrawMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.StartDrawMessage} StartDrawMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StartDrawMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies a StartDrawMessage message.
         * @function verify
         * @memberof whiteboard.StartDrawMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StartDrawMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (!$util.isInteger(message.x))
                    return "x: integer expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (!$util.isInteger(message.y))
                    return "y: integer expected";
            return null;
        };
        /**
         * Creates a StartDrawMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.StartDrawMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.StartDrawMessage} StartDrawMessage
         */
        StartDrawMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.StartDrawMessage)
                return object;
            var message = new $root.whiteboard.StartDrawMessage();
            if (object.x != null)
                message.x = object.x >>> 0;
            if (object.y != null)
                message.y = object.y >>> 0;
            return message;
        };
        /**
         * Creates a plain object from a StartDrawMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.StartDrawMessage
         * @static
         * @param {whiteboard.StartDrawMessage} message StartDrawMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StartDrawMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.x = 0;
                object.y = 0;
            }
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = message.y;
            return object;
        };
        /**
         * Converts this StartDrawMessage to JSON.
         * @function toJSON
         * @memberof whiteboard.StartDrawMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StartDrawMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return StartDrawMessage;
    })();
    whiteboard.DrawingMessage = (function () {
        /**
         * Properties of a DrawingMessage.
         * @memberof whiteboard
         * @interface IDrawingMessage
         * @property {number|null} [x] DrawingMessage x
         * @property {number|null} [y] DrawingMessage y
         * @property {number|null} [cpX1] DrawingMessage cpX1
         * @property {number|null} [cpY1] DrawingMessage cpY1
         * @property {number|null} [cpX2] DrawingMessage cpX2
         * @property {number|null} [cpY2] DrawingMessage cpY2
         */
        /**
         * Constructs a new DrawingMessage.
         * @memberof whiteboard
         * @classdesc Represents a DrawingMessage.
         * @implements IDrawingMessage
         * @constructor
         * @param {whiteboard.IDrawingMessage=} [properties] Properties to set
         */
        function DrawingMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * DrawingMessage x.
         * @member {number} x
         * @memberof whiteboard.DrawingMessage
         * @instance
         */
        DrawingMessage.prototype.x = 0;
        /**
         * DrawingMessage y.
         * @member {number} y
         * @memberof whiteboard.DrawingMessage
         * @instance
         */
        DrawingMessage.prototype.y = 0;
        /**
         * DrawingMessage cpX1.
         * @member {number} cpX1
         * @memberof whiteboard.DrawingMessage
         * @instance
         */
        DrawingMessage.prototype.cpX1 = 0;
        /**
         * DrawingMessage cpY1.
         * @member {number} cpY1
         * @memberof whiteboard.DrawingMessage
         * @instance
         */
        DrawingMessage.prototype.cpY1 = 0;
        /**
         * DrawingMessage cpX2.
         * @member {number} cpX2
         * @memberof whiteboard.DrawingMessage
         * @instance
         */
        DrawingMessage.prototype.cpX2 = 0;
        /**
         * DrawingMessage cpY2.
         * @member {number} cpY2
         * @memberof whiteboard.DrawingMessage
         * @instance
         */
        DrawingMessage.prototype.cpY2 = 0;
        /**
         * Creates a new DrawingMessage instance using the specified properties.
         * @function create
         * @memberof whiteboard.DrawingMessage
         * @static
         * @param {whiteboard.IDrawingMessage=} [properties] Properties to set
         * @returns {whiteboard.DrawingMessage} DrawingMessage instance
         */
        DrawingMessage.create = function create(properties) {
            return new DrawingMessage(properties);
        };
        /**
         * Encodes the specified DrawingMessage message. Does not implicitly {@link whiteboard.DrawingMessage.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.DrawingMessage
         * @static
         * @param {whiteboard.IDrawingMessage} message DrawingMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DrawingMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.x != null && message.hasOwnProperty("x"))
                writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.x);
            if (message.y != null && message.hasOwnProperty("y"))
                writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.y);
            if (message.cpX1 != null && message.hasOwnProperty("cpX1"))
                writer.uint32(/* id 3, wireType 0 =*/ 24).uint32(message.cpX1);
            if (message.cpY1 != null && message.hasOwnProperty("cpY1"))
                writer.uint32(/* id 4, wireType 0 =*/ 32).uint32(message.cpY1);
            if (message.cpX2 != null && message.hasOwnProperty("cpX2"))
                writer.uint32(/* id 5, wireType 0 =*/ 40).uint32(message.cpX2);
            if (message.cpY2 != null && message.hasOwnProperty("cpY2"))
                writer.uint32(/* id 6, wireType 0 =*/ 48).uint32(message.cpY2);
            return writer;
        };
        /**
         * Encodes the specified DrawingMessage message, length delimited. Does not implicitly {@link whiteboard.DrawingMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.DrawingMessage
         * @static
         * @param {whiteboard.IDrawingMessage} message DrawingMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DrawingMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes a DrawingMessage message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.DrawingMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.DrawingMessage} DrawingMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DrawingMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.DrawingMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.x = reader.uint32();
                        break;
                    case 2:
                        message.y = reader.uint32();
                        break;
                    case 3:
                        message.cpX1 = reader.uint32();
                        break;
                    case 4:
                        message.cpY1 = reader.uint32();
                        break;
                    case 5:
                        message.cpX2 = reader.uint32();
                        break;
                    case 6:
                        message.cpY2 = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes a DrawingMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.DrawingMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.DrawingMessage} DrawingMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DrawingMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies a DrawingMessage message.
         * @function verify
         * @memberof whiteboard.DrawingMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DrawingMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (!$util.isInteger(message.x))
                    return "x: integer expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (!$util.isInteger(message.y))
                    return "y: integer expected";
            if (message.cpX1 != null && message.hasOwnProperty("cpX1"))
                if (!$util.isInteger(message.cpX1))
                    return "cpX1: integer expected";
            if (message.cpY1 != null && message.hasOwnProperty("cpY1"))
                if (!$util.isInteger(message.cpY1))
                    return "cpY1: integer expected";
            if (message.cpX2 != null && message.hasOwnProperty("cpX2"))
                if (!$util.isInteger(message.cpX2))
                    return "cpX2: integer expected";
            if (message.cpY2 != null && message.hasOwnProperty("cpY2"))
                if (!$util.isInteger(message.cpY2))
                    return "cpY2: integer expected";
            return null;
        };
        /**
         * Creates a DrawingMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.DrawingMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.DrawingMessage} DrawingMessage
         */
        DrawingMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.DrawingMessage)
                return object;
            var message = new $root.whiteboard.DrawingMessage();
            if (object.x != null)
                message.x = object.x >>> 0;
            if (object.y != null)
                message.y = object.y >>> 0;
            if (object.cpX1 != null)
                message.cpX1 = object.cpX1 >>> 0;
            if (object.cpY1 != null)
                message.cpY1 = object.cpY1 >>> 0;
            if (object.cpX2 != null)
                message.cpX2 = object.cpX2 >>> 0;
            if (object.cpY2 != null)
                message.cpY2 = object.cpY2 >>> 0;
            return message;
        };
        /**
         * Creates a plain object from a DrawingMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.DrawingMessage
         * @static
         * @param {whiteboard.DrawingMessage} message DrawingMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DrawingMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.x = 0;
                object.y = 0;
                object.cpX1 = 0;
                object.cpY1 = 0;
                object.cpX2 = 0;
                object.cpY2 = 0;
            }
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = message.y;
            if (message.cpX1 != null && message.hasOwnProperty("cpX1"))
                object.cpX1 = message.cpX1;
            if (message.cpY1 != null && message.hasOwnProperty("cpY1"))
                object.cpY1 = message.cpY1;
            if (message.cpX2 != null && message.hasOwnProperty("cpX2"))
                object.cpX2 = message.cpX2;
            if (message.cpY2 != null && message.hasOwnProperty("cpY2"))
                object.cpY2 = message.cpY2;
            return object;
        };
        /**
         * Converts this DrawingMessage to JSON.
         * @function toJSON
         * @memberof whiteboard.DrawingMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DrawingMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return DrawingMessage;
    })();
    whiteboard.EndDrawMessage = (function () {
        /**
         * Properties of an EndDrawMessage.
         * @memberof whiteboard
         * @interface IEndDrawMessage
         * @property {number|null} [cpX1] EndDrawMessage cpX1
         * @property {number|null} [cpY1] EndDrawMessage cpY1
         * @property {number|null} [cpX2] EndDrawMessage cpX2
         * @property {number|null} [cpY2] EndDrawMessage cpY2
         */
        /**
         * Constructs a new EndDrawMessage.
         * @memberof whiteboard
         * @classdesc Represents an EndDrawMessage.
         * @implements IEndDrawMessage
         * @constructor
         * @param {whiteboard.IEndDrawMessage=} [properties] Properties to set
         */
        function EndDrawMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * EndDrawMessage cpX1.
         * @member {number} cpX1
         * @memberof whiteboard.EndDrawMessage
         * @instance
         */
        EndDrawMessage.prototype.cpX1 = 0;
        /**
         * EndDrawMessage cpY1.
         * @member {number} cpY1
         * @memberof whiteboard.EndDrawMessage
         * @instance
         */
        EndDrawMessage.prototype.cpY1 = 0;
        /**
         * EndDrawMessage cpX2.
         * @member {number} cpX2
         * @memberof whiteboard.EndDrawMessage
         * @instance
         */
        EndDrawMessage.prototype.cpX2 = 0;
        /**
         * EndDrawMessage cpY2.
         * @member {number} cpY2
         * @memberof whiteboard.EndDrawMessage
         * @instance
         */
        EndDrawMessage.prototype.cpY2 = 0;
        /**
         * Creates a new EndDrawMessage instance using the specified properties.
         * @function create
         * @memberof whiteboard.EndDrawMessage
         * @static
         * @param {whiteboard.IEndDrawMessage=} [properties] Properties to set
         * @returns {whiteboard.EndDrawMessage} EndDrawMessage instance
         */
        EndDrawMessage.create = function create(properties) {
            return new EndDrawMessage(properties);
        };
        /**
         * Encodes the specified EndDrawMessage message. Does not implicitly {@link whiteboard.EndDrawMessage.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.EndDrawMessage
         * @static
         * @param {whiteboard.IEndDrawMessage} message EndDrawMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EndDrawMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.cpX1 != null && message.hasOwnProperty("cpX1"))
                writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.cpX1);
            if (message.cpY1 != null && message.hasOwnProperty("cpY1"))
                writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.cpY1);
            if (message.cpX2 != null && message.hasOwnProperty("cpX2"))
                writer.uint32(/* id 3, wireType 0 =*/ 24).uint32(message.cpX2);
            if (message.cpY2 != null && message.hasOwnProperty("cpY2"))
                writer.uint32(/* id 4, wireType 0 =*/ 32).uint32(message.cpY2);
            return writer;
        };
        /**
         * Encodes the specified EndDrawMessage message, length delimited. Does not implicitly {@link whiteboard.EndDrawMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.EndDrawMessage
         * @static
         * @param {whiteboard.IEndDrawMessage} message EndDrawMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EndDrawMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes an EndDrawMessage message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.EndDrawMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.EndDrawMessage} EndDrawMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EndDrawMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.EndDrawMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.cpX1 = reader.uint32();
                        break;
                    case 2:
                        message.cpY1 = reader.uint32();
                        break;
                    case 3:
                        message.cpX2 = reader.uint32();
                        break;
                    case 4:
                        message.cpY2 = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes an EndDrawMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.EndDrawMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.EndDrawMessage} EndDrawMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EndDrawMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies an EndDrawMessage message.
         * @function verify
         * @memberof whiteboard.EndDrawMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EndDrawMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.cpX1 != null && message.hasOwnProperty("cpX1"))
                if (!$util.isInteger(message.cpX1))
                    return "cpX1: integer expected";
            if (message.cpY1 != null && message.hasOwnProperty("cpY1"))
                if (!$util.isInteger(message.cpY1))
                    return "cpY1: integer expected";
            if (message.cpX2 != null && message.hasOwnProperty("cpX2"))
                if (!$util.isInteger(message.cpX2))
                    return "cpX2: integer expected";
            if (message.cpY2 != null && message.hasOwnProperty("cpY2"))
                if (!$util.isInteger(message.cpY2))
                    return "cpY2: integer expected";
            return null;
        };
        /**
         * Creates an EndDrawMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.EndDrawMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.EndDrawMessage} EndDrawMessage
         */
        EndDrawMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.EndDrawMessage)
                return object;
            var message = new $root.whiteboard.EndDrawMessage();
            if (object.cpX1 != null)
                message.cpX1 = object.cpX1 >>> 0;
            if (object.cpY1 != null)
                message.cpY1 = object.cpY1 >>> 0;
            if (object.cpX2 != null)
                message.cpX2 = object.cpX2 >>> 0;
            if (object.cpY2 != null)
                message.cpY2 = object.cpY2 >>> 0;
            return message;
        };
        /**
         * Creates a plain object from an EndDrawMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.EndDrawMessage
         * @static
         * @param {whiteboard.EndDrawMessage} message EndDrawMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EndDrawMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.cpX1 = 0;
                object.cpY1 = 0;
                object.cpX2 = 0;
                object.cpY2 = 0;
            }
            if (message.cpX1 != null && message.hasOwnProperty("cpX1"))
                object.cpX1 = message.cpX1;
            if (message.cpY1 != null && message.hasOwnProperty("cpY1"))
                object.cpY1 = message.cpY1;
            if (message.cpX2 != null && message.hasOwnProperty("cpX2"))
                object.cpX2 = message.cpX2;
            if (message.cpY2 != null && message.hasOwnProperty("cpY2"))
                object.cpY2 = message.cpY2;
            return object;
        };
        /**
         * Converts this EndDrawMessage to JSON.
         * @function toJSON
         * @memberof whiteboard.EndDrawMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EndDrawMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return EndDrawMessage;
    })();
    whiteboard.EraseMessage = (function () {
        /**
         * Properties of an EraseMessage.
         * @memberof whiteboard
         * @interface IEraseMessage
         * @property {number|null} [x] EraseMessage x
         * @property {number|null} [y] EraseMessage y
         * @property {number|null} [size] EraseMessage size
         */
        /**
         * Constructs a new EraseMessage.
         * @memberof whiteboard
         * @classdesc Represents an EraseMessage.
         * @implements IEraseMessage
         * @constructor
         * @param {whiteboard.IEraseMessage=} [properties] Properties to set
         */
        function EraseMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * EraseMessage x.
         * @member {number} x
         * @memberof whiteboard.EraseMessage
         * @instance
         */
        EraseMessage.prototype.x = 0;
        /**
         * EraseMessage y.
         * @member {number} y
         * @memberof whiteboard.EraseMessage
         * @instance
         */
        EraseMessage.prototype.y = 0;
        /**
         * EraseMessage size.
         * @member {number} size
         * @memberof whiteboard.EraseMessage
         * @instance
         */
        EraseMessage.prototype.size = 0;
        /**
         * Creates a new EraseMessage instance using the specified properties.
         * @function create
         * @memberof whiteboard.EraseMessage
         * @static
         * @param {whiteboard.IEraseMessage=} [properties] Properties to set
         * @returns {whiteboard.EraseMessage} EraseMessage instance
         */
        EraseMessage.create = function create(properties) {
            return new EraseMessage(properties);
        };
        /**
         * Encodes the specified EraseMessage message. Does not implicitly {@link whiteboard.EraseMessage.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.EraseMessage
         * @static
         * @param {whiteboard.IEraseMessage} message EraseMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EraseMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.x != null && message.hasOwnProperty("x"))
                writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.x);
            if (message.y != null && message.hasOwnProperty("y"))
                writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.y);
            if (message.size != null && message.hasOwnProperty("size"))
                writer.uint32(/* id 3, wireType 0 =*/ 24).uint32(message.size);
            return writer;
        };
        /**
         * Encodes the specified EraseMessage message, length delimited. Does not implicitly {@link whiteboard.EraseMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.EraseMessage
         * @static
         * @param {whiteboard.IEraseMessage} message EraseMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EraseMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes an EraseMessage message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.EraseMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.EraseMessage} EraseMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EraseMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.EraseMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.x = reader.uint32();
                        break;
                    case 2:
                        message.y = reader.uint32();
                        break;
                    case 3:
                        message.size = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes an EraseMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.EraseMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.EraseMessage} EraseMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EraseMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies an EraseMessage message.
         * @function verify
         * @memberof whiteboard.EraseMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EraseMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (!$util.isInteger(message.x))
                    return "x: integer expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (!$util.isInteger(message.y))
                    return "y: integer expected";
            if (message.size != null && message.hasOwnProperty("size"))
                if (!$util.isInteger(message.size))
                    return "size: integer expected";
            return null;
        };
        /**
         * Creates an EraseMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.EraseMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.EraseMessage} EraseMessage
         */
        EraseMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.EraseMessage)
                return object;
            var message = new $root.whiteboard.EraseMessage();
            if (object.x != null)
                message.x = object.x >>> 0;
            if (object.y != null)
                message.y = object.y >>> 0;
            if (object.size != null)
                message.size = object.size >>> 0;
            return message;
        };
        /**
         * Creates a plain object from an EraseMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.EraseMessage
         * @static
         * @param {whiteboard.EraseMessage} message EraseMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EraseMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.x = 0;
                object.y = 0;
                object.size = 0;
            }
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = message.y;
            if (message.size != null && message.hasOwnProperty("size"))
                object.size = message.size;
            return object;
        };
        /**
         * Converts this EraseMessage to JSON.
         * @function toJSON
         * @memberof whiteboard.EraseMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EraseMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return EraseMessage;
    })();
    whiteboard.SwapObjectMessage = (function () {
        /**
         * Properties of a SwapObjectMessage.
         * @memberof whiteboard
         * @interface ISwapObjectMessage
         * @property {string|null} [name1] SwapObjectMessage name1
         * @property {string|null} [name2] SwapObjectMessage name2
         * @property {number|null} [duration] SwapObjectMessage duration
         */
        /**
         * Constructs a new SwapObjectMessage.
         * @memberof whiteboard
         * @classdesc Represents a SwapObjectMessage.
         * @implements ISwapObjectMessage
         * @constructor
         * @param {whiteboard.ISwapObjectMessage=} [properties] Properties to set
         */
        function SwapObjectMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * SwapObjectMessage name1.
         * @member {string} name1
         * @memberof whiteboard.SwapObjectMessage
         * @instance
         */
        SwapObjectMessage.prototype.name1 = "";
        /**
         * SwapObjectMessage name2.
         * @member {string} name2
         * @memberof whiteboard.SwapObjectMessage
         * @instance
         */
        SwapObjectMessage.prototype.name2 = "";
        /**
         * SwapObjectMessage duration.
         * @member {number} duration
         * @memberof whiteboard.SwapObjectMessage
         * @instance
         */
        SwapObjectMessage.prototype.duration = 0;
        /**
         * Creates a new SwapObjectMessage instance using the specified properties.
         * @function create
         * @memberof whiteboard.SwapObjectMessage
         * @static
         * @param {whiteboard.ISwapObjectMessage=} [properties] Properties to set
         * @returns {whiteboard.SwapObjectMessage} SwapObjectMessage instance
         */
        SwapObjectMessage.create = function create(properties) {
            return new SwapObjectMessage(properties);
        };
        /**
         * Encodes the specified SwapObjectMessage message. Does not implicitly {@link whiteboard.SwapObjectMessage.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.SwapObjectMessage
         * @static
         * @param {whiteboard.ISwapObjectMessage} message SwapObjectMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SwapObjectMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name1 != null && message.hasOwnProperty("name1"))
                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.name1);
            if (message.name2 != null && message.hasOwnProperty("name2"))
                writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.name2);
            if (message.duration != null && message.hasOwnProperty("duration"))
                writer.uint32(/* id 3, wireType 0 =*/ 24).uint32(message.duration);
            return writer;
        };
        /**
         * Encodes the specified SwapObjectMessage message, length delimited. Does not implicitly {@link whiteboard.SwapObjectMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.SwapObjectMessage
         * @static
         * @param {whiteboard.ISwapObjectMessage} message SwapObjectMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SwapObjectMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes a SwapObjectMessage message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.SwapObjectMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.SwapObjectMessage} SwapObjectMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SwapObjectMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.SwapObjectMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.name1 = reader.string();
                        break;
                    case 2:
                        message.name2 = reader.string();
                        break;
                    case 3:
                        message.duration = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes a SwapObjectMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.SwapObjectMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.SwapObjectMessage} SwapObjectMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SwapObjectMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies a SwapObjectMessage message.
         * @function verify
         * @memberof whiteboard.SwapObjectMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SwapObjectMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name1 != null && message.hasOwnProperty("name1"))
                if (!$util.isString(message.name1))
                    return "name1: string expected";
            if (message.name2 != null && message.hasOwnProperty("name2"))
                if (!$util.isString(message.name2))
                    return "name2: string expected";
            if (message.duration != null && message.hasOwnProperty("duration"))
                if (!$util.isInteger(message.duration))
                    return "duration: integer expected";
            return null;
        };
        /**
         * Creates a SwapObjectMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.SwapObjectMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.SwapObjectMessage} SwapObjectMessage
         */
        SwapObjectMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.SwapObjectMessage)
                return object;
            var message = new $root.whiteboard.SwapObjectMessage();
            if (object.name1 != null)
                message.name1 = String(object.name1);
            if (object.name2 != null)
                message.name2 = String(object.name2);
            if (object.duration != null)
                message.duration = object.duration >>> 0;
            return message;
        };
        /**
         * Creates a plain object from a SwapObjectMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.SwapObjectMessage
         * @static
         * @param {whiteboard.SwapObjectMessage} message SwapObjectMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SwapObjectMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.name1 = "";
                object.name2 = "";
                object.duration = 0;
            }
            if (message.name1 != null && message.hasOwnProperty("name1"))
                object.name1 = message.name1;
            if (message.name2 != null && message.hasOwnProperty("name2"))
                object.name2 = message.name2;
            if (message.duration != null && message.hasOwnProperty("duration"))
                object.duration = message.duration;
            return object;
        };
        /**
         * Converts this SwapObjectMessage to JSON.
         * @function toJSON
         * @memberof whiteboard.SwapObjectMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SwapObjectMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return SwapObjectMessage;
    })();
    return whiteboard;
})();
module.exports = $root;
//# sourceMappingURL=protocols.js.map