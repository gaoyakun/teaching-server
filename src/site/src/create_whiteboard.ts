import * as wb from './whiteboard';
import * as lib from './catk';
import { LocalCommandServer } from './cmdserver/cmdserver';

export function init () {
    const WB = new wb.WhiteBoard (document.querySelector('#playground-canvas') as HTMLCanvasElement, true);
    const server = new LocalCommandServer (WB);
    wb.installTools (WB);
    wb.installFactories (WB);

    const toolToolboxDiv: HTMLDivElement = document.querySelector('#tool-toolbox') as HTMLDivElement;
    const opToolboxDiv: HTMLDivElement = document.querySelector('#op-toolbox') as HTMLDivElement;
    const objPropGridDiv: HTMLDivElement = document.querySelector('#object-propgrid') as HTMLDivElement;
    const toolPropGridDiv: HTMLDivElement = document.querySelector('#tool-propgrid') as HTMLDivElement;
    const editor = new wb.WBEditor (server, wb.WBDefaultToolSet, toolToolboxDiv, opToolboxDiv, objPropGridDiv, toolPropGridDiv);

    WB.on (wb.WBObjectSelectedEvent.type, (ev: wb.WBObjectSelectedEvent) => {
        if (ev.objects.length === 1) {
            editor.objectPropertyGrid.loadObjectProperties (ev.objects[0]);
        } else {
            editor.objectPropertyGrid.loadPageProperties ();
        }
    });
    WB.on (wb.WBObjectDeselectedEvent.type, (ev: wb.WBObjectDeselectedEvent) => {
        if (ev.objects.length === 1) {
            editor.objectPropertyGrid.loadObjectProperties (ev.objects[0]);
        } else {
            editor.objectPropertyGrid.loadPageProperties ();
        }
    });
    WB.on (wb.WBObjectMovedEvent.type, (ev: wb.WBObjectMovedEvent) => {
        editor.objectPropertyGrid.reloadObjectProperties ();
    });
    WB.on (wb.WBToolActivateEvent.type, (ev: wb.WBToolActivateEvent) => {
        editor.toolPropertyGrid.loadToolProperties (ev.tool);
        if (ev.tool.name === wb.WBSelectTool.toolname) {
            editor.objectPropertyGrid.loadPageProperties ();
        }
    });
    WB.on (wb.WBToolDeactivateEvent.type, (ev: wb.WBToolDeactivateEvent) => {
        editor.toolPropertyGrid.clear ();
        if (ev.tool.name === wb.WBSelectTool.toolname) {
            editor.objectPropertyGrid.loadPageProperties ();
        }
    });

    lib.App.run ();
}