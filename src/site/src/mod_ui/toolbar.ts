import * as $ from 'jquery';
import { Widget } from './widget';

export interface IToolbarCallback {
    (this:Element, type?:'selected'|'deselected'): void
}

export interface IToolProps {
    id?: string;
    type?: 'button'|'radio'|'check';
    radioGroup?: number;
    icon?: string;
    text?: string;
    disabled?: boolean;
    buttonCSS?: any;
    menuCSS?: any;
    active?: boolean;
    subIndex?: number;
    subTools?: IToolProps[]; 
    callback?: IToolbarCallback;
}

export interface IToolGroup {
    tools: IToolProps[];
}

export interface IToolbarData {
    iconWidth?: number;
    iconHeight?: number;
    menuIconWidth?: number;
    menuIconHeight?: number;
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
        this.$el.find('a').each (function () {
            const data = $(this).data('tool');
            if (data && data.id === id) {
                $(this).find('>div').trigger (event);
            }
        });
    }
    protected _init () {
        for (const cls of ['p-0', 'toolbar']) {
            if (!this.$el.hasClass (cls)) {
                this.$el.addClass (cls);
                this._newClassList.push (cls);
            }
        }
        for (const groupName in this.options.groups) {
            const group = this.options.groups[groupName];
            const groupDiv = $('<div></div>').addClass (['btn-group']).attr('role', 'group').appendTo (this.$el);
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
        const that = this;
        const tool = group.tools[index];
        if (tool.type !== 'radio' && tool.type !== 'check') {
            tool.type = 'button';
        }
        if (!tool.radioGroup) {
            tool.radioGroup = 0;
        }
        tool.active = false;
        if (!tool.disabled && tool.subTools && tool.subTools.length > 0) {
            tool.subIndex = 0;
            tool.id = tool.subTools[0].id;
            tool.icon = tool.subTools[0].icon;
            tool.text = tool.subTools[0].text;
            tool.callback = tool.subTools[0].callback;
        }
        const button = $('<a></a>').addClass('btn').appendTo(groupDiv);
        button.data ('tool', tool);
        const attrType = 'tb-button-type';
        const attrRadioGroup = 'tb-button-radio-group';
        const attrActive = 'tb-button-active';
        button.attr(attrType, tool.type);
        button.attr(attrRadioGroup, tool.radioGroup);
        tool.buttonCSS && button.css (tool.buttonCSS);
        tool.disabled && button.addClass ('no-pointer-events');
        const clickDiv = $('<div></div>').css({
            display: 'inline-block'
        }).appendTo (button);
        if (!tool.disabled) {
            clickDiv.on ('mouseenter', function(){
                $(this.parentElement!).addClass ('selected');
            });
            clickDiv.on ('mouseleave', function(){
                if ($(this.parentElement!).attr(attrType) === 'button' || $(this.parentElement!).attr(attrActive) === undefined) {
                    $(this.parentElement!).removeClass ('selected');
                }
            });
            clickDiv.on ('click', function (this: HTMLElement, ev: Event) {
                ev.stopPropagation ();
                const btn = $(this.parentElement!);
                const data: IToolProps = btn.data ('tool');
                const type = btn.attr(attrType);
                if (type !== 'button') {
                    if (type === 'radio') {
                        if (btn.attr(attrActive) === undefined) {
                            const groupButtons = btn.siblings(`a[${attrRadioGroup}=${btn.attr(attrRadioGroup)}][${attrActive}]`);
                            groupButtons.removeAttr (attrActive).removeClass('selected').each (function (){
                                const thatData = $(this).data('tool');
                                that.$el.trigger ('itemdeselected', thatData.id);
                                thatData.callback && thatData.callback.call (this, 'deselected');
                            });
                            btn.attr(attrActive, '').addClass ('selected');
                            that.$el.trigger ('itemselected', data.id);
                            data.callback && data.callback.call (this.parentElement!, 'selected');
                        }
                    } else {
                        if (btn.attr(attrActive) === undefined) {
                            btn.attr(attrActive, '').addClass ('selected');
                            that.$el.trigger ('itemselected', data.id);
                            data.callback && data.callback.call (this.parentElement!, 'selected');
                        } else {
                            btn.removeAttr(attrActive).removeClass ('selected');
                            that.$el.trigger ('itemdeselected', data.id);
                            data.callback && data.callback.call (this.parentElement!, 'deselected');
                        }
                    }
                } else {
                    that.$el.trigger ('itemclick', data.id);
                    data.callback && data.callback.call (this.parentElement!)
                }
            });
        }
        tool.icon ? $('<img/>').attr({
            src: tool.subTools && tool.subTools.length > 0 ? tool.subTools[0].icon : tool.icon,
            width: this.options.iconWidth || 28,
            height: this.options.iconHeight || 28
        }).appendTo(clickDiv) : null;
        tool.text ? $('<div></div>').addClass('small').html(tool.text).appendTo (clickDiv) : null;
        if (tool.subTools && tool.subTools.length > 0) {
            button.addClass (['dropdown-toggle', 'no-pointer-events']).attr('data-toggle', 'dropdown');
            clickDiv.css ({
                pointerEvents: 'all'
            });
            const menu = $('<div></div>').addClass ('dropdown-menu').appendTo (groupDiv);
            for (let i = 0; i < tool.subTools.length; i++) {
                const subTool = tool.subTools[i];
                const subToolButton = $('<a></a>').addClass('dropdown-item').attr('sub-index', i).appendTo (menu);
                subToolButton.data ('tool', subTool);
                if (subTool.id) {
                    subToolButton.attr ({ id: subTool.id });
                }
                if (subTool.menuCSS) {
                    subToolButton.css (this.options.menuCSS);
                }
                subToolButton.on ('click', function(this: HTMLElement, ev: Event) {
                    const btn = $(this.parentElement!).prev();
                    const thatData = btn.data('tool');
                    const thisData = $(this).data('tool');
                    const index = Number($(this).attr('sub-index'));
                    if (thatData.type === 'button') {
                        if (thatData.subIndex !== index) {
                            thatData.subIndex = index;
                            thatData.id = thisData.id;
                            thatData.icon = thisData.icon;
                            thatData.text = thisData.text;
                            thatData.callback = thisData.callback;
                            thatData.text && btn.find('>div>div').html (thatData.text);
                            thatData.icon && btn.find('>div>img').attr ('src', thatData.icon);
                        }
                        if (tool.callback) {
                            tool.callback.call (btn[0]);
                        }
                        that.$el.trigger('itemclick', thatData.id);
                    } else if (thatData.type === 'check') {
                        const c = btn.find('>div');
                        c.trigger ('click');
                        if (thatData.subIndex !== index) {
                            thatData.subIndex = index;
                            thatData.id = thisData.id;
                            thatData.icon = thisData.icon;
                            thatData.text = thisData.text;
                            thatData.callback = thisData.callback;
                            thatData.text && btn.find('>div>div').html(thatData.text);
                            thatData.icon && btn.find('>div>img').attr ('src', thatData.icon);
                            c.trigger ('click');
                        }
                    } else {
                        const c = btn.find('>div');
                        if (btn.attr(attrActive) === undefined) {
                            if (thatData.subIndex !== index) {
                                thatData.subIndex = index;
                                thatData.id = thisData.id;
                                thatData.icon = thisData.icon;
                                thatData.text = thisData.text;
                                thatData.callback = thisData.callback;
                                thatData.text && btn.find('>div>div').html(thatData.text);
                                thatData.icon && btn.find('>div>img').attr ('src', thatData.icon);
                            }
                            c.trigger ('click');
                        } else if (thatData.subIndex !== index) {
                            btn.removeAttr (attrActive).removeClass('selected');
                            that.$el.trigger ('itemdeselected', thatData.id);
                            thatData.callback && thatData.callback.call (btn, 'deselected');
                            thatData.subIndex = index;
                            thatData.id = thisData.id;
                            thatData.icon = thisData.icon;
                            thatData.text = thisData.text;
                            thatData.callback = thisData.callback;
                            thatData.text && btn.find('>div>div').html(thatData.text);
                            thatData.icon && btn.find('>div>img').attr ('src', thatData.icon);
                            c.trigger ('click');
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