import * as $protobuf from "protobufjs";
/** Namespace room. */
export namespace room {

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

/** Namespace test. */
export namespace test {

    /** Properties of a TestMessage. */
    interface ITestMessage {

        /** TestMessage test_field */
        test_field?: (string|null);
    }

    /** Represents a TestMessage. */
    class TestMessage implements ITestMessage {

        /**
         * Constructs a new TestMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: test.ITestMessage);

        /** TestMessage test_field. */
        public test_field: string;

        /**
         * Creates a new TestMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TestMessage instance
         */
        public static create(properties?: test.ITestMessage): test.TestMessage;

        /**
         * Encodes the specified TestMessage message. Does not implicitly {@link test.TestMessage.verify|verify} messages.
         * @param message TestMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: test.ITestMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TestMessage message, length delimited. Does not implicitly {@link test.TestMessage.verify|verify} messages.
         * @param message TestMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: test.ITestMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TestMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TestMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): test.TestMessage;

        /**
         * Decodes a TestMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TestMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): test.TestMessage;

        /**
         * Verifies a TestMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TestMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TestMessage
         */
        public static fromObject(object: { [k: string]: any }): test.TestMessage;

        /**
         * Creates a plain object from a TestMessage message. Also converts values to other types if specified.
         * @param message TestMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: test.TestMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TestMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

/** Namespace test2. */
export namespace test2 {

    /** Properties of a Test2Message. */
    interface ITest2Message {

        /** Test2Message test2_field */
        test2_field?: (string|null);
    }

    /** Represents a Test2Message. */
    class Test2Message implements ITest2Message {

        /**
         * Constructs a new Test2Message.
         * @param [properties] Properties to set
         */
        constructor(properties?: test2.ITest2Message);

        /** Test2Message test2_field. */
        public test2_field: string;

        /**
         * Creates a new Test2Message instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Test2Message instance
         */
        public static create(properties?: test2.ITest2Message): test2.Test2Message;

        /**
         * Encodes the specified Test2Message message. Does not implicitly {@link test2.Test2Message.verify|verify} messages.
         * @param message Test2Message message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: test2.ITest2Message, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Test2Message message, length delimited. Does not implicitly {@link test2.Test2Message.verify|verify} messages.
         * @param message Test2Message message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: test2.ITest2Message, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Test2Message message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Test2Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): test2.Test2Message;

        /**
         * Decodes a Test2Message message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Test2Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): test2.Test2Message;

        /**
         * Verifies a Test2Message message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Test2Message message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Test2Message
         */
        public static fromObject(object: { [k: string]: any }): test2.Test2Message;

        /**
         * Creates a plain object from a Test2Message message. Also converts values to other types if specified.
         * @param message Test2Message
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: test2.Test2Message, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Test2Message to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

/** Namespace whiteboard. */
export namespace whiteboard {

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
