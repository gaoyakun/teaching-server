import * as catk from '../catk';
import * as wb from '../whiteboard/';

export interface IPluginObjectData {
    properties?: { [name:string]:any };
    eventHandlers?: { [evt:string]: (this:PluginObject, evt:catk.BaseEvent)=>void };
    init?: (this:PluginObject) => void;
}

export class PluginObject extends catk.SceneObject {
    private _data: IPluginObjectData|null;
    constructor (parent: catk.SceneObject|null, data: IPluginObjectData) {
        super (parent||undefined);
        if (data) {
            this._data = data;
            if (this._data.eventHandlers) {
                for (const evt in this._data.eventHandlers) {
                    this.on (evt, this._data.eventHandlers[evt]);
                }
            }
            this._data.init && this._data.init.call (this);
        } else {
            this._data = null;
        }
    }
    get data () {
        return this._data;
    }
}

export class PluginFactory extends wb.WBFactory {
    protected _createEntity (options?: any): catk.SceneObject {
        return new PluginObject (null, options);
    }
}