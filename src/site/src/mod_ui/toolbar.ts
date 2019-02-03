import * as $ from 'jquery';
import { Widget } from './widget';

export interface IToolbarCallback {
    (this:Element, tool: IToolProps): void
}

export interface IToolProps {
    id: string;
    icon: string;
    text: string;
    active?: boolean;   
    subTools?: IToolProps[]; 
    callback?: IToolbarCallback;
}

export interface IToolGroup {
    toggle: 'single'|'multiple'|'none';
    name: string;
    tools: IToolProps[];
}

export interface IToolbarData {
    [groupName: string]: IToolGroup;
}

export class Toolbar extends Widget {
    protected _init () {
        const that = this;
        this.$el.addClass (['p-0', 'toolbar', 'btn-toolbar']);
        for (const groupName in this.options) {
            const group = this.options[groupName];
            const groupDiv = $('<div></div>').addClass (['btn-group', 'ml-1', 'mr-1']).attr('role', 'group').appendTo (this.$el);
            for (let i = 0; i < group.tools.length; i++) {
                this.createToolButton (groupDiv, group, i);
            }
            $('<div></div>').addClass ('toolbar-seperator').appendTo (this.$el);
        }
    }
    private createToolButton (groupDiv: JQuery, group: IToolGroup, index: number) {
        const tool = group.tools[index];
        tool.active = group.toggle === 'none';
        if (tool.subTools && tool.subTools.length > 0) {
            tool.id = tool.subTools[0].id;
            tool.icon = tool.subTools[0].icon;
            tool.text = tool.subTools[0].text;
            tool.callback = tool.subTools[0].callback;
        }
        const button = $('<a></a>').addClass('btn').attr({
            id: tool.id,
        }).appendTo(groupDiv);
        const clickDiv = $('<div></div>').css({
            display: 'inline-block'
        }).appendTo (button);
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
        const icon = $('<img/>').attr({
            src: tool.subTools && tool.subTools.length > 0 ? tool.subTools[0].icon : tool.icon,
            width: 28,
            height: 25
        }).appendTo(clickDiv);
        const label = $('<div></div>').addClass('small').html(tool.text).appendTo (clickDiv);
        if (group.toggle !== 'multiple' && tool.subTools && tool.subTools.length > 0) {
            button.addClass (['dropdown-toggle', 'no-pointer-events']).attr('data-toggle', 'dropdown');
            clickDiv.css ({
                pointerEvents: 'all'
            });
            const menu = $('<div></div>').addClass ('dropdown-menu').appendTo (groupDiv);
            for (const subTool of tool.subTools) {
                const subToolButton = $('<a></a>').addClass('dropdown-item').attr('id', subTool.id).appendTo (menu);
                subToolButton.on ('click', () => {
                    if (group.toggle === 'none') {
                        if (tool.id !== subTool.id) {
                            tool.id = subTool.id;
                            tool.icon = subTool.icon;
                            tool.text = subTool.text;
                            tool.callback = subTool.callback;
                            label.html (tool.text);
                            icon.attr ('src', tool.icon);
                        }
                        if (tool.callback) {
                            tool.callback.call (button[0], tool);
                        }
                        this.$el.trigger('itemclick', tool);
                    } else {
                        if (tool.id !== subTool.id || !tool.active) {
                            if (tool.id !== subTool.id) {
                                tool.id = subTool.id;
                                tool.icon = subTool.icon;
                                tool.text = subTool.text;
                                tool.callback = subTool.callback;
                                label.html (tool.text);
                                icon.attr ('src', tool.icon);
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
                $('<img/>').attr({
                    src: subTool.icon,
                    width: 20
                }).appendTo (subToolButton);
                $('<span></span>').addClass('ml-2').html (subTool.text).appendTo(subToolButton);
            }
        }
        return button;
    }
}