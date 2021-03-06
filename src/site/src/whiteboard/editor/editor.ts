import * as lib from '../../catk';
import * as wb from '../whiteboard';
import { WBSelectTool } from '../tools/select';
import * as proto from '../../../../common/protocols/protolist';
import { IToolProps, IToolGroup } from '../../ui';

export class WBToolPalette {
    private _editor: WBEditor;
    private _container: HTMLElement;
    constructor (editor: WBEditor, container: HTMLElement) {
        this._editor = editor;
        this._container = container;
    }
    unload () {
        while (this._container.hasChildNodes()) {
            this._container.removeChild(this._container.firstChild as Node);
        }
    }
    loadSubToolPalette (id: string) {
        const that = this;
        switch (id) {
            case 'tb-select': {
                this._loadSubToolPalette ({
                    groupName: {
                        tools: [{
                            styles: {
                                css: {
                                    padding: '6px 8px',
                                    fontSize: '14px'
                                },
                                text: '选择工具',
                            },
                            disabled: true
                        }, {
                            id: 'tb-align-top',
                            styles: {
                                icon: '/images/shape_align_top.png'
                            },
                            callback: function (type?) {
                                const selectTool = that._editor.whiteboard.getCurrentTool () as WBSelectTool;
                                const objects = selectTool.selectedObject;
                            }
                        }, {
                            id: 'tb-align-bottom',
                            styles: {
                                icon: '/images/shape_align_bottom.png'
                            }
                        }, {
                            id: 'tb-align-left',
                            styles: {
                                icon: '/images/shape_align_left.png'
                            }
                        }, {
                            id: 'tb-align-right',
                            styles: {
                                icon: '/images/shape_align_right.png'
                            }
                        }]
                    }
                });
                break;
            }
            case 'tb-text': {
                this._loadSubToolPalette ({
                    groupName: {
                        tools: [{
                            styles: {
                                css: {
                                    padding: '6px 8px',
                                    fontSize: '14px'
                                },
                                text: '标签工具'
                            },
                            disabled: true
                        }]
                    }
                });
                break;
            }
        }
    }
    loadToolPalette () {
        const buttonCSS = {
            padding: '8px 12px',
            fontSize: '16px'
        };
        const menuCSS = {
            padding: '4px 8px',
            fontSize: '16px'
        };
        const that = this;
        $(this._container).on ('itemselected', function (ev, id: string){
            console.log (`Item selected: ${id}`);
        });
        $(this._container).on ('itemdeselected', function (ev, id: string){
            console.log (`Item deselected: ${id}`);
        });
        $(this._container).toolbar ({
            iconWidth: 28,
            iconHeight: 25,
            menuIconWidth: 20,
            menuIconHeight: 20,
            groups: {
                groupMain: {
                    seperator: true,
                    tools: [{
                        id: 'tb-select',
                        type: 'radio',
                        radioGroup: 1,
                        styles: {
                            icon: '/images/toolbar-select.png',
                            text: '选择',
                            css: buttonCSS
                        },
                        callback: function (type?) {
                            that._editor.subToolPalette.loadSubToolPalette ('tb-select');
                            that._editor.whiteboard.useTool ('Select');
                        }
                    }, {
                        id: 'tb-text',
                        type: 'radio',
                        radioGroup: 1,
                        styles: {
                            icon: '/images/toolbar-text.png',
                            text: '标签',
                            css: buttonCSS
                        },
                        callback: function (type?) {
                            that._editor.subToolPalette.loadSubToolPalette ('tb-text');
                            that._editor.whiteboard.useTool ('Create', {
                                createType: 'Label',
                                text: '标签',
                                textColor: '#000000'
                            });
                        }
                    }, {
                        id: 'tb-swap',
                        type: 'radio',
                        radioGroup: 1,
                        styles: {
                            icon: '/images/toolbar-swap.png',
                            text: '交换',
                            css: buttonCSS
                        },
                        callback: function (type?) {
                            that._editor.whiteboard.useTool ('Swap');
                        }
                    }, {
                        id: 'tb-connect',
                        type: 'radio',
                        radioGroup: 1,
                        styles: {
                            icon: '/images/toolbar-connect.png',
                            text: '联结',
                            css: buttonCSS
                        },
                        callback: function (type?) {
                            that._editor.whiteboard.useTool ('Connect');
                        }
                    }, {
                        id: '',
                        type: 'radio',
                        radioGroup: 1,
                        styles: {
                            css: buttonCSS
                        },
                        subTools: [{
                            id: 'tb-draw',
                            styles: {
                                icon: '/images/toolbar-draw.png',
                                text: '绘图',
                                css: menuCSS
                            },
                            callback: function (type?) {
                                that._editor.whiteboard.useTool ('HandWriting', {
                                    mode: 'draw'
                                });
                            }
                        }, {
                            id: 'tb-erase',
                            styles: {
                                icon: '/images/toolbar-erase.png',
                                text: '擦除',
                                css: menuCSS
                            },
                            callback: function (type?) {
                                that._editor.whiteboard.useTool ('HandWriting', {
                                    mode: 'erase'
                                });
                            }
                        }]
                    }]
                },
                groupEdit: {
                    tools: [{
                        id: 'tb-undo',
                        styles: {
                            icon: '/images/toolbar-undo.png',
                            text: '撤销',
                            css: buttonCSS
                        },
                        callback: function (type?) {
                            that._editor.handleMessage (proto.MsgType.whiteboard_UndoMessage, {});
                        }
                    }]
                }
            }
        });
        setTimeout (() => {
            $(this._container).toolbar ('trigger', 'tb-select', 'click');
        }, 0);
    }
    private _loadSubToolPalette (groups: { [groupName: string]: IToolGroup }) {
        $(this._container).toolbar ({
            iconWidth: 20,
            iconHeight: 20,
            menuIconWidth: 20,
            menuIconHeight: 20,
            groups: groups
        });
    }
}

