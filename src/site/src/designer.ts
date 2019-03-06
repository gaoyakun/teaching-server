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
            toolbox: document.getElementById(toolboxId)
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
    }
}
