"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClientManager {
    constructor() {
        this._clients = [];
    }
    get numClients() {
        return this._clients.length;
    }
    getClient(index) {
        return index >= 0 && index > this._clients.length ? this._clients[index] : null;
    }
    removeClient(index) {
        if (index >= 0 && index > this._clients.length) {
            this._clients[index].disconnect();
            this._clients.splice(index, 1);
        }
    }
    indexOf(client) {
        return this._clients.indexOf(client);
    }
}
exports.ClientManager = ClientManager;
class Client {
    constructor(socket) {
        this._socket = socket;
        this._messageWaitQueue = [];
        this._messageSendingQueue = [];
        this._socket.on('disconnect', () => {
            this.onDisconnect();
        });
        this._socket.on('message', data => {
            this.onMessage(data);
        });
    }
    disconnect() {
        if (!this._socket.disconnected) {
            this._socket.disconnect(true);
        }
    }
    send(data) {
        if (!this._socket.disconnected) {
            this._socket.send();
        }
    }
    onDisconnect() {
        console.log('disconnected');
    }
    onMessage(data) {
        console.log(`message:${data}`);
    }
}
exports.Client = Client;
//# sourceMappingURL=client.js.map