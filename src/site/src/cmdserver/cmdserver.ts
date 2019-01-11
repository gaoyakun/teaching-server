import { IWBCommand } from '../whiteboard/commands';
import { EvtSocketMessage, WhiteBoard } from '../whiteboard/whiteboard';
import { Packet, MessageAssembler } from '../../../common/protoutils';
import { MsgType } from '../../../common/protocols/protolist';

import * as catk from '../catk';
import * as io from 'socket.io-client';

export abstract class CommandServer extends catk.EventObserver {
    protected _wb: WhiteBoard;
    private _started: boolean;
    constructor (wb: WhiteBoard) {
        super ();
        this._started = false;
        this._wb = wb;
    }
    get whiteboard () {
        return this._wb;
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
    executeCommand(cmd: IWBCommand) {
        this._executeCommand (cmd);
    }
    protected abstract _executeCommand (cmd: IWBCommand):void;
    protected abstract _start (): boolean;
    protected abstract _stop (): boolean;
}

export class LocalCommandServer extends CommandServer {
    constructor (wb: WhiteBoard) {
        super (wb);
    }
    protected _executeCommand (cmd: IWBCommand): void {
        this._wb.executeCommand (cmd);
    }
    protected _start (): boolean {
        return true;
    }
    protected _stop (): boolean {
        return true;
    }
}

export class SocketCommandServer extends CommandServer {
    private _uri: string;
    private _socket: SocketIOClient.Socket|null;
    private _assembler: MessageAssembler;
    constructor (wb:WhiteBoard, uri: string) {
        super (wb);
        this._uri = uri;
        this._socket = null;
        this._assembler = new MessageAssembler ();
    }
    protected _executeCommand(cmd: IWBCommand) {
        this._wb.executeCommand (cmd);
        if (this._socket && this._socket.connected) {
            const pkg = Packet.create(MsgType.whiteboard_CommandMessage, {
                command: JSON.stringify(cmd)
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
            while (true) {
                const msg = this._assembler.getMessage ();
                if (msg) {
                    if (msg.type === MsgType.whiteboard_CommandMessage) {
                        const cmd = JSON.parse (msg.data.command) as IWBCommand;
                        this._wb.executeCommand (cmd);
                    } else {
                        catk.App.triggerEvent (null, new EvtSocketMessage(msg.type, msg.data));
                    }
                } else {
                    break;
                }
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