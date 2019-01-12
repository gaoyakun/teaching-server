import * as lib from '../catk';
import * as command from './commands';
import { MsgType } from '../../../common/protocols/protolist';
import { CommandServer } from '../cmdserver/cmdserver';

export interface IProperty {
    name: string;
    desc: string;
    type: string;
    value: any;
    enum?: any[];
    readonly: boolean;
}

export interface IPropertyList {
    [group: string]: {  
        desc: string;
        properties: IProperty[] 
    }
}

export class EvtSocketMessage extends lib.BaseEvent {
    static readonly type: string = '@socketMessage';
    readonly messageType: MsgType;
    readonly messageData: any;
    constructor(messageType: MsgType, messageData: any) {
        super(EvtSocketMessage.type);
        this.messageType = messageType;
        this.messageData = messageData;
    }
}

export class WBComponent extends lib.Component {
    static readonly type = 'WBComponent';
    constructor() {
        super(WBComponent.type);
        this.on(WBToolActivateEvent.type, (ev: WBToolActivateEvent) => {
            ev.tool.activateObject(this.object as lib.SceneObject);
        });
        this.on(WBToolDeactivateEvent.type, (ev: WBToolDeactivateEvent) => {
            ev.tool.deactivateObject(this.object as lib.SceneObject);
        });
        this.on(WBSetPropertyEvent.type, (ev: WBSetPropertyEvent) => {
            const object = this.object as lib.SceneObject;
            switch (ev.name) {
                case 'localx': {
                    const t = object.translation;
                    t.x = Number(ev.value);
                    object.translation = t;
                    break;
                }
                case 'localy': {
                    const t = object.translation;
                    t.y = Number(ev.value);
                    object.translation = t;
                    break;
                }
                case 'anchorx': {
                    const t = object.anchorPoint;
                    t.x = Number(ev.value);
                    object.anchorPoint = t;
                    break;
                }
                case 'anchory': {
                    const t = object.anchorPoint;
                    t.y = Number(ev.value);
                    object.anchorPoint = t;
                    break;
                }
                case 'entityName': {
                    object.entityName = ev.value;
                    break;
                }
            }
        });
        this.on(WBGetPropertyEvent.type, (ev: WBGetPropertyEvent) => {
            const object = this.object as lib.SceneObject;
            switch (ev.name) {
                case 'localx': {
                    ev.value = object.translation.x;
                    break;
                }
                case 'localy': {
                    ev.value = object.translation.y;
                    break;
                }
                case 'anchorx': {
                    ev.value = object.anchorPoint.x;
                    break;
                }
                case 'anchory': {
                    ev.value = object.anchorPoint.y;
                    break;
                }
                case 'entityName': {
                    ev.value = object.entityName;
                    break;
                }
                case 'entityType': {
                    ev.value = object.entityType;
                    break;
                }
            }
        });
        this.on(WBGetPropertyListEvent.type, (ev: WBGetPropertyListEvent) => {
            ev.properties = ev.properties || {};
            ev.properties.general = ev.properties.general || { desc: '通用', properties: [] };
            ev.properties.general.properties.push ({
                name: 'entityType',
                desc: '类型',
                readonly: true,
                type: 'string',
                value: this.object ? this.object.entityType : null
            });
            ev.properties.general.properties.push ({
                name: 'entityName',
                desc: '名称',
                readonly: false,
                type: 'string',
                value: this.object ? this.object.entityName : null
            });
            ev.properties.general.properties.push ({
                name: 'localx',
                desc: '位置X',
                readonly: false,
                type: 'number',
                value: this.object ? (this.object as lib.SceneObject).translation.x : null
            });
            ev.properties.general.properties.push ({
                name: 'localy',
                desc: '位置Y',
                readonly: false,
                type: 'number',
                value: this.object ? (this.object as lib.SceneObject).translation.y : null
            });
            ev.properties.general.properties.push ({
                name: 'anchorx',
                desc: '锚点X',
                readonly: false,
                type: 'number',
                value: this.object ? (this.object as lib.SceneObject).anchorPoint.x : null
            });
            ev.properties.general.properties.push ({
                name: 'anchory',
                desc: '锚点Y',
                readonly: false,
                type: 'number',
                value: this.object ? (this.object as lib.SceneObject).anchorPoint.y : null
            })
        });
    }
}

