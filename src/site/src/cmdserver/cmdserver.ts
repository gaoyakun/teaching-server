import { IWBCommand } from '../whiteboard/commands';
import { Packet, MessageAssembler } from '../../../common/protoutils';
import * as proto from '../../../common/protocols/protolist';

import * as catk from '../catk';
import * as io from 'socket.io-client';

export class EvtPostCommand extends catk.BaseEvent {
    static readonly type:string = '@postCommand';
    readonly cmd: IWBCommand;
    constructor (cmd: IWBCommand) {
        super (EvtPostCommand.type);
        this.cmd = cmd;
    }
}

export class EvtReceiveCommand extends catk.BaseEvent {
    static readonly type:string = '@receiveCommand';
    readonly cmd: IWBCommand;
    constructor (cmd: IWBCommand) {
        super (EvtReceiveCommand.type);
        this.cmd = cmd;
    }
}

export abstract class CommandServer extends catk.EventObserver {
    private _started: boolean;
    constructor () {
        super ();
        this._started = false;
    }
    start (): void {
        if (!this._started && this._start ()) {
            this._started = true;
        }
    }
    stop (): void {
        if (this._started && this._stop ()) {
            this._started = false;
        }
    }
    get started (): boolean {
        return this._started;
    }
    sendBoardMessage (msg: string) {
    }
    protected abstract _start (): boolean;
    protected abstract _stop (): boolean;
}

export class LocalCommandServer extends CommandServer {
    constructor () {
        super ();
    }
    protected _start (): boolean {
        this.on (EvtPostCommand.type, (evt: EvtPostCommand) => {
            if (evt.cmd) {
                catk.App.triggerEvent (null, new EvtReceiveCommand(evt.cmd));
            }
        });
        return true;
    }
    protected _stop (): boolean {
        this.off (EvtPostCommand.type);
        return true;
    }
}

export class SocketCommandServer extends CommandServer {
    private _uri: string;
    private _socket: SocketIOClient.Socket|null;
    private _assembler: MessageAssembler;
    constructor (uri: string) {
        super ();
        this._uri = uri;
        this._socket = null;
        this._assembler = new MessageAssembler ();
    }
    sendBoardMessage (msg: string) {
        if (this._socket && this._socket.connected) {
            console.log (`Send message: ${msg}`);
            const pkg = Packet.create(proto.MsgType.whiteboard_CommandMessage, {
                command: msg
            });
            (this._socket as any).binary(true).emit ('message', pkg.buffer);
        }
    }
    protected _start (): boolean {
        this._socket = io (this._uri, {
            transports: ['websocket'],
            reconnection: false
        });
        this._socket.on ('connect', () => {
            this.onConnect ();
        });
        this._socket.on ('message', (data:any) => {
            const buf = data as Buffer;
            const u8arr = new Uint8Array(buf);
            this._assembler.put (u8arr);
            const msg = this._assembler.getMessage ();
            if (msg) {
                console.log (`Got message ${proto.MsgType[msg.type]}`);
                console.log (JSON.stringify(msg.data));
            }
        });
        this._socket.on ('disconnect', () => {
            this.onDisconnect ();
        });
        return true;
    }
    protected _stop (): boolean {
        if (this._socket) {
            this._socket.close ();
        }
        return true;
    }
    protected onConnect () {
        console.log ('connected');
    }
    protected onEvent (data: any) {
        console.log ('event');
    }
    protected onDisconnect () {
        console.log ('disconnect');
    }
}