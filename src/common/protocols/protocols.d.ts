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

    /** Properties of an EventMessage. */
    interface IEventMessage {

        /** EventMessage message */
        message?: (Uint8Array|null);

        /** EventMessage object */
        object?: (string|null);
    }

    /** Represents an EventMessage. */
    class EventMessage implements IEventMessage {

        /**
         * Constructs a new EventMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: whiteboard.IEventMessage);

        /** EventMessage message. */
        public message: Uint8Array;

        /** EventMessage object. */
        public object: string;

        /**
         * Creates a new EventMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EventMessage instance
         */
        public static create(properties?: whiteboard.IEventMessage): whiteboard.EventMessage;

        /**
         * Encodes the specified EventMessage message. Does not implicitly {@link whiteboard.EventMessage.verify|verify} messages.
         * @param message EventMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: whiteboard.IEventMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EventMessage message, length delimited. Does not implicitly {@link whiteboard.EventMessage.verify|verify} messages.
         * @param message EventMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: whiteboard.IEventMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EventMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EventMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): whiteboard.EventMessage;

        /**
         * Decodes an EventMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EventMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): whiteboard.EventMessage;

        /**
         * Verifies an EventMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EventMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EventMessage
         */
        public static fromObject(object: { [k: string]: any }): whiteboard.EventMessage;

        /**
         * Creates a plain object from an EventMessage message. Also converts values to other types if specified.
         * @param message EventMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: whiteboard.EventMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EventMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UseToolMessage. */
    interface IUseToolMessage {

        /** UseToolMessage name */
        name?: (string|null);

        /** UseToolMessage paramsJson */
        paramsJson?: (string|null);
    }

    /** Represents a UseToolMessage. */
    class UseToolMessage implements IUseToolMessage {

        /**
         * Constructs a new UseToolMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: whiteboard.IUseToolMessage);

        /** UseToolMessage name. */
        public name: string;

        /** UseToolMessage paramsJson. */
        public paramsJson: string;

        /**
         * Creates a new UseToolMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UseToolMessage instance
         */
        public static create(properties?: whiteboard.IUseToolMessage): whiteboard.UseToolMessage;

        /**
         * Encodes the specified UseToolMessage message. Does not implicitly {@link whiteboard.UseToolMessage.verify|verify} messages.
         * @param message UseToolMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: whiteboard.IUseToolMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UseToolMessage message, length delimited. Does not implicitly {@link whiteboard.UseToolMessage.verify|verify} messages.
         * @param message UseToolMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: whiteboard.IUseToolMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UseToolMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UseToolMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): whiteboard.UseToolMessage;

        /**
         * Decodes a UseToolMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UseToolMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): whiteboard.UseToolMessage;

        /**
         * Verifies a UseToolMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UseToolMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UseToolMessage
         */
        public static fromObject(object: { [k: string]: any }): whiteboard.UseToolMessage;

        /**
         * Creates a plain object from a UseToolMessage message. Also converts values to other types if specified.
         * @param message UseToolMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: whiteboard.UseToolMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UseToolMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CreateObjectMessage. */
    interface ICreateObjectMessage {

        /** CreateObjectMessage type */
        type?: (string|null);

        /** CreateObjectMessage x */
        x?: (number|null);

        /** CreateObjectMessage y */
        y?: (number|null);

        /** CreateObjectMessage paramsJson */
        paramsJson?: (string|null);
    }

    /** Represents a CreateObjectMessage. */
    class CreateObjectMessage implements ICreateObjectMessage {

        /**
         * Constructs a new CreateObjectMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: whiteboard.ICreateObjectMessage);

        /** CreateObjectMessage type. */
        public type: string;

        /** CreateObjectMessage x. */
        public x: number;

        /** CreateObjectMessage y. */
        public y: number;

        /** CreateObjectMessage paramsJson. */
        public paramsJson: string;

        /**
         * Creates a new CreateObjectMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CreateObjectMessage instance
         */
        public static create(properties?: whiteboard.ICreateObjectMessage): whiteboard.CreateObjectMessage;

        /**
         * Encodes the specified CreateObjectMessage message. Does not implicitly {@link whiteboard.CreateObjectMessage.verify|verify} messages.
         * @param message CreateObjectMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: whiteboard.ICreateObjectMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CreateObjectMessage message, length delimited. Does not implicitly {@link whiteboard.CreateObjectMessage.verify|verify} messages.
         * @param message CreateObjectMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: whiteboard.ICreateObjectMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CreateObjectMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CreateObjectMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): whiteboard.CreateObjectMessage;

        /**
         * Decodes a CreateObjectMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CreateObjectMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): whiteboard.CreateObjectMessage;

        /**
         * Verifies a CreateObjectMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CreateObjectMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CreateObjectMessage
         */
        public static fromObject(object: { [k: string]: any }): whiteboard.CreateObjectMessage;

        /**
         * Creates a plain object from a CreateObjectMessage message. Also converts values to other types if specified.
         * @param message CreateObjectMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: whiteboard.CreateObjectMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CreateObjectMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DeleteObjectMessage. */
    interface IDeleteObjectMessage {

        /** DeleteObjectMessage name */
        name?: (string|null);
    }

    /** Represents a DeleteObjectMessage. */
    class DeleteObjectMessage implements IDeleteObjectMessage {

        /**
         * Constructs a new DeleteObjectMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: whiteboard.IDeleteObjectMessage);

        /** DeleteObjectMessage name. */
        public name: string;

        /**
         * Creates a new DeleteObjectMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DeleteObjectMessage instance
         */
        public static create(properties?: whiteboard.IDeleteObjectMessage): whiteboard.DeleteObjectMessage;

        /**
         * Encodes the specified DeleteObjectMessage message. Does not implicitly {@link whiteboard.DeleteObjectMessage.verify|verify} messages.
         * @param message DeleteObjectMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: whiteboard.IDeleteObjectMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DeleteObjectMessage message, length delimited. Does not implicitly {@link whiteboard.DeleteObjectMessage.verify|verify} messages.
         * @param message DeleteObjectMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: whiteboard.IDeleteObjectMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DeleteObjectMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DeleteObjectMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): whiteboard.DeleteObjectMessage;

        /**
         * Decodes a DeleteObjectMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DeleteObjectMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): whiteboard.DeleteObjectMessage;

        /**
         * Verifies a DeleteObjectMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DeleteObjectMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DeleteObjectMessage
         */
        public static fromObject(object: { [k: string]: any }): whiteboard.DeleteObjectMessage;

        /**
         * Creates a plain object from a DeleteObjectMessage message. Also converts values to other types if specified.
         * @param message DeleteObjectMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: whiteboard.DeleteObjectMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DeleteObjectMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DeleteObjectsMessage. */
    interface IDeleteObjectsMessage {

        /** DeleteObjectsMessage names */
        names?: (string[]|null);
    }

    /** Represents a DeleteObjectsMessage. */
    class DeleteObjectsMessage implements IDeleteObjectsMessage {

        /**
         * Constructs a new DeleteObjectsMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: whiteboard.IDeleteObjectsMessage);

        /** DeleteObjectsMessage names. */
        public names: string[];

        /**
         * Creates a new DeleteObjectsMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DeleteObjectsMessage instance
         */
        public static create(properties?: whiteboard.IDeleteObjectsMessage): whiteboard.DeleteObjectsMessage;

        /**
         * Encodes the specified DeleteObjectsMessage message. Does not implicitly {@link whiteboard.DeleteObjectsMessage.verify|verify} messages.
         * @param message DeleteObjectsMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: whiteboard.IDeleteObjectsMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DeleteObjectsMessage message, length delimited. Does not implicitly {@link whiteboard.DeleteObjectsMessage.verify|verify} messages.
         * @param message DeleteObjectsMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: whiteboard.IDeleteObjectsMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DeleteObjectsMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DeleteObjectsMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): whiteboard.DeleteObjectsMessage;

        /**
         * Decodes a DeleteObjectsMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DeleteObjectsMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): whiteboard.DeleteObjectsMessage;

        /**
         * Verifies a DeleteObjectsMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DeleteObjectsMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DeleteObjectsMessage
         */
        public static fromObject(object: { [k: string]: any }): whiteboard.DeleteObjectsMessage;

        /**
         * Creates a plain object from a DeleteObjectsMessage message. Also converts values to other types if specified.
         * @param message DeleteObjectsMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: whiteboard.DeleteObjectsMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DeleteObjectsMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AlignObjectsLeftMessage. */
    interface IAlignObjectsLeftMessage {

        /** AlignObjectsLeftMessage names */
        names?: (string[]|null);
    }

    /** Represents an AlignObjectsLeftMessage. */
    class AlignObjectsLeftMessage implements IAlignObjectsLeftMessage {

        /**
         * Constructs a new AlignObjectsLeftMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: whiteboard.IAlignObjectsLeftMessage);

        /** AlignObjectsLeftMessage names. */
        public names: string[];

        /**
         * Creates a new AlignObjectsLeftMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AlignObjectsLeftMessage instance
         */
        public static create(properties?: whiteboard.IAlignObjectsLeftMessage): whiteboard.AlignObjectsLeftMessage;

        /**
         * Encodes the specified AlignObjectsLeftMessage message. Does not implicitly {@link whiteboard.AlignObjectsLeftMessage.verify|verify} messages.
         * @param message AlignObjectsLeftMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: whiteboard.IAlignObjectsLeftMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AlignObjectsLeftMessage message, length delimited. Does not implicitly {@link whiteboard.AlignObjectsLeftMessage.verify|verify} messages.
         * @param message AlignObjectsLeftMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: whiteboard.IAlignObjectsLeftMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AlignObjectsLeftMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AlignObjectsLeftMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): whiteboard.AlignObjectsLeftMessage;

        /**
         * Decodes an AlignObjectsLeftMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AlignObjectsLeftMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): whiteboard.AlignObjectsLeftMessage;

        /**
         * Verifies an AlignObjectsLeftMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AlignObjectsLeftMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AlignObjectsLeftMessage
         */
        public static fromObject(object: { [k: string]: any }): whiteboard.AlignObjectsLeftMessage;

        /**
         * Creates a plain object from an AlignObjectsLeftMessage message. Also converts values to other types if specified.
         * @param message AlignObjectsLeftMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: whiteboard.AlignObjectsLeftMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AlignObjectsLeftMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AlignObjectsRightMessage. */
    interface IAlignObjectsRightMessage {

        /** AlignObjectsRightMessage names */
        names?: (string[]|null);
    }

    /** Represents an AlignObjectsRightMessage. */
    class AlignObjectsRightMessage implements IAlignObjectsRightMessage {

        /**
         * Constructs a new AlignObjectsRightMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: whiteboard.IAlignObjectsRightMessage);

        /** AlignObjectsRightMessage names. */
        public names: string[];

        /**
         * Creates a new AlignObjectsRightMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AlignObjectsRightMessage instance
         */
        public static create(properties?: whiteboard.IAlignObjectsRightMessage): whiteboard.AlignObjectsRightMessage;

        /**
         * Encodes the specified AlignObjectsRightMessage message. Does not implicitly {@link whiteboard.AlignObjectsRightMessage.verify|verify} messages.
         * @param message AlignObjectsRightMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: whiteboard.IAlignObjectsRightMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AlignObjectsRightMessage message, length delimited. Does not implicitly {@link whiteboard.AlignObjectsRightMessage.verify|verify} messages.
         * @param message AlignObjectsRightMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: whiteboard.IAlignObjectsRightMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AlignObjectsRightMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AlignObjectsRightMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): whiteboard.AlignObjectsRightMessage;

        /**
         * Decodes an AlignObjectsRightMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AlignObjectsRightMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): whiteboard.AlignObjectsRightMessage;

        /**
         * Verifies an AlignObjectsRightMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AlignObjectsRightMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AlignObjectsRightMessage
         */
        public static fromObject(object: { [k: string]: any }): whiteboard.AlignObjectsRightMessage;

        /**
         * Creates a plain object from an AlignObjectsRightMessage message. Also converts values to other types if specified.
         * @param message AlignObjectsRightMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: whiteboard.AlignObjectsRightMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AlignObjectsRightMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AlignObjectsTopMessage. */
    interface IAlignObjectsTopMessage {

        /** AlignObjectsTopMessage names */
        names?: (string[]|null);
    }

    /** Represents an AlignObjectsTopMessage. */
    class AlignObjectsTopMessage implements IAlignObjectsTopMessage {

        /**
         * Constructs a new AlignObjectsTopMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: whiteboard.IAlignObjectsTopMessage);

        /** AlignObjectsTopMessage names. */
        public names: string[];

        /**
         * Creates a new AlignObjectsTopMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AlignObjectsTopMessage instance
         */
        public static create(properties?: whiteboard.IAlignObjectsTopMessage): whiteboard.AlignObjectsTopMessage;

        /**
         * Encodes the specified AlignObjectsTopMessage message. Does not implicitly {@link whiteboard.AlignObjectsTopMessage.verify|verify} messages.
         * @param message AlignObjectsTopMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: whiteboard.IAlignObjectsTopMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AlignObjectsTopMessage message, length delimited. Does not implicitly {@link whiteboard.AlignObjectsTopMessage.verify|verify} messages.
         * @param message AlignObjectsTopMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: whiteboard.IAlignObjectsTopMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AlignObjectsTopMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AlignObjectsTopMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): whiteboard.AlignObjectsTopMessage;

        /**
         * Decodes an AlignObjectsTopMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AlignObjectsTopMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): whiteboard.AlignObjectsTopMessage;

        /**
         * Verifies an AlignObjectsTopMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AlignObjectsTopMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AlignObjectsTopMessage
         */
        public static fromObject(object: { [k: string]: any }): whiteboard.AlignObjectsTopMessage;

        /**
         * Creates a plain object from an AlignObjectsTopMessage message. Also converts values to other types if specified.
         * @param message AlignObjectsTopMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: whiteboard.AlignObjectsTopMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AlignObjectsTopMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AlignObjectsBottomMessage. */
    interface IAlignObjectsBottomMessage {

        /** AlignObjectsBottomMessage names */
        names?: (string[]|null);
    }

    /** Represents an AlignObjectsBottomMessage. */
    class AlignObjectsBottomMessage implements IAlignObjectsBottomMessage {

        /**
         * Constructs a new AlignObjectsBottomMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: whiteboard.IAlignObjectsBottomMessage);

        /** AlignObjectsBottomMessage names. */
        public names: string[];

        /**
         * Creates a new AlignObjectsBottomMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AlignObjectsBottomMessage instance
         */
        public static create(properties?: whiteboard.IAlignObjectsBottomMessage): whiteboard.AlignObjectsBottomMessage;

        /**
         * Encodes the specified AlignObjectsBottomMessage message. Does not implicitly {@link whiteboard.AlignObjectsBottomMessage.verify|verify} messages.
         * @param message AlignObjectsBottomMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: whiteboard.IAlignObjectsBottomMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AlignObjectsBottomMessage message, length delimited. Does not implicitly {@link whiteboard.AlignObjectsBottomMessage.verify|verify} messages.
         * @param message AlignObjectsBottomMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: whiteboard.IAlignObjectsBottomMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AlignObjectsBottomMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AlignObjectsBottomMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): whiteboard.AlignObjectsBottomMessage;

        /**
         * Decodes an AlignObjectsBottomMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AlignObjectsBottomMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): whiteboard.AlignObjectsBottomMessage;

        /**
         * Verifies an AlignObjectsBottomMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AlignObjectsBottomMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AlignObjectsBottomMessage
         */
        public static fromObject(object: { [k: string]: any }): whiteboard.AlignObjectsBottomMessage;

        /**
         * Creates a plain object from an AlignObjectsBottomMessage message. Also converts values to other types if specified.
         * @param message AlignObjectsBottomMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: whiteboard.AlignObjectsBottomMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AlignObjectsBottomMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ArrangeObjectsHorizontalMessage. */
    interface IArrangeObjectsHorizontalMessage {

        /** ArrangeObjectsHorizontalMessage names */
        names?: (string[]|null);
    }

    /** Represents an ArrangeObjectsHorizontalMessage. */
    class ArrangeObjectsHorizontalMessage implements IArrangeObjectsHorizontalMessage {

        /**
         * Constructs a new ArrangeObjectsHorizontalMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: whiteboard.IArrangeObjectsHorizontalMessage);

        /** ArrangeObjectsHorizontalMessage names. */
        public names: string[];

        /**
         * Creates a new ArrangeObjectsHorizontalMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ArrangeObjectsHorizontalMessage instance
         */
        public static create(properties?: whiteboard.IArrangeObjectsHorizontalMessage): whiteboard.ArrangeObjectsHorizontalMessage;

        /**
         * Encodes the specified ArrangeObjectsHorizontalMessage message. Does not implicitly {@link whiteboard.ArrangeObjectsHorizontalMessage.verify|verify} messages.
         * @param message ArrangeObjectsHorizontalMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: whiteboard.IArrangeObjectsHorizontalMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ArrangeObjectsHorizontalMessage message, length delimited. Does not implicitly {@link whiteboard.ArrangeObjectsHorizontalMessage.verify|verify} messages.
         * @param message ArrangeObjectsHorizontalMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: whiteboard.IArrangeObjectsHorizontalMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ArrangeObjectsHorizontalMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ArrangeObjectsHorizontalMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): whiteboard.ArrangeObjectsHorizontalMessage;

        /**
         * Decodes an ArrangeObjectsHorizontalMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ArrangeObjectsHorizontalMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): whiteboard.ArrangeObjectsHorizontalMessage;

        /**
         * Verifies an ArrangeObjectsHorizontalMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ArrangeObjectsHorizontalMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ArrangeObjectsHorizontalMessage
         */
        public static fromObject(object: { [k: string]: any }): whiteboard.ArrangeObjectsHorizontalMessage;

        /**
         * Creates a plain object from an ArrangeObjectsHorizontalMessage message. Also converts values to other types if specified.
         * @param message ArrangeObjectsHorizontalMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: whiteboard.ArrangeObjectsHorizontalMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ArrangeObjectsHorizontalMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ArrangeObjectsVerticalMessage. */
    interface IArrangeObjectsVerticalMessage {

        /** ArrangeObjectsVerticalMessage names */
        names?: (string[]|null);
    }

    /** Represents an ArrangeObjectsVerticalMessage. */
    class ArrangeObjectsVerticalMessage implements IArrangeObjectsVerticalMessage {

        /**
         * Constructs a new ArrangeObjectsVerticalMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: whiteboard.IArrangeObjectsVerticalMessage);

        /** ArrangeObjectsVerticalMessage names. */
        public names: string[];

        /**
         * Creates a new ArrangeObjectsVerticalMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ArrangeObjectsVerticalMessage instance
         */
        public static create(properties?: whiteboard.IArrangeObjectsVerticalMessage): whiteboard.ArrangeObjectsVerticalMessage;

        /**
         * Encodes the specified ArrangeObjectsVerticalMessage message. Does not implicitly {@link whiteboard.ArrangeObjectsVerticalMessage.verify|verify} messages.
         * @param message ArrangeObjectsVerticalMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: whiteboard.IArrangeObjectsVerticalMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ArrangeObjectsVerticalMessage message, length delimited. Does not implicitly {@link whiteboard.ArrangeObjectsVerticalMessage.verify|verify} messages.
         * @param message ArrangeObjectsVerticalMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: whiteboard.IArrangeObjectsVerticalMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ArrangeObjectsVerticalMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ArrangeObjectsVerticalMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): whiteboard.ArrangeObjectsVerticalMessage;

        /**
         * Decodes an ArrangeObjectsVerticalMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ArrangeObjectsVerticalMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): whiteboard.ArrangeObjectsVerticalMessage;

        /**
         * Verifies an ArrangeObjectsVerticalMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ArrangeObjectsVerticalMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ArrangeObjectsVerticalMessage
         */
        public static fromObject(object: { [k: string]: any }): whiteboard.ArrangeObjectsVerticalMessage;

        /**
         * Creates a plain object from an ArrangeObjectsVerticalMessage message. Also converts values to other types if specified.
         * @param message ArrangeObjectsVerticalMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: whiteboard.ArrangeObjectsVerticalMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ArrangeObjectsVerticalMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SetObjectPropertyMessage. */
    interface ISetObjectPropertyMessage {

        /** SetObjectPropertyMessage name */
        name?: (string|null);

        /** SetObjectPropertyMessage propName */
        propName?: (string|null);

        /** SetObjectPropertyMessage propValueJson */
        propValueJson?: (string|null);
    }

    /** Represents a SetObjectPropertyMessage. */
    class SetObjectPropertyMessage implements ISetObjectPropertyMessage {

        /**
         * Constructs a new SetObjectPropertyMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: whiteboard.ISetObjectPropertyMessage);

        /** SetObjectPropertyMessage name. */
        public name: string;

        /** SetObjectPropertyMessage propName. */
        public propName: string;

        /** SetObjectPropertyMessage propValueJson. */
        public propValueJson: string;

        /**
         * Creates a new SetObjectPropertyMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SetObjectPropertyMessage instance
         */
        public static create(properties?: whiteboard.ISetObjectPropertyMessage): whiteboard.SetObjectPropertyMessage;

        /**
         * Encodes the specified SetObjectPropertyMessage message. Does not implicitly {@link whiteboard.SetObjectPropertyMessage.verify|verify} messages.
         * @param message SetObjectPropertyMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: whiteboard.ISetObjectPropertyMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SetObjectPropertyMessage message, length delimited. Does not implicitly {@link whiteboard.SetObjectPropertyMessage.verify|verify} messages.
         * @param message SetObjectPropertyMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: whiteboard.ISetObjectPropertyMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SetObjectPropertyMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SetObjectPropertyMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): whiteboard.SetObjectPropertyMessage;

        /**
         * Decodes a SetObjectPropertyMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SetObjectPropertyMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): whiteboard.SetObjectPropertyMessage;

        /**
         * Verifies a SetObjectPropertyMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SetObjectPropertyMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SetObjectPropertyMessage
         */
        public static fromObject(object: { [k: string]: any }): whiteboard.SetObjectPropertyMessage;

        /**
         * Creates a plain object from a SetObjectPropertyMessage message. Also converts values to other types if specified.
         * @param message SetObjectPropertyMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: whiteboard.SetObjectPropertyMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SetObjectPropertyMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a StartDrawMessage. */
    interface IStartDrawMessage {

        /** StartDrawMessage x */
        x?: (number|null);

        /** StartDrawMessage y */
        y?: (number|null);

        /** StartDrawMessage lineWidth */
        lineWidth?: (number|null);

        /** StartDrawMessage color */
        color?: (string|null);
    }

    /** Represents a StartDrawMessage. */
    class StartDrawMessage implements IStartDrawMessage {

        /**
         * Constructs a new StartDrawMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: whiteboard.IStartDrawMessage);

        /** StartDrawMessage x. */
        public x: number;

        /** StartDrawMessage y. */
        public y: number;

        /** StartDrawMessage lineWidth. */
        public lineWidth: number;

        /** StartDrawMessage color. */
        public color: string;

        /**
         * Creates a new StartDrawMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StartDrawMessage instance
         */
        public static create(properties?: whiteboard.IStartDrawMessage): whiteboard.StartDrawMessage;

        /**
         * Encodes the specified StartDrawMessage message. Does not implicitly {@link whiteboard.StartDrawMessage.verify|verify} messages.
         * @param message StartDrawMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: whiteboard.IStartDrawMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StartDrawMessage message, length delimited. Does not implicitly {@link whiteboard.StartDrawMessage.verify|verify} messages.
         * @param message StartDrawMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: whiteboard.IStartDrawMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StartDrawMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StartDrawMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): whiteboard.StartDrawMessage;

        /**
         * Decodes a StartDrawMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StartDrawMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): whiteboard.StartDrawMessage;

        /**
         * Verifies a StartDrawMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StartDrawMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StartDrawMessage
         */
        public static fromObject(object: { [k: string]: any }): whiteboard.StartDrawMessage;

        /**
         * Creates a plain object from a StartDrawMessage message. Also converts values to other types if specified.
         * @param message StartDrawMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: whiteboard.StartDrawMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StartDrawMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DrawingMessage. */
    interface IDrawingMessage {

        /** DrawingMessage x */
        x?: (number|null);

        /** DrawingMessage y */
        y?: (number|null);
    }

    /** Represents a DrawingMessage. */
    class DrawingMessage implements IDrawingMessage {

        /**
         * Constructs a new DrawingMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: whiteboard.IDrawingMessage);

        /** DrawingMessage x. */
        public x: number;

        /** DrawingMessage y. */
        public y: number;

        /**
         * Creates a new DrawingMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DrawingMessage instance
         */
        public static create(properties?: whiteboard.IDrawingMessage): whiteboard.DrawingMessage;

        /**
         * Encodes the specified DrawingMessage message. Does not implicitly {@link whiteboard.DrawingMessage.verify|verify} messages.
         * @param message DrawingMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: whiteboard.IDrawingMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DrawingMessage message, length delimited. Does not implicitly {@link whiteboard.DrawingMessage.verify|verify} messages.
         * @param message DrawingMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: whiteboard.IDrawingMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DrawingMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DrawingMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): whiteboard.DrawingMessage;

        /**
         * Decodes a DrawingMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DrawingMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): whiteboard.DrawingMessage;

        /**
         * Verifies a DrawingMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DrawingMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DrawingMessage
         */
        public static fromObject(object: { [k: string]: any }): whiteboard.DrawingMessage;

        /**
         * Creates a plain object from a DrawingMessage message. Also converts values to other types if specified.
         * @param message DrawingMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: whiteboard.DrawingMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DrawingMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DrawMessage. */
    interface IDrawMessage {

        /** DrawMessage lineWidth */
        lineWidth?: (number|null);

        /** DrawMessage color */
        color?: (string|null);

        /** DrawMessage points */
        points?: (whiteboard.IDrawingMessage[]|null);
    }

    /** Represents a DrawMessage. */
    class DrawMessage implements IDrawMessage {

        /**
         * Constructs a new DrawMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: whiteboard.IDrawMessage);

        /** DrawMessage lineWidth. */
        public lineWidth: number;

        /** DrawMessage color. */
        public color: string;

        /** DrawMessage points. */
        public points: whiteboard.IDrawingMessage[];

        /**
         * Creates a new DrawMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DrawMessage instance
         */
        public static create(properties?: whiteboard.IDrawMessage): whiteboard.DrawMessage;

        /**
         * Encodes the specified DrawMessage message. Does not implicitly {@link whiteboard.DrawMessage.verify|verify} messages.
         * @param message DrawMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: whiteboard.IDrawMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DrawMessage message, length delimited. Does not implicitly {@link whiteboard.DrawMessage.verify|verify} messages.
         * @param message DrawMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: whiteboard.IDrawMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DrawMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DrawMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): whiteboard.DrawMessage;

        /**
         * Decodes a DrawMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DrawMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): whiteboard.DrawMessage;

        /**
         * Verifies a DrawMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DrawMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DrawMessage
         */
        public static fromObject(object: { [k: string]: any }): whiteboard.DrawMessage;

        /**
         * Creates a plain object from a DrawMessage message. Also converts values to other types if specified.
         * @param message DrawMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: whiteboard.DrawMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DrawMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EraseMessage. */
    interface IEraseMessage {

        /** EraseMessage x */
        x?: (number|null);

        /** EraseMessage y */
        y?: (number|null);

        /** EraseMessage size */
        size?: (number|null);
    }

    /** Represents an EraseMessage. */
    class EraseMessage implements IEraseMessage {

        /**
         * Constructs a new EraseMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: whiteboard.IEraseMessage);

        /** EraseMessage x. */
        public x: number;

        /** EraseMessage y. */
        public y: number;

        /** EraseMessage size. */
        public size: number;

        /**
         * Creates a new EraseMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EraseMessage instance
         */
        public static create(properties?: whiteboard.IEraseMessage): whiteboard.EraseMessage;

        /**
         * Encodes the specified EraseMessage message. Does not implicitly {@link whiteboard.EraseMessage.verify|verify} messages.
         * @param message EraseMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: whiteboard.IEraseMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EraseMessage message, length delimited. Does not implicitly {@link whiteboard.EraseMessage.verify|verify} messages.
         * @param message EraseMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: whiteboard.IEraseMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EraseMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EraseMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): whiteboard.EraseMessage;

        /**
         * Decodes an EraseMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EraseMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): whiteboard.EraseMessage;

        /**
         * Verifies an EraseMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EraseMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EraseMessage
         */
        public static fromObject(object: { [k: string]: any }): whiteboard.EraseMessage;

        /**
         * Creates a plain object from an EraseMessage message. Also converts values to other types if specified.
         * @param message EraseMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: whiteboard.EraseMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EraseMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SwapObjectMessage. */
    interface ISwapObjectMessage {

        /** SwapObjectMessage name1 */
        name1?: (string|null);

        /** SwapObjectMessage name2 */
        name2?: (string|null);

        /** SwapObjectMessage duration */
        duration?: (number|null);
    }

    /** Represents a SwapObjectMessage. */
    class SwapObjectMessage implements ISwapObjectMessage {

        /**
         * Constructs a new SwapObjectMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: whiteboard.ISwapObjectMessage);

        /** SwapObjectMessage name1. */
        public name1: string;

        /** SwapObjectMessage name2. */
        public name2: string;

        /** SwapObjectMessage duration. */
        public duration: number;

        /**
         * Creates a new SwapObjectMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SwapObjectMessage instance
         */
        public static create(properties?: whiteboard.ISwapObjectMessage): whiteboard.SwapObjectMessage;

        /**
         * Encodes the specified SwapObjectMessage message. Does not implicitly {@link whiteboard.SwapObjectMessage.verify|verify} messages.
         * @param message SwapObjectMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: whiteboard.ISwapObjectMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SwapObjectMessage message, length delimited. Does not implicitly {@link whiteboard.SwapObjectMessage.verify|verify} messages.
         * @param message SwapObjectMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: whiteboard.ISwapObjectMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SwapObjectMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SwapObjectMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): whiteboard.SwapObjectMessage;

        /**
         * Decodes a SwapObjectMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SwapObjectMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): whiteboard.SwapObjectMessage;

        /**
         * Verifies a SwapObjectMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SwapObjectMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SwapObjectMessage
         */
        public static fromObject(object: { [k: string]: any }): whiteboard.SwapObjectMessage;

        /**
         * Creates a plain object from a SwapObjectMessage message. Also converts values to other types if specified.
         * @param message SwapObjectMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: whiteboard.SwapObjectMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SwapObjectMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ClearPageMessage. */
    interface IClearPageMessage {

        /** ClearPageMessage pageName */
        pageName?: (string|null);
    }

    /** Represents a ClearPageMessage. */
    class ClearPageMessage implements IClearPageMessage {

        /**
         * Constructs a new ClearPageMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: whiteboard.IClearPageMessage);

        /** ClearPageMessage pageName. */
        public pageName: string;

        /**
         * Creates a new ClearPageMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ClearPageMessage instance
         */
        public static create(properties?: whiteboard.IClearPageMessage): whiteboard.ClearPageMessage;

        /**
         * Encodes the specified ClearPageMessage message. Does not implicitly {@link whiteboard.ClearPageMessage.verify|verify} messages.
         * @param message ClearPageMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: whiteboard.IClearPageMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ClearPageMessage message, length delimited. Does not implicitly {@link whiteboard.ClearPageMessage.verify|verify} messages.
         * @param message ClearPageMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: whiteboard.IClearPageMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ClearPageMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ClearPageMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): whiteboard.ClearPageMessage;

        /**
         * Decodes a ClearPageMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ClearPageMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): whiteboard.ClearPageMessage;

        /**
         * Verifies a ClearPageMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ClearPageMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ClearPageMessage
         */
        public static fromObject(object: { [k: string]: any }): whiteboard.ClearPageMessage;

        /**
         * Creates a plain object from a ClearPageMessage message. Also converts values to other types if specified.
         * @param message ClearPageMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: whiteboard.ClearPageMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ClearPageMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ClearBoardMessage. */
    interface IClearBoardMessage {
    }

    /** Represents a ClearBoardMessage. */
    class ClearBoardMessage implements IClearBoardMessage {

        /**
         * Constructs a new ClearBoardMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: whiteboard.IClearBoardMessage);

        /**
         * Creates a new ClearBoardMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ClearBoardMessage instance
         */
        public static create(properties?: whiteboard.IClearBoardMessage): whiteboard.ClearBoardMessage;

        /**
         * Encodes the specified ClearBoardMessage message. Does not implicitly {@link whiteboard.ClearBoardMessage.verify|verify} messages.
         * @param message ClearBoardMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: whiteboard.IClearBoardMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ClearBoardMessage message, length delimited. Does not implicitly {@link whiteboard.ClearBoardMessage.verify|verify} messages.
         * @param message ClearBoardMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: whiteboard.IClearBoardMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ClearBoardMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ClearBoardMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): whiteboard.ClearBoardMessage;

        /**
         * Decodes a ClearBoardMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ClearBoardMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): whiteboard.ClearBoardMessage;

        /**
         * Verifies a ClearBoardMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ClearBoardMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ClearBoardMessage
         */
        public static fromObject(object: { [k: string]: any }): whiteboard.ClearBoardMessage;

        /**
         * Creates a plain object from a ClearBoardMessage message. Also converts values to other types if specified.
         * @param message ClearBoardMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: whiteboard.ClearBoardMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ClearBoardMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