export abstract class WBFactory {
    public readonly name: string;
    constructor(name: string) {
        this.name = name;
    }
    public createEntity(x:number, y:number, options?: any): lib.SceneObject|null {
        const entity = this._createEntity (options);
        if (entity === null) {
            return null;
        }
        entity.addComponent(new WBComponent());
        entity.translation = { x:x, y:y };
        return entity;
    }
    public getCreationProperties (): IProperty[] {
        return [];
    }
    protected abstract _createEntity(options?:any): lib.SceneObject;
}

export class WBToolActivateEvent extends lib.BaseEvent {
    static readonly type: string = '@WBToolActivate';
    tool: WBTool;
    constructor(tool: WBTool) {
        super(WBToolActivateEvent.type);
        this.tool = tool;
    }
}

export class WBToolDeactivateEvent extends lib.BaseEvent {
    static readonly type: string = '@WBToolDeactivate';
    tool: WBTool;
    constructor(tool: WBTool) {
        super(WBToolDeactivateEvent.type);
        this.tool = tool;
    }
}

export class WBGetPropertyListEvent extends lib.BaseEvent {
    static readonly type: string = '@WBGetObjectPropertyList';
    properties?: IPropertyList;
    constructor () {
        super (WBGetPropertyListEvent.type);
    }
}

export class WBSetPropertyEvent extends lib.BaseEvent {
    static readonly type: string = '@WBSetObjectPropertyEvent';
    name: string;
    value: any;
    constructor (name: string, value: any) {
        super (WBSetPropertyEvent.type);
        this.name = name;
        this.value = value;
    }
}

export class WBGetPropertyEvent extends lib.BaseEvent {
    static readonly type: string = '@WBGetObjectPropertyEvent';
    name: string;
    value?: any;
    constructor (name: string) {
        super (WBGetPropertyEvent.type);
        this.name = name;
    }
}

export class WBGetObjectEvent extends lib.BaseEvent {
    static readonly type: string = '@WBGetObject';
    name: string;
    object?: lib.SceneObject;
    constructor (name: string) {
        super (WBGetObjectEvent.type);
        this.name = name;
    }
}

export class WBCommandEvent extends lib.BaseEvent {
    static readonly type: string = '@WBCommand';
    command: string;
    args?: any;
    constructor (command: string, args?: any) {
        super (WBCommandEvent.type);
        this.command = command;
        this.args = args;
    }
}

export class WBTool extends lib.EventObserver {
    public readonly name: string;
    public readonly desc: string;
    protected readonly _wb: WhiteBoard;
    constructor (name: string, whiteboard: WhiteBoard, desc?: string) {
        super ();
        this.name = name;
        this.desc = desc || name;
        this._wb = whiteboard;
        this.on(WBGetPropertyEvent.type, (ev: WBGetPropertyEvent) => {
            switch (ev.name) {
                case 'desc': {
                    ev.value = this.desc;
                    break;
                }
            }
        });
        this.on(WBGetPropertyListEvent.type, (ev: WBGetPropertyListEvent) => {
            ev.properties = ev.properties || {};
        });
    }
    public activate(options?: any) {
        lib.App.triggerEvent(null, new WBToolActivateEvent(this));
    }
    public deactivate() {
        lib.App.triggerEvent(null, new WBToolDeactivateEvent(this));
    }
    public activateObject(object: lib.SceneObject) {
    }
    public deactivateObject(object: lib.SceneObject) {
    }
    public executeCommand(command: string, args?: any) {
    }
}

