"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protolist_1 = require("./protocols/protolist");
class Packet {
    constructor(buffer) {
        this._buffer = buffer || null;
    }
    static create(msgId, data) {
        const packet = new Packet();
        packet.encode(msgId, data);
        return packet;
    }
    getMsgData() {
        if (!this._buffer || this._buffer.byteLength <= 8) {
            return null;
        }
        const view = new DataView(this._buffer);
        const length = view.getUint32(0, false);
        if (this._buffer.byteLength !== length + 4) {
            return null;
        }
        const msgId = view.getUint32(4, false);
        const cls = protolist_1.msgMap[msgId];
        const content = cls.decode(new Uint8Array(this._buffer.slice(8)));
        return content ? { type: msgId, data: cls.toObject(content) } : null;
    }
    encode(msgId, data) {
        const cls = protolist_1.msgMap[msgId];
        const tmpBuffer = cls.encode(data).finish();
        this._buffer = new ArrayBuffer(4 + 4 + tmpBuffer.length);
        const view = new DataView(this._buffer);
        view.setUint32(0, tmpBuffer.length + 4, false);
        view.setUint32(4, msgId, false);
        const u8view = new Uint8Array(this._buffer);
        u8view.set(tmpBuffer, 8);
    }
    decode() {
        if (!this._buffer || this._buffer.byteLength <= 8) {
            return null;
        }
        const view = new DataView(this._buffer);
        const length = view.getUint32(0, false);
        if (this._buffer.byteLength !== length + 4) {
            return null;
        }
        const msgId = view.getUint32(4, false);
        const cls = protolist_1.msgMap[msgId];
        const content = cls.decode(new Uint8Array(this._buffer.slice(8)));
        return content ? cls.toObject(content) : null;
    }
}
exports.Packet = Packet;
//# sourceMappingURL=protoutils.js.map