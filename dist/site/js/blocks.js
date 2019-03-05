(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, (function () { 'use strict';

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

})));
