import * as $protobuf from "protobufjs";
/** Namespace base. */
export namespace base {

    /** MessageID enum. */
    enum MessageID {
        Start = 10000
    }

    /** Properties of an UberMessage. */
    interface IUberMessage {

        /** UberMessage subMessages */
        subMessages?: (Uint8Array[]|null);
    }

    /** Represents an UberMessage. */
    class UberMessage implements IUberMessage {

        /**
         * Constructs a new UberMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: base.IUberMessage);

        /** UberMessage subMessages. */
        public subMessages: Uint8Array[];

        /**
         * Creates a new UberMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UberMessage instance
         */
        public static create(properties?: base.IUberMessage): base.UberMessage;

        /**
         * Encodes the specified UberMessage message. Does not implicitly {@link base.UberMessage.verify|verify} messages.
         * @param message UberMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: base.IUberMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UberMessage message, length delimited. Does not implicitly {@link base.UberMessage.verify|verify} messages.
         * @param message UberMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: base.IUberMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UberMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UberMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): base.UberMessage;

        /**
         * Decodes an UberMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UberMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): base.UberMessage;

        /**
         * Verifies an UberMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UberMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UberMessage
         */
        public static fromObject(object: { [k: string]: any }): base.UberMessage;

        /**
         * Creates a plain object from an UberMessage message. Also converts values to other types if specified.
         * @param message UberMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: base.UberMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UberMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

/** Namespace room. */
export namespace room {

    /** MessageID enum. */
    enum MessageID {
        Start = 20000
    }

    /** Properties of a JoinRoomMessage. */
    interface IJoinRoomMessage {

        /** JoinRoomMessage account */
        account?: (string|null);

        /** JoinRoomMessage userId */
        userId?: (number|null);
    }

    /** Represents a JoinRoomMessage. */
    class JoinRoomMessage implements IJoinRoomMessage {

        /**
         * Constructs a new JoinRoomMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: room.IJoinRoomMessage);

        /** JoinRoomMessage account. */
        public account: string;

        /** JoinRoomMessage userId. */
        public userId: number;

        /**
         * Creates a new JoinRoomMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns JoinRoomMessage instance
         */
        public static create(properties?: room.IJoinRoomMessage): room.JoinRoomMessage;

        /**
         * Encodes the specified JoinRoomMessage message. Does not implicitly {@link room.JoinRoomMessage.verify|verify} messages.
         * @param message JoinRoomMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: room.IJoinRoomMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified JoinRoomMessage message, length delimited. Does not implicitly {@link room.JoinRoomMessage.verify|verify} messages.
         * @param message JoinRoomMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: room.IJoinRoomMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a JoinRoomMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns JoinRoomMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): room.JoinRoomMessage;

        /**
         * Decodes a JoinRoomMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns JoinRoomMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): room.JoinRoomMessage;

        /**
         * Verifies a JoinRoomMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a JoinRoomMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns JoinRoomMessage
         */
        public static fromObject(object: { [k: string]: any }): room.JoinRoomMessage;

        /**
         * Creates a plain object from a JoinRoomMessage message. Also converts values to other types if specified.
         * @param message JoinRoomMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: room.JoinRoomMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this JoinRoomMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LeaveRoomMessage. */
    interface ILeaveRoomMessage {

        /** LeaveRoomMessage account */
        account?: (string|null);

        /** LeaveRoomMessage userId */
        userId?: (number|null);
    }

    /** Represents a LeaveRoomMessage. */
    class LeaveRoomMessage implements ILeaveRoomMessage {

        /**
         * Constructs a new LeaveRoomMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: room.ILeaveRoomMessage);

        /** LeaveRoomMessage account. */
        public account: string;

        /** LeaveRoomMessage userId. */
        public userId: number;

        /**
         * Creates a new LeaveRoomMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LeaveRoomMessage instance
         */
        public static create(properties?: room.ILeaveRoomMessage): room.LeaveRoomMessage;

        /**
         * Encodes the specified LeaveRoomMessage message. Does not implicitly {@link room.LeaveRoomMessage.verify|verify} messages.
         * @param message LeaveRoomMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: room.ILeaveRoomMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LeaveRoomMessage message, length delimited. Does not implicitly {@link room.LeaveRoomMessage.verify|verify} messages.
         * @param message LeaveRoomMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: room.ILeaveRoomMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LeaveRoomMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LeaveRoomMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): room.LeaveRoomMessage;

        /**
         * Decodes a LeaveRoomMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LeaveRoomMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): room.LeaveRoomMessage;

        /**
         * Verifies a LeaveRoomMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LeaveRoomMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LeaveRoomMessage
         */
        public static fromObject(object: { [k: string]: any }): room.LeaveRoomMessage;

        /**
         * Creates a plain object from a LeaveRoomMessage message. Also converts values to other types if specified.
         * @param message LeaveRoomMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: room.LeaveRoomMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LeaveRoomMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

/** Namespace whiteboard. */
export namespace whiteboard {

    /** MessageID enum. */
    enum MessageID {
        Start = 30000
    }

    /** Properties of a CommandMessage. */
    interface ICommandMessage {

        /** CommandMessage command */
        command?: (string|null);
    }

    /** Represents a CommandMessage. */
    class CommandMessage implements ICommandMessage {

        /**
         * Constructs a new CommandMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: whiteboard.ICommandMessage);

        /** CommandMessage command. */
        public command: string;

        /**
         * Creates a new CommandMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommandMessage instance
         */
        public static create(properties?: whiteboard.ICommandMessage): whiteboard.CommandMessage;

        /**
         * Encodes the specified CommandMessage message. Does not implicitly {@link whiteboard.CommandMessage.verify|verify} messages.
         * @param message CommandMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: whiteboard.ICommandMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommandMessage message, length delimited. Does not implicitly {@link whiteboard.CommandMessage.verify|verify} messages.
         * @param message CommandMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: whiteboard.ICommandMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommandMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommandMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): whiteboard.CommandMessage;

        /**
         * Decodes a CommandMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommandMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): whiteboard.CommandMessage;

        /**
         * Verifies a CommandMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommandMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommandMessage
         */
        public static fromObject(object: { [k: string]: any }): whiteboard.CommandMessage;

        /**
         * Creates a plain object from a CommandMessage message. Also converts values to other types if specified.
         * @param message CommandMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: whiteboard.CommandMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommandMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
