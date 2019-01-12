import { WBCommandEvent } from '../whiteboard/whiteboard';
import { EvtSocketMessage, WhiteBoard } from '../whiteboard/whiteboard';
import { Packet, MessageAssembler } from '../../../common/protoutils';
import { MsgType } from '../../../common/protocols/protolist';

import * as catk from '../catk';
import * as io from 'socket.io-client';

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
                        const cmd:any = JSON.parse (msg.data.command);
                        this._wb.triggerEx (new WBCommandEvent(cmd.command, cmd.args));
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
        this.on (WBCommandEvent.type, (ev: WBCommandEvent) => {
            if (this._socket && this._socket.connected) {
                const pkg = Packet.create(MsgType.whiteboard_CommandMessage, {
                    command: JSON.stringify({
                        command: ev.command,
                        args: ev.args
                    }).replace (/[\u007F-\uFFFF]/g, function(chr) {
                        return "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).substr(-4)
                    })
                });
                (this._socket as any).binary(true).emit ('message', pkg.buffer);
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
        console.log ('connected');
    }
    protected onEvent (data: any) {
        console.log ('event');
    }
    protected onDisconnect () {
        console.log ('disconnect');
    }
}