export class WhiteBoard extends lib.EventObserver {
    public readonly view: lib.SceneView|null = null;
    private _factories: { [name: string]: WBFactory };
    private _tools: { [name: string]: WBTool };
    private _currentTool: string;
    private _entities: { [name: string]: lib.SceneObject };
    constructor(canvas: HTMLCanvasElement, doubleBuffer: boolean = false) {
        super ();
        this.view = lib.App.addCanvas(canvas, doubleBuffer);
        this._factories = {};
        this._tools = {};

        this._currentTool = '';
        this._entities = {};
        this.on (WBGetObjectEvent.type, (ev: WBGetObjectEvent) => {
            ev.object = this.findEntity (ev.name);
        });
        this.on (lib.EvtSceneViewPageWillChange.type, (ev: lib.EvtSceneViewPageWillChange) => {
            const tool = this._tools[this._currentTool];
            if (tool) {
                tool.deactivate();
            }
        });
        this.on (lib.EvtSceneViewPageChanged.type, (ev: lib.EvtSceneViewPageChanged) => {
            const tool = this._tools[this._currentTool];
            if (tool) {
                tool.activate();
            }
        });
        this.on(WBCommandEvent.type, (ev: WBCommandEvent) => {
            this._executeCommand (ev.command, ev.args);
        });
        if (this.view) {
            this.view.on (lib.EvtKeyDown.type, (ev: lib.EvtKeyDown) => {
                if (this._currentTool !== '') {
                    const tool = this._tools[this._currentTool];
                    tool.trigger (ev);
                }
            });
            this.view.on (lib.EvtKeyUp.type, (ev: lib.EvtKeyUp) => {
                if (this._currentTool !== '') {
                    const tool = this._tools[this._currentTool];
                    tool.trigger (ev);
                }
            });
            this.view.on (lib.EvtKeyPress.type, (ev: lib.EvtKeyPress) => {
                if (this._currentTool !== '') {
                    const tool = this._tools[this._currentTool];
                    tool.trigger (ev);
                }
            });
            this.view.on (lib.EvtMouseDown.type, (ev: lib.EvtMouseDown) => {
                if (this._currentTool !== '') {
                    const tool = this._tools[this._currentTool];
                    tool.trigger (ev);
                }
            });
            this.view.on (lib.EvtMouseUp.type, (ev: lib.EvtMouseUp) => {
                if (this._currentTool !== '') {
                    const tool = this._tools[this._currentTool];
                    tool.trigger (ev);
                }
            });
            this.view.on (lib.EvtMouseMove.type, (ev: lib.EvtMouseMove) => {
                if (this._currentTool !== '') {
                    const tool = this._tools[this._currentTool];
                    tool.trigger (ev);
                }
            });
            this.view.on (lib.EvtClick.type, (ev: lib.EvtClick) => {
                if (this._currentTool !== '') {
                    const tool = this._tools[this._currentTool];
                    tool.trigger (ev);
                }
            });
            this.view.on (lib.EvtDblClick.type, (ev: lib.EvtDblClick) => {
                if (this._currentTool !== '') {
                    const tool = this._tools[this._currentTool];
                    tool.trigger (ev);
                }
            });
            this.view.on (lib.EvtDraw.type, (ev: lib.EvtDraw) => {
                if (this._currentTool !== '') {
                    const tool = this._tools[this._currentTool];
                    tool.trigger (ev);
                }
            }, lib.EventListenerOrder.LAST);
        }
    }
    public addTool (tool: WBTool): void {
        this._tools[tool.name] = tool;
    }
    public addFactory(factory: WBFactory): void {
        this._factories[factory.name] = factory;
    }
    public getFactory(name: string): WBFactory {
        return this._factories[name] || null;
    }
    public createEntity(type: string, name: string|null, failOnExists: boolean, x: number, y: number, options: any): lib.SceneObject|null {
        let entity = null;
        if (name === null) {
            let id = 1;
            while (true) {
                name = `${type.toLowerCase()}${id++}`;
                if (this.findEntity(name) === null) {
                    break;
                }
            }
        } else {
            entity = this.findEntity(name);
            if (entity !== null) {
                return failOnExists ? null : entity;
            }
        }
        const factory = this._factories[type];
        if (factory) {
            entity = factory.createEntity(x, y, options);
            if (entity) {
                entity.entityName = name;
                entity.entityType = type;
                if (this.view && this.view.rootNode) {
                    this.view.rootNode.addChild (entity);
                }
                this._entities[name] = entity;
                if (this._currentTool !== '') {
                    const curTool = this._tools[this._currentTool];
                    if (curTool) {
                        entity.triggerEx (new WBToolActivateEvent(curTool));
                    }
                }
            }
        }
        return entity;
    }
    public deleteEntity(name: string): void {
        const entity = this.findEntity (name);
        if (entity) {
            entity.remove ();
            delete this._entities[name];
        }
    }
    public findEntity(name: string): lib.SceneObject {
        return this._entities[name] || null;
    }
    public encodeCommand(cmd: command.IWBCommand) {
        return JSON.stringify (cmd);
        /*
        let str = command;
        for (const name in cmd) {
            if (name !== 'command') {
                str += ` ${name}=${cmd[name]}`;
            }
        }
        return str;
        */
    }
    public _executeCommand(command: string, args?: any) {
        const cmd = args||{};
        if (command === 'UseTool') {
            if (this._currentTool !== cmd.name) {
                if (this._currentTool !== '') {
                    const prevTool = this._tools[this._currentTool];
                    prevTool.deactivate();
                }
                this._currentTool = '';
                if (cmd.name) {
                    const newTool = this._tools[cmd.name];
                    if (newTool) {
                        this._currentTool = cmd.name;
                        newTool.activate(cmd.args||{});
                    }
                }
            }
        } else if (command === 'CreateObject') {
            const type = cmd.type;
            const name = cmd.name||null;
            const failOnExists = !!cmd.failOnExists;
            const params = cmd.params||{};
            const obj = this.createEntity (type, name, failOnExists, cmd.x, cmd.y, params);
            cmd.objectCreated = obj;
        } else if (command === 'DeleteObject') {
            this.deleteEntity (cmd.name);
        } else if (command === 'DeleteObjects') {
            if (cmd.objects) {
                cmd.objects.forEach ((name:string) => {
                    this.deleteEntity (name);
                });
            }
        } else if (command === 'AlignObjectsLeft') {
            if (cmd.objects && cmd.objects.length > 1) {
                const objects: lib.SceneObject[] = cmd.objects.map ((name:string) => this.findEntity(name));
                let minx = objects[0].worldTransform.e;
                for (let i = 1; i < objects.length; i++) {
                    const x = objects[i].worldTransform.e;
                    if (x < minx) {
                        minx = x;
                    }
                }
                objects.forEach (obj => {
                    obj.worldTranslation = { x:minx, y:obj.worldTransform.f };
                    obj.collapseTransform ();
                });
            }
        } else if (command === 'AlignObjectsRight') {
            if (cmd.objects && cmd.objects.length > 1) {
                const objects: lib.SceneObject[] = cmd.objects.map ((name:string) => this.findEntity(name));
                let maxx = objects[0].worldTransform.e;
                for (let i = 1; i < objects.length; i++) {
                    const x = objects[i].worldTransform.e;
                    if (x > maxx) {
                        maxx = x;
                    }
                }
                objects.forEach (obj => {
                    obj.worldTranslation = { x:maxx, y:obj.worldTransform.f };
                    obj.collapseTransform ();
                });
            }
        } else if (command === 'AlignObjectsTop') {
            if (cmd.objects && cmd.objects.length > 1) {
                const objects: lib.SceneObject[] = cmd.objects.map ((name:string) => this.findEntity(name));
                let miny = objects[0].worldTransform.f;
                for (let i = 1; i < objects.length; i++) {
                    const y = objects[i].worldTransform.f;
                    if (y < miny) {
                        miny = y;
                    }
                }
                objects.forEach (obj => {
                    obj.worldTranslation = { x:obj.worldTransform.e, y:miny };
                    obj.collapseTransform ();
                });
            }
        } else if (command === 'AlignObjectsBottom') {
            if (cmd.objects && cmd.objects.length > 1) {
                const objects: lib.SceneObject[] = cmd.objects.map ((name:string) => this.findEntity(name));
                let maxy = objects[0].worldTransform.f;
                for (let i = 1; i < objects.length; i++) {
                    const y = objects[i].worldTransform.f;
                    if (y > maxy) {
                        maxy = y;
                    }
                }
                objects.forEach (obj => {
                    obj.worldTranslation = { x:obj.worldTransform.e, y:maxy };
                    obj.collapseTransform ();
                });
            }
        } else if (command === 'AlignObjectsHorizontal') {
            if (cmd.objects && cmd.objects.length > 1) {
                const firstObject = this.findEntity (cmd.objects[0]);
                if (firstObject) {
                    const y = firstObject.worldTransform.f;
                    for (let i = 1; i < cmd.objects.length; i++) {
                        const obj = this.findEntity (cmd.objects[i]);
                        if (obj) {
                            obj.worldTranslation = { x:obj.worldTransform.e, y:y };
                            obj.collapseTransform ();
                        }
                    }
                }
            }
        } else if (command === 'ArrangeObjectsHorizontal') {
            if (cmd.objects && cmd.objects.length > 2) {
                const objects: lib.SceneObject[] = cmd.objects.map ((name:string) => this.findEntity(name));
                objects.sort ((a, b) => {
                    return a.worldTransform.e - b.worldTransform.e;
                });
                const posStart = objects[0].worldTransform.e;
                const gap = (objects[objects.length-1].worldTransform.e - posStart) / (objects.length - 1);
                for (let i = 1; i < objects.length - 1; i++) {
                    objects[i].worldTranslation = { x:posStart + i * gap, y:objects[i].worldTransform.f };
                    objects[i].collapseTransform ();
                }
            }
        } else if (command === 'ArrangeObjectsVertical') {
            if (cmd.objects && cmd.objects.length > 2) {
                const objects: lib.SceneObject[] = cmd.objects.map ((name:string) => this.findEntity(name));
                objects.sort ((a, b) => {
                    return a.worldTransform.f - b.worldTransform.f;
                });
                const posStart = objects[0].worldTransform.f;
                const gap = (objects[objects.length-1].worldTransform.f - posStart) / (objects.length - 1);
                for (let i = 1; i < objects.length - 1; i++) {
                    objects[i].worldTranslation = { x:objects[i].worldTransform.e, y:posStart + i * gap };
                    objects[i].collapseTransform ();
                }
            }
        } else if (command === 'SetObjectProperty') {
            const obj = this.findEntity (cmd.objectName);
            if (obj) {
                const ev = new WBSetPropertyEvent (cmd.propName, cmd.propValue);
                obj.triggerEx (ev);
                if (obj.entityName !== cmd.objectName) {
                    if (this.findEntity(obj.entityName)) {
                        obj.entityName = cmd.objectName;
                    } else {
                        delete this._entities[cmd.objectName];
                        this._entities[obj.entityName] = obj;
                    }
                }
            }
        } else if (command === 'GetObjectProperty') {
            const obj = this.findEntity (cmd.objectName);
            if (obj) {
                const ev = new WBGetPropertyEvent (cmd.propName);
                obj.triggerEx (ev);
                cmd.propValue = ev.value;
            }
        } else if (command === 'AddPage') {
            this.view && this.view.addPage ();
        } else if (command === 'RenamePage') {
            this.view && this.view.currentPage && this.view.renamePage (this.view.currentPage, cmd.newName);
        } else if (this._currentTool) {
            this._tools[this._currentTool].executeCommand (command, cmd);
        } else {
            return;
        }
    }
}
