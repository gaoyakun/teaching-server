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
    private _strokeInfo: proto.whiteboard.IDrawMessage[];
    private _lastPointIndex: number;
    private _finishDrawTimer: number|null;

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
        this._lastStrokeIndex = 0;
        this._lastPointIndex = 0;
        this._finishDrawTimer = null;
        this._eraseSize = opt.eraseSize || 20;
        this.on(lib.EvtCanvasResize.type, (evt: lib.EvtCanvasResize) => {
            if (evt.view === this.view && this._canvas) {
                this._canvas.width = evt.view.canvas.width;
                this._canvas.height = evt.view.canvas.height;
                if (this._boundingShape) {
                    this._boundingShape.rect = {x:0, y:0, w:this._canvas.width, h:this._canvas.height};
                }
            }
        })
        this.on(lib.EvtGetBoundingShape.type, (evt: lib.EvtGetBoundingShape) => {
            if (this._boundingShape === null) {
                this._boundingShape = new lib.BoundingBox ({x:0, y:0, w:this.canvas.width, h:this.canvas.height});
            }
            if (this._boundingShape) {
                evt.shape = this._boundingShape;
            }
        });
        this.on(lib.EvtHitTest.type, (evt: lib.EvtHitTest) => {
            const canvas = this.canvas;
            if (evt.x >= 0 && evt.x < canvas.width && evt.y >= 0 && evt.y < canvas.height) {
                const ctx = canvas.getContext('2d');
                const data = ctx!.getImageData (evt.x, evt.y, 1, 1);
                if (data && data.data[3] > 0) {
                    evt.result = true;
                }
            }
            evt.eat ();
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
                if (type === proto.MsgType.whiteboard_DrawMessage && ev.broadcast) {
                    this.stroke (ev);
                } else if (type === proto.MsgType.whiteboard_EraseMessage && ev.object === this.entityName) {
                    context.clearRect (data.x - data.size / 2, data.y - data.size / 2, data.size, data.size);
                }
            }
        });
        this.on (lib.EvtMouseDown.type, (ev: lib.EvtMouseDown) => {
            const pt = lib.Matrix2d.invert(this.worldTransform).transformPoint({x:ev.x, y:ev.y});
            if (this._mode === 'draw') {
                const stroke = {
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
                this._action = true;
                if (this._finishDrawTimer === null) {
                    this._finishDrawTimer = window.setInterval (this.finishDraw.bind(this), 1000)
                }
            } else if (this._mode === 'erase') {
                lib.App.triggerEvent (null, new wb.WBMessageEvent(proto.MsgType.whiteboard_EraseMessage, {
                    x: pt.x,
                    y: pt.y,
                    size: this._eraseSize
                }, undefined, this.entityName));
                this._action = true;
            }
        });
        this.on (lib.EvtMouseMove.type, (ev: lib.EvtMouseMove) => {
            this._mousePosX = ev.x;
            this._mousePosY = ev.y;
            if (this._action) {
                const pt = lib.Matrix2d.invert(this.worldTransform).transformPoint({x:ev.x, y:ev.y});
                if (this._mode === 'draw') {
                    const context = this._canvas!.getContext ('2d');
                    context!.lineTo (pt.x + 0.5, pt.y + 0.5);
                    context!.stroke ();
                    this._strokeInfo[this._strokeInfo.length-1].points!.push (pt);
                } else if (this._mode === 'erase') {
                    lib.App.triggerEvent (null, new wb.WBMessageEvent(proto.MsgType.whiteboard_EraseMessage, {
                       x: pt.x, 
                       y: pt.y,
                       size: this._eraseSize
                    }, undefined, this.entityName));
                }
            }
        });
        this.on (lib.EvtMouseUp.type, (ev: lib.EvtMouseUp) => {
            if (this._mode === 'draw' && this._action) {
                this.finishDraw ();
            }
            this._action = false;
            this._lastPointIndex = 0;
            if (this._finishDrawTimer !== null) {
                window.clearInterval (this._finishDrawTimer);
                this._finishDrawTimer = null;
            }
        });
        this.on(wb.WBGetPropertyEvent.type, (ev: wb.WBGetPropertyEvent) => {
            switch (ev.name) {
                case 'lineWidth': {
                    ev.value = this._lineWidth;
                    break;
                }
                case 'color': {
                    ev.value = this._color;
                    break;
                }
                case 'eraseSize': {
                    ev.value = this._eraseSize;
                    break;
                }
                case 'mode': {
                    ev.value = this._mode;
                    break;
                }
            }
        });
        this.on(wb.WBSetPropertyEvent.type, (ev: wb.WBSetPropertyEvent) => {
            switch (ev.name) {
                case 'lineWidth': {
                    this._lineWidth = Number(ev.value);
                    break;
                }
                case 'color': {
                    this._color = String(ev.value);
                    break;
                }
                case 'eraseSize': {
                    this._eraseSize = Number(ev.value);
                    break;
                }
                case 'mode': {
                    this._mode = String(ev.value);
                    break;
                }
            }
        });
        this.on(wb.WBGetPropertyListEvent.type, (ev: wb.WBGetPropertyListEvent) => {
            ev.properties = ev.properties || {};
            ev.properties[this.entityType] = ev.properties[this.entityType] || { desc: this.entityType, properties: [] };
            ev.properties[this.entityType].properties.push ({
                name: 'lineWidth',
                desc: '画笔宽度',
                readonly: false,
                type: 'number',
                value: this._lineWidth
            });
            ev.properties[this.entityType].properties.push ({
                name: 'color',
                desc: '画笔颜色',
                readonly: false,
                type: 'color',
                value: this._color
            });
            ev.properties[this.entityType].properties.push ({
                name: 'eraseSize',
                desc: '橡皮宽度',
                readonly: false,
                type: 'number',
                value: this._eraseSize
            });
            ev.properties[this.entityType].properties.push ({
                name: 'mode',
                desc: '操作模式',
                readonly: false,
                type: 'string',
                value: this._mode,
                enum: [{
                    value: 'draw',
                    desc: '绘制'
                }, {
                    value: 'erase',
                    desc: '擦除'
                }, {
                    value: 'none',
                    desc: '无'
                }]
            });
        });
    }
    get mode () {
        return this._mode;
    }
    set mode (value: string) {
        if (this._mode !== value) {
            if (this._mode === 'draw') {
                this.finishDraw ();
            }
            this._action = false;
            this._mode = value;
        }
    }
    get canvas () {
        if (this._canvas === null) {
            this._canvas = document.createElement('canvas');
            this._canvas.style.backgroundColor = '#00000000';
            this._canvas.width = this.view!.canvas.width;
            this._canvas.height = this.view!.canvas.height;
            if (this._boundingShape) {
                this._boundingShape = new lib.BoundingBox ({x:0, y:0, w:this._canvas.width, h:this._canvas.height});
            }
        }
        return this._canvas;
    }
    clear () {
        if (this._canvas) {
            const context = this._canvas.getContext ('2d');
            context && context.clearRect (0, 0, this._canvas.width, this._canvas.height);
        }
    }
    unstroke (ev: wb.WBMessageEvent) {
        this.clear ();
        const points = this._strokeInfo[this._strokeInfo.length - 1].points;
        points!.length = points!.length - ev.messageData.points.length;
        if (points!.length === 0) {
            this._strokeInfo.pop ();
        }
        const ctx = this.canvas.getContext ('2d');
        for (const stroke of this._strokeInfo) {
            const points = stroke.points as any;
            if (points.length > 0) {
                ctx!.lineWidth = stroke.lineWidth!;
                ctx!.strokeStyle! = stroke.color!;
                ctx!.lineCap = 'round';
                ctx!.lineJoin = 'round';
                ctx!.beginPath ();
                ctx!.moveTo (points[0].x + 0.5, points[0].y + 0.5);
                for (let i = 1; i < points.length; i++) {
                    ctx!.lineTo (points[i].x + 0.5, points[i].y + 0.5);
                }
                ctx!.stroke ();
            }
        }
    }
    stroke (ev: wb.WBMessageEvent) {
        let start;
        let stroke;
        if (ev.messageData.new) {
            start = 0;
            stroke = {
                lineWidth: ev.messageData.lineWidth,
                color: ev.messageData.color,
                points: ev.messageData.points.map ((pt: any) => { return { x: pt.x, y: pt.y } })
            };
            this._strokeInfo.push (stroke);
        } else {
            stroke = this._strokeInfo[this._strokeInfo.length-1];
            start = stroke.points!.length - 1;
            this._strokeInfo[this._strokeInfo.length-1].points!.concat (ev.messageData.points.map ((pt: any) => { return { x: pt.x, y: pt.y }}));
        }
        const context = this.canvas.getContext ('2d');
        context!.lineWidth = stroke.lineWidth;
        context!.strokeStyle = stroke.color;
        context!.lineCap = 'round';
        context!.lineJoin = 'round';
        context!.beginPath ();
        context!.moveTo (stroke.points[start].x + 0.5, stroke.points[start].y + 0.5);
        for (let i = start + 1; i < stroke.points.length; i++) {
            context!.lineTo (stroke.points[i].x + 0.5, stroke.points[i].y + 0.5);
        }
        context!.stroke ();
    }
    reset () {
        this._action = false;
        if (this._finishDrawTimer !== null) {
            window.clearInterval (this._finishDrawTimer);
            this._finishDrawTimer = null;
        }
    }
    private finishDraw () {
        const stroke = this._strokeInfo[this._strokeInfo.length - 1];
        if (this._lastPointIndex < stroke.points!.length) {
            const messageData: any = {
                entityName: this.entityName,
                new: this._lastPointIndex === 0,
                points: stroke.points!.slice (this._lastPointIndex)
            };
            if (messageData.new) {
                messageData.lineWidth = this._lineWidth,
                messageData.color = this._color;
            }
            lib.App.triggerEvent (null, new wb.WBMessageEvent(proto.MsgType.whiteboard_DrawMessage, messageData));
            this._lastPointIndex = stroke.points!.length;
        }
    }
}

export class WBFreeDrawFactory extends wb.WBFactory {
    public getCreationProperties (): wb.IProperty[] {
        return [{
            name: 'lineWidth',
            desc: '画笔宽度',
            readonly: false,
            type: 'number',
            value: 3
        }, {
            name: 'color',
            desc: '颜色',
            readonly: false,
            type: 'color',
            value: '#000000'
        }, {
            name: 'eraseSize',
            desc: '橡皮宽度',
            readonly: false,
            type: 'number',
            value: 20
        }];
    }
    protected _createEntity (options?:any): lib.SceneObject {
        return new WBFreeDraw (null, options);
    }
}