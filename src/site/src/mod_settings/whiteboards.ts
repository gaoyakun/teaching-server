import * as $ from 'jquery';
import * as UI from '../ui';
import { uploadFileAjax, ajaxRequest } from '../mod_tools';

export async function whiteboards_setup() {
    const whiteboardData: UI.IGridViewData = {
        itemMinWidth: '100px',
        itemMaxWidth: '100px',
        itemMinHeight: '100px',
        nodes: []
    };
    const relPath = '/';
    const whiteboardList: any = await ajaxRequest ({
        url: '/api/trust/whiteboard',
        type: 'get',
        data: {
            relPath: relPath
        }
    });
    for (const wb of whiteboardList.data) {
        whiteboardData.nodes.push ({
            text: wb,
            id: wb,
            thumbUrl: `/trust/whiteboards/image?name=${encodeURIComponent(wb)}&relPath=${encodeURIComponent(relPath)}&thumb=1`
        });
    }
    $('#grid-view').gridView (whiteboardData);
    $('#btn-new-whiteboard').on ('click', function(){
        window.location.href = '/trust/create-whiteboard';
    });
};
