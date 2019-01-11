import * as lib from '../../catk';
import * as wb from '../whiteboard';
import * as commands from '../commands';
import { CommandServer } from '../../cmdserver/cmdserver';

interface ITool {
    command: {
        command: string;
        [prop: string]: any;
    }
    iconClass: string|Function;
    elementId?: string;
}

interface IToolPalette {
    [name: string]: {
        iconClass: string;
        command?: string;
        args?: {
            [name: string]: any;
        }
    }
}

interface IToolSet {
    tools: IToolPalette;
    operations: IToolPalette;
}

export class WBToolPalette {
    private static uniqueId: number = 1;
    private _editor: WBEditor;
    private _container: HTMLElement;
    private _tools: ITool[];
    private _curTool: ITool|null;
    constructor (editor: WBEditor, container: HTMLElement) {
        this._editor = editor;
        this._container = container;
        this._tools = [];
        this._curTool = null;
    }
    unload () {
        while (this._container.hasChildNodes()) {
            this._container.removeChild(this._container.firstChild as Node);
        }
        this._tools = [];
    }
    loadToolPalette (toolPalette: IToolPalette) {
        for (const toolname in toolPalette) {
            const tooldef = this.getOpTool (toolPalette, toolname);
            const toolButton = this.createToolButton (tooldef);
            if (toolButton) {
                toolButton.addEventListener ('click', () => {
                    const toolIndex = Number(toolButton.getAttribute ('toolIndex'));
                    const tool = this._tools[toolIndex];
                    if (tool !== this._curTool) {
                        if (this._curTool) {
                            const curToolButton = document.querySelector(`#${this._curTool.elementId}`);
                            curToolButton && curToolButton.classList.remove ('active');
                            this._editor.executeCommand ({ command: 'UseTool' });
                            this._curTool = null;
                        }
                    }
                    if (tool) {
                        const button = document.querySelector(`#${tool.elementId}`);
                        button && button.classList.add ('active');
                        this._editor.executeCommand (tool.command);
                        this._curTool = tool;
                    }
                });
            }
        }
    }
    loadOpPalette (opPalette: IToolPalette) {
        for (const op in opPalette) {
            const tooldef = this.getOpTool (opPalette, op);
            const toolButton = this.createToolButton (tooldef);
            if (toolButton) {
                toolButton.addEventListener ('click', () => {
                    const toolIndex = Number(toolButton.getAttribute ('toolIndex'));
                    const tool = this._tools[toolIndex];
                    this._editor.executeCommand (tool.command);
                });
            }
        }
    }
    private getOpTool (tool: IToolPalette, name: string): ITool {
        const tooldef: ITool = {
            command: {
                command: name
            },
            iconClass: tool[name].iconClass
        }
        const cmd = tool[name].command;
        if (cmd) {
            tooldef.command.command = cmd;
        }
        const args = tool[name].args;
        if (args) {
            for (const argname in args) {
                tooldef.command[argname] = args[argname];
            }
        }
        return tooldef;
    }
    private createToolButton (tooldef: ITool): HTMLElement|null {
        this._tools.push (tooldef);
        const buttonSize = this._editor.toolFontSize + 6; 
        let toolButton: HTMLElement|null = null;
        if (typeof tooldef.iconClass === 'function') {
            toolButton = (tooldef.iconClass as Function)(this._editor);
            toolButton && toolButton.classList.add ('toolbutton');
        } else {
            toolButton = document.createElement ('div');
            toolButton.classList.add ('flex-h', 'flex-align-x-center', 'flex-align-y-center');
            toolButton.classList.add ('toolbutton');
            const toolIcon: HTMLElement = document.createElement ('i');
            toolIcon.style.fontSize = `${this._editor.toolFontSize}px`;
            toolIcon.style.color = '#fff';
            tooldef.iconClass.split (' ').forEach ((cls: string) => {
                toolIcon.classList.add (cls);
            });
            toolButton.appendChild (toolIcon);
        }
        if (toolButton) {
            tooldef.elementId = `toolbutton-${WBToolPalette.uniqueId++}`;
            toolButton.setAttribute ('id', tooldef.elementId);
            toolButton.style.width = `${buttonSize}px`;
            toolButton.style.height = `${buttonSize}px`;
            toolButton.setAttribute ('toolIndex', String(this._tools.length-1));
            this._container.appendChild (toolButton);
        }
        return toolButton;
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
        const table = document.createElement ('table');
        table.style.border = 'solid 1px #95B8E7';
        table.style.borderSpacing = '0px';
        table.style.margin = '0px';
        table.style.fontSize = '12px';
        table.style.fontFamily = 'verdana';
        table.style.width = '100%';
        table.style.tableLayout = 'fixed';
        table.style.backgroundColor = '#fff';
        table.setAttribute ('id', this._tableId);
        const tbody = document.createElement ('tbody');
        table.appendChild (tbody);
        this._container.appendChild (table);
    }
    addGroup (name: string) {
        const tr = this.createRow ();
        tr.style.backgroundColor = '#E0ECFF';
        tr.style.fontWeight = 'bold';
        this.createGroupCell (tr, name);
    }
    addButton (text: string, callback: () => void) {
        const tr = this.createRow ();
        const td = this.createCell (tr);
        td.style.padding = '5px';
        td.style.textAlign = 'center';
        td.setAttribute ('colspan', '2');
        const btn = document.createElement ('button');
        btn.innerText = text;
        btn.style.width = '100%';
        btn.style.padding = '5px';
        btn.onclick = () => {
            callback && callback ();
        };
        td.appendChild (btn);
    }
    addTextAttribute (name: string, value: string|null, readonly: boolean, changeCallback: (value: string) => any, laterChange?: boolean) {
        const tr = this.createRow ();
        this.createPropCell (tr).innerText = name;
        const input: HTMLInputElement = document.createElement ('input');
        input.type = 'text';
        if (value) {
            input.value = value;
        }
        input.style.width = '100%';
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
        this.createPropCell (tr).appendChild (input);
    }
    addToggleAttribute (name: string, value: boolean, readonly: boolean, changeCallback: (value: boolean) => any) {
        const tr = this.createRow ();
        this.createPropCell (tr).innerText = name;
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
        this.createPropCell (tr).appendChild (input);
    }
    addNumberAttribute (name: string, value: number, readonly: boolean, changeCallback: (value: number) => any) {
        const tr = this.createRow ();
        this.createPropCell (tr).innerText = name;
        const input: HTMLInputElement = document.createElement ('input');
        input.type = 'number';
        input.value = String(value);
        input.readOnly = readonly;
        input.disabled = readonly;
        input.style.width = '100%';
        input.style.boxSizing = 'border-box';
        if (changeCallback) {
            input.oninput = () => {
                input.value = String(changeCallback (Number(input.value)));
            }
        }
        this.createPropCell (tr).appendChild (input);
    }
    addChoiceAttribute (name: string, values: any[], value: string|null, readonly: boolean, changeCallback: (value: string) => any) {
        const tr = this.createRow ();
        this.createPropCell (tr).innerText = name;
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
        input.style.width = '100%';
        input.style.boxSizing = 'border-box';
        if (changeCallback) {
            input.onchange = () => {
                input.value = String(changeCallback (input.value));
            }
        }
        this.createPropCell (tr).appendChild (input);
    }
    addColorAttribute (name: string, value: string, readonly: boolean, changeCallback: (value: string) => any) {
        const tr = this.createRow ();
        this.createPropCell (tr).innerText = name;
        const input: HTMLInputElement = document.createElement ('input');
        input.type = 'color';
        input.value = value;
        input.readOnly = readonly;
        input.disabled = readonly;
        input.style.width = '100%';
        input.style.boxSizing = 'border-box';
        if (changeCallback) {
            input.onchange = () => {
                input.value = String(changeCallback (input.value));
            }
        }
        this.createPropCell (tr).appendChild (input);
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
            const cmd: commands.IWBCommand = {
                command: 'GetObjectProperty',
                objectName: (this._object as lib.SceneObject).entityName,
                propName: name
            }
            this._editor.commandServer.whiteboard.executeCommand (cmd);
            return cmd.propValue;
        }
    }
    setObjectProperty (name: string, value: any): void {
        if (this._object) {
            this._editor.commandServer.executeCommand ({
                command: 'SetObjectProperty',
                objectName: (this._object as lib.SceneObject).entityName,
                propName: name,
                propValue: value
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
    loadPageProperties () {
        this.clear ();
        const pageList: any[] = [];
        const view = this._editor.commandServer.whiteboard.view;
        if (view) {
            view.forEachPage ((page:any) => {
                pageList.push ({
                    value: page.name,
                    desc: page.name
                });
            });
            this.addChoiceAttribute ('页面列表', pageList, view.currentPage, false, (value:string) => {
                view.selectPage (value);
                this.loadPageProperties ();
                return view.currentPage;
            });
            this.addTextAttribute ('页面名称', view.currentPage, false, (value:string) => {
                if (value !== view.currentPage) {
                    this._editor.commandServer.executeCommand ({
                        command: 'RenamePage',
                        newName: value
                    });
                    this.loadPageProperties ();
                    return view.currentPage;
                }
            }, true);
            this.addTextAttribute ('页面背景图像', view.pageImage, false, value => {
                view.pageImage = (value === '') ? null : value;
                return value;
            }, true);
            this.addChoiceAttribute ('页面背景重复', [{
                value: 'repeat',
                desc: '重复'
            }, {
                value: 'repeat-x',
                desc: '横向重复'
            }, {
                value: 'repeat-y',
                desc: '纵向重复'
            }, {
                value: 'no-repeat',
                desc: '不重复'
            }], view.pageImageRepeat, false, value => {
                view.pageImageRepeat = value;
                return value;
            });
            this.addToggleAttribute ('页面背景固定', view.pageImageAttachment === 'fixed', false, value => {
                view.pageImageAttachment = value ? 'fixed' : 'scroll';
                return value;
            });
            this.addTextAttribute ('页面背景大小', view.pageImageSize, false, value => {
                view.pageImageSize = value;
                return value;
            });
            this.addColorAttribute ('页面背景颜色', view.pageColor||'', false, value => {
                view.pageColor = (value === '') ? null : value;
                return value;
            });
            this.addButton ('新建页面', () => {
                this._editor.commandServer.executeCommand ({
                    command: 'AddPage'
                });
                this.loadPageProperties ();
            });
            this.addButton ('删除页面', () => {
                this._editor.commandServer.executeCommand ({
                    command: 'DeletePage'
                });
                this.loadPageProperties ();
            })
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
    private _cmdServer: CommandServer;
    private _toolset: IToolSet;
    private _toolPalette: WBToolPalette;
    private _opPalette: WBToolPalette;
    private _objectPropGrid: WBPropertyGrid;
    private _toolPropGrid: WBPropertyGrid;
    constructor (cmdServer: CommandServer, toolset: IToolSet, toolPaletteElement:HTMLElement, opPaletteElement:HTMLElement, objectPropGridElement:HTMLElement, toolPropGridElement:HTMLElement) {
        this._strokeColor = '#00000000';
        this._fillColor = 'red';
        this._toolFontSize = 14;
        this._cmdServer = cmdServer;
        this._toolset = toolset;
        this._toolPalette = new WBToolPalette (this, toolPaletteElement);
        this._toolPalette.loadToolPalette (toolset.tools);
        this._opPalette = new WBToolPalette (this, opPaletteElement);
        this._opPalette.loadOpPalette (toolset.operations);
        this._objectPropGrid = new WBPropertyGrid (this, objectPropGridElement, 'wb-object');
        this._toolPropGrid = new WBPropertyGrid (this, toolPropGridElement, 'wb-tool');
        this._objectPropGrid.loadPageProperties ();
    }
    get toolSet () {
        return this._toolset;
    }
    get opPalette () {
        return this._opPalette;
    }
    get toolPalette () {
        return this._toolPalette;
    }
    get objectPropertyGrid () {
        return this._objectPropGrid;
    }
    get toolPropertyGrid () {
        return this._toolPropGrid;
    }
    get commandServer () {
        return this._cmdServer;
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
    executeCommand (cmd: {
        command: string,
        [prop: string]: any
    }) {
            if (cmd.command.length > 0) {
            const realCommand: any = {};
            for (const name in cmd) {
                const value = cmd[name];
                realCommand[name] = (typeof value === 'function') ? (value as Function) (this) : value;
            }
            this._cmdServer.executeCommand (realCommand);
        }
    }
}
