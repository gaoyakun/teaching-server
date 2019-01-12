"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protolist_1 = require("./protocols/protolist");
function getUint32(array, offset) {
    let result = array[offset] << 24;
    result += array[offset + 1] << 16;
    result += array[offset + 2] << 8;
    result += array[offset + 3];
    return result;
}
function setUint32(array, offset, num) {
    array[offset] = (num >> 24) & 0xff;
    array[offset + 1] = (num >> 16) & 0xff;
    array[offset + 2] = (num >> 8) & 0xff;
    array[offset + 3] = num & 0xff;
}
class Packet {
    constructor(buffer) {
        this._buffer = buffer || null;
    }
    static create(msgId, data) {
        const packet = new Packet();
        packet.encode(msgId, data);
        return packet;
    }
    get buffer() {
        return this._buffer;
        // return this._buffer ? this._buffer.buffer.slice (this._buffer.byteOffset, this._buffer.byteOffset + this._buffer.byteLength) : null;
    }
    getMsgData() {
        if ((!this._buffer) || this._buffer.byteLength < 8) {
            return null;
        }
        const length = getUint32(this._buffer, 0);
        if (this._buffer.byteLength < length + 4) {
            return null;
        }
        const msgId = getUint32(this._buffer, 4);
        const msgData = { type: msgId };
        if (this._buffer.byteLength > 8) {
            const cls = protolist_1.msgMap[msgId];
            const content = cls.decode(this._buffer.subarray(8, length + 4));
            if (content) {
                msgData.data = cls.toObject(content);
            }
        }
        return msgData;
    }
    encode(msgId, data) {
        const cls = protolist_1.msgMap[msgId];
        const tmpBuffer = cls.encode(data).finish();
        this._buffer = new Uint8Array(4 + 4 + tmpBuffer.length);
        setUint32(this._buffer, 0, tmpBuffer.length + 4);
        setUint32(this._buffer, 4, msgId);
        this._buffer.set(tmpBuffer, 8);
    }
}
exports.Packet = Packet;
class MessageAssembler {
    constructor() {
        this.BUFFER_INCR_SIZE = 1024;
        this._buffer = new Uint8Array(this.BUFFER_INCR_SIZE);
        this._offset = 0;
        this._length = 0;
        this._messages = [];
    }
    put(data) {
        if (this._buffer.byteLength - this._offset - this._length >= data.byteLength) {
            this._buffer.set(data, this._offset + this._length);
        }
        else if (this._buffer.byteLength - this._length >= data.byteLength) {
            this._buffer.copyWithin(0, this._offset, this._offset + this._length);
            this._offset = 0;
            this._buffer.set(data, this._length);
        }
        else {
            let len = this._buffer.byteLength;
            while (len - this._length < data.byteLength) {
                len += this.BUFFER_INCR_SIZE;
            }
            const newBuffer = new Uint8Array(len);
            newBuffer.set(this._buffer.subarray(this._offset, this._offset + this._length), 0);
            newBuffer.set(data, this._length);
            this._buffer = newBuffer;
            this._offset = 0;
        }
        this._length += data.byteLength;
        while (true) {
            const message = this._get();
            if (!message) {
                break;
            }
            this._messages.push(message);
        }
    }
    getMessage() {
        return this._messages.shift() || null;
    }
    _get() {
        if (this._length < 4) {
            return null;
        }
        let packetLen = getUint32(this._buffer, this._offset);
        if (!packetLen) {
            return null;
        }
        packetLen += 4;
        if (this._length < packetLen) {
            return null;
        }
        const packetData = this._buffer.subarray(this._offset, this._offset + packetLen);
        this._offset += packetLen;
        this._length -= packetLen;
        return new Packet(packetData).getMsgData();
    }
}
exports.MessageAssembler = MessageAssembler;
//# sourceMappingURL=protoutils.js.map