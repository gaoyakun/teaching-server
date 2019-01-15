import * as lib from '../../catk';
import * as editor from './editor';
import * as commands from '../commands';
import { MsgType } from '../../../../common/protocols/protolist';

export const WBDefaultToolSet = {
    tools: {
        CreateLabel: {
            iconClass: 'fas fa-font fa-fw',
            command: MsgType.whiteboard_UseToolMessage,
            args: {
                name: 'Create',
                paramsJson: JSON.stringify({
                    createType: 'Label',
                    text: '标签',
                    textColor: '#000000'
                })
            }
        },
        Select: {
            iconClass: 'fas fa-mouse-pointer fa-fw',
            command: MsgType.whiteboard_UseToolMessage,
            args: {
                name: 'Select'
            }
        },
        Swap: {
            iconClass: 'fas fa-exchange-alt fa-fw',
            command: MsgType.whiteboard_UseToolMessage,
            args: {
                name: 'Swap'
            }
        },
        Connect: {
            iconClass: 'fas fa-arrow-right fa-fw',
            command: MsgType.whiteboard_UseToolMessage,
            args: {
                name: 'Connect'
            }
        },
        Write: {
            iconClass: 'fas fa-pen fa-fw',
            command: MsgType.whiteboard_UseToolMessage,
            args: {
                name: 'HandWriting',
                paramsJson: JSON.stringify({
                    mode: 'draw'
                })
            }
        },
        Erase: {
            iconClass: 'fas fa-eraser fa-fw',
            command: MsgType.whiteboard_UseToolMessage,
            args: {
                name: 'HandWriting',
                paramsJson: JSON.stringify({
                    mode: 'erase'
                })
            }
        }
    },
    operations: {
        Delete: {
            iconClass: 'fas fa-trash-alt fa-fw',
            command: MsgType.whiteboard_DeleteSelected
        },
        Clone: {
            iconClass: 'fas fa-clone fa-fw',
            command: MsgType.whiteboard_CloneSelected
        },
        AlignLeft: {
            iconClass: 'fas fa-align-left fa-fw',
            command: MsgType.whiteboard_AlignSelected,
            args: {
                mode: 'Left'
            }
        },
        AlignRight: {
            iconClass: 'fas fa-align-right fa-fw',
            command: MsgType.whiteboard_AlignSelected,
            args: {
                mode: 'Right'
            }
        },
        AlignTop: {
            iconClass: 'fas fa-align-right fa-rotate-270 fa-fw',
            command: MsgType.whiteboard_AlignSelected,
            args: {
                mode: 'Top'
            }
        },
        AlignBottom: {
            iconClass: 'fas fa-align-right fa-rotate-90 fa-fw',
            command: MsgType.whiteboard_AlignSelected,
            args: {
                mode: 'Bottom'
            }
        },
        ArrangeH: {
            iconClass: 'fas fa-arrows-alt-h fa-fw',
            command: MsgType.whiteboard_ArrangeSelected,
            args: {
                mode: 'Horizontal'
            }
        },
        ArrangeV: {
            iconClass: 'fas fa-arrows-alt-v fa-fw',
            command: MsgType.whiteboard_ArrangeSelected,
            args: {
                mode: 'Vertical'
            }
        },
    }
};
