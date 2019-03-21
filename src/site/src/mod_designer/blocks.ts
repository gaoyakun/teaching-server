declare global {
    interface Window {
        Blockly: any;
    }
}

export function setupCustomBlocks () {
    Blockly.Blocks['define_properties'] = {
        init: function() {
            this.propCount = 1;
            this.updateShape ();
            this.setMutator(new Blockly.Mutator(['property_list_item']));
            this.setColour (230);
            this.setOutput (true,'PROP_LIST');
        },
        mutationToDom: function(workspace: any) {
            const container = document.createElement ('mutation');
            container.setAttribute ('props', this.propCount);
            return container;
        },
        domToMutation: function(container:HTMLElement) {
            this.propCount = parseInt(container.getAttribute('props')!, 10);
            this.updateShape ();
            for (let i = 0; i < this.propCount; i++) {
                this.removeInput('PROP_' + i);
            }
            for (let i = 0; i < this.propCount; i++) {
                const input = this.appendValueInput('PROP_' + i).setCheck('PROP');
                if (i === 0) {
                    input.appendField ('Property list');
                }
            }
        },
        decompose: function(workspace: any) {
            const containerBlock = workspace.newBlock('property_list_container');
            containerBlock.initSvg();
            let connection = containerBlock.getInput('STACK').connection;
            for (let i = 0; i < this.propCount; i++) {
                const propBlock = workspace.newBlock('property_list_item');
                propBlock.initSvg();
                connection.connect(propBlock.previousConnection);
                connection = propBlock.nextConnection;
            }
            return containerBlock;
        },
        compose: function(containerBlock: any) {
            let propBlock = containerBlock.getInputTargetBlock('STACK');
            const connections = [];
            while (propBlock) {
                connections.push (propBlock.valueConnection_);
                propBlock = propBlock.nextConnection && propBlock.nextConnection.targetBlock();
            }
            for (let i = 0; i < this.propCount; i++) {
                const connection = this.getInput('PROP_' + i).connection.targetConnection;
                if (connection && connections.indexOf(connection) === -1) {
                    connection.disconnect();
                }
            }
            this.propCount = connections.length;
            this.updateShape();
            for (let i = 0; i < this.propCount; i++) {
                Blockly.Mutator.reconnect(connections[i], this, 'PROP_' + i);
            }
        },
        saveConnections: function(containerBlock: any) {
            let propBlock = containerBlock.getInputTargetBlock('STACK');
            let i = 0;
            while (propBlock) {
                const input = this.getInput('PROP_' + i);
                propBlock.valueConnection_ = input && input.connection.targetConnection;
                i++;
                propBlock = propBlock.nextConnection && propBlock.nextConnection.targetBlock();
            }
        },
        updateShape: function() {
            let i;
            for (i = 0; i < this.propCount; i++) {
                if (!this.getInput('PROP_' + i)) {
                    const input = this.appendValueInput('PROP_' + i).setCheck('PROP');
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
        init: function() {
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
        init: function() {
            this.jsonInit({
                "message0": "property",
                "previousStatement": null,
                "nextStatement": null,
                "colour": 230,
            });
        }
    };
    Blockly.Blocks['define_property'] = {
        init: function() {
            this.setColour (230);
            this.appendDummyInput ()
                .appendField ('Property')
                .appendField (new Blockly.FieldTextInput(''), 'PROP_NAME');
            this.appendValueInput ('DEFAULT_VALUE')
                .appendField ('Default');
            this.setInputsInline(true);
            this.setOutput(true, 'PROP');
        }
    };
    Blockly.Blocks['define_handlers'] = {
        init: function() {
            this.handlerCount = 1;
            this.updateShape ();
            this.setMutator(new Blockly.Mutator(['handler_list_item']));
            this.setColour (230);
            this.setOutput (true,'HANDLER_LIST');
        },
        mutationToDom: function(workspace: any) {
            const container = document.createElement ('mutation');
            container.setAttribute ('handlers', this.handlerCount);
            return container;
        },
        domToMutation: function(container:HTMLElement) {
            this.propCount = parseInt(container.getAttribute('handlers')!, 10);
            this.updateShape ();
            for (let i = 0; i < this.handlerCount; i++) {
                this.removeInput('HANDLER_' + i);
            }
            for (let i = 0; i < this.propCount; i++) {
                const input = this.appendValueInput('PROP_' + i).setCheck('PROP');
                if (i === 0) {
                    input.appendField ('Property list');
                }
            }
        },
        decompose: function(workspace: any) {
            const containerBlock = workspace.newBlock('property_list_container');
            containerBlock.initSvg();
            let connection = containerBlock.getInput('STACK').connection;
            for (let i = 0; i < this.propCount; i++) {
                const propBlock = workspace.newBlock('property_list_item');
                propBlock.initSvg();
                connection.connect(propBlock.previousConnection);
                connection = propBlock.nextConnection;
            }
            return containerBlock;
        },
        compose: function(containerBlock: any) {
            let propBlock = containerBlock.getInputTargetBlock('STACK');
            const connections = [];
            while (propBlock) {
                connections.push (propBlock.valueConnection_);
                propBlock = propBlock.nextConnection && propBlock.nextConnection.targetBlock();
            }
            for (let i = 0; i < this.propCount; i++) {
                const connection = this.getInput('PROP_' + i).connection.targetConnection;
                if (connection && connections.indexOf(connection) === -1) {
                    connection.disconnect();
                }
            }
            this.propCount = connections.length;
            this.updateShape();
            for (let i = 0; i < this.propCount; i++) {
                Blockly.Mutator.reconnect(connections[i], this, 'PROP_' + i);
            }
        },
        saveConnections: function(containerBlock: any) {
            let propBlock = containerBlock.getInputTargetBlock('STACK');
            let i = 0;
            while (propBlock) {
                const input = this.getInput('PROP_' + i);
                propBlock.valueConnection_ = input && input.connection.targetConnection;
                i++;
                propBlock = propBlock.nextConnection && propBlock.nextConnection.targetBlock();
            }
        },
        updateShape: function() {
            let i;
            for (i = 0; i < this.propCount; i++) {
                if (!this.getInput('PROP_' + i)) {
                    const input = this.appendValueInput('PROP_' + i).setCheck('PROP');
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
        init: function() {
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
        init: function() {
            this.jsonInit({
                "message0": "property",
                "previousStatement": null,
                "nextStatement": null,
                "colour": 230,
            });
        }
    };
    Blockly.Blocks['draw_handler'] = {
        init: function() {
            this.setColour (230);
            this.appendDummyInput ().appendField ('Draw handler');
            this.appendStatementInput ('DRAW_HANDLER');
        }
    };
    Blockly.Blocks['define_object'] = {
        init: function() {
            this.setColour (230);
            this.appendDummyInput ()
                .setAlign (Blockly.ALIGN_RIGHT)
                .appendField ('Define object')
                .appendField (new Blockly.FieldTextInput('ObjectClass'), 'CLASS_NAME');
            this.appendStatementInput ('INIT')
                .setAlign (Blockly.ALIGN_RIGHT)
                .appendField ('Initialize');
        }
    };
}