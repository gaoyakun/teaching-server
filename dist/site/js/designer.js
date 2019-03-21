(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
	typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
	(factory((global.designer = {}),global.jQuery));
}(this, (function (exports,jquery) { 'use strict';

	jquery = jquery && jquery.hasOwnProperty('default') ? jquery['default'] : jquery;

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var blocks = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function setupCustomBlocks() {
	    Blockly.Blocks['define_properties'] = {
	        init: function () {
	            this.propCount = 1;
	            this.updateShape();
	            this.setMutator(new Blockly.Mutator(['property_list_item']));
	            this.setColour(230);
	            this.setOutput(true, 'PROP_LIST');
	        },
	        mutationToDom: function (workspace) {
	            var container = document.createElement('mutation');
	            container.setAttribute('props', this.propCount);
	            return container;
	        },
	        domToMutation: function (container) {
	            this.propCount = parseInt(container.getAttribute('props'), 10);
	            this.updateShape();
	            for (var i = 0; i < this.propCount; i++) {
	                this.removeInput('PROP_' + i);
	            }
	            for (var i = 0; i < this.propCount; i++) {
	                var input = this.appendValueInput('PROP_' + i).setCheck('PROP');
	                if (i === 0) {
	                    input.appendField('Property list');
	                }
	            }
	        },
	        decompose: function (workspace) {
	            var containerBlock = workspace.newBlock('property_list_container');
	            containerBlock.initSvg();
	            var connection = containerBlock.getInput('STACK').connection;
	            for (var i = 0; i < this.propCount; i++) {
	                var propBlock = workspace.newBlock('property_list_item');
	                propBlock.initSvg();
	                connection.connect(propBlock.previousConnection);
	                connection = propBlock.nextConnection;
	            }
	            return containerBlock;
	        },
	        compose: function (containerBlock) {
	            var propBlock = containerBlock.getInputTargetBlock('STACK');
	            var connections = [];
	            while (propBlock) {
	                connections.push(propBlock.valueConnection_);
	                propBlock = propBlock.nextConnection && propBlock.nextConnection.targetBlock();
	            }
	            for (var i = 0; i < this.propCount; i++) {
	                var connection = this.getInput('PROP_' + i).connection.targetConnection;
	                if (connection && connections.indexOf(connection) === -1) {
	                    connection.disconnect();
	                }
	            }
	            this.propCount = connections.length;
	            this.updateShape();
	            for (var i = 0; i < this.propCount; i++) {
	                Blockly.Mutator.reconnect(connections[i], this, 'PROP_' + i);
	            }
	        },
	        saveConnections: function (containerBlock) {
	            var propBlock = containerBlock.getInputTargetBlock('STACK');
	            var i = 0;
	            while (propBlock) {
	                var input = this.getInput('PROP_' + i);
	                propBlock.valueConnection_ = input && input.connection.targetConnection;
	                i++;
	                propBlock = propBlock.nextConnection && propBlock.nextConnection.targetBlock();
	            }
	        },
	        updateShape: function () {
	            var i;
	            for (i = 0; i < this.propCount; i++) {
	                if (!this.getInput('PROP_' + i)) {
	                    var input = this.appendValueInput('PROP_' + i).setCheck('PROP');
	                    if (i === 0) {
	                        input.appendField('Property list');
	                    }
	                }
	            }
	            while (this.getInput('PROP_' + i)) {
	                this.removeInput('PROP_' + i);
	                i++;
	            }
	        }
	    };
	    Blockly.Blocks['property_list_container'] = {
	        init: function () {
	            this.jsonInit({
	                "message0": "add properties %1 %2",
	                "args0": [{
	                        "type": "input_dummy"
	                    }, {
	                        "type": "input_statement", "name": "STACK"
	                    }],
	                "colour": 230,
	            });
	        }
	    };
	    Blockly.Blocks['property_list_item'] = {
	        init: function () {
	            this.jsonInit({
	                "message0": "property",
	                "previousStatement": null,
	                "nextStatement": null,
	                "colour": 230,
	            });
	        }
	    };
	    Blockly.Blocks['define_property'] = {
	        init: function () {
	            this.setColour(230);
	            this.appendDummyInput()
	                .appendField('Property')
	                .appendField(new Blockly.FieldTextInput(''), 'PROP_NAME');
	            this.appendValueInput('DEFAULT_VALUE')
	                .appendField('Default');
	            this.setInputsInline(true);
	            this.setOutput(true, 'PROP');
	        }
	    };
	    Blockly.Blocks['define_handlers'] = {
	        init: function () {
	            this.handlerCount = 1;
	            this.updateShape();
	            this.setMutator(new Blockly.Mutator(['handler_list_item']));
	            this.setColour(230);
	            this.setOutput(true, 'HANDLER_LIST');
	        },
	        mutationToDom: function (workspace) {
	            var container = document.createElement('mutation');
	            container.setAttribute('handlers', this.handlerCount);
	            return container;
	        },
	        domToMutation: function (container) {
	            this.propCount = parseInt(container.getAttribute('handlers'), 10);
	            this.updateShape();
	            for (var i = 0; i < this.handlerCount; i++) {
	                this.removeInput('HANDLER_' + i);
	            }
	            for (var i = 0; i < this.propCount; i++) {
	                var input = this.appendValueInput('PROP_' + i).setCheck('PROP');
	                if (i === 0) {
	                    input.appendField('Property list');
	                }
	            }
	        },
	        decompose: function (workspace) {
	            var containerBlock = workspace.newBlock('property_list_container');
	            containerBlock.initSvg();
	            var connection = containerBlock.getInput('STACK').connection;
	            for (var i = 0; i < this.propCount; i++) {
	                var propBlock = workspace.newBlock('property_list_item');
	                propBlock.initSvg();
	                connection.connect(propBlock.previousConnection);
	                connection = propBlock.nextConnection;
	            }
	            return containerBlock;
	        },
	        compose: function (containerBlock) {
	            var propBlock = containerBlock.getInputTargetBlock('STACK');
	            var connections = [];
	            while (propBlock) {
	                connections.push(propBlock.valueConnection_);
	                propBlock = propBlock.nextConnection && propBlock.nextConnection.targetBlock();
	            }
	            for (var i = 0; i < this.propCount; i++) {
	                var connection = this.getInput('PROP_' + i).connection.targetConnection;
	                if (connection && connections.indexOf(connection) === -1) {
	                    connection.disconnect();
	                }
	            }
	            this.propCount = connections.length;
	            this.updateShape();
	            for (var i = 0; i < this.propCount; i++) {
	                Blockly.Mutator.reconnect(connections[i], this, 'PROP_' + i);
	            }
	        },
	        saveConnections: function (containerBlock) {
	            var propBlock = containerBlock.getInputTargetBlock('STACK');
	            var i = 0;
	            while (propBlock) {
	                var input = this.getInput('PROP_' + i);
	                propBlock.valueConnection_ = input && input.connection.targetConnection;
	                i++;
	                propBlock = propBlock.nextConnection && propBlock.nextConnection.targetBlock();
	            }
	        },
	        updateShape: function () {
	            var i;
	            for (i = 0; i < this.propCount; i++) {
	                if (!this.getInput('PROP_' + i)) {
	                    var input = this.appendValueInput('PROP_' + i).setCheck('PROP');
	                    if (i === 0) {
	                        input.appendField('Property list');
	                    }
	                }
	            }
	            while (this.getInput('PROP_' + i)) {
	                this.removeInput('PROP_' + i);
	                i++;
	            }
	        }
	    };
	    Blockly.Blocks['property_list_container'] = {
	        init: function () {
	            this.jsonInit({
	                "message0": "add properties %1 %2",
	                "args0": [{
	                        "type": "input_dummy"
	                    }, {
	                        "type": "input_statement", "name": "STACK"
	                    }],
	                "colour": 230,
	            });
	        }
	    };
	    Blockly.Blocks['property_list_item'] = {
	        init: function () {
	            this.jsonInit({
	                "message0": "property",
	                "previousStatement": null,
	                "nextStatement": null,
	                "colour": 230,
	            });
	        }
	    };
	    Blockly.Blocks['draw_handler'] = {
	        init: function () {
	            this.setColour(230);
	            this.appendDummyInput().appendField('Draw handler');
	            this.appendStatementInput('DRAW_HANDLER');
	            this.setOutput(true, 'HANDLER');
	        }
	    };
	    Blockly.Blocks['define_object'] = {
	        init: function () {
	            this.setColour(230);
	            this.appendDummyInput()
	                .setAlign(Blockly.ALIGN_RIGHT)
	                .appendField('Define object')
	                .appendField(new Blockly.FieldTextInput('ObjectClass'), 'CLASS_NAME');
	            this.appendStatementInput('INIT')
	                .setAlign(Blockly.ALIGN_RIGHT)
	                .appendField('Initialize');
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
	            toolbox: document.getElementById(toolboxId),
	            theme: Blockly.Theme({
	                withHat: { hat: true }
	            }, {
	                Handlers: { hat: true }
	            })
	        });
	        workspace.registerButtonCallback('onCreateDrawHandler', function (btn) {
	            Blockly.Xml.domToBlock(jquery('<block></block>').attr({
	                type: 'define_object',
	                x: 100,
	                y: 100
	            })[0], Blockly.mainWorkspace);
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
	        var mainObject = Blockly.Xml.domToBlock(jquery('<block></block>').attr('type', 'define_object')[0], Blockly.mainWorkspace);
	        mainObject.setStyle('hat_blocks');
	        mainObject.moveBy(100, 100);
	        //mainObject.setDeletable(false);
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
