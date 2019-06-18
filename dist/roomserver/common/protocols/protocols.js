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
    room.RoomUser = (function () {
        /**
         * Properties of a RoomUser.
         * @memberof room
         * @interface IRoomUser
         * @property {number|null} [userId] RoomUser userId
         * @property {string} name RoomUser name
         */
        /**
         * Constructs a new RoomUser.
         * @memberof room
         * @classdesc Represents a RoomUser.
         * @implements IRoomUser
         * @constructor
         * @param {room.IRoomUser=} [properties] Properties to set
         */
        function RoomUser(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * RoomUser userId.
         * @member {number} userId
         * @memberof room.RoomUser
         * @instance
         */
        RoomUser.prototype.userId = 0;
        /**
         * RoomUser name.
         * @member {string} name
         * @memberof room.RoomUser
         * @instance
         */
        RoomUser.prototype.name = "";
        /**
         * Creates a new RoomUser instance using the specified properties.
         * @function create
         * @memberof room.RoomUser
         * @static
         * @param {room.IRoomUser=} [properties] Properties to set
         * @returns {room.RoomUser} RoomUser instance
         */
        RoomUser.create = function create(properties) {
            return new RoomUser(properties);
        };
        /**
         * Encodes the specified RoomUser message. Does not implicitly {@link room.RoomUser.verify|verify} messages.
         * @function encode
         * @memberof room.RoomUser
         * @static
         * @param {room.IRoomUser} message RoomUser message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomUser.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.userId != null && message.hasOwnProperty("userId"))
                writer.uint32(/* id 1, wireType 0 =*/ 8).uint32(message.userId);
            writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.name);
            return writer;
        };
        /**
         * Encodes the specified RoomUser message, length delimited. Does not implicitly {@link room.RoomUser.verify|verify} messages.
         * @function encodeDelimited
         * @memberof room.RoomUser
         * @static
         * @param {room.IRoomUser} message RoomUser message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoomUser.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes a RoomUser message from the specified reader or buffer.
         * @function decode
         * @memberof room.RoomUser
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {room.RoomUser} RoomUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomUser.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.room.RoomUser();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.userId = reader.uint32();
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            if (!message.hasOwnProperty("name"))
                throw $util.ProtocolError("missing required 'name'", { instance: message });
            return message;
        };
        /**
         * Decodes a RoomUser message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof room.RoomUser
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {room.RoomUser} RoomUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoomUser.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies a RoomUser message.
         * @function verify
         * @memberof room.RoomUser
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RoomUser.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isInteger(message.userId))
                    return "userId: integer expected";
            if (!$util.isString(message.name))
                return "name: string expected";
            return null;
        };
        /**
         * Creates a RoomUser message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof room.RoomUser
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {room.RoomUser} RoomUser
         */
        RoomUser.fromObject = function fromObject(object) {
            if (object instanceof $root.room.RoomUser)
                return object;
            var message = new $root.room.RoomUser();
            if (object.userId != null)
                message.userId = object.userId >>> 0;
            if (object.name != null)
                message.name = String(object.name);
            return message;
        };
        /**
         * Creates a plain object from a RoomUser message. Also converts values to other types if specified.
         * @function toObject
         * @memberof room.RoomUser
         * @static
         * @param {room.RoomUser} message RoomUser
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RoomUser.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.userId = 0;
                object.name = "";
            }
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            return object;
        };
        /**
         * Converts this RoomUser to JSON.
         * @function toJSON
         * @memberof room.RoomUser
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RoomUser.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return RoomUser;
    })();
    room.JoinRoomMessage = (function () {
        /**
         * Properties of a JoinRoomMessage.
         * @memberof room
         * @interface IJoinRoomMessage
         * @property {room.IRoomUser|null} [user] JoinRoomMessage user
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
         * JoinRoomMessage user.
         * @member {room.IRoomUser|null|undefined} user
         * @memberof room.JoinRoomMessage
         * @instance
         */
        JoinRoomMessage.prototype.user = null;
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
            if (message.user != null && message.hasOwnProperty("user"))
                $root.room.RoomUser.encode(message.user, writer.uint32(/* id 1, wireType 2 =*/ 10).fork()).ldelim();
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
                        message.user = $root.room.RoomUser.decode(reader, reader.uint32());
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
            if (message.user != null && message.hasOwnProperty("user")) {
                var error = $root.room.RoomUser.verify(message.user);
                if (error)
                    return "user." + error;
            }
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
            if (object.user != null) {
                if (typeof object.user !== "object")
                    throw TypeError(".room.JoinRoomMessage.user: object expected");
                message.user = $root.room.RoomUser.fromObject(object.user);
            }
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
            if (options.defaults)
                object.user = null;
            if (message.user != null && message.hasOwnProperty("user"))
                object.user = $root.room.RoomUser.toObject(message.user, options);
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
         * @property {room.IRoomUser|null} [user] LeaveRoomMessage user
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
         * LeaveRoomMessage user.
         * @member {room.IRoomUser|null|undefined} user
         * @memberof room.LeaveRoomMessage
         * @instance
         */
        LeaveRoomMessage.prototype.user = null;
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
            if (message.user != null && message.hasOwnProperty("user"))
                $root.room.RoomUser.encode(message.user, writer.uint32(/* id 1, wireType 2 =*/ 10).fork()).ldelim();
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
                        message.user = $root.room.RoomUser.decode(reader, reader.uint32());
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
            if (message.user != null && message.hasOwnProperty("user")) {
                var error = $root.room.RoomUser.verify(message.user);
                if (error)
                    return "user." + error;
            }
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
            if (object.user != null) {
                if (typeof object.user !== "object")
                    throw TypeError(".room.LeaveRoomMessage.user: object expected");
                message.user = $root.room.RoomUser.fromObject(object.user);
            }
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
            if (options.defaults)
                object.user = null;
            if (message.user != null && message.hasOwnProperty("user"))
                object.user = $root.room.RoomUser.toObject(message.user, options);
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
    room.ListUsersMessage = (function () {
        /**
         * Properties of a ListUsersMessage.
         * @memberof room
         * @interface IListUsersMessage
         * @property {Array.<room.IRoomUser>|null} [users] ListUsersMessage users
         */
        /**
         * Constructs a new ListUsersMessage.
         * @memberof room
         * @classdesc Represents a ListUsersMessage.
         * @implements IListUsersMessage
         * @constructor
         * @param {room.IListUsersMessage=} [properties] Properties to set
         */
        function ListUsersMessage(properties) {
            this.users = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * ListUsersMessage users.
         * @member {Array.<room.IRoomUser>} users
         * @memberof room.ListUsersMessage
         * @instance
         */
        ListUsersMessage.prototype.users = $util.emptyArray;
        /**
         * Creates a new ListUsersMessage instance using the specified properties.
         * @function create
         * @memberof room.ListUsersMessage
         * @static
         * @param {room.IListUsersMessage=} [properties] Properties to set
         * @returns {room.ListUsersMessage} ListUsersMessage instance
         */
        ListUsersMessage.create = function create(properties) {
            return new ListUsersMessage(properties);
        };
        /**
         * Encodes the specified ListUsersMessage message. Does not implicitly {@link room.ListUsersMessage.verify|verify} messages.
         * @function encode
         * @memberof room.ListUsersMessage
         * @static
         * @param {room.IListUsersMessage} message ListUsersMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ListUsersMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.users != null && message.users.length)
                for (var i = 0; i < message.users.length; ++i)
                    $root.room.RoomUser.encode(message.users[i], writer.uint32(/* id 1, wireType 2 =*/ 10).fork()).ldelim();
            return writer;
        };
        /**
         * Encodes the specified ListUsersMessage message, length delimited. Does not implicitly {@link room.ListUsersMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof room.ListUsersMessage
         * @static
         * @param {room.IListUsersMessage} message ListUsersMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ListUsersMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes a ListUsersMessage message from the specified reader or buffer.
         * @function decode
         * @memberof room.ListUsersMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {room.ListUsersMessage} ListUsersMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ListUsersMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.room.ListUsersMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        if (!(message.users && message.users.length))
                            message.users = [];
                        message.users.push($root.room.RoomUser.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes a ListUsersMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof room.ListUsersMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {room.ListUsersMessage} ListUsersMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ListUsersMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies a ListUsersMessage message.
         * @function verify
         * @memberof room.ListUsersMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ListUsersMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.users != null && message.hasOwnProperty("users")) {
                if (!Array.isArray(message.users))
                    return "users: array expected";
                for (var i = 0; i < message.users.length; ++i) {
                    var error = $root.room.RoomUser.verify(message.users[i]);
                    if (error)
                        return "users." + error;
                }
            }
            return null;
        };
        /**
         * Creates a ListUsersMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof room.ListUsersMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {room.ListUsersMessage} ListUsersMessage
         */
        ListUsersMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.room.ListUsersMessage)
                return object;
            var message = new $root.room.ListUsersMessage();
            if (object.users) {
                if (!Array.isArray(object.users))
                    throw TypeError(".room.ListUsersMessage.users: array expected");
                message.users = [];
                for (var i = 0; i < object.users.length; ++i) {
                    if (typeof object.users[i] !== "object")
                        throw TypeError(".room.ListUsersMessage.users: object expected");
                    message.users[i] = $root.room.RoomUser.fromObject(object.users[i]);
                }
            }
            return message;
        };
        /**
         * Creates a plain object from a ListUsersMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof room.ListUsersMessage
         * @static
         * @param {room.ListUsersMessage} message ListUsersMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ListUsersMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.users = [];
            if (message.users && message.users.length) {
                object.users = [];
                for (var j = 0; j < message.users.length; ++j)
                    object.users[j] = $root.room.RoomUser.toObject(message.users[j], options);
            }
            return object;
        };
        /**
         * Converts this ListUsersMessage to JSON.
         * @function toJSON
         * @memberof room.ListUsersMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ListUsersMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return ListUsersMessage;
    })();
    room.TurnServer = (function () {
        /**
         * Properties of a TurnServer.
         * @memberof room
         * @interface ITurnServer
         * @property {Array.<string>|null} [urls] TurnServer urls
         * @property {string|null} [username] TurnServer username
         * @property {string|null} [credential] TurnServer credential
         */
        /**
         * Constructs a new TurnServer.
         * @memberof room
         * @classdesc Represents a TurnServer.
         * @implements ITurnServer
         * @constructor
         * @param {room.ITurnServer=} [properties] Properties to set
         */
        function TurnServer(properties) {
            this.urls = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * TurnServer urls.
         * @member {Array.<string>} urls
         * @memberof room.TurnServer
         * @instance
         */
        TurnServer.prototype.urls = $util.emptyArray;
        /**
         * TurnServer username.
         * @member {string} username
         * @memberof room.TurnServer
         * @instance
         */
        TurnServer.prototype.username = "";
        /**
         * TurnServer credential.
         * @member {string} credential
         * @memberof room.TurnServer
         * @instance
         */
        TurnServer.prototype.credential = "";
        /**
         * Creates a new TurnServer instance using the specified properties.
         * @function create
         * @memberof room.TurnServer
         * @static
         * @param {room.ITurnServer=} [properties] Properties to set
         * @returns {room.TurnServer} TurnServer instance
         */
        TurnServer.create = function create(properties) {
            return new TurnServer(properties);
        };
        /**
         * Encodes the specified TurnServer message. Does not implicitly {@link room.TurnServer.verify|verify} messages.
         * @function encode
         * @memberof room.TurnServer
         * @static
         * @param {room.ITurnServer} message TurnServer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TurnServer.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.urls != null && message.urls.length)
                for (var i = 0; i < message.urls.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.urls[i]);
            if (message.username != null && message.hasOwnProperty("username"))
                writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.username);
            if (message.credential != null && message.hasOwnProperty("credential"))
                writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.credential);
            return writer;
        };
        /**
         * Encodes the specified TurnServer message, length delimited. Does not implicitly {@link room.TurnServer.verify|verify} messages.
         * @function encodeDelimited
         * @memberof room.TurnServer
         * @static
         * @param {room.ITurnServer} message TurnServer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TurnServer.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes a TurnServer message from the specified reader or buffer.
         * @function decode
         * @memberof room.TurnServer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {room.TurnServer} TurnServer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TurnServer.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.room.TurnServer();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        if (!(message.urls && message.urls.length))
                            message.urls = [];
                        message.urls.push(reader.string());
                        break;
                    case 2:
                        message.username = reader.string();
                        break;
                    case 3:
                        message.credential = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes a TurnServer message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof room.TurnServer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {room.TurnServer} TurnServer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TurnServer.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies a TurnServer message.
         * @function verify
         * @memberof room.TurnServer
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TurnServer.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.urls != null && message.hasOwnProperty("urls")) {
                if (!Array.isArray(message.urls))
                    return "urls: array expected";
                for (var i = 0; i < message.urls.length; ++i)
                    if (!$util.isString(message.urls[i]))
                        return "urls: string[] expected";
            }
            if (message.username != null && message.hasOwnProperty("username"))
                if (!$util.isString(message.username))
                    return "username: string expected";
            if (message.credential != null && message.hasOwnProperty("credential"))
                if (!$util.isString(message.credential))
                    return "credential: string expected";
            return null;
        };
        /**
         * Creates a TurnServer message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof room.TurnServer
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {room.TurnServer} TurnServer
         */
        TurnServer.fromObject = function fromObject(object) {
            if (object instanceof $root.room.TurnServer)
                return object;
            var message = new $root.room.TurnServer();
            if (object.urls) {
                if (!Array.isArray(object.urls))
                    throw TypeError(".room.TurnServer.urls: array expected");
                message.urls = [];
                for (var i = 0; i < object.urls.length; ++i)
                    message.urls[i] = String(object.urls[i]);
            }
            if (object.username != null)
                message.username = String(object.username);
            if (object.credential != null)
                message.credential = String(object.credential);
            return message;
        };
        /**
         * Creates a plain object from a TurnServer message. Also converts values to other types if specified.
         * @function toObject
         * @memberof room.TurnServer
         * @static
         * @param {room.TurnServer} message TurnServer
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TurnServer.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.urls = [];
            if (options.defaults) {
                object.username = "";
                object.credential = "";
            }
            if (message.urls && message.urls.length) {
                object.urls = [];
                for (var j = 0; j < message.urls.length; ++j)
                    object.urls[j] = message.urls[j];
            }
            if (message.username != null && message.hasOwnProperty("username"))
                object.username = message.username;
            if (message.credential != null && message.hasOwnProperty("credential"))
                object.credential = message.credential;
            return object;
        };
        /**
         * Converts this TurnServer to JSON.
         * @function toJSON
         * @memberof room.TurnServer
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TurnServer.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return TurnServer;
    })();
    room.MediaOptionMessage = (function () {
        /**
         * Properties of a MediaOptionMessage.
         * @memberof room
         * @interface IMediaOptionMessage
         * @property {boolean|null} [publish] MediaOptionMessage publish
         * @property {number|null} [roomId] MediaOptionMessage roomId
         * @property {number|null} [userId] MediaOptionMessage userId
         * @property {Array.<room.ITurnServer>|null} [turnServers] MediaOptionMessage turnServers
         * @property {boolean|null} [video] MediaOptionMessage video
         * @property {boolean|null} [audio] MediaOptionMessage audio
         */
        /**
         * Constructs a new MediaOptionMessage.
         * @memberof room
         * @classdesc Represents a MediaOptionMessage.
         * @implements IMediaOptionMessage
         * @constructor
         * @param {room.IMediaOptionMessage=} [properties] Properties to set
         */
        function MediaOptionMessage(properties) {
            this.turnServers = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * MediaOptionMessage publish.
         * @member {boolean} publish
         * @memberof room.MediaOptionMessage
         * @instance
         */
        MediaOptionMessage.prototype.publish = false;
        /**
         * MediaOptionMessage roomId.
         * @member {number} roomId
         * @memberof room.MediaOptionMessage
         * @instance
         */
        MediaOptionMessage.prototype.roomId = 0;
        /**
         * MediaOptionMessage userId.
         * @member {number} userId
         * @memberof room.MediaOptionMessage
         * @instance
         */
        MediaOptionMessage.prototype.userId = 0;
        /**
         * MediaOptionMessage turnServers.
         * @member {Array.<room.ITurnServer>} turnServers
         * @memberof room.MediaOptionMessage
         * @instance
         */
        MediaOptionMessage.prototype.turnServers = $util.emptyArray;
        /**
         * MediaOptionMessage video.
         * @member {boolean} video
         * @memberof room.MediaOptionMessage
         * @instance
         */
        MediaOptionMessage.prototype.video = false;
        /**
         * MediaOptionMessage audio.
         * @member {boolean} audio
         * @memberof room.MediaOptionMessage
         * @instance
         */
        MediaOptionMessage.prototype.audio = false;
        /**
         * Creates a new MediaOptionMessage instance using the specified properties.
         * @function create
         * @memberof room.MediaOptionMessage
         * @static
         * @param {room.IMediaOptionMessage=} [properties] Properties to set
         * @returns {room.MediaOptionMessage} MediaOptionMessage instance
         */
        MediaOptionMessage.create = function create(properties) {
            return new MediaOptionMessage(properties);
        };
        /**
         * Encodes the specified MediaOptionMessage message. Does not implicitly {@link room.MediaOptionMessage.verify|verify} messages.
         * @function encode
         * @memberof room.MediaOptionMessage
         * @static
         * @param {room.IMediaOptionMessage} message MediaOptionMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MediaOptionMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.publish != null && message.hasOwnProperty("publish"))
                writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.publish);
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.roomId);
            if (message.userId != null && message.hasOwnProperty("userId"))
                writer.uint32(/* id 3, wireType 0 =*/ 24).uint32(message.userId);
            if (message.turnServers != null && message.turnServers.length)
                for (var i = 0; i < message.turnServers.length; ++i)
                    $root.room.TurnServer.encode(message.turnServers[i], writer.uint32(/* id 4, wireType 2 =*/ 34).fork()).ldelim();
            if (message.video != null && message.hasOwnProperty("video"))
                writer.uint32(/* id 5, wireType 0 =*/ 40).bool(message.video);
            if (message.audio != null && message.hasOwnProperty("audio"))
                writer.uint32(/* id 6, wireType 0 =*/ 48).bool(message.audio);
            return writer;
        };
        /**
         * Encodes the specified MediaOptionMessage message, length delimited. Does not implicitly {@link room.MediaOptionMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof room.MediaOptionMessage
         * @static
         * @param {room.IMediaOptionMessage} message MediaOptionMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MediaOptionMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes a MediaOptionMessage message from the specified reader or buffer.
         * @function decode
         * @memberof room.MediaOptionMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {room.MediaOptionMessage} MediaOptionMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MediaOptionMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.room.MediaOptionMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.publish = reader.bool();
                        break;
                    case 2:
                        message.roomId = reader.uint32();
                        break;
                    case 3:
                        message.userId = reader.uint32();
                        break;
                    case 4:
                        if (!(message.turnServers && message.turnServers.length))
                            message.turnServers = [];
                        message.turnServers.push($root.room.TurnServer.decode(reader, reader.uint32()));
                        break;
                    case 5:
                        message.video = reader.bool();
                        break;
                    case 6:
                        message.audio = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes a MediaOptionMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof room.MediaOptionMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {room.MediaOptionMessage} MediaOptionMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MediaOptionMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies a MediaOptionMessage message.
         * @function verify
         * @memberof room.MediaOptionMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MediaOptionMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.publish != null && message.hasOwnProperty("publish"))
                if (typeof message.publish !== "boolean")
                    return "publish: boolean expected";
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                if (!$util.isInteger(message.roomId))
                    return "roomId: integer expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isInteger(message.userId))
                    return "userId: integer expected";
            if (message.turnServers != null && message.hasOwnProperty("turnServers")) {
                if (!Array.isArray(message.turnServers))
                    return "turnServers: array expected";
                for (var i = 0; i < message.turnServers.length; ++i) {
                    var error = $root.room.TurnServer.verify(message.turnServers[i]);
                    if (error)
                        return "turnServers." + error;
                }
            }
            if (message.video != null && message.hasOwnProperty("video"))
                if (typeof message.video !== "boolean")
                    return "video: boolean expected";
            if (message.audio != null && message.hasOwnProperty("audio"))
                if (typeof message.audio !== "boolean")
                    return "audio: boolean expected";
            return null;
        };
        /**
         * Creates a MediaOptionMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof room.MediaOptionMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {room.MediaOptionMessage} MediaOptionMessage
         */
        MediaOptionMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.room.MediaOptionMessage)
                return object;
            var message = new $root.room.MediaOptionMessage();
            if (object.publish != null)
                message.publish = Boolean(object.publish);
            if (object.roomId != null)
                message.roomId = object.roomId >>> 0;
            if (object.userId != null)
                message.userId = object.userId >>> 0;
            if (object.turnServers) {
                if (!Array.isArray(object.turnServers))
                    throw TypeError(".room.MediaOptionMessage.turnServers: array expected");
                message.turnServers = [];
                for (var i = 0; i < object.turnServers.length; ++i) {
                    if (typeof object.turnServers[i] !== "object")
                        throw TypeError(".room.MediaOptionMessage.turnServers: object expected");
                    message.turnServers[i] = $root.room.TurnServer.fromObject(object.turnServers[i]);
                }
            }
            if (object.video != null)
                message.video = Boolean(object.video);
            if (object.audio != null)
                message.audio = Boolean(object.audio);
            return message;
        };
        /**
         * Creates a plain object from a MediaOptionMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof room.MediaOptionMessage
         * @static
         * @param {room.MediaOptionMessage} message MediaOptionMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MediaOptionMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.turnServers = [];
            if (options.defaults) {
                object.publish = false;
                object.roomId = 0;
                object.userId = 0;
                object.video = false;
                object.audio = false;
            }
            if (message.publish != null && message.hasOwnProperty("publish"))
                object.publish = message.publish;
            if (message.roomId != null && message.hasOwnProperty("roomId"))
                object.roomId = message.roomId;
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.turnServers && message.turnServers.length) {
                object.turnServers = [];
                for (var j = 0; j < message.turnServers.length; ++j)
                    object.turnServers[j] = $root.room.TurnServer.toObject(message.turnServers[j], options);
            }
            if (message.video != null && message.hasOwnProperty("video"))
                object.video = message.video;
            if (message.audio != null && message.hasOwnProperty("audio"))
                object.audio = message.audio;
            return object;
        };
        /**
         * Converts this MediaOptionMessage to JSON.
         * @function toJSON
         * @memberof room.MediaOptionMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MediaOptionMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return MediaOptionMessage;
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
    /**
     * StrokeType enum.
     * @name whiteboard.StrokeType
     * @enum {string}
     * @property {number} Draw=1 Draw value
     * @property {number} Erase=2 Erase value
     */
    whiteboard.StrokeType = (function () {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[1] = "Draw"] = 1;
        values[valuesById[2] = "Erase"] = 2;
        return values;
    })();
    /**
     * AlignType enum.
     * @name whiteboard.AlignType
     * @enum {string}
     * @property {number} Top=1 Top value
     * @property {number} Bottom=2 Bottom value
     * @property {number} Left=3 Left value
     * @property {number} Right=4 Right value
     */
    whiteboard.AlignType = (function () {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[1] = "Top"] = 1;
        values[valuesById[2] = "Bottom"] = 2;
        values[valuesById[3] = "Left"] = 3;
        values[valuesById[4] = "Right"] = 4;
        return values;
    })();
    /**
     * ArrangeType enum.
     * @name whiteboard.ArrangeType
     * @enum {string}
     * @property {number} Horizontal=1 Horizontal value
     * @property {number} Vertical=2 Vertical value
     */
    whiteboard.ArrangeType = (function () {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[1] = "Horizontal"] = 1;
        values[valuesById[2] = "Vertical"] = 2;
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
    whiteboard.StrokeMessage = (function () {
        /**
         * Properties of a StrokeMessage.
         * @memberof whiteboard
         * @interface IStrokeMessage
         * @property {string|null} [entityName] StrokeMessage entityName
         * @property {whiteboard.StrokeType|null} [type] StrokeMessage type
         * @property {Array.<whiteboard.IPoint>|null} [points] StrokeMessage points
         * @property {number|null} [lineWidth] StrokeMessage lineWidth
         * @property {string|null} [color] StrokeMessage color
         * @property {number|null} [size] StrokeMessage size
         */
        /**
         * Constructs a new StrokeMessage.
         * @memberof whiteboard
         * @classdesc Represents a StrokeMessage.
         * @implements IStrokeMessage
         * @constructor
         * @param {whiteboard.IStrokeMessage=} [properties] Properties to set
         */
        function StrokeMessage(properties) {
            this.points = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * StrokeMessage entityName.
         * @member {string} entityName
         * @memberof whiteboard.StrokeMessage
         * @instance
         */
        StrokeMessage.prototype.entityName = "";
        /**
         * StrokeMessage type.
         * @member {whiteboard.StrokeType} type
         * @memberof whiteboard.StrokeMessage
         * @instance
         */
        StrokeMessage.prototype.type = 1;
        /**
         * StrokeMessage points.
         * @member {Array.<whiteboard.IPoint>} points
         * @memberof whiteboard.StrokeMessage
         * @instance
         */
        StrokeMessage.prototype.points = $util.emptyArray;
        /**
         * StrokeMessage lineWidth.
         * @member {number} lineWidth
         * @memberof whiteboard.StrokeMessage
         * @instance
         */
        StrokeMessage.prototype.lineWidth = 0;
        /**
         * StrokeMessage color.
         * @member {string} color
         * @memberof whiteboard.StrokeMessage
         * @instance
         */
        StrokeMessage.prototype.color = "";
        /**
         * StrokeMessage size.
         * @member {number} size
         * @memberof whiteboard.StrokeMessage
         * @instance
         */
        StrokeMessage.prototype.size = 0;
        /**
         * Creates a new StrokeMessage instance using the specified properties.
         * @function create
         * @memberof whiteboard.StrokeMessage
         * @static
         * @param {whiteboard.IStrokeMessage=} [properties] Properties to set
         * @returns {whiteboard.StrokeMessage} StrokeMessage instance
         */
        StrokeMessage.create = function create(properties) {
            return new StrokeMessage(properties);
        };
        /**
         * Encodes the specified StrokeMessage message. Does not implicitly {@link whiteboard.StrokeMessage.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.StrokeMessage
         * @static
         * @param {whiteboard.IStrokeMessage} message StrokeMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StrokeMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.entityName != null && message.hasOwnProperty("entityName"))
                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.entityName);
            if (message.type != null && message.hasOwnProperty("type"))
                writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.type);
            if (message.points != null && message.points.length)
                for (var i = 0; i < message.points.length; ++i)
                    $root.whiteboard.Point.encode(message.points[i], writer.uint32(/* id 3, wireType 2 =*/ 26).fork()).ldelim();
            if (message.lineWidth != null && message.hasOwnProperty("lineWidth"))
                writer.uint32(/* id 4, wireType 0 =*/ 32).uint32(message.lineWidth);
            if (message.color != null && message.hasOwnProperty("color"))
                writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.color);
            if (message.size != null && message.hasOwnProperty("size"))
                writer.uint32(/* id 6, wireType 0 =*/ 48).uint32(message.size);
            return writer;
        };
        /**
         * Encodes the specified StrokeMessage message, length delimited. Does not implicitly {@link whiteboard.StrokeMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.StrokeMessage
         * @static
         * @param {whiteboard.IStrokeMessage} message StrokeMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StrokeMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes a StrokeMessage message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.StrokeMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.StrokeMessage} StrokeMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StrokeMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.StrokeMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.entityName = reader.string();
                        break;
                    case 2:
                        message.type = reader.int32();
                        break;
                    case 3:
                        if (!(message.points && message.points.length))
                            message.points = [];
                        message.points.push($root.whiteboard.Point.decode(reader, reader.uint32()));
                        break;
                    case 4:
                        message.lineWidth = reader.uint32();
                        break;
                    case 5:
                        message.color = reader.string();
                        break;
                    case 6:
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
         * Decodes a StrokeMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.StrokeMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.StrokeMessage} StrokeMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StrokeMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies a StrokeMessage message.
         * @function verify
         * @memberof whiteboard.StrokeMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StrokeMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.entityName != null && message.hasOwnProperty("entityName"))
                if (!$util.isString(message.entityName))
                    return "entityName: string expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 1:
                    case 2:
                        break;
                }
            if (message.points != null && message.hasOwnProperty("points")) {
                if (!Array.isArray(message.points))
                    return "points: array expected";
                for (var i = 0; i < message.points.length; ++i) {
                    var error = $root.whiteboard.Point.verify(message.points[i]);
                    if (error)
                        return "points." + error;
                }
            }
            if (message.lineWidth != null && message.hasOwnProperty("lineWidth"))
                if (!$util.isInteger(message.lineWidth))
                    return "lineWidth: integer expected";
            if (message.color != null && message.hasOwnProperty("color"))
                if (!$util.isString(message.color))
                    return "color: string expected";
            if (message.size != null && message.hasOwnProperty("size"))
                if (!$util.isInteger(message.size))
                    return "size: integer expected";
            return null;
        };
        /**
         * Creates a StrokeMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.StrokeMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.StrokeMessage} StrokeMessage
         */
        StrokeMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.StrokeMessage)
                return object;
            var message = new $root.whiteboard.StrokeMessage();
            if (object.entityName != null)
                message.entityName = String(object.entityName);
            switch (object.type) {
                case "Draw":
                case 1:
                    message.type = 1;
                    break;
                case "Erase":
                case 2:
                    message.type = 2;
                    break;
            }
            if (object.points) {
                if (!Array.isArray(object.points))
                    throw TypeError(".whiteboard.StrokeMessage.points: array expected");
                message.points = [];
                for (var i = 0; i < object.points.length; ++i) {
                    if (typeof object.points[i] !== "object")
                        throw TypeError(".whiteboard.StrokeMessage.points: object expected");
                    message.points[i] = $root.whiteboard.Point.fromObject(object.points[i]);
                }
            }
            if (object.lineWidth != null)
                message.lineWidth = object.lineWidth >>> 0;
            if (object.color != null)
                message.color = String(object.color);
            if (object.size != null)
                message.size = object.size >>> 0;
            return message;
        };
        /**
         * Creates a plain object from a StrokeMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.StrokeMessage
         * @static
         * @param {whiteboard.StrokeMessage} message StrokeMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StrokeMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.points = [];
            if (options.defaults) {
                object.entityName = "";
                object.type = options.enums === String ? "Draw" : 1;
                object.lineWidth = 0;
                object.color = "";
                object.size = 0;
            }
            if (message.entityName != null && message.hasOwnProperty("entityName"))
                object.entityName = message.entityName;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.whiteboard.StrokeType[message.type] : message.type;
            if (message.points && message.points.length) {
                object.points = [];
                for (var j = 0; j < message.points.length; ++j)
                    object.points[j] = $root.whiteboard.Point.toObject(message.points[j], options);
            }
            if (message.lineWidth != null && message.hasOwnProperty("lineWidth"))
                object.lineWidth = message.lineWidth;
            if (message.color != null && message.hasOwnProperty("color"))
                object.color = message.color;
            if (message.size != null && message.hasOwnProperty("size"))
                object.size = message.size;
            return object;
        };
        /**
         * Converts this StrokeMessage to JSON.
         * @function toJSON
         * @memberof whiteboard.StrokeMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StrokeMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return StrokeMessage;
    })();
    whiteboard.DrawMessage = (function () {
        /**
         * Properties of a DrawMessage.
         * @memberof whiteboard
         * @interface IDrawMessage
         * @property {string|null} [entityName] DrawMessage entityName
         * @property {number|null} [lineWidth] DrawMessage lineWidth
         * @property {string|null} [color] DrawMessage color
         * @property {boolean|null} [newStroke] DrawMessage newStroke
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
         * DrawMessage newStroke.
         * @member {boolean} newStroke
         * @memberof whiteboard.DrawMessage
         * @instance
         */
        DrawMessage.prototype.newStroke = false;
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
            if (message.newStroke != null && message.hasOwnProperty("newStroke"))
                writer.uint32(/* id 4, wireType 0 =*/ 32).bool(message.newStroke);
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
                        message.newStroke = reader.bool();
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
            if (message.newStroke != null && message.hasOwnProperty("newStroke"))
                if (typeof message.newStroke !== "boolean")
                    return "newStroke: boolean expected";
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
            if (object.newStroke != null)
                message.newStroke = Boolean(object.newStroke);
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
                object.newStroke = false;
            }
            if (message.entityName != null && message.hasOwnProperty("entityName"))
                object.entityName = message.entityName;
            if (message.lineWidth != null && message.hasOwnProperty("lineWidth"))
                object.lineWidth = message.lineWidth;
            if (message.color != null && message.hasOwnProperty("color"))
                object.color = message.color;
            if (message.newStroke != null && message.hasOwnProperty("newStroke"))
                object.newStroke = message.newStroke;
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
         * @property {string|null} [entityName] EraseMessage entityName
         * @property {number|null} [size] EraseMessage size
         * @property {boolean|null} [newErase] EraseMessage newErase
         * @property {Array.<whiteboard.IPoint>|null} [points] EraseMessage points
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
            this.points = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * EraseMessage entityName.
         * @member {string} entityName
         * @memberof whiteboard.EraseMessage
         * @instance
         */
        EraseMessage.prototype.entityName = "";
        /**
         * EraseMessage size.
         * @member {number} size
         * @memberof whiteboard.EraseMessage
         * @instance
         */
        EraseMessage.prototype.size = 0;
        /**
         * EraseMessage newErase.
         * @member {boolean} newErase
         * @memberof whiteboard.EraseMessage
         * @instance
         */
        EraseMessage.prototype.newErase = false;
        /**
         * EraseMessage points.
         * @member {Array.<whiteboard.IPoint>} points
         * @memberof whiteboard.EraseMessage
         * @instance
         */
        EraseMessage.prototype.points = $util.emptyArray;
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
            if (message.entityName != null && message.hasOwnProperty("entityName"))
                writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.entityName);
            if (message.size != null && message.hasOwnProperty("size"))
                writer.uint32(/* id 2, wireType 0 =*/ 16).uint32(message.size);
            if (message.newErase != null && message.hasOwnProperty("newErase"))
                writer.uint32(/* id 3, wireType 0 =*/ 24).bool(message.newErase);
            if (message.points != null && message.points.length)
                for (var i = 0; i < message.points.length; ++i)
                    $root.whiteboard.Point.encode(message.points[i], writer.uint32(/* id 4, wireType 2 =*/ 34).fork()).ldelim();
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
                        message.entityName = reader.string();
                        break;
                    case 2:
                        message.size = reader.uint32();
                        break;
                    case 3:
                        message.newErase = reader.bool();
                        break;
                    case 4:
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
            if (message.entityName != null && message.hasOwnProperty("entityName"))
                if (!$util.isString(message.entityName))
                    return "entityName: string expected";
            if (message.size != null && message.hasOwnProperty("size"))
                if (!$util.isInteger(message.size))
                    return "size: integer expected";
            if (message.newErase != null && message.hasOwnProperty("newErase"))
                if (typeof message.newErase !== "boolean")
                    return "newErase: boolean expected";
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
            if (object.entityName != null)
                message.entityName = String(object.entityName);
            if (object.size != null)
                message.size = object.size >>> 0;
            if (object.newErase != null)
                message.newErase = Boolean(object.newErase);
            if (object.points) {
                if (!Array.isArray(object.points))
                    throw TypeError(".whiteboard.EraseMessage.points: array expected");
                message.points = [];
                for (var i = 0; i < object.points.length; ++i) {
                    if (typeof object.points[i] !== "object")
                        throw TypeError(".whiteboard.EraseMessage.points: object expected");
                    message.points[i] = $root.whiteboard.Point.fromObject(object.points[i]);
                }
            }
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
            if (options.arrays || options.defaults)
                object.points = [];
            if (options.defaults) {
                object.entityName = "";
                object.size = 0;
                object.newErase = false;
            }
            if (message.entityName != null && message.hasOwnProperty("entityName"))
                object.entityName = message.entityName;
            if (message.size != null && message.hasOwnProperty("size"))
                object.size = message.size;
            if (message.newErase != null && message.hasOwnProperty("newErase"))
                object.newErase = message.newErase;
            if (message.points && message.points.length) {
                object.points = [];
                for (var j = 0; j < message.points.length; ++j)
                    object.points[j] = $root.whiteboard.Point.toObject(message.points[j], options);
            }
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
    whiteboard.AlignObjectMessage = (function () {
        /**
         * Properties of an AlignObjectMessage.
         * @memberof whiteboard
         * @interface IAlignObjectMessage
         * @property {Array.<string>|null} [names] AlignObjectMessage names
         * @property {whiteboard.AlignType|null} [type] AlignObjectMessage type
         */
        /**
         * Constructs a new AlignObjectMessage.
         * @memberof whiteboard
         * @classdesc Represents an AlignObjectMessage.
         * @implements IAlignObjectMessage
         * @constructor
         * @param {whiteboard.IAlignObjectMessage=} [properties] Properties to set
         */
        function AlignObjectMessage(properties) {
            this.names = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * AlignObjectMessage names.
         * @member {Array.<string>} names
         * @memberof whiteboard.AlignObjectMessage
         * @instance
         */
        AlignObjectMessage.prototype.names = $util.emptyArray;
        /**
         * AlignObjectMessage type.
         * @member {whiteboard.AlignType} type
         * @memberof whiteboard.AlignObjectMessage
         * @instance
         */
        AlignObjectMessage.prototype.type = 1;
        /**
         * Creates a new AlignObjectMessage instance using the specified properties.
         * @function create
         * @memberof whiteboard.AlignObjectMessage
         * @static
         * @param {whiteboard.IAlignObjectMessage=} [properties] Properties to set
         * @returns {whiteboard.AlignObjectMessage} AlignObjectMessage instance
         */
        AlignObjectMessage.create = function create(properties) {
            return new AlignObjectMessage(properties);
        };
        /**
         * Encodes the specified AlignObjectMessage message. Does not implicitly {@link whiteboard.AlignObjectMessage.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.AlignObjectMessage
         * @static
         * @param {whiteboard.IAlignObjectMessage} message AlignObjectMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AlignObjectMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.names != null && message.names.length)
                for (var i = 0; i < message.names.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.names[i]);
            if (message.type != null && message.hasOwnProperty("type"))
                writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.type);
            return writer;
        };
        /**
         * Encodes the specified AlignObjectMessage message, length delimited. Does not implicitly {@link whiteboard.AlignObjectMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.AlignObjectMessage
         * @static
         * @param {whiteboard.IAlignObjectMessage} message AlignObjectMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AlignObjectMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes an AlignObjectMessage message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.AlignObjectMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.AlignObjectMessage} AlignObjectMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AlignObjectMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.AlignObjectMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        if (!(message.names && message.names.length))
                            message.names = [];
                        message.names.push(reader.string());
                        break;
                    case 2:
                        message.type = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes an AlignObjectMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.AlignObjectMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.AlignObjectMessage} AlignObjectMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AlignObjectMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies an AlignObjectMessage message.
         * @function verify
         * @memberof whiteboard.AlignObjectMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AlignObjectMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.names != null && message.hasOwnProperty("names")) {
                if (!Array.isArray(message.names))
                    return "names: array expected";
                for (var i = 0; i < message.names.length; ++i)
                    if (!$util.isString(message.names[i]))
                        return "names: string[] expected";
            }
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        break;
                }
            return null;
        };
        /**
         * Creates an AlignObjectMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.AlignObjectMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.AlignObjectMessage} AlignObjectMessage
         */
        AlignObjectMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.AlignObjectMessage)
                return object;
            var message = new $root.whiteboard.AlignObjectMessage();
            if (object.names) {
                if (!Array.isArray(object.names))
                    throw TypeError(".whiteboard.AlignObjectMessage.names: array expected");
                message.names = [];
                for (var i = 0; i < object.names.length; ++i)
                    message.names[i] = String(object.names[i]);
            }
            switch (object.type) {
                case "Top":
                case 1:
                    message.type = 1;
                    break;
                case "Bottom":
                case 2:
                    message.type = 2;
                    break;
                case "Left":
                case 3:
                    message.type = 3;
                    break;
                case "Right":
                case 4:
                    message.type = 4;
                    break;
            }
            return message;
        };
        /**
         * Creates a plain object from an AlignObjectMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.AlignObjectMessage
         * @static
         * @param {whiteboard.AlignObjectMessage} message AlignObjectMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AlignObjectMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.names = [];
            if (options.defaults)
                object.type = options.enums === String ? "Top" : 1;
            if (message.names && message.names.length) {
                object.names = [];
                for (var j = 0; j < message.names.length; ++j)
                    object.names[j] = message.names[j];
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.whiteboard.AlignType[message.type] : message.type;
            return object;
        };
        /**
         * Converts this AlignObjectMessage to JSON.
         * @function toJSON
         * @memberof whiteboard.AlignObjectMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AlignObjectMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return AlignObjectMessage;
    })();
    whiteboard.ArrangeObjectMessage = (function () {
        /**
         * Properties of an ArrangeObjectMessage.
         * @memberof whiteboard
         * @interface IArrangeObjectMessage
         * @property {Array.<string>|null} [names] ArrangeObjectMessage names
         * @property {whiteboard.ArrangeType|null} [type] ArrangeObjectMessage type
         */
        /**
         * Constructs a new ArrangeObjectMessage.
         * @memberof whiteboard
         * @classdesc Represents an ArrangeObjectMessage.
         * @implements IArrangeObjectMessage
         * @constructor
         * @param {whiteboard.IArrangeObjectMessage=} [properties] Properties to set
         */
        function ArrangeObjectMessage(properties) {
            this.names = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
        /**
         * ArrangeObjectMessage names.
         * @member {Array.<string>} names
         * @memberof whiteboard.ArrangeObjectMessage
         * @instance
         */
        ArrangeObjectMessage.prototype.names = $util.emptyArray;
        /**
         * ArrangeObjectMessage type.
         * @member {whiteboard.ArrangeType} type
         * @memberof whiteboard.ArrangeObjectMessage
         * @instance
         */
        ArrangeObjectMessage.prototype.type = 1;
        /**
         * Creates a new ArrangeObjectMessage instance using the specified properties.
         * @function create
         * @memberof whiteboard.ArrangeObjectMessage
         * @static
         * @param {whiteboard.IArrangeObjectMessage=} [properties] Properties to set
         * @returns {whiteboard.ArrangeObjectMessage} ArrangeObjectMessage instance
         */
        ArrangeObjectMessage.create = function create(properties) {
            return new ArrangeObjectMessage(properties);
        };
        /**
         * Encodes the specified ArrangeObjectMessage message. Does not implicitly {@link whiteboard.ArrangeObjectMessage.verify|verify} messages.
         * @function encode
         * @memberof whiteboard.ArrangeObjectMessage
         * @static
         * @param {whiteboard.IArrangeObjectMessage} message ArrangeObjectMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ArrangeObjectMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.names != null && message.names.length)
                for (var i = 0; i < message.names.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.names[i]);
            if (message.type != null && message.hasOwnProperty("type"))
                writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.type);
            return writer;
        };
        /**
         * Encodes the specified ArrangeObjectMessage message, length delimited. Does not implicitly {@link whiteboard.ArrangeObjectMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof whiteboard.ArrangeObjectMessage
         * @static
         * @param {whiteboard.IArrangeObjectMessage} message ArrangeObjectMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ArrangeObjectMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
        /**
         * Decodes an ArrangeObjectMessage message from the specified reader or buffer.
         * @function decode
         * @memberof whiteboard.ArrangeObjectMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {whiteboard.ArrangeObjectMessage} ArrangeObjectMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ArrangeObjectMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.whiteboard.ArrangeObjectMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        if (!(message.names && message.names.length))
                            message.names = [];
                        message.names.push(reader.string());
                        break;
                    case 2:
                        message.type = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };
        /**
         * Decodes an ArrangeObjectMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof whiteboard.ArrangeObjectMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {whiteboard.ArrangeObjectMessage} ArrangeObjectMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ArrangeObjectMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
        /**
         * Verifies an ArrangeObjectMessage message.
         * @function verify
         * @memberof whiteboard.ArrangeObjectMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ArrangeObjectMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.names != null && message.hasOwnProperty("names")) {
                if (!Array.isArray(message.names))
                    return "names: array expected";
                for (var i = 0; i < message.names.length; ++i)
                    if (!$util.isString(message.names[i]))
                        return "names: string[] expected";
            }
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 1:
                    case 2:
                        break;
                }
            return null;
        };
        /**
         * Creates an ArrangeObjectMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof whiteboard.ArrangeObjectMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {whiteboard.ArrangeObjectMessage} ArrangeObjectMessage
         */
        ArrangeObjectMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.whiteboard.ArrangeObjectMessage)
                return object;
            var message = new $root.whiteboard.ArrangeObjectMessage();
            if (object.names) {
                if (!Array.isArray(object.names))
                    throw TypeError(".whiteboard.ArrangeObjectMessage.names: array expected");
                message.names = [];
                for (var i = 0; i < object.names.length; ++i)
                    message.names[i] = String(object.names[i]);
            }
            switch (object.type) {
                case "Horizontal":
                case 1:
                    message.type = 1;
                    break;
                case "Vertical":
                case 2:
                    message.type = 2;
                    break;
            }
            return message;
        };
        /**
         * Creates a plain object from an ArrangeObjectMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof whiteboard.ArrangeObjectMessage
         * @static
         * @param {whiteboard.ArrangeObjectMessage} message ArrangeObjectMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ArrangeObjectMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.names = [];
            if (options.defaults)
                object.type = options.enums === String ? "Horizontal" : 1;
            if (message.names && message.names.length) {
                object.names = [];
                for (var j = 0; j < message.names.length; ++j)
                    object.names[j] = message.names[j];
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.whiteboard.ArrangeType[message.type] : message.type;
            return object;
        };
        /**
         * Converts this ArrangeObjectMessage to JSON.
         * @function toJSON
         * @memberof whiteboard.ArrangeObjectMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ArrangeObjectMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return ArrangeObjectMessage;
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