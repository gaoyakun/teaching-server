(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.designer = {})));
}(this, (function (exports) { 'use strict';

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var blocks = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function setupCustomBlocks() {
	    Blockly.Blocks['define_property'] = {
	        init: function () {
	            this.setColour(230);
	            this.appendValueInput('PROP_NAME')
	                .setCheck('String')
	                .appendField('Add property');
	            this.setPreviousStatement(true, null);
	            this.setNextStatement(true, null);
	        }
	    };
	    Blockly.Blocks['draw_handler'] = {
	        init: function () {
	            this.setColour(230);
	            this.appendStatementInput('DRAW_HANDLER')
	                .setCheck(null)
	                .appendField('Draw handler');
	            this.setPreviousStatement(true, null);
	            this.setNextStatement(true, null);
	        }
	    };
	    Blockly.Blocks['define_object'] = {
	        init: function () {
	            this.setColour(230);
	            this.appendDummyInput()
	                .setAlign(Blockly.ALIGN_RIGHT)
	                .appendField('Define object class')
	                .appendField(new Blockly.FieldTextInput('ObjectClass'), 'CLASS_NAME');
	            this.appendStatementInput('PROPERTY_LIST')
	                .setCheck('define_property')
	                .setAlign(Blockly.ALIGN_RIGHT)
	                .appendField('Properties');
	            this.appendStatementInput('HANDLER_LIST')
	                .setCheck('draw_handler')
	                .setAlign(Blockly.ALIGN_RIGHT)
	                .appendField('Handlers');
	        }
	    };
	}
	exports.setupCustomBlocks = setupCustomBlocks;

	});

	unwrapExports(blocks);
	var blocks_1 = blocks.setupCustomBlocks;

	var mod_designer = createCommonjsModule(function (module, exports) {
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(blocks);

	});

	unwrapExports(mod_designer);

	var designer_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	function init(workspaceId, toolboxId) {
	    mod_designer.setupCustomBlocks();
	    var areaDiv = document.getElementById(workspaceId);
	    if (areaDiv) {
	        var blocklyDiv = document.createElement('div');
	        blocklyDiv.setAttribute('id', '__blockly_div__');
	        blocklyDiv.style.position = 'absolute';
	        areaDiv.appendChild(blocklyDiv);
	        var workspace = window.Blockly.inject(blocklyDiv, {
	            media: 'js/blockly/media/',
	            toolbox: document.getElementById(toolboxId)
	        });
	        var onResize = function () {
	            var areaElement = document.getElementById(workspaceId);
	            if (areaElement) {
	                var blocklyElement = areaElement.querySelector('#__blockly_div__');
	                if (blocklyElement) {
	                    var x = 0;
	                    var y = 0;
	                    var element = areaElement;
	                    do {
	                        x += element.offsetLeft;
	                        y += element.offsetTop;
	                        element = element.offsetParent;
	                    } while (element);
	                    blocklyElement.style.left = x + 'px';
	                    blocklyElement.style.top = y + 'px';
	                    blocklyElement.style.width = areaElement.offsetWidth + 'px';
	                    blocklyElement.style.height = areaElement.offsetHeight + 'px';
	                }
	            }
	        };
	        window.addEventListener('resize', onResize, false);
	        onResize();
	        window.Blockly.svgResize(workspace);
	    }
	}
	exports.init = init;

	});

	var designer = unwrapExports(designer_1);
	var designer_2 = designer_1.init;

	exports.default = designer;
	exports.init = designer_2;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
