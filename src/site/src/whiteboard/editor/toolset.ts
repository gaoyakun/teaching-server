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
        ClearPage: {
            iconClass: 'fas fa-minus-circle fa-fw',
            command: MsgType.whiteboard_ClearBoardMessage
        }
    }
};
