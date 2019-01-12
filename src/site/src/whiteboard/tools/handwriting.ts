import * as lib from '../../catk';
import * as commands from '../commands';
import * as wb from '../whiteboard';
import * as objects from '../objects';

export class WBHandWritingTool extends wb.WBTool {
    public static readonly toolname: string = 'HandWriting';
    private _freedrawNode: objects.WBFreeDraw|null;
    private _paramsDraw: any;
    private _paramsErase: any;
    private _mode: string;
    constructor(whiteboard: wb.WhiteBoard) {
        super(WBHandWritingTool.toolname, whiteboard);
        this._freedrawNode = null;
        this._mode = 'draw';
        this._paramsDraw = {
            color: '#000',
            lineWidth: 2,
            curveMode: 0
        };
        this._paramsErase = {
            eraseSize: 20
        };
        this.on(wb.WBGetPropertyEvent.type, (ev: wb.WBGetPropertyEvent) => {
            let params = null;
            if (this._mode === 'draw') {
                params = this._paramsDraw;
            } else if (this._mode === 'erase') {
                params = this._paramsErase;
            }
            if (params && ev.name in params) {
                ev.value = params[ev.name];
            }
        });
        this.on(wb.WBSetPropertyEvent.type, (ev: wb.WBSetPropertyEvent) => {
            let params = null;
            if (this._mode === 'draw') {
                params = this._paramsDraw;
            } else if (this._mode === 'erase') {
                params = this._paramsErase;
            }
            if (params && ev.name in params) {
                params[ev.name] = ev.value;
                this.applyProperty (ev.name, ev.value);
            }
        });
        this.on(wb.WBGetPropertyListEvent.type, (ev: wb.WBGetPropertyListEvent) => {
            ev.properties = ev.properties || {};
            if (this._mode === 'draw') {
                ev.properties[this.name] = ev.properties[this.name] || { desc: '画笔工具', properties: []};
                ev.properties[this.name].properties.push ({
                    name: 'color',
                    desc: '画笔颜色',
                    readonly: false,
                    type: 'color',
                    value: this._paramsDraw.color
                });
                ev.properties[this.name].properties.push ({
                    name: 'lineWidth',
                    desc: '画笔粗细',
                    readonly: false,
                    type: 'number',
                    value: this._paramsDraw.lineWidth
                });
                ev.properties[this.name].properties.push ({
                    name: 'curveMode',
                    desc: '平滑模式',
                    readonly: false,
                    type: 'number',
                    value: this._paramsDraw.curveMode,
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
            } else if (this._mode === 'erase') {
                ev.properties[this.name] = ev.properties[this.name] || { desc: '橡皮工具', properties: []};
                ev.properties[this.name].properties.push ({
                    name: 'eraseSize',
                    desc: '橡皮大小',
                    readonly: false,
                    type: 'number',
                    value: this._paramsErase.eraseSize
                });
            }
        });
    }
    public activate(options?: any) {
        if (options) {
            this._mode = options.mode || 'draw';
        }
        this._freedrawNode = this.findFreedrawNode ();
        if (!this._freedrawNode) {
            const args: any = {
                type: 'FreeDraw',
                name: null,
                x: 0,
                y: 0
            };
            this._wb.triggerEx (new wb.WBCommandEvent('CreateObject', args));
            this._freedrawNode = args.objectCreated;
        }
        if (this._freedrawNode) {
            this._freedrawNode.mode = this._mode;
            this._freedrawNode.setCapture ();
            this.applyProperties (this._paramsDraw);
            this.applyProperties (this._paramsErase);
            super.activate (options);
        }
    }
    public deactivate() {
        if (this._freedrawNode) {
            this._freedrawNode.releaseCapture();
            this._freedrawNode.mode = 'none';
            this._freedrawNode = null;
        }
        super.deactivate ();
    }
    public activateObject(object: lib.SceneObject) {
        super.activateObject (object);
    }
    public deactivateObject(object: lib.SceneObject) {
        super.deactivateObject (object);
    }
    private applyProperty (name:string, value:any) {
        if (this._freedrawNode) {
            this._freedrawNode.triggerEx (new wb.WBSetPropertyEvent (name, value));
        }
    }
    private applyProperties (props: any) {
        for (const prop in props) {
            this.applyProperty (prop, props[prop]);
        }
    }
    private findFreedrawNode (rootNode?: lib.SceneObject): objects.WBFreeDraw|null {
        const view = this._wb.view;
        if (view) {
            const root = rootNode || view.rootNode;
            if (root) {
                if (root.entityType === 'FreeDraw') {
                    return root as objects.WBFreeDraw;
                } else {
                    for (let i = 0; i < root.numChildren; i++) {
                        const result = this.findFreedrawNode (root.childAt (i));
                        if (result) {
                            return result;
                        }
                    }
                }
            }
        }
        return null;
    }
}