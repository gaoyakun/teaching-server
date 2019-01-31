import { WBMessageEvent } from '../whiteboard/whiteboard';
import { EvtSocketMessage, WhiteBoard } from '../whiteboard/whiteboard';
import { Packet, MessageAssembler } from '../../../common/protoutils';
import { MsgType } from '../../../common/protocols/protolist';

import * as catk from '../catk';
import * as io from 'socket.io-client';

export class SocketStateEvent extends catk.BaseEvent {
    static readonly type: string = '@SocketState';
    readonly state: string;
    constructor (state: string) {
        super (SocketStateEvent.type);
        this.state = state;
    }
}

export class SocketCommandServer extends catk.EventObserver {
    private _uri: string;
    private _wb: WhiteBoard;
    private _socket: SocketIOClient.Socket|null;
    private _assembler: MessageAssembler;
    constructor (wb:WhiteBoard, uri: string) {
        super ();
        this._uri = uri;
        this._wb = wb;
        this._socket = null;
        this._assembler = new MessageAssembler ();
    }
    start (): boolean {
        console.log (`Trying connect to ${this._uri}`);
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
                    if (msg.type === MsgType.whiteboard_EventMessage) {
                        const msgData = new Packet(msg.data.message).getMsgData();
                        if (msgData) {
                            const ev = new WBMessageEvent(msgData.type, msgData.data, {}, msg.data.object);
                            ev.broadcast = true;
                            console.log (`Got sync message ${msgData.type}`);
                            this._wb.triggerEx (ev);
                        }
                    } else {
                        catk.App.triggerEvent (null, new EvtSocketMessage(msg.type, msg.data));
                    }
                    /*
                    if (msg.type === MsgType.whiteboard_CommandMessage) {
                        const cmd:any = JSON.parse (msg.data.command);
                        this._wb.triggerEx (new WBCommandEvent(cmd.command, cmd.args, {}, cmd.object));
                    } else {
                        catk.App.triggerEvent (null, new EvtSocketMessage(msg.type, msg.data));
                    }
                    */
                } else {
                    break;
                }
            }
        });
        this._socket.on ('disconnect', (reason:any) => {
            console.log (`Disconnected: ${reason}`);
            this.onDisconnect ();
        });
        this.on (WBMessageEvent.type, (ev:WBMessageEvent) => {
            if (this._socket && this._socket.connected) {
                const data: any = {
                    message: Packet.create(ev.messageType, ev.messageData).buffer
                };
                if (ev.object) {
                    data.object = ev.object;
                }
                const wrapPacket = Packet.create(MsgType.whiteboard_EventMessage, data);
                (this._socket as any).binary(true).emit ('message', wrapPacket.buffer);
            }    
        });
        return true;
    }
    stop (): boolean {
        if (this._socket) {
            this._socket.close ();
        }
        return true;
    }
    protected onConnect () {
        catk.App.triggerEvent (null, new SocketStateEvent('connected'));
    }
    protected onEvent (data: any) {
        catk.App.triggerEvent (null, new SocketStateEvent('event'));
    }
    protected onDisconnect () {
        catk.App.triggerEvent (null, new SocketStateEvent('disconnected'));
    }
}