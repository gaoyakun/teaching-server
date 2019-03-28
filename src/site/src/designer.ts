import * as $ from 'jquery';
import * as designer from './mod_designer';

export function init (workspaceId: string, toolboxId: string) {
    designer.setupCustomBlocks ();
    const areaDiv = document.getElementById (workspaceId);
    if (areaDiv) {
        const blocklyDiv = document.createElement ('div');
        blocklyDiv.setAttribute ('id', '__blockly_div__');
        blocklyDiv.style.position = 'absolute';
        areaDiv.appendChild (blocklyDiv);
        const workspace = window.Blockly.inject(blocklyDiv, {
            media: 'js/blockly/media/',
            toolbox: document.getElementById(toolboxId),
            theme: Blockly.Theme({
                withHat: { hat: true }
            }, {
                Handlers: { hat: true }
            })
        });
        workspace.registerButtonCallback ('onCreateInitHandler', function(btn:any){
            workspace.
            Blockly.Xml.domToBlock ($('<block></block>').attr({
                type: 'define_object',
                x: 100,
                y: 100
            })[0], Blockly.mainWorkspace);
        });
        workspace.registerToolboxCategoryCallback ('PROPERTIES', function (ws:any) {
            const domList = [];
            const button = document.createElement('button');
            button.setAttribute ('text', 'Create property...');
            button.setAttribute ('callbackKey', 'CREATE_PROPERTY');
            ws.registerButtonCallback ('CREATE_PROPERTY', function(btn:any){
                console.log ('Create property');
            });
            domList.push (button);
            return domList;
        });
        const onResize = function () {
            const areaElement = document.getElementById (workspaceId);
            if (areaElement) {
                let blocklyElement = areaElement.querySelector ('#__blockly_div__') as HTMLElement;
                if (blocklyElement) {
                    let x = 0;
                    let y = 0;
                    let element = areaElement;
                    do {
                        x += element.offsetLeft;
                        y += element.offsetTop;
                        element = element.offsetParent as HTMLElement;
                    } while (element)
                    blocklyElement.style.left = x + 'px';
                    blocklyElement.style.top = y + 'px';
                    blocklyElement.style.width = areaElement.offsetWidth + 'px';
                    blocklyElement.style.height = areaElement.offsetHeight + 'px';
                }                
            }
        };
        window.addEventListener ('resize', onResize, false);
        onResize ();
        window.Blockly.svgResize (workspace);
        const mainObject = Blockly.Xml.domToBlock ($('<block></block>').attr('type', 'object_init')[0], Blockly.mainWorkspace);
        mainObject.moveBy(100, 100);
        mainObject.setDeletable(false);
    }
}
