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
class Client {
    get userId() {
        return this._userId;
    }
    get userAccount() {
        return this._userAccount;
    }
    get socket() {
        return this._socket;
    }
    constructor() {
        this._userId = 0;
        this._userAccount = '';
        this._socket = null;
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
            if (oldClient) {
                // kick off the previous connected client
                oldClient.socket && oldClient.socket.disconnect(true);
            }
            this._clients[client.userId] = client;
        }
    }
    removeClient(client) {
        if (this.findClient(client.userId) === client) {
            delete this._clients[client.userId];
        }
    }
    clear() {
        for (const clientId in this._clients) {
            const client = this._clients[clientId];
            client.socket && client.socket.disconnect();
        }
        this._clients = {};
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
            const filter = [['id', id], ['state', defines_1.RoomState.Normal], ['server', 0]];
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
        return this.findRoom(id) || (this._rooms[id] = new Room(id));
    }
    closeRoom(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = [['id', id], ['state', defines_1.RoomState.Active], ['server', servermgr_1.Server.id]];
            const result = yield config_1.GetConfig.engine.objects('room').filter(filter).update(['state'], [defines_1.RoomState.Normal]);
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
}
exports.RoomManager = RoomManager;
//# sourceMappingURL=roommgr.js.map