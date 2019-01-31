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

    /** StrokeType enum. */
    enum StrokeType {
        Draw = 1,
        Erase = 2
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

    /** Properties of a Point. */
    interface IPoint {

        /** Point x */
        x?: (number|null);

        /** Point y */
        y?: (number|null);
    }

    /** Represents a Point. */
    class Point implements IPoint {

        /**
         * Constructs a new Point.
         * @param [properties] Properties to set
         */
        constructor(properties?: whiteboard.IPoint);

        /** Point x. */
        public x: number;

        /** Point y. */
        public y: number;

        /**
         * Creates a new Point instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Point instance
         */
        public static create(properties?: whiteboard.IPoint): whiteboard.Point;

        /**
         * Encodes the specified Point message. Does not implicitly {@link whiteboard.Point.verify|verify} messages.
         * @param message Point message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: whiteboard.IPoint, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Point message, length delimited. Does not implicitly {@link whiteboard.Point.verify|verify} messages.
         * @param message Point message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: whiteboard.IPoint, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Point message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Point
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): whiteboard.Point;

        /**
         * Decodes a Point message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Point
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): whiteboard.Point;

        /**
         * Verifies a Point message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Point message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Point
         */
        public static fromObject(object: { [k: string]: any }): whiteboard.Point;

        /**
         * Creates a plain object from a Point message. Also converts values to other types if specified.
         * @param message Point
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: whiteboard.Point, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Point to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a StrokeMessage. */
    interface IStrokeMessage {

        /** StrokeMessage entityName */
        entityName?: (string|null);

        /** StrokeMessage type */
        type?: (whiteboard.StrokeType|null);

        /** StrokeMessage points */
        points?: (whiteboard.IPoint[]|null);

        /** StrokeMessage lineWidth */
        lineWidth?: (number|null);

        /** StrokeMessage color */
        color?: (string|null);

        /** StrokeMessage size */
        size?: (number|null);
    }

    /** Represents a StrokeMessage. */
    class StrokeMessage implements IStrokeMessage {

        /**
         * Constructs a new StrokeMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: whiteboard.IStrokeMessage);

        /** StrokeMessage entityName. */
        public entityName: string;

        /** StrokeMessage type. */
        public type: whiteboard.StrokeType;

        /** StrokeMessage points. */
        public points: whiteboard.IPoint[];

        /** StrokeMessage lineWidth. */
        public lineWidth: number;

        /** StrokeMessage color. */
        public color: string;

        /** StrokeMessage size. */
        public size: number;

        /**
         * Creates a new StrokeMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StrokeMessage instance
         */
        public static create(properties?: whiteboard.IStrokeMessage): whiteboard.StrokeMessage;

        /**
         * Encodes the specified StrokeMessage message. Does not implicitly {@link whiteboard.StrokeMessage.verify|verify} messages.
         * @param message StrokeMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: whiteboard.IStrokeMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StrokeMessage message, length delimited. Does not implicitly {@link whiteboard.StrokeMessage.verify|verify} messages.
         * @param message StrokeMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: whiteboard.IStrokeMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StrokeMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StrokeMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): whiteboard.StrokeMessage;

        /**
         * Decodes a StrokeMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StrokeMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): whiteboard.StrokeMessage;

        /**
         * Verifies a StrokeMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StrokeMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StrokeMessage
         */
        public static fromObject(object: { [k: string]: any }): whiteboard.StrokeMessage;

        /**
         * Creates a plain object from a StrokeMessage message. Also converts values to other types if specified.
         * @param message StrokeMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: whiteboard.StrokeMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StrokeMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DrawMessage. */
    interface IDrawMessage {

        /** DrawMessage entityName */
        entityName?: (string|null);

        /** DrawMessage lineWidth */
        lineWidth?: (number|null);

        /** DrawMessage color */
        color?: (string|null);

        /** DrawMessage newStroke */
        newStroke?: (boolean|null);

        /** DrawMessage points */
        points?: (whiteboard.IPoint[]|null);
    }

    /** Represents a DrawMessage. */
    class DrawMessage implements IDrawMessage {

        /**
         * Constructs a new DrawMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: whiteboard.IDrawMessage);

        /** DrawMessage entityName. */
        public entityName: string;

        /** DrawMessage lineWidth. */
        public lineWidth: number;

        /** DrawMessage color. */
        public color: string;

        /** DrawMessage newStroke. */
        public newStroke: boolean;

        /** DrawMessage points. */
        public points: whiteboard.IPoint[];

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

        /** EraseMessage entityName */
        entityName?: (string|null);

        /** EraseMessage size */
        size?: (number|null);

        /** EraseMessage newErase */
        newErase?: (boolean|null);

        /** EraseMessage points */
        points?: (whiteboard.IPoint[]|null);
    }

    /** Represents an EraseMessage. */
    class EraseMessage implements IEraseMessage {

        /**
         * Constructs a new EraseMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: whiteboard.IEraseMessage);

        /** EraseMessage entityName. */
        public entityName: string;

        /** EraseMessage size. */
        public size: number;

        /** EraseMessage newErase. */
        public newErase: boolean;

        /** EraseMessage points. */
        public points: whiteboard.IPoint[];

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

    /** Properties of a MoveObjectMessage. */
    interface IMoveObjectMessage {

        /** MoveObjectMessage name */
        name?: (string|null);

        /** MoveObjectMessage x1 */
        x1?: (number|null);

        /** MoveObjectMessage y1 */
        y1?: (number|null);

        /** MoveObjectMessage x2 */
        x2?: (number|null);

        /** MoveObjectMessage y2 */
        y2?: (number|null);
    }

    /** Represents a MoveObjectMessage. */
    class MoveObjectMessage implements IMoveObjectMessage {

        /**
         * Constructs a new MoveObjectMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: whiteboard.IMoveObjectMessage);

        /** MoveObjectMessage name. */
        public name: string;

        /** MoveObjectMessage x1. */
        public x1: number;

        /** MoveObjectMessage y1. */
        public y1: number;

        /** MoveObjectMessage x2. */
        public x2: number;

        /** MoveObjectMessage y2. */
        public y2: number;

        /**
         * Creates a new MoveObjectMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MoveObjectMessage instance
         */
        public static create(properties?: whiteboard.IMoveObjectMessage): whiteboard.MoveObjectMessage;

        /**
         * Encodes the specified MoveObjectMessage message. Does not implicitly {@link whiteboard.MoveObjectMessage.verify|verify} messages.
         * @param message MoveObjectMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: whiteboard.IMoveObjectMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MoveObjectMessage message, length delimited. Does not implicitly {@link whiteboard.MoveObjectMessage.verify|verify} messages.
         * @param message MoveObjectMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: whiteboard.IMoveObjectMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MoveObjectMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MoveObjectMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): whiteboard.MoveObjectMessage;

        /**
         * Decodes a MoveObjectMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MoveObjectMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): whiteboard.MoveObjectMessage;

        /**
         * Verifies a MoveObjectMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MoveObjectMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MoveObjectMessage
         */
        public static fromObject(object: { [k: string]: any }): whiteboard.MoveObjectMessage;

        /**
         * Creates a plain object from a MoveObjectMessage message. Also converts values to other types if specified.
         * @param message MoveObjectMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: whiteboard.MoveObjectMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MoveObjectMessage to JSON.
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

    /** Properties of an UndoMessage. */
    interface IUndoMessage {
    }

    /** Represents an UndoMessage. */
    class UndoMessage implements IUndoMessage {

        /**
         * Constructs a new UndoMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: whiteboard.IUndoMessage);

        /**
         * Creates a new UndoMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UndoMessage instance
         */
        public static create(properties?: whiteboard.IUndoMessage): whiteboard.UndoMessage;

        /**
         * Encodes the specified UndoMessage message. Does not implicitly {@link whiteboard.UndoMessage.verify|verify} messages.
         * @param message UndoMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: whiteboard.IUndoMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UndoMessage message, length delimited. Does not implicitly {@link whiteboard.UndoMessage.verify|verify} messages.
         * @param message UndoMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: whiteboard.IUndoMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UndoMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UndoMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): whiteboard.UndoMessage;

        /**
         * Decodes an UndoMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UndoMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): whiteboard.UndoMessage;

        /**
         * Verifies an UndoMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UndoMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UndoMessage
         */
        public static fromObject(object: { [k: string]: any }): whiteboard.UndoMessage;

        /**
         * Creates a plain object from an UndoMessage message. Also converts values to other types if specified.
         * @param message UndoMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: whiteboard.UndoMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UndoMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
