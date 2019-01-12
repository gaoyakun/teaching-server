"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../common/utils");
const config_1 = require("../lib/config");
const servermgr_1 = require("../lib/servermgr");
const defines_1 = require("../common/defines");
const protoutils_1 = require("../common/protoutils");
const protolist_1 = require("../common/protocols/protolist");
const protoutils_2 = require("../common/protoutils");
const messageAssembler = new protoutils_2.MessageAssembler();
class Client {
    constructor() {
        this._userId = 0;
        this._userAccount = '';
        this._socket = null;
        this._room = null;
    }
    get room() {
        return this._room;
    }
    set room(val) {
        this._room = val;
    }
    get userId() {
        return this._userId;
    }
    get userAccount() {
        return this._userAccount;
    }
    get socket() {
        return this._socket;
    }
    init(socket) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = socket.request.session;
            if (!session) {
                throw new Error('Invalid connection');
            }
            const users = yield config_1.GetConfig.engine.objects('user').filter(['id', session.loginUserId]).all();
            if (!users || users.length !== 1) {
                throw new Error('Invalid user');
            }
            this._userId = session.loginUserId;
            this._userAccount = users[0].account;
            this._socket = socket;
        });
    }
    sendMessage(event, type, data) {
        const pkg = protoutils_1.Packet.create(type, data);
        if (pkg.buffer) {
            this.sendBuffer(event, Buffer.from(pkg.buffer.buffer));
        }
    }
    sendBuffer(event, data) {
        if (this._socket) {
            const socket = this._socket;
            socket.binary(true).emit(event, data);
        }
    }
    sendText(event, data) {
        if (this._socket) {
            this._socket.emit(event, data);
        }
    }
    broadCastMessage(event, type, data, withSelf) {
        const pkg = protoutils_1.Packet.create(type, data);
        if (pkg.buffer) {
            this.broadCastBuffer(event, Buffer.from(pkg.buffer.buffer), withSelf);
        }
    }
    broadCastBuffer(event, data, withSelf) {
        if (this._room) {
            for (const key in this._room.clients) {
                const client = this._room.clients[key];
                if (withSelf || client !== this) {
                    client.sendBuffer(event, data);
                }
            }
        }
    }
    broadCastText(event, data, withSelf) {
        if (this._room) {
            for (const key in this._room.clients) {
                const client = this._room.clients[key];
                if (withSelf || client !== this) {
                    client.sendText(event, data);
                }
            }
        }
    }
    disconnect() {
        if (this._socket && this._socket.connected) {
            this._socket.disconnect(true);
        }
    }
    enterRoom(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield RoomManager.instance().findOrCreateRoom(roomId);
            if (!room) {
                throw new Error('findOrCreateRoom failed');
            }
            else {
                if (!room.addClient(this)) {
                    throw new Error('addClient failed');
                }
            }
        });
    }
    leaveRoom() {
        if (this._room) {
            this._room.removeClient(this);
        }
    }
    handleMessage(data) {
        const u8arr = new Uint8Array(data);
        messageAssembler.put(u8arr);
        const msg = messageAssembler.getMessage();
        if (msg) {
            console.log(`Got message ${protolist_1.MsgType[msg.type]}`);
            console.log(JSON.stringify(msg.data));
        }
        this.broadCastBuffer('message', data);
    }
}
exports.Client = Client;
class Room {
    constructor(id) {
        this._clients = {};
        this._id = id;
        this._channel = `room-${id}`;
    }
    get id() {
        return this._id;
    }
    get channel() {
        return this._channel;
    }
    get clients() {
        return this._clients;
    }
    findClient(id) {
        if (utils_1.Utils.isInt(id)) {
            return this._clients[id];
        }
    }
    addClient(client) {
        if (client && client.socket) {
            const oldClient = this.findClient(client.userId);
            if (oldClient !== client) {
                if (oldClient && oldClient.socket) {
                    // broadcast leave message
                    oldClient.broadCastMessage('message', protolist_1.MsgType.room_LeaveRoomMessage, {
                        account: oldClient.userAccount,
                        userId: oldClient.userId
                    }, true);
                    // kick off the previous connected client
                    oldClient.disconnect();
                    oldClient.room = null;
                    delete this._clients[client.userId];
                }
                this._clients[client.userId] = client;
                client.room = this;
                client.broadCastMessage('message', protolist_1.MsgType.room_JoinRoomMessage, {
                    account: client.userAccount,
                    userId: client.userId
                }, true);
            }
            return true;
        }
        return false;
    }
    removeClient(client) {
        if (client && this.findClient(client.userId) === client) {
            // broadcast leave message
            client.broadCastMessage('message', protolist_1.MsgType.room_LeaveRoomMessage, {
                account: client.userAccount,
                userId: client.userId
            }, true);
            client.disconnect();
            client.room = null;
            delete this._clients[client.userId];
        }
    }
    clear() {
        for (const key in this._clients) {
            this.removeClient(this._clients[key]);
        }
    }
}
exports.Room = Room;
class RoomManager {
    constructor() {
        this._rooms = {};
    }
    get rooms() {
        return this._rooms;
    }
    static instance() {
        if (!this._instance) {
            this._instance = new RoomManager();
        }
        return this._instance;
    }
    findRoom(id) {
        return this._rooms[id];
    }
    createRoom(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = ['id', id];
            const result = yield config_1.GetConfig.engine.objects('room').filter(filter).update(['state', 'server'], [defines_1.RoomState.Active, servermgr_1.Server.id]);
            if (!result || result.affectedRows === 0) {
                throw new Error('Publish room failed');
            }
            if (!this.findRoom(id)) {
                return this._rooms[id] = new Room(id);
            }
        });
    }
    findOrCreateRoom(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findRoom(id) || (yield this.createRoom(id));
        });
    }
    closeRoom(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = [['id', id], ['state', defines_1.RoomState.Active], ['server', servermgr_1.Server.id]];
            const result = yield config_1.GetConfig.engine.objects('room').filter(filter).update(['state', 'server'], [defines_1.RoomState.Normal, 0]);
            if (!result || result.affectedRows === 0) {
                throw new Error('Publish room failed');
            }
            const room = this.findRoom(id);
            if (room) {
                room.clear();
                delete this._rooms[id];
            }
        });
    }
    newClient(socket) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = socket.handshake || socket.request;
            if (!data || !data.query) {
                throw new Error('Invalid handshake data');
            }
            const roomId = utils_1.Utils.safeParseInt(data.query.room);
            if (roomId === null) {
                throw new Error('Invalid roomId parameter');
            }
            else {
                let client = new Client;
                yield client.init(socket);
                yield client.enterRoom(roomId);
                socket.once('disconnect', () => {
                    client.leaveRoom();
                });
                socket.on('message', (data) => {
                    client.handleMessage(data);
                });
            }
        });
    }
}
exports.RoomManager = RoomManager;
//# sourceMappingURL=roommgr.js.map