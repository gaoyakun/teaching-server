import * as lib from '../../catk';
import * as wb from '../whiteboard';
import * as proto from '../../../../common/protocols/protolist';

export class WBFreeDraw extends lib.SceneObject {
    private _lineWidth: number;
    private _color: string;
    private _eraseSize: number;
    private _mode: string;
    private _mousePosX: number;
    private _mousePosY: number;
    private _action: boolean;
    private _canvas: HTMLCanvasElement|null;
    private _boundingShape: lib.BoundingBox|null;
    private _strokeInfo: proto.whiteboard.IStrokeMessage[];

    constructor(parent: lib.SceneObject|null, params:any = null) {
        super(parent||undefined);
        this._canvas = null;
        this._boundingShape = null;
        this._action = false;
        const opt = params||{}
        this._lineWidth = Number(opt.lineWidth || 1);
        this._color = opt.color || '#000000';
        this._mode = opt.mode || 'draw';
        this._mousePosX = 0;
        this._mousePosY = 0;
        this._strokeInfo = [];
        this._lastPoint = null;
        this._eraseSize = opt.eraseSize || 20;
        this.on(lib.EvtCanvasResize.type, (evt: lib.EvtCanvasResize) => {
            if (evt.view === this.view && this._canvas) {
                let context = this._canvas.getContext ('2d');
                const imageData = context!.getImageData (0, 0, this._canvas.width, this._canvas.height);
                this._canvas.width = evt.view.canvas.width;
                this._canvas.height = evt.view.canvas.height;
                context = this._canvas.getContext ('2d');
                context!.putImageData (imageData, 0, 0);
                this._boundingShape!.rect = {x:0, y:0, w:this._canvas.width, h:this._canvas.height};
            }
        })
        this.on(lib.EvtGetBoundingShape.type, (evt: lib.EvtGetBoundingShape) => {
            return null;
        });
        this.on(lib.EvtDraw.type, (evt: lib.EvtDraw) => {
            const w = this.canvas.width;
            const h = this.canvas.height;
            evt.canvas.context.drawImage (this.canvas, -Math.round(w * this.anchorPoint.x)-0.5, -Math.round(h * this.anchorPoint.y)-0.5, w, h);
            if (this._mode === 'erase') {
                evt.canvas.context.strokeStyle = '#000000';
                evt.canvas.context.strokeRect (Math.round(this._mousePosX - this._eraseSize/2), Math.round(this._mousePosY - this._eraseSize/2), this._eraseSize, this._eraseSize);
            }
        });
        this.on (wb.WBMessageEvent.type, (ev: wb.WBMessageEvent) => {
            const context = this.canvas.getContext('2d');
            if (context) {
                const type = ev.messageType;
                const data = ev.messageData;
                if (type === proto.MsgType.whiteboard_StrokeMessage && ev.broadcast) {
                    const stroke: proto.whiteboard.IStrokeMessage = {
                        entityName: this.entityName,
                        type: data.type,
                        points: data.points,
                        lineWidth: data.lineWidth,
                        color: data.color,
                        size: data.size
                    };
                    this._strokeInfo.push (stroke);
                    this.stroke (stroke);
                }
            }
        });
        this.on (lib.EvtMouseDown.type, (ev: lib.EvtMouseDown) => {
            if (!this._action) {
                this._action = true;
                const pt = lib.Matrix2d.invert(this.worldTransform).transformPoint({x:ev.x, y:ev.y});
                if (this._mode === 'draw') {
                    const stroke = {
                        entityName: this.entityName,
                        type: proto.whiteboard.StrokeType.Draw,
                        lineWidth: this._lineWidth,
                        color: this._color,
                        points: [{ x: pt.x, y: pt.y }]
                    };
                    this._strokeInfo.push (stroke);
                    const ctx = this.canvas!.getContext('2d');
                    ctx!.lineWidth = stroke.lineWidth;
                    ctx!.strokeStyle = stroke.color;
                    ctx!.lineCap = 'round';
                    ctx!.lineJoin = 'round';
                    ctx!.beginPath ();
                    ctx!.moveTo (pt.x + 0.5, pt.y + 0.5);
                } else {
                    const stroke = {
                        entityName: this.entityName,
                        type: proto.whiteboard.StrokeType.Erase,
                        size: this._eraseSize,
                        points: [{ x: pt.x, y: pt.y }]
                    };
                    this._strokeInfo.push (stroke);
                    const ctx = this.canvas!.getContext('2d');
                    ctx!.clearRect (pt.x - this._eraseSize / 2, pt.y - this._eraseSize / 2, this._eraseSize, this._eraseSize);
                }
            }
        });
        this.on (lib.EvtMouseMove.type, (ev: lib.EvtMouseMove) => {
            this._mousePosX = ev.x;
            this._mousePosY = ev.y;
            if (this._action) {
                const pt = lib.Matrix2d.invert(this.worldTransform).transformPoint({x:ev.x, y:ev.y});
                this._strokeInfo[this._strokeInfo.length-1].points!.push (pt);
                const context = this._canvas!.getContext ('2d');
                if (this._mode === 'draw') {
                    context!.lineTo (pt.x + 0.5, pt.y + 0.5);
                    context!.stroke ();
                } else {
                    context!.clearRect (pt.x - this._eraseSize / 2, pt.y - this._eraseSize / 2, this._eraseSize, this._eraseSize);
                }
            }
        });
        this.on (lib.EvtMouseUp.type, (ev: lib.EvtMouseUp) => {
            if (this._action) {
                this._action = false;
                this.repaint ();
                lib.App.triggerEvent (null, new wb.WBMessageEvent(proto.MsgType.whiteboard_StrokeMessage, this._strokeInfo[this._strokeInfo.length-1]));
            }
        });
    }
    get lineWidth () {
        return this._lineWidth;
    }
    set lineWidth (val: number) {
        this._lineWidth = val;
    }
    get color () {
        return this._color;
    }
    set color (val: string) {
        this._color = val;
    }
    get eraseSize () {
        return this._eraseSize;
    }
    set eraseSize (val: number) {
        this._eraseSize = val;
    }
    get mode () {
        return this._mode;
    }
    set mode (value: string) {
        this.reset ();
        this._mode = value;
    }
    get canvas () {
        if (this._canvas === null) {
            this._canvas = document.createElement('canvas');
            this._canvas.style.backgroundColor = '#00000000';
            this._canvas.width = this.view!.canvas.width;
            this._canvas.height = this.view!.canvas.height;
            this._boundingShape = new lib.BoundingBox ({x:0, y:0, w:this._canvas.width, h:this._canvas.height});
        }
        return this._canvas;
    }
    clear () {
        if (this._canvas) {
            const context = this._canvas.getContext ('2d');
            context && context.clearRect (0, 0, this._canvas.width, this._canvas.height);
        }
    }
    repaint () {
        this.clear ();
        for (const stroke of this._strokeInfo) {
            this.stroke (stroke);
        }
    }
    unstroke (ev: wb.WBMessageEvent) {
        if (this._strokeInfo.length > 0) {
            this._strokeInfo.pop ();
            this.repaint ();
        }
    }
    stroke (data: proto.whiteboard.IStrokeMessage) {
        const context = this.canvas.getContext ('2d');
        const pt: any = data.points;
        if (data.type === proto.whiteboard.StrokeType.Draw) {
            context!.lineWidth = data.lineWidth!;
            context!.strokeStyle = data.color!;
            context!.lineCap = 'round';
            context!.lineJoin = 'round';
            context!.beginPath ();
            context!.moveTo (pt[0].x + 0.5, pt[0].y + 0.5);
            for (let i = 1; i < pt.length; i++) {
                context!.lineTo (pt[i].x + 0.5, pt[i].y + 0.5);
            }
            context!.stroke ();
        } else {
            for (const p of pt) {
                context!.clearRect (p.x - data.size! / 2, p.y - data.size! / 2, data.size!, data.size!);
            }
        }
    }
    reset () {
        this._action = false;
    }
}

export class WBFreeDrawFactory extends wb.WBFactory {
    protected _createEntity (options?:any): lib.SceneObject {
        return new WBFreeDraw (null, options);
    }
}