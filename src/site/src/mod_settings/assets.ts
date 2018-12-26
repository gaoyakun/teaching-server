import * as $ from 'jquery';
import * as UI from '../ui';
import { uploadFileAjax, ajaxRequest } from '../mod_tools';

export async function asset_setup() {
    function checkConfig (el: HTMLInputElement) {
        let ok = true;
        if (!el.files || el.files.length === 0) {
            ok = false;
        }
        return ok;
    }
    const assetData: UI.IGridViewData = {
        itemMinWidth: '100px',
        itemMaxWidth: '100px',
        itemMinHeight: '100px',
        nodes: []
    };
    const relPath = '/';
    const assetList: any = await ajaxRequest ({
        url: '/api/trust/asset',
        type: 'get',
        data: {
            relPath: relPath
        }
    });
    for (const asset of assetList.data) {
        assetData.nodes.push ({
            text: asset,
            id: asset,
            thumbUrl: `/trust/assets/image?name=${encodeURIComponent(asset)}&relPath=${encodeURIComponent(relPath)}&thumb=1`
        });
    }
    $('#grid-view').gridView (assetData);
    $('#btn-upload-asset').on ('click', function() {
        const el = document.getElementById('upload-asset') as HTMLInputElement;
        if (checkConfig (el)) {
            uploadFileAjax (el, 'content', '/api/trust/asset').then (response => {
                alert (response);
            }).catch (reason => {
                alert (reason);
            });
        }
    });
};
