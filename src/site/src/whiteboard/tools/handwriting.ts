import * as lib from '../../catk';
import * as wb from '../whiteboard';
import * as objects from '../objects';
import { MsgType } from '../../../../common/protocols/protolist';

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
                this.applyProperties (params);
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
            this._freedrawNode = this._wb.createEntity ('FreeDraw', 0, 0, {}) as objects.WBFreeDraw;
        } else {
            this._freedrawNode.reset ();
        }
        this._freedrawNode!.mode = this._mode;
        this._freedrawNode!.setCapture ();
        this.applyProperties (this._paramsDraw);
        this.applyProperties (this._paramsErase);
        super.activate (options);
    }
    public deactivate() {
        if (this._freedrawNode) {
            this._freedrawNode.releaseCapture();
            this._freedrawNode.reset ();
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
    private applyProperties (props: any) {
        if (this._freedrawNode) {
            props.lineWidth !== undefined && (this._freedrawNode.lineWidth = props.lineWidth);
            props.color !== undefined && (this._freedrawNode.color = props.color);
            props.eraseSize !== undefined && (this._freedrawNode.eraseSize = props.eraseSize);
        }
    }
    private findFreedrawNode (): objects.WBFreeDraw|null {
        const node = this._wb.findEntityByType ('FreeDraw');
        return node ? node as objects.WBFreeDraw : null;
    }
}