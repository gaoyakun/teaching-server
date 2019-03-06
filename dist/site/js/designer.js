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
	    window.Blockly.Blocks['my_block'] = {
	        init: function () {
	            this.setColour(120);
	            this.appendValueInput('SOME_VALUE').appendField('Some value').setCheck('Number');
	            this.setInputsInline(true);
	            this.setPreviousStatement(true, null);
	            this.setNextStatement(true, null);
	            this.setTooltip('Test some value input');
	        }
	    };
	    Blockly.Blocks['test_tool'] = {
	        init: function () {
	            this.appendValueInput("NAME")
	                .setCheck("String")
	                .appendField("name");
	            this.appendStatementInput("ON_UPDATE_OBJECT")
	                .setCheck(null)
	                .appendField("OnUpdateObject")
	                .appendField(new Blockly.FieldVariable("object"), "Object");
	            this.appendStatementInput("ON_DRAW")
	                .setCheck(null)
	                .appendField("onDraw");
	            this.appendStatementInput("ON_FRAME")
	                .setCheck(null)
	                .appendField("onFrame");
	            this.appendStatementInput("ON_MOUSE_DOWN")
	                .setCheck(null)
	                .appendField("onMouseDown");
	            this.appendStatementInput("ON_MOUSE_UP")
	                .setCheck(null)
	                .appendField("onMouseUp");
	            this.appendStatementInput("ON_CLICK")
	                .setCheck(null)
	                .appendField("onClick");
	            this.setColour(230);
	            this.setTooltip("");
	            this.setHelpUrl("");
	        }
	    };
	    Blockly.Blocks['set_object_pos'] = {
	        init: function () {
	            this.appendValueInput("OBJECT")
	                .setCheck(["selected_object", "String"])
	                .appendField("position");
	            this.appendDummyInput()
	                .appendField("to");
	            this.appendValueInput("X")
	                .setCheck("Number")
	                .appendField("x");
	            this.appendValueInput("Y")
	                .setCheck("Number")
	                .appendField("y");
	            this.setInputsInline(true);
	            this.setPreviousStatement(true, null);
	            this.setNextStatement(true, null);
	            this.setColour(230);
	            this.setTooltip("");
	            this.setHelpUrl("");
	        }
	    };
	    Blockly.Blocks['selected_object'] = {
	        init: function () {
	            this.appendDummyInput()
	                .appendField("Selected object");
	            this.setOutput(true, null);
	            this.setColour(230);
	            this.setTooltip("");
	            this.setHelpUrl("");
	        }
	    };
	    Blockly.Blocks['draw_shape'] = {
	        init: function () {
	            this.appendDummyInput()
	                .appendField("Shape")
	                .appendField(new Blockly.FieldDropdown([["Rect", "RECT"], ["Ellipse", "ELLIPSE"]]), "SHAPE")
	                .appendField("width")
	                .appendField(new Blockly.FieldNumber(0, 0), "WIDTH")
	                .appendField("height")
	                .appendField(new Blockly.FieldNumber(0, 0), "HEIGHT");
	            this.setPreviousStatement(true, null);
	            this.setNextStatement(true, null);
	            this.setColour(230);
	            this.setTooltip("");
	            this.setHelpUrl("");
	        }
	    };
	    Blockly.Blocks['draw_line'] = {
	        init: function () {
	            this.appendDummyInput()
	                .appendField("line")
	                .appendField("from")
	                .appendField("x")
	                .appendField(new Blockly.FieldNumber(0), "START_X")
	                .appendField("y")
	                .appendField(new Blockly.FieldNumber(0), "START_Y")
	                .appendField("to")
	                .appendField("x")
	                .appendField(new Blockly.FieldNumber(0), "END_X")
	                .appendField("y")
	                .appendField(new Blockly.FieldNumber(0), "END_Y");
	            this.setPreviousStatement(true, null);
	            this.setNextStatement(true, null);
	            this.setColour(230);
	            this.setTooltip("");
	            this.setHelpUrl("");
	        }
	    };
	    Blockly.Blocks['set_stroke_color'] = {
	        init: function () {
	            this.appendDummyInput()
	                .appendField("set stroke color to")
	                .appendField(new Blockly.FieldColour("#ff0000"), "COLOR");
	            this.setPreviousStatement(true, null);
	            this.setNextStatement(true, null);
	            this.setColour(230);
	            this.setTooltip("");
	            this.setHelpUrl("");
	        }
	    };
	    Blockly.Blocks['stroke_color'] = {
	        init: function () {
	            this.appendDummyInput()
	                .appendField("Stroke color");
	            this.setOutput(true, null);
	            this.setColour(230);
	            this.setTooltip("");
	            this.setHelpUrl("");
	        }
	    };
	    Blockly.Blocks['set_fill_color'] = {
	        init: function () {
	            this.appendDummyInput()
	                .appendField("set fill color to")
	                .appendField(new Blockly.FieldColour("#ff0000"), "COLOR");
	            this.setPreviousStatement(true, null);
	            this.setNextStatement(true, null);
	            this.setColour(230);
	            this.setTooltip("");
	            this.setHelpUrl("");
	        }
	    };
	    Blockly.Blocks['fill_color'] = {
	        init: function () {
	            this.appendDummyInput()
	                .appendField("Stroke color");
	            this.setOutput(true, null);
	            this.setColour(230);
	            this.setTooltip("");
	            this.setHelpUrl("");
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
