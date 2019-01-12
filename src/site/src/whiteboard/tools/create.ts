import * as lib from '../../catk';
import * as wb from '../whiteboard';
import * as commands from '../commands';

export class WBCreateTool extends wb.WBTool {
    public static readonly toolname: string = 'Create';
    public options: { [name: string]: any };
    private _factoryProperties: wb.IProperty[];
    private _creationParams: { [name:string]: { [name:string]: any } };
    public constructor(whiteboard: wb.WhiteBoard) {
        super(WBCreateTool.toolname, whiteboard);
        this.options = {};
        this._factoryProperties = [];
        this._creationParams = {};
    }
    public activate(options?: any) {
        if (options) {
            this.options = options;
            if (this._creationParams[options.createType] === undefined) {
                this._creationParams[options.createType] = {}
                this._factoryProperties = this._wb.getFactory (options.createType).getCreationProperties();
                if (this._factoryProperties) {
                    this._factoryProperties.forEach (prop => {
                        this._creationParams[options.createType][prop.name] = prop.value;
                    });
                }
            }
        }
        this.on (lib.EvtMouseDown.type, (ev: lib.EvtMouseDown) => {
            const args: any  = {
                type: this.options.createType,
                name: null,
            };
            for (const arg in this.options) {
                if (arg !== 'command' && arg !== 'createType' && arg !== 'type') {
                    args[arg] = this.options[arg];
                }
            }
            args.x = ev.x;
            args.y = ev.y;
            args.params = this._creationParams[this.options.createType];
            this._wb.triggerEx (new wb.WBCommandEvent('CreateObject', args));
        });
        this.on(wb.WBGetPropertyEvent.type, (ev: wb.WBGetPropertyEvent) => {
            if (ev.name in this._creationParams[this.options.createType]) {
                ev.value = this._creationParams[this.options.createType][ev.name];
            }
        });
        this.on(wb.WBSetPropertyEvent.type, (ev: wb.WBSetPropertyEvent) => {
            if (ev.name in this._creationParams[this.options.createType]) {
                this._creationParams[this.options.createType][ev.name] = ev.value;
            }
        });
        this.on(wb.WBGetPropertyListEvent.type, (ev: wb.WBGetPropertyListEvent) => {
            if (this._factoryProperties && this._factoryProperties.length > 0) {
                ev.properties = ev.properties || {};
                ev.properties[this.options.createType] = ev.properties[this.options.createType] || { desc: this.options.createType, properties: []};
                ev.properties[this.options.createType].properties = this._factoryProperties;
            }
        });
        super.activate (options);
    }
    public deactivate() {
        this.off (lib.EvtMouseDown.type);
        this.options = {};
        super.deactivate ();
    }
}