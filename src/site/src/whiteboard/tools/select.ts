import * as lib from '../../catk';
import * as wb from '../whiteboard';
import { MsgType } from '../../../../common/protocols/protolist';

export class WBSelectEvent extends lib.BaseEvent {
    static readonly type: string = '@WBSelect';
    constructor() {
        super(WBSelectEvent.type);
    }
}

export class WBDeselectEvent extends lib.BaseEvent {
    static readonly type: string = '@WBDeselect';
    constructor() {
        super(WBDeselectEvent.type);
    }
}

export class WBObjectSelectedEvent extends lib.BaseEvent {
    static readonly type: string = '@WBObjectSelected';
    readonly object: lib.SceneObject;
    constructor (object: lib.SceneObject) {
        super (WBObjectSelectedEvent.type);
        this.object = object;
    }
}

export class WBObjectDeselectedEvent extends lib.BaseEvent {
    static readonly type: string = '@WBObjectDeselected';
    readonly object: lib.SceneObject;
    constructor (object: lib.SceneObject) {
        super (WBObjectDeselectedEvent.type);
        this.object = object;
    }
}
export class WBSelectComponent extends lib.Component {
    static readonly type = 'WBSelect';
    private static selectPattern: CanvasPattern|null = null;
    private static patternImage: HTMLImageElement|null = null;
    readonly tool: WBSelectTool;
    private _selected: boolean;
    constructor(tool: WBSelectTool) {
        super(WBSelectComponent.type);
        this.tool = tool;
        this._selected = false;
        this.on(lib.EvtDraw.type, (evt: lib.EvtDraw) => {
            if (this._selected) {
                const shape = (this.object as lib.SceneObject).boundingShape;
                if (shape) {
                    const bbox = shape.getBoundingbox ();
                    if (bbox) {
                        if (!WBSelectComponent.selectPattern && !WBSelectComponent.patternImage) {
                            WBSelectComponent.patternImage = new Image ();
                            WBSelectComponent.patternImage.src = '/images/dragger-4x4.gif';
                            WBSelectComponent.patternImage.onload = function () {
                                WBSelectComponent.selectPattern = evt.canvas.context.createPattern (WBSelectComponent.patternImage!, 'repeat');
                                WBSelectComponent.patternImage = null;
                            }
                        }
                        evt.canvas.context.strokeStyle = '#000';
                        evt.canvas.context.lineWidth = 1;
                        if (WBSelectComponent.selectPattern) {
                            evt.canvas.context.imageSmoothingEnabled = false;
                            evt.canvas.context.fillStyle = WBSelectComponent.selectPattern;
                            evt.canvas.context.fillRect (bbox.x - 16, bbox.y - 16, bbox.w + 32, bbox.h + 32);
                        }
                        evt.canvas.context.strokeRect (bbox.x, bbox.y, bbox.w, bbox.h);
                    }
                }
            }
        }, lib.EventListenerOrder.FIRST);
        this.on(WBSelectEvent.type, (evt: WBSelectEvent) => {
            this._selected = true;
        });
        this.on(WBDeselectEvent.type, (evt: WBDeselectEvent) => {
            this._selected = false;
        });
    }
}

