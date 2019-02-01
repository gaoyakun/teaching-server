import * as $ from 'jquery';
import { Widget } from './widget';

export interface IToolProps {
    id: string;
    icon: string;
    text: string;   
    subTools?: IToolProps[]; 
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
            for (const tool of group.tools) {
                this.createToolButton (groupDiv, tool);
            }
        }
    }
    private createToolButton (group: JQuery, tool: IToolProps) {
        const button = $('<a></a>').addClass('btn').attr({
            id: tool.id,
        }).appendTo(group);
        const clickDiv = $('<div></div>').css({
            display: 'inline-block'
        }).appendTo (button);
        const icon = $('<img/>').attr({
            src: tool.icon,
            width: 28,
            height: 25
        }).appendTo(clickDiv);
        const label = $('<div></div>').addClass('small').html(tool.text).appendTo (clickDiv);
        if (tool.subTools && tool.subTools.length > 0) {
            button.addClass (['dropdown-toggle', 'no-pointer-events']).attr('data-toggle', 'dropdown');
            const menu = $('<div></div>').addClass ('dropdown-menu').appendTo (group);
            for (const subTool of tool.subTools) {
                const subToolButton = $('<a></a>').addClass('dropdown-item').attr('id', subTool.id).appendTo (menu);
                const subToolImg = $('<img/>').attr({
                    src: subTool.icon,
                    width: 20
                }).appendTo (subToolButton);
                const subToolLabel = $('<span></span>').addClass('ml-2').html (subTool.text).appendTo(subToolButton);
            }
        }
        return button;
    }
}