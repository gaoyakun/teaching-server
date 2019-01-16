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
    private _lastMoveTime: number;
    private _action: boolean;
    private _canvas: HTMLCanvasElement|null;
    private _boundingShape: lib.BoundingBox|null;
    private _strokeInfo: proto.whiteboard.IDrawMessage;

    constructor(parent: lib.SceneObject|null, params:any = null) {
        super(parent||undefined);
        this._canvas = null;
        this._boundingShape = null;
        this._lastMoveTime = 0;
        this._action = false;
        const opt = params||{}
        this._lineWidth = Number(opt.lineWidth || 1);
        this._color = opt.color || '#000000';
        this._mode = opt.mode || 'draw';
        this._mousePosX = 0;
        this._mousePosY = 0;
        this._strokeInfo = {
            lineWidth: this._lineWidth,
            color: this._color,
            points: []
        };
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
            if (this._boundingShape === null && this.canvas) {
                this._boundingShape = new lib.BoundingBox ({x:0, y:0, w:this.canvas.width, h:this.canvas.height});
            }
            if (this._boundingShape) {
                evt.shape = this._boundingShape;
            }
        });
        this.on(lib.EvtHitTest.type, (evt: lib.EvtHitTest) => {
            const canvas = this.canvas;
            if (canvas && evt.x >= 0 && evt.x < canvas.width && evt.y >= 0 && evt.y < canvas.height) {
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    const data = ctx.getImageData (evt.x, evt.y, 1, 1);
                    if (data && data.data[3] > 0) {
                        evt.result = true;
                    }
                }
            }
            evt.eat ();
        });
        this.on(lib.EvtDraw.type, (evt: lib.EvtDraw) => {
            if (this.canvas) {
                const w = this.canvas.width;
                const h = this.canvas.height;
                evt.canvas.context.drawImage (this.canvas, -Math.round(w * this.anchorPoint.x)-0.5, -Math.round(h * this.anchorPoint.y)-0.5, w, h);
                if (this._mode === 'erase') {
                    evt.canvas.context.strokeStyle = '#000000';
                    evt.canvas.context.strokeRect (Math.round(this._mousePosX - this._eraseSize/2), Math.round(this._mousePosY - this._eraseSize/2), this._eraseSize, this._eraseSize);
                }
            }
        });
        this.on (wb.WBMessageEvent.type, (ev: wb.WBMessageEvent) => {
            if (this.canvas) {
                const context = this.canvas.getContext('2d');
                if (context) {
                    const type = ev.messageType;
                    const data = ev.messageData;
                    if (type === proto.MsgType.whiteboard_StartDrawMessage) {
                        this._strokeInfo.lineWidth = data.lineWidth;
                        this._strokeInfo.color = data.color;
                        this._strokeInfo.points = [{x: data.x, y: data.y}];
                        context.lineWidth = data.lineWidth;
                        context.strokeStyle = data.color;
                        context.lineCap = 'round';
                        context.lineJoin = 'round';
                        context.beginPath ();
                        context.moveTo (data.x + 0.5, data.y + 0.5);
                    } else if (type === proto.MsgType.whiteboard_DrawingMessage) {
                        this._strokeInfo.points && this._strokeInfo.points.push ({x:data.x, y:data.y});
                        context.lineTo (data.x + 0.5, data.y + 0.5);
                        context.stroke ();
                    } else if (type === proto.MsgType.whiteboard_DrawMessage && ev.broadcast) {
                        if (data.points.length > 1) {
                            context.lineWidth = data.lineWidth;
                            context.strokeStyle = data.color;
                            context.lineCap = 'round';
                            context.lineJoin = 'round';
                            context.beginPath ();
                            context.moveTo (data.points[0].x + 0.5, data.points[0].y + 0.5);
                            for (let i = 1; i < data.points.length; i++) {
                                context.lineTo (data.points[i].x + 0.5, data.points[i].y + 0.5);
                            }
                            context.stroke ();
                        }
                    } else if (type === proto.MsgType.whiteboard_EraseMessage) {
                        context.clearRect (data.x - data.size / 2, data.y - data.size / 2, data.size, data.size);
                    }
                }
            }
        });
        this.on (lib.EvtMouseDown.type, (ev: lib.EvtMouseDown) => {
            const pt = lib.Matrix2d.invert(this.worldTransform).transformPoint({x:ev.x, y:ev.y});
            if (this.canvas) {
                if (this._mode === 'draw') {
                    lib.App.triggerEvent (null, new wb.WBMessageEvent(proto.MsgType.whiteboard_StartDrawMessage, {
                        x: pt.x,
                        y: pt.y,
                        lineWidth: this._lineWidth,
                        color: this._color
                    }, undefined, this.entityName))
                    this._action = true;
                } else if (this._mode === 'erase') {
                    lib.App.triggerEvent (null, new wb.WBMessageEvent(proto.MsgType.whiteboard_EraseMessage, {
                        x: pt.x,
                        y: pt.y,
                        size: this._eraseSize
                    }, undefined, this.entityName));
                    this._action = true;
                }
            }
        });
        this.on (lib.EvtMouseMove.type, (ev: lib.EvtMouseMove) => {
            this._mousePosX = ev.x;
            this._mousePosY = ev.y;
            if (this._action && this.canvas) {
                const pt = lib.Matrix2d.invert(this.worldTransform).transformPoint({x:ev.x, y:ev.y});
                if (this._mode === 'draw') {
                    lib.App.triggerEvent (null, new wb.WBMessageEvent(proto.MsgType.whiteboard_DrawingMessage, {
                        x: pt.x,
                        y: pt.y
                    }, undefined, this.entityName));
                    this._lastMoveTime = Date.now();
                } else if (this._mode === 'erase') {
                   lib.App.triggerEvent (null, new wb.WBMessageEvent(proto.MsgType.whiteboard_EraseMessage, {
                       x: pt.x, 
                       y: pt.y,
                       size: this._eraseSize
                   }, undefined, this.entityName));
                }
            }
        });
        this.on (lib.EvtFrame.type, (ev: lib.EvtFrame) => {            
            const t = Date.now();
            if (t > this._lastMoveTime + 250) {
                this.finishDraw ();
            }
        });
        this.on (lib.EvtMouseUp.type, (ev: lib.EvtMouseUp) => {
            if (this._mode === 'draw' && this._action) {
                this.finishDraw ();
            }
            this._action = false;
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
        if (this._canvas === null && this.view) {
            this._canvas = document.createElement('canvas');
            this._canvas.style.backgroundColor = '#00000000';
            this._canvas.width = this.view.canvas.width;
            this._canvas.height = this.view.canvas.height;
            if (this._boundingShape) {
                this._boundingShape = new lib.BoundingBox ({x:0, y:0, w:this._canvas.width, h:this._canvas.height});
            }
        }
        return this._canvas;
    }
    private finishDraw () {
        if (this._strokeInfo.points && this._strokeInfo.points.length > 1) {
            lib.App.triggerEvent (null, new wb.WBMessageEvent(proto.MsgType.whiteboard_DrawMessage, this._strokeInfo, undefined, this.entityName));
            this._strokeInfo.points = [this._strokeInfo.points[this._strokeInfo.points.length-1]];
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