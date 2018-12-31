import { IWBCommand } from '../whiteboard/commands';
import * as catk from '../catk';

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

abstract class ICommandServer extends catk.EventObserver {
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
    protected abstract _start (): boolean;
    protected abstract _stop (): boolean;
}

export class LocalCommandServer extends ICommandServer {
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