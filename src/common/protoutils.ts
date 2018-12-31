import * as $protobuf from 'protobufjs';
import * as proto from './protocols/protocols';

interface ProtoTypeHolder<T> {
    new (): T;
    create (properties?: any): T;
    encode(message: any, writer?: $protobuf.Writer): $protobuf.Writer;
    decode(reader: ($protobuf.Reader|Uint8Array), length?: number): T;
    verify(message: { [k: string]: any }): (string|null);
    fromObject(object: { [k: string]: any }): T;
    toObject(message: T, options?: $protobuf.IConversionOptions): { [k: string]: any };
}

export class Packet<T> {
    private _cls: ProtoTypeHolder<T>;
    private _buffer: ArrayBuffer|null;
    constructor (cls: ProtoTypeHolder<T>, data?: object) {
        this._cls = cls;
        this._buffer = null;
        if (data) {
            this.encode (data);
        }
    }
    encode (data: object) {
        const tmpBuffer = this._cls.encode (data).finish ();
        this._buffer = new ArrayBuffer (4 + tmpBuffer.length);
        const view = new DataView(this._buffer);
        view.setUint32(0, tmpBuffer.length, false);
        const u8view = new Uint8Array(this._buffer);
        u8view.set (tmpBuffer, 4);        
    }
    decode (): object|null {
        if (!this._buffer||this._buffer.byteLength <= 4) {
            return null;
        }
        const view = new DataView(this._buffer);
        const length = view.getUint32(0, false);
        if (this._buffer.byteLength !== length + 4) {
            return null;
        }
        const content = this._cls.decode (new Uint8Array(this._buffer.slice (4)));
        return content ? this._cls.toObject (content) : null;
    }
}

