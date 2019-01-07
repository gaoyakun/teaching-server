import * as $ from 'jquery';
import { Utils } from '../../../common/utils';
import { ajaxRequest } from '../mod_tools';

export async function sessions_setup(arg?: any) {
    function checkConfig () {
        let ok = true;
        const sessionName = $('#session-name').val();
        if (!sessionName || !Utils.trim(sessionName as string)) {
            $('#err_msg_session_name').html('请输入名称');
            ok = false;
        }
        return ok;
    }
    $('input').on ('input', function () {
        checkConfig ();
    });
    $('button#btn-start').on ('click', function(this:Element){
        const sessionId = $(this).attr('sid');
        if (sessionId) {
            const id = parseInt(sessionId, 10);
            if (Utils.isInt (id)) {
                console.log (`Start session ${id}`);
                window.location.href = `/trust/enter_room?room_id=${id}`;
            }
        }
    });
    $('button#btn-delete').on ('click', function(this:Element){
        const sessionId = $(this).attr('sid');
        console.log (`Delete session ${sessionId}`);
    });
    $('#submit').on ('click', async function(){
        if (checkConfig ()) {
            const data:any = await ajaxRequest ({
                url: '/api/trust/create_room',
                type: 'post',
                data: {
                    name: $('#session-name').val(),
                    desc: $('#session-desc').val()
                }
            });
            alert (JSON.stringify(data));
            if (data.err === 0) {
                $('#new-room').modal('hide');
                $('.modal-backdrop').remove();
            }
        }
    });
};
