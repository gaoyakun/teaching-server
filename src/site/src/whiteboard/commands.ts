import { WBGetPropertyEvent, WBSetPropertyEvent, IWBCommandExecutor } from './whiteboard';
import { MsgType } from '../../../common/protocols/protolist';
import { SceneObject, CoKeyframeAnimation, SplineType } from '../catk';

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
            (command.context as SceneObject).unrefChildren ();
            (command.context as SceneObject).remove ();
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
                (object2.getComponents (CoKeyframeAnimation.type)||[]).forEach (comp=>{
                    (comp as CoKeyframeAnimation).finish ();
                    object2.removeComponentsByType (CoKeyframeAnimation.type);
                });
                object2.addComponent (new CoKeyframeAnimation({
                    delay:0,
                    repeat:1,
                    exclusive:true,
                    tracks: {
                        translation: {
                            cp: [{x:0,y:[t2.x,t2.y]}, {x:command.event.messageData.duration,y:[t1.x,t1.y]}],
                            type: SplineType.LINEAR
                        }
                    }
                }));
                object1.addComponent (new CoKeyframeAnimation({
                    delay:0,
                    repeat:1,
                    exclusive:true,
                    tracks: {
                        translation: {
                            cp: [{x:0,y:[t1.x,t1.y]}, {x:command.event.messageData.duration,y:[t2.x,t2.y]}],
                            type: SplineType.LINEAR
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
}
executors[MsgType.whiteboard_AlignObjectsLeftMessage] = {
    execute: (whiteboard, command, results) => {
        const data = command.event.messageData;
        command.context.transform = [];
        command.context.objects = [];
        if (data.names && data.names.length > 1) {
            const objects: SceneObject[] = data.names.map ((name:string) => whiteboard.findEntity(name));
            objects.forEach ((obj:SceneObject) => {
                command.context.transform.push({
                    wt: obj.worldTranslation,
                    wr: obj.worldRotation,
                    ws: obj.worldScale,
                    local: obj.localTransform
                });
                command.context.objects.push(obj);
            });
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
    },
    unexecute: (whiteboard, command) => {
        for (let i = 0; i < command.context.objects.length; i++) {
            const obj:SceneObject = command.context.objects[i];
            const t = command.context.transform[i];
            obj.worldTranslation = t.wt;
            obj.worldRotation = t.wr;
            obj.worldScale = t.ws;
            obj.localTransform = t.local;
        }
    }
};
executors[MsgType.whiteboard_AlignObjectsRightMessage] = {
    execute: (whiteboard, command, results) => {
        const data = command.event.messageData;
        command.context.transform = [];
        command.context.objects = [];
        if (data.names && data.names.length > 1) {
            const objects: SceneObject[] = data.names.map ((name:string) => whiteboard.findEntity(name));
            objects.forEach ((obj:SceneObject) => {
                command.context.transform.push({
                    wt: obj.worldTranslation,
                    wr: obj.worldRotation,
                    ws: obj.worldScale,
                    local: obj.localTransform
                });
                command.context.objects.push(obj);
            });
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
    },
    unexecute: (whiteboard, command) => {
        for (let i = 0; i < command.context.objects.length; i++) {
            const obj:SceneObject = command.context.objects[i];
            const t = command.context.transform[i];
            obj.worldTranslation = t.wt;
            obj.worldRotation = t.wr;
            obj.worldScale = t.ws;
            obj.localTransform = t.local;
        }
    }
};
executors[MsgType.whiteboard_AlignObjectsTopMessage] = {
    execute: (whiteboard, command, results) => {
        const data = command.event.messageData;
        command.context.transform = [];
        command.context.objects = [];
        if (data.names && data.names.length > 1) {
            const objects: SceneObject[] = data.names.map ((name:string) => whiteboard.findEntity(name));
            objects.forEach ((obj:SceneObject) => {
                command.context.transform.push({
                    wt: obj.worldTranslation,
                    wr: obj.worldRotation,
                    ws: obj.worldScale,
                    local: obj.localTransform
                });
                command.context.objects.push(obj);
            });
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
    },
    unexecute: (whiteboard, command) => {
        for (let i = 0; i < command.context.objects.length; i++) {
            const obj:SceneObject = command.context.objects[i];
            const t = command.context.transform[i];
            obj.worldTranslation = t.wt;
            obj.worldRotation = t.wr;
            obj.worldScale = t.ws;
            obj.localTransform = t.local;
        }
    }
};
executors[MsgType.whiteboard_AlignObjectsBottomMessage] = {
    execute: (whiteboard, command, results) => {
        const data = command.event.messageData;
        command.context.transform = [];
        command.context.objects = [];
        if (data.names && data.names.length > 1) {
            const objects: SceneObject[] = data.names.map ((name:string) => whiteboard.findEntity(name));
            objects.forEach ((obj:SceneObject) => {
                command.context.transform.push({
                    wt: obj.worldTranslation,
                    wr: obj.worldRotation,
                    ws: obj.worldScale,
                    local: obj.localTransform
                });
                command.context.objects.push(obj);
            });
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
    },
    unexecute: (whiteboard, command) => {
        for (let i = 0; i < command.context.objects.length; i++) {
            const obj:SceneObject = command.context.objects[i];
            const t = command.context.transform[i];
            obj.worldTranslation = t.wt;
            obj.worldRotation = t.wr;
            obj.worldScale = t.ws;
            obj.localTransform = t.local;
        }
    }
};
executors[MsgType.whiteboard_ArrangeObjectsHorizontalMessage] = {
    execute: (whiteboard, command, results) => {
        const data = command.event.messageData;
        command.context.transform = [];
        command.context.objects = [];
        if (data.names && data.names.length > 2) {
            const objects: SceneObject[] = data.names.map ((name:string) => whiteboard.findEntity(name));
            objects.forEach ((obj:SceneObject) => {
                command.context.transform.push({
                    wt: obj.worldTranslation,
                    wr: obj.worldRotation,
                    ws: obj.worldScale,
                    local: obj.localTransform
                });
                command.context.objects.push(obj);
            });
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
    },
    unexecute: (whiteboard, command) => {
        for (let i = 0; i < command.context.objects.length; i++) {
            const obj:SceneObject = command.context.objects[i];
            const t = command.context.transform[i];
            obj.worldTranslation = t.wt;
            obj.worldRotation = t.wr;
            obj.worldScale = t.ws;
            obj.localTransform = t.local;
        }
    }
};
executors[MsgType.whiteboard_ArrangeObjectsVerticalMessage] = {
    execute: (whiteboard, command, results) => {
        const data = command.event.messageData;
        command.context.transform = [];
        command.context.objects = [];
        if (data.names && data.names.length > 2) {
            const objects: SceneObject[] = data.names.map ((name:string) => whiteboard.findEntity(name));
            objects.forEach ((obj:SceneObject) => {
                command.context.transform.push({
                    wt: obj.worldTranslation,
                    wr: obj.worldRotation,
                    ws: obj.worldScale,
                    local: obj.localTransform
                });
                command.context.objects.push(obj);
            });
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
    },
    unexecute: (whiteboard, command) => {
        for (let i = 0; i < command.context.objects.length; i++) {
            const obj:SceneObject = command.context.objects[i];
            const t = command.context.transform[i];
            obj.worldTranslation = t.wt;
            obj.worldRotation = t.wr;
            obj.worldScale = t.ws;
            obj.localTransform = t.local;
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

