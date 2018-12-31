"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Packet {
    constructor(cls, data) {
        this._cls = cls;
        this._buffer = null;
        if (data) {
            this.encode(data);
        }
    }
    encode(data) {
        const tmpBuffer = this._cls.encode(data).finish();
        this._buffer = new ArrayBuffer(4 + tmpBuffer.length);
        const view = new DataView(this._buffer);
        view.setUint32(0, tmpBuffer.length, false);
        const u8view = new Uint8Array(this._buffer);
        u8view.set(tmpBuffer, 4);
    }
    decode() {
        if (!this._buffer || this._buffer.byteLength <= 4) {
            return null;
        }
        const view = new DataView(this._buffer);
        const length = view.getUint32(0, false);
        if (this._buffer.byteLength !== length + 4) {
            return null;
        }
        const content = this._cls.decode(new Uint8Array(this._buffer.slice(4)));
        return content ? this._cls.toObject(content) : null;
    }
}
exports.Packet = Packet;
//# sourceMappingURL=protoutils.js.map