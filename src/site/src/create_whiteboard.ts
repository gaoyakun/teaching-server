import './ui';
import { IToolbarData } from './ui';
import * as $ from 'jquery';
import * as wb from './whiteboard';
import * as lib from './catk';
import { SocketCommandServer } from './cmdserver/cmdserver';

export function init (uri: string) {
    const WB = new wb.WhiteBoard (document.querySelector('#playground-canvas') as HTMLCanvasElement, true);
    wb.installTools (WB);
    wb.installFactories (WB);

    if (uri) {
        const server = new SocketCommandServer (WB, uri);
        server.start ();
    }

    $('#test-toolbar').toolbar ({
        group1: {
            toggle: 'single',
            name: 'group1',
            tools: [{
                id: 'tool-button-1',
                icon: '/images/toolbar-text.png',
                text: 'button1'
            }, {
                id: 'tool-button-2',
                icon: '/images/toolbar-undo.png',
                text: 'button2',
                subTools: [{
                    id: 'tool-button-3',
                    icon: '/images/toolbar-undo.png',
                    text: 'button3'
                }, {
                    id: 'tool-button-4',
                    icon: '/images/toolbar-undo.png',
                    text: 'button4'
                }]
            }]
        }
    });

    const toolToolboxDiv: HTMLDivElement = document.querySelector('#tool-toolbox') as HTMLDivElement;
    const objPropGridDiv: HTMLDivElement = document.querySelector('#object-options') as HTMLDivElement;
    const toolPropGridDiv: HTMLDivElement = document.querySelector('#tool-options') as HTMLDivElement;
    const editor = new wb.WBEditor (WB, toolToolboxDiv, objPropGridDiv, toolPropGridDiv);

    WB.on (wb.WBObjectSelectedEvent.type, (ev: wb.WBObjectSelectedEvent) => {
        if (ev.object) {
            editor.objectPropertyGrid.loadObjectProperties (ev.object);
        }
    });
    WB.on (wb.WBObjectDeselectedEvent.type, (ev: wb.WBObjectDeselectedEvent) => {
        if (ev.object) {
            editor.objectPropertyGrid.loadObjectProperties (ev.object);
        }
    });
    WB.on (wb.WBToolActivateEvent.type, (ev: wb.WBToolActivateEvent) => {
        editor.toolPropertyGrid.loadToolProperties (ev.tool);
    });
    WB.on (wb.WBToolDeactivateEvent.type, (ev: wb.WBToolDeactivateEvent) => {
        editor.toolPropertyGrid.clear ();
    });

    lib.App.run ();
}