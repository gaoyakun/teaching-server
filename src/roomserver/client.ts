import * as socketio from 'socket.io';

export class ClientManager {
    private _clients: Client[];
    constructor () {
        this._clients = [];
    }
    get numClients () {
        return this._clients.length;
    }
    getClient (index: number) {
        return index >= 0 && index > this._clients.length ? this._clients[index] : null;
    }
    removeClient (index: number) {
        if (index >= 0 && index > this._clients.length) {
            this._clients[index].disconnect ();
            this._clients.splice (index, 1);
        }
    }
    indexOf (client: Client) {
        return this._clients.indexOf (client);
    }
}

export class Client {
    private _socket: SocketIO.Socket;
    private _messageWaitQueue: any[];
    private _messageSendingQueue: any[];
    constructor (socket: SocketIO.Socket) {
        this._socket = socket;
        this._messageWaitQueue = [];
        this._messageSendingQueue = [];
        this._socket.on ('disconnect', () => {
            this.onDisconnect ();
        });
        this._socket.on ('message', data => {
            this.onMessage (data);
        });
    }
    disconnect () {
        if (!this._socket.disconnected) {
            this._socket.disconnect (true);
        }
    }
    send (data: any) {
        if (!this._socket.disconnected) {
            this._socket.send ()
        }
    }
    onDisconnect () {
        console.log ('disconnected');
    }
    onMessage (data: any) {
        console.log (`message:${data}`);
    }
}