export class WBPropertyGrid {
    private _container: HTMLElement;
    private _tableId: string;
    private _object: lib.EventObserver|null;
    private _editor: WBEditor;
    constructor (editor: WBEditor, container: HTMLElement, id: string) {
        this._editor = editor;
        this._container = container;
        this._tableId = id;
        this._object = null;
    }
    addGroup (name: string) {
    }
    addButton (text: string, callback: () => void) {
        const btn = document.createElement ('a');
        btn.classList.add ('btn');
        this._container.appendChild (btn);
        btn.innerHTML = text;
        btn.href = 'javascript:void(0);';
        btn.onclick = () => {
            callback && callback ();
        };
    }
    addTextAttribute (name: string, value: string|null, readonly: boolean, changeCallback: (value: string) => any, laterChange?: boolean) {
        const label = document.createElement('label');
        label.innerHTML = name + ':';
        this._container.appendChild (label);
        const input: HTMLInputElement = document.createElement ('input');
        input.type = 'text';
        if (value) {
            input.value = value;
        }
        input.style.boxSizing = 'border-box';
        input.readOnly = readonly;
        input.disabled = readonly;
        if (changeCallback) {
            if (laterChange) {
                input.onchange = input.onblur = () => {
                    input.value = String(changeCallback (input.value));
                }
            } else {
                input.oninput = () => {
                    input.value = String(changeCallback (input.value));
                }
            }
        }
        this._container.appendChild (input);
    }
    addToggleAttribute (name: string, value: boolean, readonly: boolean, changeCallback: (value: boolean) => any) {
        const label = document.createElement ('label');
        label.innerHTML = name + ':';
        this._container.appendChild (label);
        const input: HTMLInputElement = document.createElement ('input');
        input.type = 'checkbox';
        input.checked = value;
        input.readOnly = readonly;
        input.disabled = readonly;
        if (changeCallback) {
            input.onchange = () => {
                input.checked = Boolean (changeCallback (input.checked));
            }
        }
        this._container.appendChild (input);
    }
    addNumberAttribute (name: string, value: number, readonly: boolean, changeCallback: (value: number) => any) {
        const label = document.createElement ('label');
        label.innerHTML = name + ':';
        this._container.appendChild (label);
        const input: HTMLInputElement = document.createElement ('input');
        input.type = 'number';
        input.value = String(value);
        input.readOnly = readonly;
        input.disabled = readonly;
        input.style.boxSizing = 'border-box';
        if (changeCallback) {
            input.oninput = () => {
                input.value = String(changeCallback (Number(input.value)));
            }
        }
        this._container.appendChild (input);
    }
    addChoiceAttribute (name: string, values: any[], value: string|null, readonly: boolean, changeCallback: (value: string) => any) {
        const label = document.createElement ('label');
        label.innerHTML = name + ':';
        this._container.appendChild (label);
        const input: HTMLSelectElement = document.createElement ('select');
        values.forEach (opt => {
            const option = document.createElement ('option');
            option.value = String(opt.value);
            option.innerText = String(opt.desc);
            input.add (option);
        });
        if (value) {
            input.value = String(value);
        }
        input.disabled = readonly;
        input.style.boxSizing = 'border-box';
        if (changeCallback) {
            input.onchange = () => {
                input.value = String(changeCallback (input.value));
            }
        }
        this._container.appendChild (input);
    }
    addColorAttribute (name: string, value: string, readonly: boolean, changeCallback: (value: string) => any) {
        const label = document.createElement ('label');
        label.innerHTML = name + ':';
        this._container.appendChild (label);
        const input: HTMLInputElement = document.createElement ('input');
        input.type = 'color';
        input.value = value;
        input.readOnly = readonly;
        input.disabled = readonly;
        input.style.boxSizing = 'border-box';
        if (changeCallback) {
            input.onchange = () => {
                input.value = String(changeCallback (input.value));
            }
        }
        this._container.appendChild (input);
    }
    getToolProperty (name: string): any {
        if (this._object) {
            const ev = new wb.WBGetPropertyEvent (name);
            this._object.triggerEx (ev);
            return ev.value;
        }
    }
    setToolProperty (name: string, value: any): void {
        if (this._object) {
            const ev = new wb.WBSetPropertyEvent(name, value);
            this._object.triggerEx (ev);
        }
    }
    addToolProperty (prop: wb.IProperty) {
        const propName = prop.name;
        const propType = prop.type;
        const propReadonly = prop.readonly;
        if (prop.enum) {
            this.addChoiceAttribute (prop.desc, prop.enum, this.getToolProperty(propName), propReadonly, (value:string) => {
                switch (propType) {
                case 'string': 
                    this.setToolProperty (propName, value);
                    return this.getToolProperty (propName);
                case 'number':
                    this.setToolProperty (propName, Number(value));
                    return this.getToolProperty (propName);
                case 'boolean':
                    this.setToolProperty (propName, Boolean(value));
                    return this.getObjectProperty (propName);
                case 'color':
                    this.setToolProperty (propName, value);
                    return this.getToolProperty (propName);
                }
            });
        } else {
            switch (propType) {
            case 'string':
                this.addTextAttribute (prop.desc, this.getToolProperty(propName), propReadonly, (value:string) => {
                    this.setToolProperty (propName, value);
                    return this.getToolProperty (propName);
                });
                break;
            case 'number':
                this.addNumberAttribute (prop.desc, this.getToolProperty(propName), propReadonly, (value:number) => {
                    this.setToolProperty (propName, value);
                    return this.getToolProperty (propName);
                });
                break;
            case 'boolean':
                this.addToggleAttribute (prop.desc, this.getToolProperty(propName), propReadonly, (value:boolean) => {
                    this.setToolProperty (propName, value);
                    return this.getToolProperty (propName);
                });
                break;
            case 'color':
                this.addColorAttribute (prop.desc, this.getToolProperty(propName), propReadonly, (value:string) => {
                    this.setToolProperty (propName, value);
                    return this.getToolProperty (propName);
                });
                break;
            }
        }
    }
    getObjectProperty (name: string): any {
        if (this._object) {
            const ev = new wb.WBGetPropertyEvent (name);
            this._object.triggerEx (ev);
            return ev.value;
        }
    }
    setObjectProperty (name: string, value: any): void {
        if (this._object) {
            this._editor.handleMessage (proto.MsgType.whiteboard_SetObjectPropertyMessage, {
                name: (this._object as lib.SceneObject).entityName,
                propName: name,
                propValueJson: JSON.stringify(value)
            });
        }
    }
    addObjectProperty (prop: wb.IProperty) {
        const propName = prop.name;
        const propType = prop.type;
        const propReadonly = prop.readonly;
        if (prop.enum) {
            this.addChoiceAttribute (prop.desc, prop.enum, this.getObjectProperty(propName), propReadonly, (value:string) => {
                switch (propType) {
                case 'string': 
                    this.setObjectProperty (propName, value);
                    return this.getObjectProperty (propName);
                case 'number':
                    this.setObjectProperty (propName, Number(value));
                    return this.getObjectProperty (propName);
                case 'boolean':
                    this.setObjectProperty (propName, Boolean(value));
                    return this.getObjectProperty (propName);
                case 'color':
                    this.setObjectProperty (propName, value);
                    return this.getObjectProperty (propName);
                }
            });
        } else {
            switch (propType) {
            case 'string':
                this.addTextAttribute (prop.desc, this.getObjectProperty(propName), propReadonly, (value:string) => {
                    this.setObjectProperty (propName, value);
                    return this.getObjectProperty (propName);
                });
                break;
            case 'number':
                this.addNumberAttribute (prop.desc, this.getObjectProperty(propName), propReadonly, (value:number) => {
                    this.setObjectProperty (propName, value);
                    return this.getObjectProperty (propName);
                });
                break;
            case 'boolean':
                this.addToggleAttribute (prop.desc, this.getObjectProperty(propName), propReadonly, (value:boolean) => {
                    this.setObjectProperty (propName, value);
                    return this.getObjectProperty (propName);
                });
                break;
            case 'color':
                this.addColorAttribute (prop.desc, this.getObjectProperty(propName), propReadonly, (value:string) => {
                    this.setObjectProperty (propName, value);
                    return this.getObjectProperty (propName);
                });
                break;
            }
        }
    }
    clear () {
        while (this._container.firstChild) {
            const el:any = this._container.firstChild;
            if (el.onchange) {
                el.onchange = null;
            }
            if (el.onclick) {
                el.onclick = null;
            }
            el.remove();
        }
        /*
        const inputs = document.querySelectorAll (`table#${this._tableId} input`);
        for (let i = 0; i < inputs.length; i++) {
            (inputs[i] as HTMLInputElement).onchange = null;
        };
        const selects = document.querySelectorAll (`table#${this._tableId} select`);
        for (let i = 0; i < selects.length; i++) {
            (selects[i] as HTMLSelectElement).onchange = null;
        }
        const tbody = document.querySelector (`table#${this._tableId} tbody`);
        while (tbody && tbody.hasChildNodes()) {
            tbody.removeChild (tbody.firstChild as Node);
        }
        */
        this._object = null;
    }
    reloadToolProperties () {
        const obj = this._object;
        this.clear ();        
        obj && this.loadToolProperties (obj);
    }
    loadToolProperties (object: lib.EventObserver) {
        if (this._object !== object) {
            this.clear ();
            this._object = object;
            if (this._object) {
                const ev = new wb.WBGetPropertyListEvent ();
                this._object.triggerEx (ev);
                if (ev.properties) {
                    for (const groupName in ev.properties) {
                        const group = ev.properties[groupName];
                        this.addGroup (group.desc);
                        group.properties.forEach ((value: wb.IProperty) => {
                            this.addToolProperty (value);
                        });
                    }
                }
            }
        }
    }
    reloadObjectProperties () {
        const obj = this._object;
        this.clear ();
        obj && this.loadObjectProperties (obj);
    }
    loadObjectProperties (object: lib.EventObserver) {
        if (this._object !== object) {
            this.clear ();
            this._object = object;
            if (this._object) {
                const ev = new wb.WBGetPropertyListEvent ();
                this._object.triggerEx (ev);
                if (ev.properties) {
                    for (const groupName in ev.properties) {
                        const group = ev.properties[groupName];
                        this.addGroup (group.desc);
                        group.properties.forEach ((value: wb.IProperty) => {
                            this.addObjectProperty (value);
                        });
                    }
                }
            }
        }
    }
    private createRow (): HTMLTableRowElement {
        const tbody = document.querySelector (`#${this._tableId} tbody`);
        const tr: HTMLTableRowElement = document.createElement ('tr');
        if (tbody && tr) {
            tbody.appendChild (tr);
        }
        return tr;
    }
    private createCell (tr: HTMLTableRowElement): HTMLElement {
        const td = document.createElement ('td');
        td.style.color = '#000';
        td.style.fontWeight = 'bold';
        td.style.overflow = 'hidden';
        td.style.whiteSpace = 'nowrap';
        td.style.textOverflow = 'ellipsis';
        td.style.height = '24px';
        tr.appendChild (td);
        return td;
    }
    private createGroupCell (tr: HTMLTableRowElement, name: string): HTMLElement {
        const td = this.createCell (tr);
        td.style.paddingLeft = '5px';
        td.setAttribute ('colspan', '2');
        td.innerText = name;
        return td;
    }
    private createPropCell (tr: HTMLTableRowElement): HTMLElement {
        const td = this.createCell (tr);
        td.style.paddingLeft = '5px';
        td.style.border = 'dotted 1px #ccc';
        td.style.color = '#000';
        return td;
    }
}

