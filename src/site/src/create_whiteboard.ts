import './ui';
import * as wb from './whiteboard';
import * as lib from './catk';
import * as proto from '../../common/protocols/protolist';
import { SocketCommandServer } from './cmdserver/cmdserver';

export function init (uri: string) {
    const WB = new wb.WhiteBoard (document.querySelector('#playground-canvas') as HTMLCanvasElement, true);
    wb.installTools (WB);
    wb.installFactories (WB);

    if (uri) {
        const server = new SocketCommandServer (WB, uri);
        server.start ();
    }

    const toolToolboxDiv: HTMLDivElement = document.querySelector('#toolbar-main') as HTMLDivElement;
    const objPropGridDiv: HTMLDivElement = document.querySelector('#object-options') as HTMLDivElement;
    const toolPropGridDiv: HTMLDivElement = document.querySelector('#tool-options') as HTMLDivElement;
    const editor = new wb.WBEditor (WB, toolToolboxDiv, objPropGridDiv, toolPropGridDiv);
    WB.on (wb.WBMessageEvent.type, (ev: wb.WBMessageEvent) => {
        if (ev.messageType === proto.MsgType.room_JoinRoomMessage) {
            $('#chat-list').chatList('addUser', {
                id: ev.messageData.user.userId,
                name: ev.messageData.user.name,
                icon: `/avatar/${ev.messageData.user.userId}`
            });
        } else if (ev.messageType === proto.MsgType.room_LeaveRoomMessage) {
            $('#chat-list').chatList('removeUser', ev.messageData.user.userId);
        } else if (ev.messageType === proto.MsgType.room_ListUsersMessage) {
            $('#chat-list').chatList('clear');
            for (const user of ev.messageData.users) {
                $('#chat-list').chatList('addUser', {
                    id: user.userId,
                    name: user.name,
                    icon: `/avatar/${user.userId}`
                });
            }
        }
    });

    $('#chat-list').chatList ({
        name: '测试教室'
    });

    WB.on (wb.WBObjectSelectedEvent.type, (ev: wb.WBObjectSelectedEvent) => {
        if (ev.object) {
            editor.objectPropertyGrid.loadObjectProperties (ev.object);
        }
    });
    WB.on (wb.WBObjectDeselectedEvent.type, (ev: wb.WBObjectDeselectedEvent) => {
        if (ev.object) {
            editor.objectPropertyGrid.loadObjectProperties (ev.object);
        }
    });
    WB.on (wb.WBToolActivateEvent.type, (ev: wb.WBToolActivateEvent) => {
        editor.toolPropertyGrid.loadToolProperties (ev.tool);
    });
    WB.on (wb.WBToolDeactivateEvent.type, (ev: wb.WBToolDeactivateEvent) => {
        editor.toolPropertyGrid.clear ();
    });

    lib.App.run ();
}