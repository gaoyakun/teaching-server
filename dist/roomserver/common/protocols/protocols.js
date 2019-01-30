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
    whiteboard.CreateObjectMessage = (function () {
        /**
         * Properties of a CreateObjectMessage.
         * @memberof whiteboard
         * @interface ICreateObjectMessage
         * @property {string|null} [type] CreateObjectMessage type
         * @property {number|null} [x] CreateObjectMessage x
         * @property {number|null} [y] CreateObjectMessage y
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
            if (message.paramsJson != null && message.hasOwnProperty("paramsJson"))
                writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.paramsJson);
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
                object.paramsJson = "";
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = message.y;
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
    whiteboard.Point = (function () {
        /**
         * Properties of a Point.
         * @memberof whiteboard
         * @interface IPoint
         * @property {number|null} [x] Point x
         * @property {number|null} [y] Point y
         */
        /**
         * Constructs a new Point.
         * @memberof whiteboard
         * @classdesc Represents a Point.
         * @implements IPoint
         * @constructor
         * @param {whiteboard.IPoint=} [properties] Properties to set
         */
        function Point(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * Point x.
         * @member {number} x
         * @memberof whiteboard.Point
         * @instance
         */
        Point.prototype.x = 0;
        /**
         * Point y.
         * @member {number} y
         * @memberof whiteboard.Point
         * @instance
         */
        Point.prototype.y = 0;
        /**
         * Creates a new Point instance using the specified properties.
         * @function create
         * @memberof whiteboard.Point
         * @static
         * @param {whiteboard.IPoint=} [properties] Properties to set
         * @returns {whiteboard.Point} Point instance
         */
        Point.create = function create(properties) {
            return new Point(properties);
        };
        /**
         * Encodes the specified Point message. Does not implicitly {@link whiteboard.Point.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.Point
         * @static
         * @param {whiteboard.IPoint} message Point message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Point.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.x != null && message.hasOwnProperty("x"))
                writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.x);
            if (message.y != null && message.hasOwnProperty("y"))
                writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.y);
            return writer;
        };
        /**
         * Encodes the specified Point message, length delimited. Does not implicitly {@link whiteboard.Point.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.Point
         * @static
         * @param {whiteboard.IPoint} message Point message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Point.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes a Point message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.Point
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.Point} Point
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Point.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.Point();
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
         * Decodes a Point message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.Point
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.Point} Point
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Point.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies a Point message.
         * @function verify
         * @memberof whiteboard.Point
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Point.verify = function verify(message) {
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
         * Creates a Point message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.Point
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.Point} Point
         */
        Point.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.Point)
                return object;
            var message = new $root.whiteboard.Point();
            if (object.x != null)
                message.x = object.x >>> 0;
            if (object.y != null)
                message.y = object.y >>> 0;
            return message;
        };
        /**
         * Creates a plain object from a Point message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.Point
         * @static
         * @param {whiteboard.Point} message Point
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Point.toObject = function toObject(message, options) {
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
         * Converts this Point to JSON.
         * @function toJSON
         * @memberof whiteboard.Point
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Point.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return Point;
    })();
    whiteboard.DrawMessage = (function () {
        /**
         * Properties of a DrawMessage.
         * @memberof whiteboard
         * @interface IDrawMessage
         * @property {string|null} [entityName] DrawMessage entityName
         * @property {number|null} [lineWidth] DrawMessage lineWidth
         * @property {string|null} [color] DrawMessage color
         * @property {boolean|null} ["new"] DrawMessage new
         * @property {Array.<whiteboard.IPoint>|null} [points] DrawMessage points
         */
        /**
         * Constructs a new DrawMessage.
         * @memberof whiteboard
         * @classdesc Represents a DrawMessage.
         * @implements IDrawMessage
         * @constructor
         * @param {whiteboard.IDrawMessage=} [properties] Properties to set
         */
        function DrawMessage(properties) {
            this.points = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * DrawMessage entityName.
         * @member {string} entityName
         * @memberof whiteboard.DrawMessage
         * @instance
         */
        DrawMessage.prototype.entityName = "";
        /**
         * DrawMessage lineWidth.
         * @member {number} lineWidth
         * @memberof whiteboard.DrawMessage
         * @instance
         */
        DrawMessage.prototype.lineWidth = 0;
        /**
         * DrawMessage color.
         * @member {string} color
         * @memberof whiteboard.DrawMessage
         * @instance
         */
        DrawMessage.prototype.color = "";
        /**
         * DrawMessage new.
         * @member {boolean} new
         * @memberof whiteboard.DrawMessage
         * @instance
         */
        DrawMessage.prototype["new"] = false;
        /**
         * DrawMessage points.
         * @member {Array.<whiteboard.IPoint>} points
         * @memberof whiteboard.DrawMessage
         * @instance
         */
        DrawMessage.prototype.points = $util.emptyArray;
        /**
         * Creates a new DrawMessage instance using the specified properties.
         * @function create
         * @memberof whiteboard.DrawMessage
         * @static
         * @param {whiteboard.IDrawMessage=} [properties] Properties to set
         * @returns {whiteboard.DrawMessage} DrawMessage instance
         */
        DrawMessage.create = function create(properties) {
            return new DrawMessage(properties);
        };
        /**
         * Encodes the specified DrawMessage message. Does not implicitly {@link whiteboard.DrawMessage.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.DrawMessage
         * @static
         * @param {whiteboard.IDrawMessage} message DrawMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DrawMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.entityName != null && message.hasOwnProperty("entityName"))
                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.entityName);
            if (message.lineWidth != null && message.hasOwnProperty("lineWidth"))
                writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.lineWidth);
            if (message.color != null && message.hasOwnProperty("color"))
                writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.color);
            if (message["new"] != null && message.hasOwnProperty("new"))
                writer.uint32(/* id 4, wireType 0 =*/ 32).bool(message["new"]);
            if (message.points != null && message.points.length)
                for (var i = 0; i < message.points.length; ++i)
                    $root.whiteboard.Point.encode(message.points[i], writer.uint32(/* id 5, wireType 2 =*/ 42).fork()).ldelim();
            return writer;
        };
        /**
         * Encodes the specified DrawMessage message, length delimited. Does not implicitly {@link whiteboard.DrawMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.DrawMessage
         * @static
         * @param {whiteboard.IDrawMessage} message DrawMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DrawMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes a DrawMessage message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.DrawMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.DrawMessage} DrawMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DrawMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.DrawMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.entityName = reader.string();
                        break;
                    case 2:
                        message.lineWidth = reader.uint32();
                        break;
                    case 3:
                        message.color = reader.string();
                        break;
                    case 4:
                        message["new"] = reader.bool();
                        break;
                    case 5:
                        if (!(message.points && message.points.length))
                            message.points = [];
                        message.points.push($root.whiteboard.Point.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes a DrawMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.DrawMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.DrawMessage} DrawMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DrawMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies a DrawMessage message.
         * @function verify
         * @memberof whiteboard.DrawMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DrawMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.entityName != null && message.hasOwnProperty("entityName"))
                if (!$util.isString(message.entityName))
                    return "entityName: string expected";
            if (message.lineWidth != null && message.hasOwnProperty("lineWidth"))
                if (!$util.isInteger(message.lineWidth))
                    return "lineWidth: integer expected";
            if (message.color != null && message.hasOwnProperty("color"))
                if (!$util.isString(message.color))
                    return "color: string expected";
            if (message["new"] != null && message.hasOwnProperty("new"))
                if (typeof message["new"] !== "boolean")
                    return "new: boolean expected";
            if (message.points != null && message.hasOwnProperty("points")) {
                if (!Array.isArray(message.points))
                    return "points: array expected";
                for (var i = 0; i < message.points.length; ++i) {
                    var error = $root.whiteboard.Point.verify(message.points[i]);
                    if (error)
                        return "points." + error;
                }
            }
            return null;
        };
        /**
         * Creates a DrawMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.DrawMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.DrawMessage} DrawMessage
         */
        DrawMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.DrawMessage)
                return object;
            var message = new $root.whiteboard.DrawMessage();
            if (object.entityName != null)
                message.entityName = String(object.entityName);
            if (object.lineWidth != null)
                message.lineWidth = object.lineWidth >>> 0;
            if (object.color != null)
                message.color = String(object.color);
            if (object["new"] != null)
                message["new"] = Boolean(object["new"]);
            if (object.points) {
                if (!Array.isArray(object.points))
                    throw TypeError(".whiteboard.DrawMessage.points: array expected");
                message.points = [];
                for (var i = 0; i < object.points.length; ++i) {
                    if (typeof object.points[i] !== "object")
                        throw TypeError(".whiteboard.DrawMessage.points: object expected");
                    message.points[i] = $root.whiteboard.Point.fromObject(object.points[i]);
                }
            }
            return message;
        };
        /**
         * Creates a plain object from a DrawMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.DrawMessage
         * @static
         * @param {whiteboard.DrawMessage} message DrawMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DrawMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.points = [];
            if (options.defaults) {
                object.entityName = "";
                object.lineWidth = 0;
                object.color = "";
                object["new"] = false;
            }
            if (message.entityName != null && message.hasOwnProperty("entityName"))
                object.entityName = message.entityName;
            if (message.lineWidth != null && message.hasOwnProperty("lineWidth"))
                object.lineWidth = message.lineWidth;
            if (message.color != null && message.hasOwnProperty("color"))
                object.color = message.color;
            if (message["new"] != null && message.hasOwnProperty("new"))
                object["new"] = message["new"];
            if (message.points && message.points.length) {
                object.points = [];
                for (var j = 0; j < message.points.length; ++j)
                    object.points[j] = $root.whiteboard.Point.toObject(message.points[j], options);
            }
            return object;
        };
        /**
         * Converts this DrawMessage to JSON.
         * @function toJSON
         * @memberof whiteboard.DrawMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DrawMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return DrawMessage;
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
    whiteboard.MoveObjectMessage = (function () {
        /**
         * Properties of a MoveObjectMessage.
         * @memberof whiteboard
         * @interface IMoveObjectMessage
         * @property {string|null} [name] MoveObjectMessage name
         * @property {number|null} [x1] MoveObjectMessage x1
         * @property {number|null} [y1] MoveObjectMessage y1
         * @property {number|null} [x2] MoveObjectMessage x2
         * @property {number|null} [y2] MoveObjectMessage y2
         */
        /**
         * Constructs a new MoveObjectMessage.
         * @memberof whiteboard
         * @classdesc Represents a MoveObjectMessage.
         * @implements IMoveObjectMessage
         * @constructor
         * @param {whiteboard.IMoveObjectMessage=} [properties] Properties to set
         */
        function MoveObjectMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * MoveObjectMessage name.
         * @member {string} name
         * @memberof whiteboard.MoveObjectMessage
         * @instance
         */
        MoveObjectMessage.prototype.name = "";
        /**
         * MoveObjectMessage x1.
         * @member {number} x1
         * @memberof whiteboard.MoveObjectMessage
         * @instance
         */
        MoveObjectMessage.prototype.x1 = 0;
        /**
         * MoveObjectMessage y1.
         * @member {number} y1
         * @memberof whiteboard.MoveObjectMessage
         * @instance
         */
        MoveObjectMessage.prototype.y1 = 0;
        /**
         * MoveObjectMessage x2.
         * @member {number} x2
         * @memberof whiteboard.MoveObjectMessage
         * @instance
         */
        MoveObjectMessage.prototype.x2 = 0;
        /**
         * MoveObjectMessage y2.
         * @member {number} y2
         * @memberof whiteboard.MoveObjectMessage
         * @instance
         */
        MoveObjectMessage.prototype.y2 = 0;
        /**
         * Creates a new MoveObjectMessage instance using the specified properties.
         * @function create
         * @memberof whiteboard.MoveObjectMessage
         * @static
         * @param {whiteboard.IMoveObjectMessage=} [properties] Properties to set
         * @returns {whiteboard.MoveObjectMessage} MoveObjectMessage instance
         */
        MoveObjectMessage.create = function create(properties) {
            return new MoveObjectMessage(properties);
        };
        /**
         * Encodes the specified MoveObjectMessage message. Does not implicitly {@link whiteboard.MoveObjectMessage.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.MoveObjectMessage
         * @static
         * @param {whiteboard.IMoveObjectMessage} message MoveObjectMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MoveObjectMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.name);
            if (message.x1 != null && message.hasOwnProperty("x1"))
                writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.x1);
            if (message.y1 != null && message.hasOwnProperty("y1"))
                writer.uint32(/* id 3, wireType 0 =*/ 24).int32(message.y1);
            if (message.x2 != null && message.hasOwnProperty("x2"))
                writer.uint32(/* id 4, wireType 0 =*/ 32).int32(message.x2);
            if (message.y2 != null && message.hasOwnProperty("y2"))
                writer.uint32(/* id 5, wireType 0 =*/ 40).int32(message.y2);
            return writer;
        };
        /**
         * Encodes the specified MoveObjectMessage message, length delimited. Does not implicitly {@link whiteboard.MoveObjectMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.MoveObjectMessage
         * @static
         * @param {whiteboard.IMoveObjectMessage} message MoveObjectMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MoveObjectMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes a MoveObjectMessage message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.MoveObjectMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.MoveObjectMessage} MoveObjectMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MoveObjectMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.MoveObjectMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;
                    case 2:
                        message.x1 = reader.int32();
                        break;
                    case 3:
                        message.y1 = reader.int32();
                        break;
                    case 4:
                        message.x2 = reader.int32();
                        break;
                    case 5:
                        message.y2 = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes a MoveObjectMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.MoveObjectMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.MoveObjectMessage} MoveObjectMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MoveObjectMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies a MoveObjectMessage message.
         * @function verify
         * @memberof whiteboard.MoveObjectMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MoveObjectMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.x1 != null && message.hasOwnProperty("x1"))
                if (!$util.isInteger(message.x1))
                    return "x1: integer expected";
            if (message.y1 != null && message.hasOwnProperty("y1"))
                if (!$util.isInteger(message.y1))
                    return "y1: integer expected";
            if (message.x2 != null && message.hasOwnProperty("x2"))
                if (!$util.isInteger(message.x2))
                    return "x2: integer expected";
            if (message.y2 != null && message.hasOwnProperty("y2"))
                if (!$util.isInteger(message.y2))
                    return "y2: integer expected";
            return null;
        };
        /**
         * Creates a MoveObjectMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.MoveObjectMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.MoveObjectMessage} MoveObjectMessage
         */
        MoveObjectMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.MoveObjectMessage)
                return object;
            var message = new $root.whiteboard.MoveObjectMessage();
            if (object.name != null)
                message.name = String(object.name);
            if (object.x1 != null)
                message.x1 = object.x1 | 0;
            if (object.y1 != null)
                message.y1 = object.y1 | 0;
            if (object.x2 != null)
                message.x2 = object.x2 | 0;
            if (object.y2 != null)
                message.y2 = object.y2 | 0;
            return message;
        };
        /**
         * Creates a plain object from a MoveObjectMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.MoveObjectMessage
         * @static
         * @param {whiteboard.MoveObjectMessage} message MoveObjectMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MoveObjectMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.name = "";
                object.x1 = 0;
                object.y1 = 0;
                object.x2 = 0;
                object.y2 = 0;
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.x1 != null && message.hasOwnProperty("x1"))
                object.x1 = message.x1;
            if (message.y1 != null && message.hasOwnProperty("y1"))
                object.y1 = message.y1;
            if (message.x2 != null && message.hasOwnProperty("x2"))
                object.x2 = message.x2;
            if (message.y2 != null && message.hasOwnProperty("y2"))
                object.y2 = message.y2;
            return object;
        };
        /**
         * Converts this MoveObjectMessage to JSON.
         * @function toJSON
         * @memberof whiteboard.MoveObjectMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MoveObjectMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return MoveObjectMessage;
    })();
    whiteboard.ClearPageMessage = (function () {
        /**
         * Properties of a ClearPageMessage.
         * @memberof whiteboard
         * @interface IClearPageMessage
         * @property {string|null} [pageName] ClearPageMessage pageName
         */
        /**
         * Constructs a new ClearPageMessage.
         * @memberof whiteboard
         * @classdesc Represents a ClearPageMessage.
         * @implements IClearPageMessage
         * @constructor
         * @param {whiteboard.IClearPageMessage=} [properties] Properties to set
         */
        function ClearPageMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * ClearPageMessage pageName.
         * @member {string} pageName
         * @memberof whiteboard.ClearPageMessage
         * @instance
         */
        ClearPageMessage.prototype.pageName = "";
        /**
         * Creates a new ClearPageMessage instance using the specified properties.
         * @function create
         * @memberof whiteboard.ClearPageMessage
         * @static
         * @param {whiteboard.IClearPageMessage=} [properties] Properties to set
         * @returns {whiteboard.ClearPageMessage} ClearPageMessage instance
         */
        ClearPageMessage.create = function create(properties) {
            return new ClearPageMessage(properties);
        };
        /**
         * Encodes the specified ClearPageMessage message. Does not implicitly {@link whiteboard.ClearPageMessage.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.ClearPageMessage
         * @static
         * @param {whiteboard.IClearPageMessage} message ClearPageMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClearPageMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.pageName != null && message.hasOwnProperty("pageName"))
                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.pageName);
            return writer;
        };
        /**
         * Encodes the specified ClearPageMessage message, length delimited. Does not implicitly {@link whiteboard.ClearPageMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.ClearPageMessage
         * @static
         * @param {whiteboard.IClearPageMessage} message ClearPageMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClearPageMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes a ClearPageMessage message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.ClearPageMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.ClearPageMessage} ClearPageMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClearPageMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.ClearPageMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.pageName = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes a ClearPageMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.ClearPageMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.ClearPageMessage} ClearPageMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClearPageMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies a ClearPageMessage message.
         * @function verify
         * @memberof whiteboard.ClearPageMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ClearPageMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.pageName != null && message.hasOwnProperty("pageName"))
                if (!$util.isString(message.pageName))
                    return "pageName: string expected";
            return null;
        };
        /**
         * Creates a ClearPageMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.ClearPageMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.ClearPageMessage} ClearPageMessage
         */
        ClearPageMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.ClearPageMessage)
                return object;
            var message = new $root.whiteboard.ClearPageMessage();
            if (object.pageName != null)
                message.pageName = String(object.pageName);
            return message;
        };
        /**
         * Creates a plain object from a ClearPageMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.ClearPageMessage
         * @static
         * @param {whiteboard.ClearPageMessage} message ClearPageMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ClearPageMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.pageName = "";
            if (message.pageName != null && message.hasOwnProperty("pageName"))
                object.pageName = message.pageName;
            return object;
        };
        /**
         * Converts this ClearPageMessage to JSON.
         * @function toJSON
         * @memberof whiteboard.ClearPageMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ClearPageMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return ClearPageMessage;
    })();
    whiteboard.ClearBoardMessage = (function () {
        /**
         * Properties of a ClearBoardMessage.
         * @memberof whiteboard
         * @interface IClearBoardMessage
         */
        /**
         * Constructs a new ClearBoardMessage.
         * @memberof whiteboard
         * @classdesc Represents a ClearBoardMessage.
         * @implements IClearBoardMessage
         * @constructor
         * @param {whiteboard.IClearBoardMessage=} [properties] Properties to set
         */
        function ClearBoardMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * Creates a new ClearBoardMessage instance using the specified properties.
         * @function create
         * @memberof whiteboard.ClearBoardMessage
         * @static
         * @param {whiteboard.IClearBoardMessage=} [properties] Properties to set
         * @returns {whiteboard.ClearBoardMessage} ClearBoardMessage instance
         */
        ClearBoardMessage.create = function create(properties) {
            return new ClearBoardMessage(properties);
        };
        /**
         * Encodes the specified ClearBoardMessage message. Does not implicitly {@link whiteboard.ClearBoardMessage.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.ClearBoardMessage
         * @static
         * @param {whiteboard.IClearBoardMessage} message ClearBoardMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClearBoardMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };
        /**
         * Encodes the specified ClearBoardMessage message, length delimited. Does not implicitly {@link whiteboard.ClearBoardMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.ClearBoardMessage
         * @static
         * @param {whiteboard.IClearBoardMessage} message ClearBoardMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClearBoardMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes a ClearBoardMessage message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.ClearBoardMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.ClearBoardMessage} ClearBoardMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClearBoardMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.ClearBoardMessage();
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
         * Decodes a ClearBoardMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.ClearBoardMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.ClearBoardMessage} ClearBoardMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClearBoardMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies a ClearBoardMessage message.
         * @function verify
         * @memberof whiteboard.ClearBoardMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ClearBoardMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };
        /**
         * Creates a ClearBoardMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.ClearBoardMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.ClearBoardMessage} ClearBoardMessage
         */
        ClearBoardMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.ClearBoardMessage)
                return object;
            return new $root.whiteboard.ClearBoardMessage();
        };
        /**
         * Creates a plain object from a ClearBoardMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.ClearBoardMessage
         * @static
         * @param {whiteboard.ClearBoardMessage} message ClearBoardMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ClearBoardMessage.toObject = function toObject() {
            return {};
        };
        /**
         * Converts this ClearBoardMessage to JSON.
         * @function toJSON
         * @memberof whiteboard.ClearBoardMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ClearBoardMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return ClearBoardMessage;
    })();
    whiteboard.UndoMessage = (function () {
        /**
         * Properties of an UndoMessage.
         * @memberof whiteboard
         * @interface IUndoMessage
         */
        /**
         * Constructs a new UndoMessage.
         * @memberof whiteboard
         * @classdesc Represents an UndoMessage.
         * @implements IUndoMessage
         * @constructor
         * @param {whiteboard.IUndoMessage=} [properties] Properties to set
         */
        function UndoMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * Creates a new UndoMessage instance using the specified properties.
         * @function create
         * @memberof whiteboard.UndoMessage
         * @static
         * @param {whiteboard.IUndoMessage=} [properties] Properties to set
         * @returns {whiteboard.UndoMessage} UndoMessage instance
         */
        UndoMessage.create = function create(properties) {
            return new UndoMessage(properties);
        };
        /**
         * Encodes the specified UndoMessage message. Does not implicitly {@link whiteboard.UndoMessage.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.UndoMessage
         * @static
         * @param {whiteboard.IUndoMessage} message UndoMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UndoMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };
        /**
         * Encodes the specified UndoMessage message, length delimited. Does not implicitly {@link whiteboard.UndoMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.UndoMessage
         * @static
         * @param {whiteboard.IUndoMessage} message UndoMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UndoMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes an UndoMessage message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.UndoMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.UndoMessage} UndoMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UndoMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.UndoMessage();
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
         * Decodes an UndoMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.UndoMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.UndoMessage} UndoMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UndoMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies an UndoMessage message.
         * @function verify
         * @memberof whiteboard.UndoMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UndoMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };
        /**
         * Creates an UndoMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.UndoMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.UndoMessage} UndoMessage
         */
        UndoMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.UndoMessage)
                return object;
            return new $root.whiteboard.UndoMessage();
        };
        /**
         * Creates a plain object from an UndoMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.UndoMessage
         * @static
         * @param {whiteboard.UndoMessage} message UndoMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UndoMessage.toObject = function toObject() {
            return {};
        };
        /**
         * Converts this UndoMessage to JSON.
         * @function toJSON
         * @memberof whiteboard.UndoMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UndoMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return UndoMessage;
    })();
    return whiteboard;
})();
module.exports = $root;
//# sourceMappingURL=protocols.js.map