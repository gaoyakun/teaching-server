import * as lib from '../../catk';
import * as wb from '../whiteboard';

export class WBArrow extends lib.SceneObject {
    private _lineWidth: number;
    private _arrowLen: number;
    private _style: string;
    private _color: string;
    private _objectFrom: string|null;
    private _positionFrom: lib.IPoint2d|null;
    private _objectTo: string|null;
    private _positionTo: lib.IPoint2d|null;
    private _segment: lib.ISegment2d|null;
    private _boundingShape: lib.BoundingHull|null;

    constructor(parent: lib.SceneObject|null, params:any = null) {
        super(parent||undefined);
        const opt = params||{}
        this._lineWidth = Number(opt.lineWidth || 1);
        this._arrowLen = Number(opt.arrowLen || 15);
        this._style = opt.style || 'single';
        this._color = opt.color || '#000000';
        this._objectFrom = opt.objectFrom || null;
        this._positionFrom = { x:opt.positionFromX===undefined?0:Number(opt.positionFromX), y:opt.positionFromY===undefined?0:Number(opt.positionFromY) };
        this._objectTo = opt.objectTo || null;
        this._positionTo = { x:opt.positionToX===undefined?0:Number(opt.positionToX), y:opt.positionToY===undefined?0:Number(opt.positionToY) };
        this._segment = null;
        this._boundingShape = null;
        this.on(lib.EvtUpdate.type, (evt: lib.EvtUpdate) => {
            this.update ();
        })
        this.on(lib.EvtGetBoundingShape.type, (evt: lib.EvtGetBoundingShape) => {
            if (!this._boundingShape) {
                this.update ();
            }
            if (this._boundingShape) {
                evt.shape = this._boundingShape;
            }
        });
        this.on(lib.EvtDraw.type, (evt: lib.EvtDraw) => {
            if (this._segment) {
                if (this._style === 'none') {
                    evt.canvas.context.strokeStyle = this._color;
                    evt.canvas.context.lineWidth = this._lineWidth;
                    evt.canvas.context.beginPath ();
                    evt.canvas.context.moveTo (this._segment.start.x, this._segment.start.y);
                    evt.canvas.context.lineTo (this._segment.end.x, this._segment.end.y);
                    evt.canvas.context.stroke ();
                } else {
                    const double = this._style === 'double';
                    this.drawArrow (evt.canvas.context, this._segment.end.x, this._segment.end.y, this._segment.start.x, this._segment.start.y, 30, this._arrowLen, this._lineWidth, this._color, double);
                }
            }
        });
        this.on(wb.WBGetPropertyEvent.type, (ev: wb.WBGetPropertyEvent) => {
            switch (ev.name) {
                case 'lineWidth': {
                    ev.value = this._lineWidth;
                    break;
                }
                case 'arrowLen': {
                    ev.value = this._arrowLen;
                    break;
                }
                case 'style': {
                    ev.value = this._style;
                    break;
                }
                case 'color': {
                    ev.value = this._color;
                    break;
                }
                case 'objectFrom': {
                    ev.value = this._objectFrom || '';
                    break;
                }
                case 'positionFromX': {
                    ev.value = this._positionFrom ? this._positionFrom.x : null;
                    break;
                }
                case 'positionFromY': {
                    ev.value = this._positionFrom ? this._positionFrom.y : null;
                    break;
                }
                case 'objectTo': {
                    ev.value = this._objectTo || '';
                    break;
                }
                case 'positionToX': {
                    ev.value = this._positionTo ? this._positionTo.x : null;
                    break;
                }
                case 'positionToY': {
                    ev.value = this._positionTo ? this._positionTo.y : null;
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
                case 'arrowLen': {
                    this._arrowLen = Number(ev.value);
                    break;
                }
                case 'style': {
                    this._style = String(ev.value);
                    break;
                }
                case 'color': {
                    this._color = String(ev.value);
                    break;
                }
                case 'objectFrom': {
                    this._objectFrom = ev.value === '' ? null : String(ev.value);
                    break;
                }
                case 'positionFromX': {
                    if (!this._positionFrom) {
                        this._positionFrom = { x:0, y:0 };
                    }
                    this._positionFrom.x = Number(ev.value);
                    break;
                }
                case 'positionFromY': {
                    if (!this._positionFrom) {
                        this._positionFrom = { x:0, y:0 };
                    }
                    this._positionFrom.y = Number(ev.value);
                    break;
                }
                case 'objectTo': {
                    this._objectTo = ev.value === '' ? null : String(ev.value);
                    break;
                }
                case 'positionToX': {
                    if (!this._positionTo) {
                        this._positionTo = { x:0, y:0 };
                    }
                    this._positionTo.x = Number(ev.value);
                    break;
                }
                case 'positionToY': {
                    if (!this._positionTo) {
                        this._positionTo = { x:0, y:0 };
                    }
                    this._positionTo.y = Number(ev.value);
                    break;
                }
            }
        });
        this.on(wb.WBGetPropertyListEvent.type, (ev: wb.WBGetPropertyListEvent) => {
            ev.properties = ev.properties || {};
            ev.properties[this.entityType] = ev.properties[this.entityType] || { desc: this.entityType, properties: [] };
            ev.properties[this.entityType].properties.push ({
                name: 'lineWidth',
                desc: '线宽',
                readonly: false,
                type: 'number',
                value: this._lineWidth
            });
            ev.properties[this.entityType].properties.push ({
                name: 'arrowLen',
                desc: '箭头长度',
                readonly: false,
                type: 'number',
                value: this._arrowLen
            });
            ev.properties[this.entityType].properties.push ({
                name: 'style',
                desc: '箭头样式',
                readonly: false,
                type: 'string',
                value: this._style,
                enum: [{
                    value: 'none',
                    desc: '无'
                }, {
                    value: 'single',
                    desc: '单向箭头'
                }, {
                    value: 'double',
                    desc: '双向箭头'
                }]
            });
            ev.properties[this.entityType].properties.push ({
                name: 'color',
                desc: '颜色',
                readonly: false,
                type: 'color',
                value: this._color
            });
            ev.properties[this.entityType].properties.push ({
                name: 'objectFrom',
                desc: '绑定出发节点',
                readonly: false,
                type: 'string',
                value: this._objectFrom||''
            });
            ev.properties[this.entityType].properties.push ({
                name: 'positionFromX',
                desc: '出发点X坐标',
                readonly: false,
                type: 'number',
                value: this._positionFrom ? this._positionFrom.x : null
            });
            ev.properties[this.entityType].properties.push ({
                name: 'positionFromY',
                desc: '出发点Y坐标',
                readonly: false,
                type: 'number',
                value: this._positionFrom ? this._positionFrom.y : null
            });
            ev.properties[this.entityType].properties.push ({
                name: 'objectTo',
                desc: '绑定到达节点',
                readonly: false,
                type: 'string',
                value: this._objectTo||''
            });
            ev.properties[this.entityType].properties.push ({
                name: 'positionToX',
                desc: '到达点X坐标',
                readonly: false,
                type: 'number',
                value: this._positionTo ? this._positionTo.x : null
            });
            ev.properties[this.entityType].properties.push ({
                name: 'positionToY',
                desc: '到达点Y坐标',
                readonly: false,
                type: 'number',
                value: this._positionTo ? this._positionTo.y : null
            });
        });
    }
    private getSegment (): lib.ISegment2d|null {
        if (!this._positionFrom || !this._positionTo) {
            return null;
        }
        const t = this.worldTransform;
        const posFrom = t.transformPoint (this._positionFrom);
        const posTo = t.transformPoint (this._positionTo);
        const result: lib.ISegment2d = { start: { x:posFrom.x, y:posFrom.y }, end: { x:posTo.x, y:posTo.y} };
        let objectFrom: lib.SceneObject|null = null;
        let transformFrom: lib.Matrix2d|null = null;
        let objectTo: lib.SceneObject|null = null;
        let transformTo: lib.Matrix2d|null = null;
        if (this._objectFrom) {
            const ev = new wb.WBGetObjectEvent (this._objectFrom);
            lib.App.triggerEvent (null, ev);
            objectFrom = ev.object||null;
            if (objectFrom) {
                transformFrom = objectFrom.worldTransform;
                result.start.x = transformFrom.e;
                result.start.y = transformFrom.f;
            }
        }
        if (this._objectTo) {
            const ev = new wb.WBGetObjectEvent (this._objectTo);
            lib.App.triggerEvent (null, ev);
            objectTo = ev.object||null;
            if (objectTo) {
                transformTo = objectTo.worldTransform;
                result.end.x = transformTo.e;
                result.end.y = transformTo.f;
            }
        }
        if (objectFrom && transformFrom) {
            const boundingShape = objectFrom.boundingShape;
            const ptList = boundingShape ? lib.IntersectionTestShapeSegment (boundingShape.getTransformedShape(transformFrom), result) : null;
            if (ptList && ptList.length > 0) {
                result.start = ptList[0];
            }
        }
        if (objectTo && transformTo) {
            const boundingShape = objectTo.boundingShape;
            const ptList = boundingShape ? lib.IntersectionTestShapeSegment (boundingShape.getTransformedShape(transformTo), result) : null;
            if (ptList && ptList.length > 0) {
                result .end = ptList[0];
            }
        }
        const it = lib.Matrix2d.invert (t);
        result.start = it.transformPoint (result.start);
        result.end = it.transformPoint (result.end);
        return result;
    }
    private drawArrow (ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number, theta: number, headlen: number, width: number, color: string, double: boolean) {
        // 计算各角度和对应的P2,P3坐标 
        const angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI, 
        angle1 = (angle + theta) * Math.PI / 180, 
        angle2 = (angle - theta) * Math.PI / 180, 
        topX = headlen * Math.cos(angle1), 
        topY = headlen * Math.sin(angle1), 
        botX = headlen * Math.cos(angle2), 
        botY = headlen * Math.sin(angle2); 
        ctx.beginPath(); 
        let arrowX = fromX - topX;
        let arrowY = fromY - topY; 
        ctx.moveTo(arrowX, arrowY); 
        ctx.lineTo(fromX, fromY); 
        arrowX = fromX - botX;
        arrowY = fromY - botY;
        ctx.lineTo(arrowX, arrowY); 
        ctx.moveTo(fromX, fromY); 
        ctx.lineTo(toX, toY); 

        if (double) {
            arrowX = toX + topX; 
            arrowY = toY + topY; 
            ctx.moveTo(arrowX, arrowY); 
            ctx.lineTo(toX, toY); 
            arrowX = toX + botX; 
            arrowY = toY + botY; 
            ctx.lineTo(arrowX, arrowY);
        }
        ctx.strokeStyle = color; 
        ctx.lineWidth = width; 
        ctx.stroke(); 
    }
    private update () {
        // Compute segment and bounding shape
        this._segment = this.getSegment ();
        if (this._segment) {
            const v = lib.GetVector (this._segment.start, this._segment.end);
            const d = lib.VectorLength (v);
            const w = Math.floor(this._lineWidth / 2 + 3);
            const dx = w * v.y / d;
            const dy = -w * v.x / d;
            if (this._boundingShape === null) {
                this._boundingShape = new lib.BoundingHull ();
            } else {
                this._boundingShape.clear ();
            }
            this._boundingShape.addPoint ({x:this._segment.start.x + dx, y:this._segment.start.y + dy});
            this._boundingShape.addPoint ({x:this._segment.start.x - dx, y:this._segment.start.y - dy});
            this._boundingShape.addPoint ({x:this._segment.end.x - dx, y:this._segment.end.y - dy});
            this._boundingShape.addPoint ({x:this._segment.end.x + dx, y:this._segment.end.y + dy});
        }
    }
}

export class WBArrowFactory extends wb.WBFactory {
    public getCreationProperties (): wb.IProperty[] {
        return [{
            name: 'lineWidth',
            desc: '线宽',
            readonly: false,
            type: 'number',
            value: 3
        }, {
            name: 'arrowLen',
            desc: '箭头长度',
            readonly: false,
            type: 'number',
            value: 15
        }, {
            name: 'style',
            desc: '箭头样式',
            readonly: false,
            type: 'string',
            value: 'single',
            enum: [{
                value: 'none',
                desc: '无'
            }, {
                value: 'single',
                desc: '单向箭头'
            }, {
                value: 'double',
                desc: '双向箭头'
            }]
        }, {
            name: 'color',
            desc: '颜色',
            readonly: false,
            type: 'color',
            value: '#000000'
        }];
    }
    protected _createEntity (options?:any): lib.SceneObject {
        return new WBArrow (null, options);
    }
}