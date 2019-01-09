import * as $ from 'jquery';
import './ui';
import { IGridViewData } from './ui';
import { uploadFileAjax, ajaxRequest } from './mod_tools';

export function landing_setup () {
    (async function () {
        const roomData: IGridViewData = {
            itemMinWidth: '100px',
            itemMaxWidth: '100px',
            itemMinHeight: '100px',
            nodes: []
        }
        const roomList: any = await ajaxRequest ({
            url: '/api/trust/public_rooms',
            type: 'get'
        });
        for (const room of roomList.data) {
            roomData.nodes.push ({
                text: room.name,
                id: `room-${room.id}`,
                thumbUrl: '/images/default.jpg'
            });
        }
        $('#room-grid-view').gridView (roomData);
    })();
}


