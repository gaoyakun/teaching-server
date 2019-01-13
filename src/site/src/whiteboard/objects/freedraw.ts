import * as lib from '../../catk';
import * as wb from '../whiteboard';

export class WBFreeDraw extends lib.SceneObject {
    private _lineWidth: number;
    private _color: string;
    private _curveMode: number;
    private _eraseSize: number;
    private _mode: string;
    private _mousePosX: number;
    private _mousePosY: number;
    private _cp: lib.IPoint2d[];
    private _lastMoveTime: number;
    private _action: boolean;
    private _canvas: HTMLCanvasElement|null;
    private _boundingShape: lib.BoundingBox|null;

    constructor(parent: lib.SceneObject|null, params:any = null) {
        super(parent||undefined);
        this._canvas = null;
        this._boundingShape = null;
        this._cp = [];
        this._lastMoveTime = 0;
        this._action = false;
        const opt = params||{}
        this._lineWidth = Number(opt.lineWidth || 1);
        this._color = opt.color || '#000000';
        this._mode = opt.mode || 'draw';
        this._mousePosX = 0;
        this._mousePosY = 0;
        this._eraseSize = opt.eraseSize || 20;
        this._curveMode = opt.curveMode || 0;
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
        this.on (wb.WBCommandEvent.type, (ev: wb.WBCommandEvent) => {
            if (this.canvas) {
                const context = this.canvas.getContext('2d');
                if (context) {
                    if (ev.command === 'StartDraw') {
                        context.lineWidth = this._lineWidth;
                        context.strokeStyle = this._color;
                        context.lineCap = 'round';
                        context.lineJoin = 'round';
                        context.beginPath ();
                        context.moveTo (ev.args.x + 0.5, ev.args.y + 0.5);
                    } else if (ev.command === 'Drawing') {
                        if (ev.args.curveMode === 0) {
                            context.lineTo (ev.args.x + 0.5, ev.args.y + 0.5);
                            context.stroke ();
                        } else if (ev.args.curveMode === 1) {
                            if (ev.args.cp.length === 1) {
                                context.quadraticCurveTo (ev.args.cp[0].x + 0.5, ev.args.cp[0].y + 0.5, ev.args.x + 0.5, ev.args.y + 0.5);
                                context.stroke ();
                            }
                        } else if (ev.args.curveMode === 2) {
                            if (ev.args.cp.length === 2) {
                                context.bezierCurveTo (ev.args.cp[0].x + 0.5, ev.args.cp[0].y + 0.5, ev.args.cp[1].x + 0.5, ev.args.cp[1].y + 0.5, ev.args.x + 0.5, ev.args.y + 0.5);
                                context.stroke ();
                            }
                        }
                    } else if (ev.command === 'EndDraw') {
                        if (ev.args.cp.length > 0) {
                            if (ev.args.cp.length === 1) {
                                context.lineTo (ev.args.cp[0].x + 0.5, ev.args.cp[0].y + 0.5);
                            } else if (ev.args.cp.length) {
                                context.quadraticCurveTo (ev.args.cp[0].x + 0.5, ev.args.cp[0].y + 0.5, ev.args.cp[1].x + 0.5, ev.args.cp[1].y + 0.5);
                            }
                            context.stroke ();
                        }
                    } else if (ev.command === 'Erase') {
                        context.clearRect (ev.args.x - ev.args.size / 2, ev.args.y - ev.args.size / 2, ev.args.size, ev.args.size);
                    }
                }
            }
        });
        this.on (lib.EvtMouseDown.type, (ev: lib.EvtMouseDown) => {
            const pt = lib.Matrix2d.invert(this.worldTransform).transformPoint({x:ev.x, y:ev.y});
            if (this.canvas) {
                if (this._mode === 'draw') {
                    lib.App.triggerEvent (null, new wb.WBCommandEvent('StartDraw', {
                        x: pt.x,
                        y: pt.y
                    }, undefined, this.entityName));
                    this._cp.length = 0;
                    this._action = true;
                    /*
                    const context = this.canvas.getContext('2d');
                    if (context) {
                        context.lineWidth = this._lineWidth;
                        context.strokeStyle = this._color;
                        context.lineCap = 'round';
                        context.lineJoin = 'round';
                        context.beginPath ();
                        context.moveTo (pt.x + 0.5, pt.y + 0.5);
                        this._cp.length = 0;
                        this._action = true;
                    }
                    */
                } else if (this._mode === 'erase') {
                    lib.App.triggerEvent (null, new wb.WBCommandEvent('Erase', {
                        x: pt.x,
                        y: pt.y,
                        size: this._eraseSize
                    }, undefined, this.entityName));
                    this._action = true;
                    /*
                    const context = this.canvas.getContext('2d');
                    if (context) {
                        context.clearRect (pt.x - this._eraseSize / 2, pt.y - this._eraseSize / 2, this._eraseSize, this._eraseSize);
                        this._action = true;
                    }
                    */
                }
            }
        });
        this.on (lib.EvtMouseMove.type, (ev: lib.EvtMouseMove) => {
            this._mousePosX = ev.x;
            this._mousePosY = ev.y;
            if (this._action && this.canvas) {
                const pt = lib.Matrix2d.invert(this.worldTransform).transformPoint({x:ev.x, y:ev.y});
                if (this._mode === 'draw') {
                    lib.App.triggerEvent (null, new wb.WBCommandEvent('Drawing', {
                        curveMode: this._curveMode,
                        x: pt.x,
                        y: pt.y,
                        cp: this._cp,
                    }, undefined, this.entityName));
                    if (this._curveMode === 1) {
                        if (this._cp.length === 1) {
                            this._cp.length = 0;
                        } else {
                            this._cp.push ({ x: pt.x, y: pt.y});
                            this._lastMoveTime = Date.now();
                        }
                    } else if (this._curveMode === 2) {
                        if (this._cp.length === 2) {
                            this._cp.length = 0;
                        } else {
                            this._cp.push ({x: pt.x, y: pt.y});
                            this._lastMoveTime = Date.now();
                        }
                    }
                    /*
                    const context = this.canvas.getContext('2d');
                    if (context) {
                        if (this._curveMode === 0) {
                            context.lineTo (pt.x + 0.5, pt.y + 0.5);
                            context.stroke ();
                        } else if (this._curveMode === 1) {
                            if (this._cp.length === 1) {
                                context.quadraticCurveTo (this._cp[0].x + 0.5, this._cp[0].y + 0.5, pt.x + 0.5, pt.y + 0.5);
                                context.stroke ();
                                this._cp.length = 0;
                            } else {
                                this._cp.push ({x: pt.x, y: pt.y});
                                this._lastMoveTime = Date.now();
                            }
                        } else if (this._curveMode === 2) {
                            if (this._cp.length === 2) {
                                context.bezierCurveTo (this._cp[0].x + 0.5, this._cp[0].y + 0.5, this._cp[1].x + 0.5, this._cp[1].y + 0.5, pt.x + 0.5, pt.y + 0.5);
                                context.stroke ();
                                this._cp.length = 0;
                            } else {
                                this._cp.push ({x: pt.x, y: pt.y});
                                this._lastMoveTime = Date.now();
                            }
                        }
                    }
                    */
                } else if (this._mode === 'erase') {
                    lib.App.triggerEvent (null, new wb.WBCommandEvent('Erase', {
                        x: pt.x,
                        y: pt.y,
                        size: this._eraseSize
                    }, undefined, this.entityName));
                    /*
                    const context = this.canvas.getContext('2d');
                    context && context.clearRect (pt.x - this._eraseSize / 2, pt.y - this._eraseSize / 2, this._eraseSize, this._eraseSize);
                    */
                }
            }
        });
        this.on (lib.EvtFrame.type, (ev: lib.EvtFrame) => {            
            if (this._mode === 'draw' && this._action) {
                const t = Date.now();
                if (t > this._lastMoveTime + 250) {
                    this.finishDraw ();
                }
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
                case 'curveMode': {
                    ev.value = this._curveMode;
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
                case 'curveMode': {
                    this._curveMode = Number(ev.value);
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
                name: 'curveMode',
                desc: '平滑模式',
                readonly: false,
                type: 'number',
                value: this._curveMode,
                enum: [{
                    value: 0,
                    desc: '无'
                }, {
                    value: 1,
                    desc: '二次样条'
                }, {
                    value: 2,
                    desc: '三次样条'
                }]
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
        if (this.canvas && this._mode === 'draw' && this._cp.length > 0) {
            lib.App.triggerEvent (null, new wb.WBCommandEvent('EndDraw', {
                cp: this._cp
            }, undefined, this.entityName));
            this._cp.length = 0;
            /*
            const context = this.canvas.getContext('2d');
            if (context) {
                if (this._cp.length === 1) {
                    context.lineTo (this._cp[0].x + 0.5, this._cp[0].y + 0.5);
                } else if (this._cp.length) {
                    context.quadraticCurveTo (this._cp[0].x + 0.5, this._cp[0].y + 0.5, this._cp[1].x + 0.5, this._cp[1].y + 0.5);
                }
                context.stroke ();
                this._cp.length = 0;
            }
            */
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
            name: 'curveMode',
            desc: '平滑模式',
            readonly: false,
            type: 'number',
            value: 0,
            enum: [{
                value: 0,
                desc: '无'
            }, {
                value: 1,
                desc: '二次样条'
            }, {
                value: 2,
                desc: '三次样条'
            }]
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