export class WBEditor {
    private _strokeColor: string;
    private _fillColor: string;
    private _toolFontSize: number;
    private _wb: wb.WhiteBoard;
    private _toolPalette: WBToolPalette;
    private _subToolPalette: WBToolPalette;
    private _objectPropGrid: WBPropertyGrid;
    private _toolPropGrid: WBPropertyGrid;
    constructor (WB: wb.WhiteBoard, toolPaletteElement:HTMLElement, subToolPaletteElement:HTMLElement, objectPropGridElement:HTMLElement, toolPropGridElement:HTMLElement) {
        this._strokeColor = '#00000000';
        this._fillColor = 'red';
        this._toolFontSize = 14;
        this._wb = WB;
        this._toolPalette = new WBToolPalette (this, toolPaletteElement);
        this._subToolPalette = new WBToolPalette (this, subToolPaletteElement);
        this._toolPalette.loadToolPalette ();
        this._objectPropGrid = new WBPropertyGrid (this, objectPropGridElement, 'wb-object');
        this._toolPropGrid = new WBPropertyGrid (this, toolPropGridElement, 'wb-tool');
    }
    get whiteboard () {
        return this._wb;
    }
    get toolPalette () {
        return this._toolPalette;
    }
    get subToolPalette () {
        return this._subToolPalette;
    }
    get objectPropertyGrid () {
        return this._objectPropGrid;
    }
    get toolPropertyGrid () {
        return this._toolPropGrid;
    }
    get strokeColor () {
        return this._strokeColor;
    }
    set strokeColor (value: string) {
        this._strokeColor = value;
    }
    get fillColor () {
        return this._fillColor;
    }
    set fillColor (value: string) {
        this._fillColor = value;
    }
    get toolFontSize () {
        return this._toolFontSize;
    }
    set toolFontSize (value: number) {
        this._toolFontSize = value;
    }
    handleMessage (msgType:proto.MsgType, args?: any) {
        lib.App.triggerEvent(null, new wb.WBMessageEvent(msgType, args));
    }
}
