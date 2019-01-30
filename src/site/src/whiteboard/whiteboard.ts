import * as lib from '../catk';
import { MsgType } from '../../../common/protocols/protolist';

export interface IWBCommand {
    type: MsgType;
    event: WBMessageEvent;
    context: any;    
}

export interface IWBCommandExecutor {
    execute: (whiteboard: WhiteBoard, command: IWBCommand, results: any) => void;
    unexecute: (whiteboard: WhiteBoard, command: IWBCommand) => void;
}

const executors: { [msgType: number]: IWBCommandExecutor } = {};
executors[MsgType.whiteboard_CreateObjectMessage] = {
    execute: (whiteboard, command, results) => {
        const data = command.event.messageData;
        command.context = whiteboard.createEntity (data.type, data.x, data.y, data.paramsJson ? JSON.parse(data.paramsJson) : {});
        if (results) {
            results.objectCreated = command.context;
        }
    },
    unexecute: (whiteboard, command) => {
        if (command.context) {
            (command.context as lib.SceneObject).unrefChildren ();
            (command.context as lib.SceneObject).remove ();
        }
    },
};
executors[MsgType.whiteboard_DeleteObjectMessage] = {
    execute: (whiteboard, command, results) => {
        const data = command.event.messageData;
        const obj = whiteboard.findEntity (data.name);
        if (obj && obj.parent) {
            command.context = {
                parent: obj.parent,
                object: obj
            }
            whiteboard.deleteEntity (data.name);
        }
    },
    unexecute: (whiteboard, command) => {
        whiteboard.addEntity (command.context.parent, command.context.object);
    }
};
executors[MsgType.whiteboard_DeleteObjectsMessage] = {
    execute: (whiteboard, command, results) => {
        const data = command.event.messageData;
        command.context.parents = [];
        command.context.objects = [];
        data.names.forEach ((name:string) => {
            const obj = whiteboard.findEntity (name);
            if (obj && obj.parent) {
                command.context.parents.push(obj.parent);
                command.context.objects.push(obj);
                whiteboard.deleteEntity (name);
            }
        });
    },
    unexecute: (whiteboard, command) => {
        for (let i = 0; i < command.context.objects.length; i++) {
            whiteboard.addEntity (command.context.parents[i], command.context.objects[i]);
        }
    }
};
executors[MsgType.whiteboard_SwapObjectMessage] = {
    execute: (whiteboard, command, results) => {
        const object1 = whiteboard.findEntity (command.event.messageData.name1);
        const object2 = whiteboard.findEntity (command.event.messageData.name2);
        if (object1 && object2) {
            command.context = {
                object1: object1,
                translation1: object1.translation,
                object2: object2,
                translation2: object2.translation
            };
            if (command.event.broadcast) {
                const t1 = object1.translation;
                object1.translation = object2.translation;
                object2.translation = t1;
            } else {
                const t1 = object1.translation;
                const t2 = object2.translation;
                (object2.getComponents (lib.CoKeyframeAnimation.type)||[]).forEach (comp=>{
                    (comp as lib.CoKeyframeAnimation).finish ();
                    object2.removeComponentsByType (lib.CoKeyframeAnimation.type);
                });
                object2.addComponent (new lib.CoKeyframeAnimation({
                    delay:0,
                    repeat:1,
                    exclusive:true,
                    tracks: {
                        translation: {
                            cp: [{x:0,y:[t2.x,t2.y]}, {x:command.event.messageData.duration,y:[t1.x,t1.y]}],
                            type: lib.SplineType.LINEAR
                        }
                    }
                }));
                object1.addComponent (new lib.CoKeyframeAnimation({
                    delay:0,
                    repeat:1,
                    exclusive:true,
                    tracks: {
                        translation: {
                            cp: [{x:0,y:[t1.x,t1.y]}, {x:command.event.messageData.duration,y:[t2.x,t2.y]}],
                            type: lib.SplineType.LINEAR
                        }
                    }
                }));
            }
        }
    },
    unexecute: (whiteboard, command) => {
        command.context.object1.translation = command.context.translation1;
        command.context.object2.translation = command.context.translation2;
    }
};
executors[MsgType.whiteboard_MoveObjectMessage] = {
    execute: (whiteboard, command, results) => {
        const obj = whiteboard.findEntity (command.event.messageData.name);
        if (obj) {
            command.context = {
                object: obj,
                x1: command.event.messageData.x1,
                y1: command.event.messageData.y1,
                x2: command.event.messageData.x2,
                y2: command.event.messageData.y2
            }
            obj.translation = { x: command.event.messageData.x2, y: command.event.messageData.y2 };
        }
    },
    unexecute: (whiteboard, command) => {
        if (command.context) {
            command.context.object.translation = { x: command.context.x1, y: command.context.y1 };
        }
    }
};
executors[MsgType.whiteboard_SetObjectPropertyMessage] = {
    execute: (whiteboard, command, results) => {
        const data = command.event.messageData;
        const obj = whiteboard.findEntity (data.name);
        if (obj) {
            const evGet = new WBGetPropertyEvent (data.propName);
            obj.triggerEx (evGet);
            command.context = {
                object: obj,
                propName: data.propName,
                value: evGet.value
            };
            const ev = new WBSetPropertyEvent (data.propName, JSON.parse(data.propValueJson));
            obj.triggerEx (ev);
        }
    },
    unexecute: (whiteboard, command) => {
        const ev = new WBSetPropertyEvent (command.context.propName, command.context.value);
        command.context.object.triggerEx (ev);
    }
};
executors[MsgType.whiteboard_ClearBoardMessage] = {
    execute: (whiteboard, command, results) => {
        command.context = whiteboard.view!.rootNode;
        command.context.view = null;
        whiteboard.view!.rootNode = new lib.SceneObject();
        whiteboard.view!.rootNode.view = whiteboard.view;
    },
    unexecute: (whiteboard, command) => {
        whiteboard.view!.rootNode = command.context;
        whiteboard.view!.rootNode.view = whiteboard.view;
    }
};
executors[MsgType.whiteboard_DrawMessage] = {
    execute: (whiteboard, command, results) => {
    },
    unexecute: (whiteboard, command) => {
        const freedrawNode: any = whiteboard.findEntity (command.event.messageData.entityName);
        if (freedrawNode) {
            freedrawNode.unstroke (command.event);
        }
    }
};

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
    readonly name: string;
    constructor(name: string) {
        this.name = name;
    }
    createEntity(x:number, y:number, options?: any): lib.SceneObject|null {
        const entity = this._createEntity (options);
        if (entity === null) {
            return null;
        }
        entity.addComponent(new WBComponent());
        entity.translation = { x:x, y:y };
        return entity;
    }
    getCreationProperties (): IProperty[] {
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

export class WBMessageEvent extends lib.BaseEvent {
    static readonly type: string = '@WBMessage';
    messageType: MsgType;
    messageData: any;
    broadcast: boolean;
    results?: any;
    object?: string;
    constructor (type: MsgType, data: any, results?: any, object?: string) {
        super (WBMessageEvent.type);
        this.messageType = type;
        this.messageData = data;
        this.results = results;
        this.object = object;
        this.broadcast = false;
    }
}

export class WBTool extends lib.EventObserver {
    readonly name: string;
    readonly desc: string;
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
    activate(options?: any) {
        lib.App.triggerEvent(null, new WBToolActivateEvent(this));
    }
    deactivate() {
        lib.App.triggerEvent(null, new WBToolDeactivateEvent(this));
    }
    activateObject(object: lib.SceneObject) {
    }
    deactivateObject(object: lib.SceneObject) {
    }
    handleMessage(ev: WBMessageEvent) {
    }
}

export class WhiteBoard extends lib.EventObserver {
    readonly view: lib.SceneView|null = null;
    private _factories: { [name: string]: WBFactory };
    private _tools: { [name: string]: WBTool };
    private _currentTool: string;
    private _entities: { [name: string]: lib.SceneObject };
    private _nameIndex: number;
    private _commandStack: IWBCommand[];
    constructor(canvas: HTMLCanvasElement, doubleBuffer: boolean = false) {
        super ();
        this.view = lib.App.addCanvas(canvas, doubleBuffer);
        this._factories = {};
        this._tools = {};
        this._nameIndex = 1;
        this._commandStack = [];
        this._currentTool = '';
        this._entities = {};
        this.on (WBGetObjectEvent.type, (ev: WBGetObjectEvent) => {
            ev.object = this.findEntity (ev.name);
        });
        this.on(WBMessageEvent.type, (ev: WBMessageEvent) => {
            this._handleMessage (ev);
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
    addTool (tool: WBTool): void {
        this._tools[tool.name] = tool;
    }
    useTool (name?: string, params?: any) {
        if (this._currentTool !== '') {
            const prevTool = this._tools[this._currentTool];
            prevTool.deactivate();
        }
        this._currentTool = '';
        if (name) {
            const newTool = this._tools[name];
            if (newTool) {
                this._currentTool = name;
                // const args = ev.messageData.paramsJson ? JSON.parse(ev.messageData.paramsJson) : {};
                newTool.activate(params);
            }
        }
    }
    addFactory(factory: WBFactory): void {
        this._factories[factory.name] = factory;
    }
    getFactory(name: string): WBFactory {
        return this._factories[name] || null;
    }
    genEntityName (type: string): string {
        return `${type.toLowerCase()}${this._nameIndex++}`;
    }
    createEntity(type: string, x: number, y: number, options: any): lib.SceneObject|null {
        let entity = null;
        const name = this.genEntityName (type);
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
    deleteEntity(name: string): void {
        const entity = this.findEntity (name);
        if (entity) {
            entity.remove ();
            delete this._entities[name];
        }
    }
    addEntity(parent: lib.SceneObject, entity: lib.SceneObject) {
        if (this.findEntity (entity.entityName)) {
            throw new Error('ERR: [addEntity] Entity already exists');
        }
        parent.addChild (entity);
        this._entities[entity.entityName] = entity;
    }
    findEntity(name: string): lib.SceneObject {
        return this._entities[name] || null;
    }
    findEntityByType (type: string, rootNode?: lib.SceneObject): lib.SceneObject|null {
        if (this.view) {
            const root = rootNode || this.view.rootNode;
            if (root) {
                if (root.entityType === type) {
                    return root;
                } else {
                    for (let i = 0; i < root.numChildren; i++) {
                        const result = this.findEntityByType (type, root.childAt (i));
                        if (result) {
                            return result;
                        }
                    }
                }
            }
        }
        return null;
    }
    _handleMessage (ev: WBMessageEvent) {
        if (ev.object) {
            const obj = this.findEntity (ev.object);
            if (obj) {
                obj.triggerEx (ev);
            }
        } else if (ev.messageType === MsgType.whiteboard_UndoMessage) {
            if (this._commandStack.length > 0) {
                const cmd = this._commandStack.pop ();
                executors[cmd!.type].unexecute (this, cmd!);
            }
        } else if (executors[ev.messageType]){
            const cmd: IWBCommand = {
                type: ev.messageType,
                event: ev,
                context: null
            };
            this._commandStack.push (cmd);
            executors[ev.messageType].execute (this, cmd, ev.results);
        }
        /*
        const type = ev.messageType;
        const data = ev.messageData;
        const results = ev.results;
        const cmd = data||{};
        if (ev.object) {
            const obj = this.findEntity (ev.object);
            if (obj) {
                obj.triggerEx (ev);
            }
        } else if (type === MsgType.whiteboard_UseToolMessage) {
            if (this._currentTool !== '') {
                const prevTool = this._tools[this._currentTool];
                prevTool.deactivate();
            }
            this._currentTool = '';
            if (cmd.name) {
                const newTool = this._tools[cmd.name];
                if (newTool) {
                    this._currentTool = cmd.name;
                    const args = cmd.paramsJson ? JSON.parse(cmd.paramsJson) : {};
                    newTool.activate(args);
                }
            }
        } else if (type === MsgType.whiteboard_CreateObjectMessage) {
            const type = cmd.type;
            const params = cmd.paramsJson ? JSON.parse(cmd.paramsJson) : {};
            const obj = this.createEntity (type, cmd.x, cmd.y, params);
            if (results) {
                results.objectCreated = obj;
            }
        } else if (type === MsgType.whiteboard_DeleteObjectMessage) {
            this.deleteEntity (cmd.name);
        } else if (type === MsgType.whiteboard_DeleteObjectsMessage) {
            if (cmd.names) {
                cmd.names.forEach ((name:string) => {
                    this.deleteEntity (name);
                });
            }
        } else if (type === MsgType.whiteboard_AlignObjectsLeftMessage) {
            if (cmd.names && cmd.names.length > 1) {
                const objects: lib.SceneObject[] = cmd.names.map ((name:string) => this.findEntity(name));
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
        } else if (type === MsgType.whiteboard_AlignObjectsRightMessage) {
            if (cmd.names && cmd.names.length > 1) {
                const objects: lib.SceneObject[] = cmd.names.map ((name:string) => this.findEntity(name));
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
        } else if (type === MsgType.whiteboard_AlignObjectsTopMessage) {
            if (cmd.names && cmd.names.length > 1) {
                const objects: lib.SceneObject[] = cmd.names.map ((name:string) => this.findEntity(name));
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
        } else if (type === MsgType.whiteboard_AlignObjectsBottomMessage) {
            if (cmd.names && cmd.names.length > 1) {
                const objects: lib.SceneObject[] = cmd.names.map ((name:string) => this.findEntity(name));
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
        } else if (type === MsgType.whiteboard_ArrangeObjectsHorizontalMessage) {
            if (cmd.names && cmd.names.length > 2) {
                const objects: lib.SceneObject[] = cmd.names.map ((name:string) => this.findEntity(name));
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
        } else if (type === MsgType.whiteboard_ArrangeObjectsVerticalMessage) {
            if (cmd.names && cmd.names.length > 2) {
                const objects: lib.SceneObject[] = cmd.names.map ((name:string) => this.findEntity(name));
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
        } else if (type === MsgType.whiteboard_SetObjectPropertyMessage) {
            const obj = this.findEntity (cmd.name);
            if (obj) {
                const ev = new WBSetPropertyEvent (cmd.propName, JSON.parse(cmd.propValueJson));
                obj.triggerEx (ev);
                if (obj.entityName !== cmd.name) {
                    if (this.findEntity(obj.entityName)) {
                        obj.entityName = cmd.name;
                    } else {
                        delete this._entities[cmd.name];
                        this._entities[obj.entityName] = obj;
                    }
                }
            }
        } else if (type === MsgType.whiteboard_ClearBoardMessage) {
            this.view!.rootNode.unrefChildren ();
        } else if (this._currentTool) {
            this._tools[this._currentTool].handleMessage (ev);
        } else {
            return;
        }
        */
    }
}
