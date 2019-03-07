declare global {
    interface Window {
        Blockly: any;
    }
}

export function setupCustomBlocks () {
    Blockly.Blocks['define_property'] = {
        init: function() {
            this.setColour (230);
            this.appendValueInput ('PROP_NAME')
                .setCheck ('String')
                .appendField ('Add property');
            this.setPreviousStatement (true, null);
            this.setNextStatement (true, null);
        }
    };
    Blockly.Blocks['draw_handler'] = {
        init: function() {
            this.setColour (230);
            this.appendStatementInput ('DRAW_HANDLER')
                .setCheck (null)
                .appendField ('Draw handler');
            this.setPreviousStatement (true, null);
            this.setNextStatement (true, null);
        }
    };
    Blockly.Blocks['define_object'] = {
        init: function() {
            this.setColour (230);
            this.appendDummyInput ()
                .setAlign (Blockly.ALIGN_RIGHT)
                .appendField ('Define object class')
                .appendField (new Blockly.FieldTextInput('ObjectClass'), 'CLASS_NAME');
            this.appendStatementInput ('PROPERTY_LIST')
                .setCheck ('define_property')
                .setAlign (Blockly.ALIGN_RIGHT)
                .appendField ('Properties');
            this.appendStatementInput ('HANDLER_LIST')
                .setCheck ('draw_handler')
                .setAlign (Blockly.ALIGN_RIGHT)
                .appendField ('Handlers');
        }
    };
}