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
        this._userName = '';
        this._userAvatar = '';
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
    get userName() {
        return this._userName;
    }
    get userAvatar() {
        return this._userAvatar;
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
            const users = yield config_1.GetConfig.engine.query({
                sql: 'select u.id as id, u.account as account, u.name as name, p.avatar as avatar from user u inner join user_profile p on u.id=p.user_id where u.id=?',
                param: [session.loginUserId]
            });
            if (!users || users.length !== 1) {
                throw new Error(`Invalid user: ${JSON.stringify(session)}`);
            }
            this._userId = session.loginUserId;
            this._userAccount = users[0].account;
            this._userName = users[0].name;
            this._userAvatar = users[0].avatar;
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
    syncBoardEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._socket && this._room) {
                const events = yield servermgr_1.Server.redis.lrange(`room:${this._room.id}:events`, 0, -1);
                if (events) {
                    let i = 0;
                    for (const ev of events) {
                        this.sendBuffer('message', new Buffer(ev, 'base64'));
                    }
                }
            }
        });
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
                if (!(yield room.addClient(this))) {
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
        if (this._room) {
            const u8arr = new Uint8Array(data);
            messageAssembler.put(u8arr);
            const msg = messageAssembler.getMessage();
            if (msg) {
                const type = msg.type;
                if (type >= protolist_1.whiteboard.MessageID.Start && type < protolist_1.whiteboard.MessageID.Start + 10000) {
                    servermgr_1.Server.redis.rpush(`room:${this._room.id}:events`, data.toString('base64'));
                }
                this.broadCastBuffer('message', data);
            }
        }
    }
}
exports.Client = Client;
class Room {
    constructor(id) {
        this._clients = {};
        this._commandList = [];
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
    get commandList() {
        return this._commandList;
    }
    findClient(id) {
        if (utils_1.Utils.isInt(id)) {
            return this._clients[id];
        }
    }
    addClient(client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (client && client.socket) {
                const oldClient = this.findClient(client.userId);
                if (oldClient !== client) {
                    if (oldClient && oldClient.socket) {
                        // broadcast leave message
                        oldClient.broadCastMessage('message', protolist_1.MsgType.room_LeaveRoomMessage, {
                            user: {
                                userId: oldClient.userId,
                                name: oldClient.userName
                            }
                        }, true);
                        // kick off the previous connected client
                        oldClient.disconnect();
                        oldClient.room = null;
                        delete this._clients[client.userId];
                    }
                    this._clients[client.userId] = client;
                    client.room = this;
                    client.broadCastMessage('message', protolist_1.MsgType.room_JoinRoomMessage, {
                        user: {
                            userId: client.userId,
                            name: client.userName
                        }
                    }, false);
                    const userList = [];
                    for (const roomUserId in this.clients) {
                        userList.push({
                            userId: Number(roomUserId),
                            name: this.clients[roomUserId].userName
                        });
                    }
                    client.sendMessage('message', protolist_1.MsgType.room_ListUsersMessage, {
                        users: userList
                    });
                    yield client.syncBoardEvents();
                }
                return true;
            }
            return false;
        });
    }
    removeClient(client) {
        if (client && this.findClient(client.userId) === client) {
            // broadcast leave message
            client.broadCastMessage('message', protolist_1.MsgType.room_LeaveRoomMessage, {
                user: {
                    userId: client.userId,
                    name: client.userName
                }
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
            const roomId = utils_1.Utils.safeParseInt(data.query.room);
            if (roomId === null) {
                throw new Error('Invalid roomId parameter');
            }
            else {
                let client = new Client;
                yield client.init(socket);
                yield client.enterRoom(roomId);
                socket.once('disconnect', reason => {
                    console.log(`Disconnected:${client.userAccount} - ${reason}`);
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