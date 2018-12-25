import * as $ from 'jquery';
import { uploadFileAjax } from '../mod_tools';

export function asset_setup() {
    function checkConfig (el: HTMLInputElement) {
        let ok = true;
        if (!el.files || el.files.length === 0) {
            ok = false;
        }
        return ok;
    }
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
