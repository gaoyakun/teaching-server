import * as socketio from 'socket.io';
import { Utils } from '../common/utils';
import { GetConfig } from '../lib/config';
import { Server } from '../lib/servermgr';
import { Session } from '../lib/session';
import { RoomState } from '../common/defines';

export class Client {
    private _userId: number;
    private _userAccount: string;
    private _socket: socketio.Socket|null;
    get userId () {
        return this._userId;
    }
    get userAccount () {
        return this._userAccount;
    }
    get socket () {
        return this._socket;
    }
    constructor () {
        this._userId = 0;
        this._userAccount = ''
        this._socket = null;
    }
    async init (socket: socketio.Socket) {
        const session = socket.request.session as Session;
        if (!session) {
            throw new Error('Invalid connection');
        }
        const users = await GetConfig.engine.objects('user').filter(['id', session.loginUserId]).all();
        if (!users || users.length !== 1) {
            throw new Error('Invalid user');
        }
        this._userId = session.loginUserId;
        this._userAccount = users[0].account;
        this._socket = socket;
    }
}

export class Room {
    private _clients: { [id:number]: Client };
    private _id: number;
    private _channel: string;
    constructor (id: number) {
        this._clients = {};
        this._id = id;
        this._channel = `room-${id}`;
    }
    get id () {
        return this._id;
    }
    get channel () {
        return this._channel;
    }
    get clients () {
        return this._clients;
    }
    findClient (id: number): Client|undefined {
        if (Utils.isInt(id)) {
            return this._clients[id as number];
        }
    }
    addClient (client: Client) {
        if (client && client.socket) {
            const oldClient = this.findClient (client.userId)
            if (oldClient) {
                // kick off the previous connected client
                oldClient.socket && oldClient.socket.disconnect (true);
            }
            this._clients[client.userId] = client;
        }
    }
    removeClient (client: Client) {
        if (this.findClient(client.userId) === client) {
            delete this._clients[client.userId];
        }
    }
    clear () {
        for (const clientId in this._clients) {
            const client = this._clients[clientId];
            client.socket && client.socket.disconnect ();
        }
        this._clients = {};
    }
}

export class RoomManager {
    private static _instance: RoomManager;
    private _rooms: { [id:number]: Room };
    private constructor () {
        this._rooms = {};
    }
    get rooms () {
        return this._rooms;
    }
    static instance(): RoomManager {
        if (!this._instance) {
            this._instance = new RoomManager ();
        }
        return this._instance;
    }
    findRoom (id: number): Room|undefined {
        return this._rooms[id];
    }
    async createRoom (id: number) {
        const filter = [['id',id], ['state',RoomState.Normal], ['server',0]];
        const result = await GetConfig.engine.objects('room').filter(filter).update(['state','server'], [RoomState.Active, Server.id]);
        if (!result || result.affectedRows === 0) {
            throw new Error ('Publish room failed');
        }    
        if (!this.findRoom (id)) {
            return this._rooms[id] = new Room(id);
        }
    }
    findOrCreateRoom (id: number): Room {
        return this.findRoom (id) || (this._rooms[id] = new Room(id));
    }
    async closeRoom (id: number) {
        const filter = [['id',id], ['state',RoomState.Active], ['server',Server.id]];
        const result = await GetConfig.engine.objects('room').filter(filter).update(['state'], [RoomState.Normal]);
        if (!result || result.affectedRows === 0) {
            throw new Error ('Publish room failed');
        }    
        const room = this.findRoom (id);
        if (room) {
            room.clear ();
            delete this._rooms[id];
        }
    }
}