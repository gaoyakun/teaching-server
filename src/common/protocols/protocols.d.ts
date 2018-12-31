import * as $protobuf from "protobufjs";
/** Namespace test. */
export namespace test {

    /** Properties of a TestMessage. */
    interface ITestMessage {

        /** TestMessage testField */
        testField?: (string|null);
    }

    /** Represents a TestMessage. */
    class TestMessage implements ITestMessage {

        /**
         * Constructs a new TestMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: test.ITestMessage);

        /** TestMessage testField. */
        public testField: string;

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

        /** Test2Message test2Field */
        test2Field?: (string|null);
    }

    /** Represents a Test2Message. */
    class Test2Message implements ITest2Message {

        /**
         * Constructs a new Test2Message.
         * @param [properties] Properties to set
         */
        constructor(properties?: test2.ITest2Message);

        /** Test2Message test2Field. */
        public test2Field: string;

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
