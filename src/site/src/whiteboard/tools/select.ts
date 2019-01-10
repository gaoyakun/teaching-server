import * as lib from '../../catk';
import * as commands from '../commands';
import * as wb from '../whiteboard';

export class WBSelectEvent extends lib.BaseEvent {
    static readonly type: string = '@WBSelect';
    public readonly selectIndex: number;
    constructor(selectIndex: number) {
        super(WBSelectEvent.type);
        this.selectIndex = selectIndex;
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
    readonly objects: lib.SceneObject[];
    constructor (objects: lib.SceneObject[]) {
        super (WBObjectSelectedEvent.type);
        this.objects = objects;
    }
}

export class WBObjectMovedEvent extends lib.BaseEvent {
    static readonly type: string = '@WBObjectMoved';
    readonly objects: lib.SceneObject[];
    constructor (objects: lib.SceneObject[]) {
        super (WBObjectMovedEvent.type);
        this.objects = objects;
    }
}

export class WBObjectDeselectedEvent extends lib.BaseEvent {
    static readonly type: string = '@WBObjectDeselected';
    readonly object: lib.SceneObject;
    readonly objects: lib.SceneObject[];
    constructor (object: lib.SceneObject, objects: lib.SceneObject[]) {
        super (WBObjectDeselectedEvent.type);
        this.object = object;
        this.objects = objects;
    }
}
export class WBSelectComponent extends lib.Component {
    static readonly type = 'WBSelect';
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
                        evt.canvas.context.strokeStyle = '#000';
                        evt.canvas.context.lineWidth = 1;
                        evt.canvas.context.strokeRect (bbox.x, bbox.y, bbox.w, bbox.h);
                    }
                }
            }
        });
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
    private _selectedObjects: lib.SceneObject[];
    private _moving: boolean;
    private _rangeSelecting: boolean;
    private _mouseStartPosX: number;
    private _mouseStartPosY: number;
    private _mouseCurrentPosX: number;
    private _mouseCurrentPosY: number;
    constructor(whiteboard: wb.WhiteBoard) {
        super(WBSelectTool.toolname, whiteboard);
        this._selectedObjects = [];
        this._moving = false;
        this._rangeSelecting = false;
        this._mouseStartPosX = 0;
        this._mouseStartPosY = 0;
        this._mouseCurrentPosX = 0;
        this._mouseCurrentPosY = 0;
    }
    get selectedObjects () {
        return this._selectedObjects;
    }
    activate(options?: any) {
        super.activate (options);
        this._selectedObjects.length = 0;
        this.on (lib.EvtKeyDown.type, (ev: lib.EvtKeyDown) => {
            if (this._selectedObjects.length === 1) {
                this._selectedObjects[0].triggerEx (ev);
            }
        });
        this.on (lib.EvtKeyUp.type, (ev: lib.EvtKeyUp) => {
            if (this._selectedObjects.length === 1) {
                this._selectedObjects[0].triggerEx (ev);
            }
        });
        this.on (lib.EvtKeyPress.type, (ev: lib.EvtKeyPress) => {
            if (this._selectedObjects.length === 1) {
                this._selectedObjects[0].triggerEx (ev);
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
                    this._rangeSelecting = false;
                } else {
                    this.deselectAll ();
                    this._rangeSelecting = true;
                    this._moving = false;
                    this._mouseCurrentPosX = ev.x;
                    this._mouseCurrentPosY = ev.y;
                }
            }
        });
        this.on (lib.EvtMouseMove.type, (ev: lib.EvtMouseMove) => {
            if (this._moving) {
                const dx = ev.x - this._mouseStartPosX;
                const dy = ev.y - this._mouseStartPosY;
                this._mouseStartPosX = ev.x;
                this._mouseStartPosY = ev.y;
                this._selectedObjects.forEach ((obj: lib.SceneObject) => {
                    const t = obj.translation;
                    obj.translation = { x: t.x + dx, y: t.y + dy };
                });
            } else if (this._rangeSelecting) {
                const view = this._wb.view;
                if (view && view.rootNode) {
                    this.rangeSelectR (view.rootNode, this._mouseStartPosX, this._mouseStartPosY, ev.x-this._mouseStartPosX, ev.y-this._mouseStartPosY);
                    this._mouseCurrentPosX = ev.x;
                    this._mouseCurrentPosY = ev.y;
                }
            }
        });
        this.on (lib.EvtMouseUp.type, (ev: lib.EvtMouseUp) => {
            if (this._moving && this._selectedObjects && this._selectedObjects.length > 0) {
                lib.App.triggerEvent (null, new WBObjectMovedEvent (this._selectedObjects));
            }
            this._moving = false;
            this._rangeSelecting = false;
        });
        this.on (lib.EvtDraw.type, (ev: lib.EvtDraw) => {
            if (this._rangeSelecting) {
                ev.canvas.context.save ();
                ev.canvas.context.setTransform(1, 0, 0, 1, 0.5, 0.5);
                ev.canvas.context.strokeStyle = '#000';
                ev.canvas.context.lineWidth = 1;
                ev.canvas.context.setLineDash ([6,3]);
                ev.canvas.context.beginPath ();
                ev.canvas.context.moveTo (this._mouseStartPosX, this._mouseStartPosY);
                ev.canvas.context.lineTo (this._mouseCurrentPosX, this._mouseStartPosY);
                ev.canvas.context.lineTo (this._mouseCurrentPosX, this._mouseCurrentPosY);
                ev.canvas.context.moveTo (this._mouseStartPosX, this._mouseStartPosY);
                ev.canvas.context.lineTo (this._mouseStartPosX, this._mouseCurrentPosY);
                ev.canvas.context.lineTo (this._mouseCurrentPosX, this._mouseCurrentPosY);
                ev.canvas.context.stroke ();
                ev.canvas.context.restore ();
            }
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
        super.deactivate ();
    }
    public activateObject(object: lib.SceneObject) {
        this.deactivateObject (object);
        object.addComponent(new WBSelectComponent(this));
    }
    public deactivateObject(object: lib.SceneObject) {
        const components = object.getComponents(WBSelectComponent.type);
        if (components && components.length > 0) {
            this.deselectObject (object);
            object.removeComponentsByType(WBSelectComponent.type);
        }
    }
    public executeCommand(cmd: commands.IWBCommand) {
        if (cmd.command === 'GetSelected') {
            cmd.selectedObjects = this._selectedObjects;
        } else if (cmd.command === 'DeleteSelected') {
            if (this._selectedObjects.length > 0) {
                this._wb.executeCommand ({
                    command: 'DeleteObjects',
                    objects: this._selectedObjects.map((obj:lib.SceneObject) => obj.entityName)
                });
            }
        } else if (cmd.command === 'AlignSelected') {
            const mode = cmd.mode;
            if (this._selectedObjects.length > 0) {
                this._wb.executeCommand ({
                    command: `AlignObjects${mode}`,
                    objects: this._selectedObjects.map((obj:lib.SceneObject) => obj.entityName)
                });
            }
        } else if (cmd.command === 'ArrangeSelected') {
            const mode = cmd.mode;
            if (this._selectedObjects.length > 0) {
                this._wb.executeCommand ({
                    command: `ArrangeObjects${mode}`,
                    objects: this._selectedObjects.map((obj:lib.SceneObject) => obj.entityName)
                })
            }
        }
    }
    public selectObject(object: lib.SceneObject, ev: lib.EvtMouse|null) {
        if (this._selectedObjects.indexOf(object) < 0) {
            const metaDown = ev ? lib.EvtSysInfo.isMac() ? ev.metaDown : ev.ctrlDown : true;
            if (!metaDown) {
                this.deselectAll();
            }
            this.selectedObjects.push(object);
            object.triggerEx(new WBSelectEvent(this.selectedObjects.length));
            lib.App.triggerEvent (null, new WBObjectSelectedEvent (this._selectedObjects));
        }
    }
    public deselectObject(object: lib.SceneObject) {
        const index = this._selectedObjects.indexOf(object);
        if (index >= 0) {
            object.triggerEx(new WBDeselectEvent());
            this.selectedObjects.splice(index, 1);
            lib.App.triggerEvent (null, new WBObjectDeselectedEvent (object, this._selectedObjects));
        }
    }
    public deselectAll() {
        while (this.selectedObjects.length > 0) {
            this.deselectObject (this.selectedObjects[this.selectedObjects.length - 1]);
        }
    }
    private rangeSelectR (root:lib.SceneObject, x:number, y:number, w:number, h:number) {
        root.forEachChild (child => {
            if (w === 0 || h === 0) {
                this.deselectObject (child);
            } else {
                const shape = child.boundingShape;
                if (shape) {
                    const t = lib.Matrix2d.invert(child.worldTransform);
                    const rectObject = [
                        t.transformPoint({x:x, y:y}),
                        t.transformPoint({x:x ,y:y+h}),
                        t.transformPoint({x:x+w, y:y+h}),
                        t.transformPoint({x:x+w, y:y})
                    ];
                    if (lib.IntersectionTestShapeHull (shape, rectObject)) {
                        this.selectObject (child, null);
                    } else {
                        this.deselectObject (child);
                    }
                }
                this.rangeSelectR (child, x, y, w, h);
            }
        });
    }
}