export class WBSelectTool extends wb.WBTool {
    public static readonly toolname: string = 'Select';
    private _selectedObject: lib.SceneObject|null;
    private _moving: boolean;
    private _mouseStartPosX: number;
    private _mouseStartPosY: number;
    private _objectLastPos: { x:number,y:number };
    private _lastMoveTime: number;
    constructor(whiteboard: wb.WhiteBoard) {
        super(WBSelectTool.toolname, whiteboard);
        this._selectedObject = null;
        this._moving = false;
        this._mouseStartPosX = 0;
        this._mouseStartPosY = 0;
        this._objectLastPos = { x:0, y:0 };
        this._lastMoveTime = 0;
    }
    get selectedObject () {
        return this._selectedObject;
    }
    activate(options?: any) {
        super.activate (options);
        this._selectedObject = null;
        this.on (lib.EvtKeyDown.type, (ev: lib.EvtKeyDown) => {
            if (this._selectedObject) {
                this._selectedObject.triggerEx (ev);
            }
        });
        this.on (lib.EvtKeyUp.type, (ev: lib.EvtKeyUp) => {
            if (this._selectedObject) {
                this._selectedObject.triggerEx (ev);
            }
        });
        this.on (lib.EvtKeyPress.type, (ev: lib.EvtKeyPress) => {
            if (this._selectedObject) {
                this._selectedObject.triggerEx (ev);
            }
        });
        this.on (lib.EvtMouseDown.type, (ev: lib.EvtMouseDown) => {
            this._mouseStartPosX = ev.x;
            this._mouseStartPosY = ev.y;
            const view = this._wb.view;
            if (view) {
                const hitObjects = view.hitObjects;
                if (hitObjects.length > 1) {
                    this.selectObject (hitObjects[0], ev);
                    this._moving = true;
                    this._lastMoveTime = Date.now();
                    this._objectLastPos = this._selectedObject!.translation;
                } else {
                    this.deselect ();
                    this._moving = false;
                }
            }
        });
        this.on (lib.EvtMouseMove.type, (ev: lib.EvtMouseMove) => {
            if (this._moving) {
                const dx = ev.x - this._mouseStartPosX;
                const dy = ev.y - this._mouseStartPosY;
                this._mouseStartPosX = ev.x;
                this._mouseStartPosY = ev.y;
                if (this._selectedObject) {
                    const { x, y } = this._selectedObject.translation;
                    this._selectedObject.translation = { x: x + dx, y: y + dy };
                    const ts = Date.now();
                    if (ts > this._lastMoveTime + 1000) {
                        this._lastMoveTime = ts;
                        lib.App.triggerEvent (null, new wb.WBMessageEvent(MsgType.whiteboard_MoveObjectMessage, {
                            name: this._selectedObject.entityName,
                            x1: this._objectLastPos.x,
                            y1: this._objectLastPos.y,
                            x2: x + dx,
                            y2: y + dy
                        }));
                        this._objectLastPos.x = x + dx;
                        this._objectLastPos.y = y + dy;
                    }
                }
            }
        });
        this.on (lib.EvtMouseUp.type, (ev: lib.EvtMouseUp) => {
            if (this._moving && this._selectedObject) {
                const { x, y } = this._selectedObject.translation;
                if (x !== this._objectLastPos.x || y !== this._objectLastPos.y) {
                    lib.App.triggerEvent (null, new wb.WBMessageEvent(MsgType.whiteboard_MoveObjectMessage, {
                        name: this._selectedObject.entityName,
                        x1: this._objectLastPos.x,
                        y1: this._objectLastPos.y,
                        x2: x,
                        y2: y
                    }));
                }
            }
            this._moving = false;
        });
    }
    public deactivate() {
        this.off (lib.EvtKeyDown.type);
        this.off (lib.EvtKeyUp.type);
        this.off (lib.EvtKeyPress.type);
        this.off (lib.EvtMouseDown.type);
        this.off (lib.EvtMouseMove.type);
        this.off (lib.EvtMouseUp.type);
        this.off (lib.EvtDraw.type);
        this.deselect ();
        super.deactivate ();
    }
    public activateObject(object: lib.SceneObject) {
        this.deactivateObject (object);
        object.addComponent(new WBSelectComponent(this));
    }
    public deactivateObject(object: lib.SceneObject) {
        const components = object.getComponents(WBSelectComponent.type);
        if (components && components.length > 0) {
            object.removeComponentsByType(WBSelectComponent.type);
        }
    }
    public selectObject(object: lib.SceneObject, ev: lib.EvtMouse|null) {
        if (this._selectedObject !== object) {
            this.deselect ();
            this._selectedObject = object;
            object.triggerEx(new WBSelectEvent());
            lib.App.triggerEvent (null, new WBObjectSelectedEvent (this._selectedObject));
        }
    }
    public deselect() {
        if (this._selectedObject) {
            this._selectedObject.triggerEx(new WBDeselectEvent());
            lib.App.triggerEvent (null, new WBObjectDeselectedEvent (this._selectedObject));
            this._selectedObject = null;
        }
    }
}