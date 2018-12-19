import * as $ from 'jquery';

export function init_storage_setup() {
    function checkConfig () {
        const external = $('#external').prop('checked');
        $('#host').prop('disabled', !external);
        $('#port').prop('disabled', !external);
        if (external) {
            $('#type').val('web');
            const host = $.trim(String($('#host').val()));
            if (!host) {
                $('#err_msg_host').html('资源服务器地址不正确');
            } else {
                $('#err_msg_host').html('');
            }
            const port = $('#port').val();
            if (!port || isNaN(parseInt(String(port), 10))) {
                $('#err_msg_port').html('资源服务器端口不正确');
            } else {
                $('#err_msg_port').html('');
            }
        } else {
            $('#type').val('local');
            $('#err_msg_host').html('');
            $('#err_msg_port').html('');
        }
    }
    $('input').on ('input', function () {
        checkConfig ();
    });
    checkConfig ();
};
