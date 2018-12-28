import * as lib from '../../catk';
import * as editor from './editor';
import * as commands from '../commands';

export const WBDefaultToolSet = {
    tools: {
        CreateLabel: {
            iconClass: 'fas fa-font fa-fw',
            command: 'UseTool',
            args: {
                name: 'Create',
                args: {
                    createType: 'Label',
                    text: '标签',
                    textColor: '#000000'
                }
            }
        },
        Select: {
            iconClass: 'fas fa-mouse-pointer fa-fw',
            command: 'UseTool',
            args: {
                name: 'Select'
            }
        },
        Swap: {
            iconClass: 'fas fa-exchange-alt fa-fw',
            command: 'UseTool',
            args: {
                name: 'Swap'
            }
        },
        Connect: {
            iconClass: 'fas fa-arrow-right fa-fw',
            command: 'UseTool',
            args: {
                name: 'Connect'
            }
        },
        Write: {
            iconClass: 'fas fa-pen fa-fw',
            command: function(editor: editor.WBEditor) {
                const cmd: commands.IWBCommand = { command: 'UseTool', name: 'HandWriting', args: { mode: 'draw' } };
                editor.whiteboard.executeCommand (cmd);
            }
        },
        Erase: {
            iconClass: 'fas fa-eraser fa-fw',
            command: function(editor: editor.WBEditor) {
                const cmd: commands.IWBCommand = { command: 'UseTool', name: 'HandWriting', args: { mode: 'erase' } };
                editor.whiteboard.executeCommand (cmd);
            }
        }
    },
    operations: {
        Delete: {
            iconClass: 'fas fa-trash-alt fa-fw',
            command: function(editor: editor.WBEditor) {
                const cmd: commands.IWBCommand = { command: 'GetSelected' };
                editor.whiteboard.executeCommand (cmd);
                if (cmd.selectedObjects && cmd.selectedObjects.length > 0) {
                    editor.whiteboard.executeCommand ({
                        command: 'DeleteObjects',
                        objects: cmd.selectedObjects.map((obj:lib.SceneObject) => obj.entityName)
                    });
                }
            }
        },
        Clone: {
            iconClass: 'fas fa-clone fa-fw'
        },
        AlignLeft: {
            iconClass: 'fas fa-align-left fa-fw',
            command: function(editor: editor.WBEditor) {
                const cmd: commands.IWBCommand = { command: 'GetSelected' };
                editor.whiteboard.executeCommand (cmd);
                if (cmd.selectedObjects && cmd.selectedObjects.length > 0) {
                    editor.whiteboard.executeCommand ({
                        command: 'AlignObjectsLeft',
                        objects: cmd.selectedObjects.map((obj:lib.SceneObject) => obj.entityName)
                    });
                }
            }
        },
        AlignRight: {
            iconClass: 'fas fa-align-right fa-fw',
            command: function(editor: editor.WBEditor) {
                const cmd: commands.IWBCommand = { command: 'GetSelected' };
                editor.whiteboard.executeCommand (cmd);
                if (cmd.selectedObjects && cmd.selectedObjects.length > 0) {
                    editor.whiteboard.executeCommand ({
                        command: 'AlignObjectsRight',
                        objects: cmd.selectedObjects.map((obj:lib.SceneObject) => obj.entityName)
                    });
                }
            }
        },
        AlignTop: {
            iconClass: 'fas fa-align-right fa-rotate-270 fa-fw',
            command: function(editor: editor.WBEditor) {
                const cmd: commands.IWBCommand = { command: 'GetSelected' };
                editor.whiteboard.executeCommand (cmd);
                if (cmd.selectedObjects && cmd.selectedObjects.length > 1) {
                    editor.whiteboard.executeCommand ({
                        command: 'AlignObjectsTop',
                        objects: cmd.selectedObjects.map((obj:lib.SceneObject) => obj.entityName)
                    });
                }
            }
        },
        AlignBottom: {
            iconClass: 'fas fa-align-right fa-rotate-90 fa-fw',
            command: function(editor: editor.WBEditor) {
                const cmd: commands.IWBCommand = { command: 'GetSelected' };
                editor.whiteboard.executeCommand (cmd);
                if (cmd.selectedObjects && cmd.selectedObjects.length > 1) {
                    editor.whiteboard.executeCommand ({
                        command: 'AlignObjectsBottom',
                        objects: cmd.selectedObjects.map((obj:lib.SceneObject) => obj.entityName)
                    });
                }
            }
        },
        ArrangeH: {
            iconClass: 'fas fa-arrows-alt-h fa-fw',
            command: function(editor: editor.WBEditor) {
                const cmd: commands.IWBCommand = { command: 'GetSelected' };
                editor.whiteboard.executeCommand (cmd);
                if (cmd.selectedObjects && cmd.selectedObjects.length > 2) {
                    editor.whiteboard.executeCommand ({
                        command: 'ArrangeObjectsHorizontal',
                        objects: cmd.selectedObjects.map((obj:lib.SceneObject) => obj.entityName)
                    });
                }
            }
        },
        ArrangeV: {
            iconClass: 'fas fa-arrows-alt-v fa-fw',
            command: function(editor: editor.WBEditor) {
                const cmd: commands.IWBCommand = { command: 'GetSelected' };
                editor.whiteboard.executeCommand (cmd);
                if (cmd.selectedObjects && cmd.selectedObjects.length > 2) {
                    editor.whiteboard.executeCommand ({
                        command: 'ArrangeObjectsVertical',
                        objects: cmd.selectedObjects.map((obj:lib.SceneObject) => obj.entityName)
                    });
                }
            }
        },
        $StrokeColor: {
            iconClass: function (editor: editor.WBEditor) {
                const inputBox: HTMLInputElement = document.createElement ('input');
                inputBox.type = 'color';
                inputBox.value = editor.strokeColor;
                inputBox.style.padding = '0px';
                inputBox.onchange = () => {
                    editor.strokeColor = inputBox.value;
                }
                return inputBox;
            }
        },
        $FillColor: {
            iconClass: function (editor: editor.WBEditor) {
                const inputBox: HTMLInputElement = document.createElement ('input');
                inputBox.type = 'color';
                inputBox.value = editor.fillColor;
                inputBox.style.padding = '0px';
                inputBox.onchange = () => {
                    editor.fillColor = inputBox.value;
                }
                return inputBox;
            }
        }
    }
};
