import * as $ from 'jquery';
import { Widget } from './widget';

export class ChatList extends Widget {
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
}