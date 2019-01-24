import * as $ from 'jquery';
import { Widget } from './widget';

export interface IToolProps {
    id: string;
    icon: string;
    text: string;    
}

export interface ISubToolProps {
    
}
export interface IToolbarData {
    [groupName: string]: IToolProps[];
}

export class Toolbar extends Widget {
    private _toolbarMain: JQuery|null = null;
    private _toolbarSub: JQuery|null = null;
    protected _init () {
        const that = this;
        this._toolbarMain =$('<div></div>').appendTo(this.$el).addClass(['toolbar']);

    }
}