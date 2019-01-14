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
    return whiteboard;
})();
module.exports = $root;
//# sourceMappingURL=protocols.js.map