import * as $ from 'jquery';

const ajaxRequest = async function (options: any) {
    return new Promise ((resolve, reject) => {
        const opt:JQueryAjaxSettings = $.extend (false, {}, options);
        opt.success = function (response) {
            resolve (response);
        };
        opt.error = function (xhr, msg, err) {
            reject (msg);
        };
        $.ajax (opt);
    });
};

const uploadFileAjax = async function (el: HTMLInputElement, name: string, url: string) {
    return new Promise ((resolve, reject) => {
        if (el.files && el.files.length === 1) {
            const formData = new FormData();
            formData.append (name, el.files[0]);
            $.ajax ({
                url: url,
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: function (response) {
                    resolve (response);
                },
                error: function (xhr, msg, err) {
                    reject (msg);
                }
            });
        } else {
            reject ('No file to upload');
        }
    });
}

export { uploadFileAjax, ajaxRequest };