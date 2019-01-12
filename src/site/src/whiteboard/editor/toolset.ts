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
            command: 'UseTool',
            args: {
                name: 'HandWriting',
                args: {
                    mode: 'draw'
                }
            }
        },
        Erase: {
            iconClass: 'fas fa-eraser fa-fw',
            command: 'UseTool',
            args: {
                name: 'HandWriting',
                args: {
                    mode: 'erase'
                }
            }
        }
    },
    operations: {
        Delete: {
            iconClass: 'fas fa-trash-alt fa-fw',
            command: 'DeleteSelected'
        },
        Clone: {
            iconClass: 'fas fa-clone fa-fw',
            command: 'CloneSelected'
        },
        AlignLeft: {
            iconClass: 'fas fa-align-left fa-fw',
            command: 'AlignSelected',
            args: {
                mode: 'Left'
            }
        },
        AlignRight: {
            iconClass: 'fas fa-align-right fa-fw',
            command: 'AlignSelected',
            args: {
                mode: 'Right'
            }
        },
        AlignTop: {
            iconClass: 'fas fa-align-right fa-rotate-270 fa-fw',
            command: 'AlignSelected',
            args: {
                mode: 'Top'
            }
        },
        AlignBottom: {
            iconClass: 'fas fa-align-right fa-rotate-90 fa-fw',
            command: 'AlignSelected',
            args: {
                mode: 'Bottom'
            }
        },
        ArrangeH: {
            iconClass: 'fas fa-arrows-alt-h fa-fw',
            command: 'ArrangeSelected',
            args: {
                mode: 'Horizontal'
            }
        },
        ArrangeV: {
            iconClass: 'fas fa-arrows-alt-v fa-fw',
            command: 'ArrangeSelected',
            args: {
                mode: 'Vertical'
            }
        },
    }
};
