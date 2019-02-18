import * as $ from 'jquery';
import { Widget } from './widget';

export interface IToolbarCallback {
    (this:Element, tool: IToolProps): void
}

export interface IToolProps {
    id?: string;
    icon?: string;
    text?: string;
    disabled?: boolean;
    active?: boolean;
    subIndex?: number;
    subTools?: IToolProps[]; 
    callback?: IToolbarCallback;
}

export interface IToolGroup {
    toggle: 'single'|'multiple'|'none';
    tools: IToolProps[];
}

export interface IToolbarData {
    iconWidth?: number;
    iconHeight?: number;
    buttonCSS?: any;
    menuIconWidth?: number;
    menuIconHeight?: number;
    menuCSS?: any;
    groups: { [groupName: string]: IToolGroup };
}

export class Toolbar extends Widget {
    private _newClassList: string[];
    constructor(el:Element, options:any) {
        super (el, options);
        this._newClassList = [];
    }
    clear () {
        this.$el.empty ();
    }
    trigger (id: string, event: string) {
        this.$el.find(`#${id}`).trigger (event);
    }
    protected _init () {
        for (const cls of ['p-0']) {
            if (!this.$el.hasClass (cls)) {
                this.$el.addClass (cls);
                this._newClassList.push (cls);
            }
        }
        for (const groupName in this.options.groups) {
            const group = this.options.groups[groupName];
            const groupDiv = $('<div></div>').addClass (['btn-group', 'ml-1', 'mr-1']).attr('role', 'group').appendTo (this.$el);
            for (let i = 0; i < group.tools.length; i++) {
                this.createToolButton (groupDiv, group, i);
            }
            $('<div></div>').addClass ('toolbar-seperator').appendTo (this.$el);
        }
    }
    protected _deinit () {
        this.$el.empty ();
        this.$el.removeClass (this._newClassList);
        this._newClassList = [];
    }
    private createToolButton (groupDiv: JQuery, group: IToolGroup, index: number) {
        const tool = group.tools[index];
        tool.active = group.toggle === 'none';
        if (!tool.disabled && tool.subTools && tool.subTools.length > 0) {
            tool.subIndex = 0;
            tool.icon = tool.subTools[0].icon;
            tool.text = tool.subTools[0].text;
            tool.callback = tool.subTools[0].callback;
        }
        const button = $('<a></a>').addClass('btn').appendTo(groupDiv);
        if (this.options.buttonCSS) {
            button.css (this.options.buttonCSS);
        }
        if (tool.disabled) {
            button.addClass ('no-pointer-events');
        }
        const clickDiv = $('<div></div>').css({
            display: 'inline-block'
        }).appendTo (button);
        if (tool.id) {
            clickDiv.attr({ id: tool.id });
        }
        if (!tool.disabled) {
            clickDiv.on ('mouseenter', function(){
                button.addClass ('selected');
            });
            clickDiv.on ('mouseleave', function(){
                if (group.toggle === 'none' || !tool.active) {
                    button.removeClass ('selected');
                }
            });
            clickDiv.on ('click', (ev) => {
                ev.stopPropagation ();
                if (group.toggle !== 'none') {
                    if (group.toggle === 'single') {
                        if (!tool.active) {
                            for (const t of group.tools) {
                                t.active = false;
                            }
                            button.siblings ('a').removeClass ('selected');
                            button.addClass ('selected');
                            tool.active = true;
                            if (tool.callback) {
                                tool.callback.call (button[0], tool);
                            }
                            this.$el.trigger ('itemclick', tool);
                        }
                    } else {
                        button.toggleClass ('selected');
                        tool.active = !tool.active;
                        if (tool.callback) {
                            tool.callback.call (button[0], tool);
                        }
                        this.$el.trigger ('itemclick', tool);
                    }
                } else {
                    if (tool.callback) {
                        tool.callback.call (button[0], tool);
                    }
                    this.$el.trigger ('itemclick', tool);
                }
            });
        }
        const icon = tool.icon ? $('<img/>').attr({
            src: tool.subTools && tool.subTools.length > 0 ? tool.subTools[0].icon : tool.icon,
            width: this.options.iconWidth || 28,
            height: this.options.iconHeight || 28
        }).appendTo(clickDiv) : null;
        const label = tool.text ? $('<div></div>').addClass('small').html(tool.text).appendTo (clickDiv) : null;
        if (group.toggle !== 'multiple' && !tool.disabled && tool.subTools && tool.subTools.length > 0) {
            button.addClass (['dropdown-toggle', 'no-pointer-events']).attr('data-toggle', 'dropdown');
            clickDiv.css ({
                pointerEvents: 'all'
            });
            const menu = $('<div></div>').addClass ('dropdown-menu').appendTo (groupDiv);
            for (let i = 0; i < tool.subTools.length; i++) {
                const subTool = tool.subTools[i];
                const subToolButton = $('<a></a>').addClass('dropdown-item').appendTo (menu);
                if (subTool.id) {
                    subToolButton.attr ({ id: subTool.id });
                }
                if (this.options.menuCSS) {
                    subToolButton.css (this.options.menuCSS);
                }
                subToolButton.on ('click', () => {
                    if (group.toggle === 'none') {
                        if (tool.subIndex !== i) {
                            tool.subIndex = i;
                            tool.icon = subTool.icon;
                            tool.text = subTool.text;
                            tool.callback = subTool.callback;
                            label && label.html (tool.text!);
                            icon && icon.attr ('src', tool.icon!);
                        }
                        if (tool.callback) {
                            tool.callback.call (button[0], tool);
                        }
                        this.$el.trigger('itemclick', tool);
                    } else {
                        if (tool.subIndex !== i || !tool.active) {
                            if (tool.subIndex !== i) {
                                tool.subIndex = i;
                                tool.icon = subTool.icon;
                                tool.text = subTool.text;
                                tool.callback = subTool.callback;
                                label && label.html (tool.text!);
                                icon && icon.attr ('src', tool.icon!);
                            }
                            if (!tool.active) {
                                for (const t of group.tools) {
                                    t.active = false;
                                }
                                button.siblings ('a').removeClass ('selected');
                                button.addClass ('selected');
                                tool.active = true;
                            }
                            if (tool.callback) {
                                tool.callback.call (button[0], tool);
                            }
                            this.$el.trigger('itemclick', tool);
                        }
                    }
                });
                if (subTool.icon) {
                    $('<img/>').attr({
                        src: subTool.icon,
                        width: this.options.menuIconWidth || 20,
                        height: this.options.menuIconHeight || 20
                    }).appendTo (subToolButton);
                }
                if (subTool.text) {
                    $('<small></small>').addClass('ml-2').html (subTool.text).appendTo(subToolButton);
                }
            }
        }
        return button;
    }
}