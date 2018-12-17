import * as $ from 'jquery';
import { md5 } from '../../../common/md5';

export function init_admin_setup() {
    function checkConfig () {
        let ok = true;
        const account = $.trim(String($('#account').val()));
        if (!account) {
            $('#err_msg_account').html('管理员账号不正确');
            ok = false;
        } else {
            $('#err_msg_account').html('');
        }
        const password = $('#password').val();
        if (!password) {
            $('#err_msg_password').html('管理员密码不正确');
            ok = false;
        } else {
            $('#err_msg_password').html('');
        }
        const password2 = $('#password2').val();
        if (password !== password2) {
            $('#err_msg_password2').html('两次密码输入不匹配');
            ok = false;
        } else {
            $('#err_msg_password2').html('');
        }
        return ok;
    }
    $('input').on ('input', function () {
        checkConfig ();
    });
    $('#submit').on ('click', function(){
        if (checkConfig ()) {
            $('#md5password').val(md5(String($('#password').val())));
            $('admin_account_form').submit ();
        }
    });
    checkConfig ();
};
