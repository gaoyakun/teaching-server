import * as $ from 'jquery';

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

export { uploadFileAjax };