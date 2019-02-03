import * as socketio from 'socket.io';
import { Utils } from '../common/utils';
import { GetConfig } from '../lib/config';
import { Server } from '../lib/servermgr';
import { Session } from '../lib/session';
import { RoomState } from '../common/defines';
import { Packet } from '../common/protoutils';
import { whiteboard, room, MsgType } from '../common/protocols/protolist';
import { MessageAssembler } from '../common/protoutils';

const messageAssembler = new MessageAssembler ();

export class Client {
    private _userId: number;
    private _userAccount: string;
    private _userName: string;
    private _userAvatar: string;
    private _socket: socketio.Socket|null;
    private _room: Room|null;
    constructor () {
        this._userId = 0;
        this._userAccount = ''
        this._userName = '';
        this._userAvatar = '';
        this._socket = null;
        this._room = null;
    }
    get room () {
        return this._room;
    }
    set room (val: Room|null) {
        this._room = val;
    }
    get userId () {
        return this._userId;
    }
    get userAccount () {
        return this._userAccount;
    }
    get userName () {
        return this._userName;
    }
    get userAvatar () {
        return this._userAvatar;
    }
    get socket () {
        return this._socket;
    }
    async init (socket: socketio.Socket) {
        const session = socket.request.session as Session;
        if (!session) {
            throw new Error('Invalid connection');
        }
        const users = await GetConfig.engine.query ({
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
    }
    sendMessage (event:string, type:MsgType, data:object) {
        const pkg = Packet.create(type, data);
        if (pkg.buffer) {
            this.sendBuffer (event, Buffer.from(pkg.buffer.buffer));
        }
    }
    sendBuffer (event:string, data:Buffer) {
        if (this._socket) {
            const socket: any = this._socket;
            socket.binary(true).emit (event, data);
        }
    }
    async syncBoardEvents () {
        if (this._socket && this._room) {
            const events = await Server.redis.lrange (`room:${this._room.id}:events`, 0, -1);
            if (events) {
                let i = 0;
                for (const ev of events) {
                    this.sendBuffer ('message', new Buffer(ev, 'base64'));
                }
            }
        }
    }
    sendText (event:string, data:string) {
        if (this._socket) {
            this._socket.emit (event, data);
        }
    }
    broadCastMessage (event:string, type:MsgType, data:object, withSelf?: boolean) {
        const pkg = Packet.create(type, data);
        if (pkg.buffer) {
            this.broadCastBuffer (event, Buffer.from(pkg.buffer.buffer), withSelf);
        }
    }
    broadCastBuffer (event:string, data:Buffer, withSelf?: boolean) {
        if (this._room) {
            for (const key in this._room.clients) {
                const client = this._room.clients[key];
                if (withSelf || client !== this) {
                    client.sendBuffer (event, data);
                }
            }
        }
    }
    broadCastText (event:string, data:string, withSelf?: boolean) {
        if (this._room) {
            for (const key in this._room.clients) {
                const client = this._room.clients[key];
                if (withSelf || client !== this) {
                    client.sendText (event, data);
                }
            }
        }
    }
    disconnect () {
        if (this._socket && this._socket.connected) {
            this._socket.disconnect (true);
        }
    }
    async enterRoom (roomId: number) {
        const room = await RoomManager.instance().findOrCreateRoom (roomId);
        if (!room) {
            throw new Error ('findOrCreateRoom failed');
        } else {
            if (!await room.addClient (this)) {
                throw new Error ('addClient failed');
            }
        }
    }
    leaveRoom () {
        if (this._room) {
            this._room.removeClient (this);
        }
    }
    handleMessage (data:Buffer) {
        if (this._room) {
            const u8arr = new Uint8Array(data);
            messageAssembler.put (u8arr);
            const msg = messageAssembler.getMessage ();
            if (msg) {
                const type = msg.type as number;
                if (type >= whiteboard.MessageID.Start && type < whiteboard.MessageID.Start + 10000) {
                    Server.redis.rpush (`room:${this._room.id}:events`, data.toString('base64'));
                }
                this.broadCastBuffer ('message', data);
            }
        }
    }
}

export class Room {
    private _clients: { [id:number]: Client };
    private _commandList: Uint8Array[];
    private _id: number;
    private _channel: string;
    constructor (id: number) {
        this._clients = {};
        this._commandList = [];
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
    get commandList () {
        return this._commandList;
    }
    findClient (id: number): Client|undefined {
        if (Utils.isInt(id)) {
            return this._clients[id as number];
        }
    }
    async addClient (client: Client) {
        if (client && client.socket) {
            const oldClient = this.findClient (client.userId)
            if (oldClient !== client) {
                if (oldClient && oldClient.socket) {
                    // broadcast leave message
                    oldClient.broadCastMessage ('message', MsgType.room_LeaveRoomMessage, {
                        user: {
                            userId: oldClient.userId,
                            name: oldClient.userName
                        }
                    }, true);
                    // kick off the previous connected client
                    oldClient.disconnect ();
                    oldClient.room = null;
                    delete this._clients[client.userId];
                }
                this._clients[client.userId] = client;
                client.room = this;
                client.broadCastMessage ('message', MsgType.room_JoinRoomMessage, {
                    user: {
                        userId: client.userId,
                        name: client.userName
                    }
                }, false);
                const userList: room.IRoomUser[] = [];
                for (const roomUserId in this.clients) {
                    userList.push ({
                        userId: Number(roomUserId),
                        name: this.clients[roomUserId].userName
                    });
                }
                client.sendMessage ('message', MsgType.room_ListUsersMessage, {
                    users: userList
                });
                await client.syncBoardEvents ();
            }
            return true;
        }
        return false;
    }
    removeClient (client: Client) {
        if (client && this.findClient(client.userId) === client) {
            // broadcast leave message
            client.broadCastMessage ('message', MsgType.room_LeaveRoomMessage, {
                user: {
                    userId: client.userId,
                    name: client.userName
                }
            }, true);
            client.disconnect ();
            client.room = null;
            delete this._clients[client.userId];
        }
    }
    clear () {
        for (const key in this._clients) {
            this.removeClient(this._clients[key]);
        }
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
        const filter = ['id',id];
        const result = await GetConfig.engine.objects('room').filter(filter).update(['state','server'], [RoomState.Active, Server.id]);
        if (!result || result.affectedRows === 0) {
            throw new Error ('Publish room failed');
        }    
        if (!this.findRoom (id)) {
            return this._rooms[id] = new Room(id);
        }
    }
    async findOrCreateRoom (id: number) {
        return this.findRoom (id) || await this.createRoom(id);
    }
    async closeRoom (id: number) {
        const filter = [['id',id], ['state',RoomState.Active], ['server',Server.id]];
        const result = await GetConfig.engine.objects('room').filter(filter).update(['state','server'], [RoomState.Normal,0]);
        if (!result || result.affectedRows === 0) {
            throw new Error ('Publish room failed');
        }    
        const room = this.findRoom (id);
        if (room) {
            room.clear ();
            delete this._rooms[id];
        }
    }
    async newClient (socket: socketio.Socket) {
        const data:any = socket.handshake || socket.request;
        const roomId = Utils.safeParseInt(data.query.room);
        if (roomId === null) {
            throw new Error ('Invalid roomId parameter');
        } else {
            let client = new Client;
            await client.init (socket);
            await client.enterRoom (roomId);
            socket.once ('disconnect', reason => {
                console.log(`Disconnected:${client.userAccount} - ${reason}`);
                client.leaveRoom ();
            });
            socket.on ('message', (data:Buffer)=>{
                client.handleMessage (data);
            });
        }
    }
}