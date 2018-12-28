(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
	typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
	(factory((global.install = {}),global.jQuery));
}(this, (function (exports,jquery) { 'use strict';

	jquery = jquery && jquery.hasOwnProperty('default') ? jquery['default'] : jquery;

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var database = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	function init_database_setup() {
	    function checkConfig() {
	        var ok = true;
	        var host = jquery.trim(String(jquery('#host').val()));
	        if (!host) {
	            jquery('#err_msg_host').html('数据库服务器地址不正确');
	            ok = false;
	        }
	        else {
	            jquery('#err_msg_host').html('');
	        }
	        var port = jquery('#port').val();
	        if (!port || isNaN(parseInt(String(port), 10))) {
	            jquery('#err_msg_port').html('数据库端口不正确');
	            ok = false;
	        }
	        else {
	            jquery('#err_msg_port').html('');
	        }
	        var user = jquery.trim(String(jquery('#username').val()));
	        if (!user) {
	            jquery('#err_msg_user').html('用户名不正确');
	            ok = false;
	        }
	        else {
	            jquery('#err_msg_user').html('');
	        }
	        var password = jquery('#password').val();
	        if (!password) {
	            jquery('#err_msg_password').html('密码不正确');
	            ok = false;
	        }
	        else {
	            jquery('#err_msg_password').html('');
	        }
	        var name = jquery.trim(String(jquery('#name').val()));
	        if (!name) {
	            jquery('#err_msg_name').html('数据库名不正确');
	            ok = false;
	        }
	        else {
	            jquery('#err_msg_name').html('');
	        }
	        return ok ? {
	            host: host,
	            port: port,
	            user: user,
	            password: password,
	            name: name
	        } : null;
	    }
	    jquery('input').on('input', function () {
	        checkConfig();
	    });
	    jquery('#ok').on('click', function (e) {
	        e.preventDefault();
	        if (checkConfig()) {
	            jquery('#setup-database-form').submit();
	        }
	    });
	}
	exports.init_database_setup = init_database_setup;

	});

	unwrapExports(database);
	var database_1 = database.init_database_setup;

	var md5_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var rotateLeft = function (lValue, iShiftBits) {
	    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
	};
	var addUnsigned = function (lX, lY) {
	    var lX8 = (lX & 0x80000000);
	    var lY8 = (lY & 0x80000000);
	    var lX4 = (lX & 0x40000000);
	    var lY4 = (lY & 0x40000000);
	    var lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
	    if (lX4 & lY4)
	        return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
	    if (lX4 | lY4) {
	        if (lResult & 0x40000000)
	            return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
	        else
	            return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
	    }
	    else {
	        return (lResult ^ lX8 ^ lY8);
	    }
	};
	var F = function (x, y, z) {
	    return (x & y) | ((~x) & z);
	};
	var G = function (x, y, z) {
	    return (x & z) | (y & (~z));
	};
	var H = function (x, y, z) {
	    return (x ^ y ^ z);
	};
	var I = function (x, y, z) {
	    return (y ^ (x | (~z)));
	};
	var FF = function (a, b, c, d, x, s, ac) {
	    a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
	    return addUnsigned(rotateLeft(a, s), b);
	};
	var GG = function (a, b, c, d, x, s, ac) {
	    a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
	    return addUnsigned(rotateLeft(a, s), b);
	};
	var HH = function (a, b, c, d, x, s, ac) {
	    a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
	    return addUnsigned(rotateLeft(a, s), b);
	};
	var II = function (a, b, c, d, x, s, ac) {
	    a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
	    return addUnsigned(rotateLeft(a, s), b);
	};
	var convertToWordArray = function (str) {
	    var lWordCount;
	    var lMessageLength = str.length;
	    var lNumberOfWordsTempOne = lMessageLength + 8;
	    var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
	    var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
	    var lWordArray = Array(lNumberOfWords - 1);
	    var lBytePosition = 0;
	    var lByteCount = 0;
	    while (lByteCount < lMessageLength) {
	        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
	        lBytePosition = (lByteCount % 4) * 8;
	        lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
	        lByteCount++;
	    }
	    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
	    lBytePosition = (lByteCount % 4) * 8;
	    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
	    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
	    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
	    return lWordArray;
	};
	var wordToHex = function (lValue) {
	    var WordToHexValue = '';
	    var WordToHexValueTemp = '';
	    var lByte;
	    var lCount;
	    for (lCount = 0; lCount <= 3; lCount++) {
	        lByte = (lValue >>> (lCount * 8)) & 255;
	        WordToHexValueTemp = "0" + lByte.toString(16);
	        WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
	    }
	    return WordToHexValue;
	};
	var uTF8Encode = function (str) {
	    str = str.replace(/\x0d\x0a/g, "\x0a");
	    var output = "";
	    for (var n = 0; n < str.length; n++) {
	        var c = str.charCodeAt(n);
	        if (c < 128) {
	            output += String.fromCharCode(c);
	        }
	        else if ((c > 127) && (c < 2048)) {
	            output += String.fromCharCode((c >> 6) | 192);
	            output += String.fromCharCode((c & 63) | 128);
	        }
	        else {
	            output += String.fromCharCode((c >> 12) | 224);
	            output += String.fromCharCode(((c >> 6) & 63) | 128);
	            output += String.fromCharCode((c & 63) | 128);
	        }
	    }
	    return output;
	};
	function md5(str) {
	    var k, AA, BB, CC, DD, a, b, c, d;
	    var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
	    var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
	    var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
	    var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
	    str = uTF8Encode(str);
	    var x = convertToWordArray(str);
	    a = 0x67452301;
	    b = 0xEFCDAB89;
	    c = 0x98BADCFE;
	    d = 0x10325476;
	    for (k = 0; k < x.length; k += 16) {
	        AA = a;
	        BB = b;
	        CC = c;
	        DD = d;
	        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
	        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
	        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
	        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
	        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
	        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
	        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
	        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
	        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
	        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
	        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
	        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
	        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
	        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
	        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
	        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
	        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
	        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
	        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
	        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
	        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
	        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
	        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
	        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
	        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
	        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
	        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
	        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
	        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
	        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
	        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
	        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
	        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
	        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
	        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
	        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
	        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
	        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
	        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
	        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
	        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
	        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
	        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
	        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
	        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
	        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
	        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
	        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
	        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
	        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
	        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
	        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
	        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
	        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
	        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
	        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
	        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
	        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
	        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
	        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
	        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
	        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
	        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
	        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
	        a = addUnsigned(a, AA);
	        b = addUnsigned(b, BB);
	        c = addUnsigned(c, CC);
	        d = addUnsigned(d, DD);
	    }
	    var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
	    return tempValue.toLowerCase();
	}
	exports.md5 = md5;

	});

	unwrapExports(md5_1);
	var md5_2 = md5_1.md5;

	var admin = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	function init_admin_setup() {
	    function checkConfig() {
	        var ok = true;
	        var account = jquery.trim(String(jquery('#account').val()));
	        if (!account) {
	            jquery('#err_msg_account').html('管理员账号不正确');
	            ok = false;
	        }
	        else {
	            jquery('#err_msg_account').html('');
	        }
	        var email = jquery.trim(String(jquery('#email').val()));
	        if (!email) {
	            jquery('#err_msg_email').html('管理员邮箱不正确');
	            ok = false;
	        }
	        else {
	            jquery('#err_msg_email').html('');
	        }
	        var password = jquery('#password').val();
	        if (!password) {
	            jquery('#err_msg_password').html('管理员密码不正确');
	            ok = false;
	        }
	        else {
	            jquery('#err_msg_password').html('');
	        }
	        var password2 = jquery('#password2').val();
	        if (password !== password2) {
	            jquery('#err_msg_password2').html('两次密码输入不匹配');
	            ok = false;
	        }
	        else {
	            jquery('#err_msg_password2').html('');
	        }
	        return ok;
	    }
	    jquery('input').on('input', function () {
	        checkConfig();
	    });
	    jquery('#ok').on('click', function (e) {
	        e.preventDefault();
	        if (checkConfig()) {
	            jquery('#md5password').val(md5_1.md5(String(jquery('#password').val())));
	            jquery('#admin_account_form').submit();
	        }
	    });
	}
	exports.init_admin_setup = init_admin_setup;

	});

	unwrapExports(admin);
	var admin_1 = admin.init_admin_setup;

	var storage = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	function init_storage_setup() {
	    function checkConfig() {
	        var external = jquery('#external').prop('checked');
	        var ok = true;
	        jquery('#host').prop('disabled', !external);
	        jquery('#port').prop('disabled', !external);
	        if (external) {
	            jquery('#type').val('web');
	            var host = jquery.trim(String(jquery('#host').val()));
	            if (!host) {
	                jquery('#err_msg_host').html('资源服务器地址不正确');
	                ok = false;
	            }
	            else {
	                jquery('#err_msg_host').html('');
	            }
	            var port = jquery('#port').val();
	            if (!port || isNaN(parseInt(String(port), 10))) {
	                jquery('#err_msg_port').html('资源服务器端口不正确');
	                ok = false;
	            }
	            else {
	                jquery('#err_msg_port').html('');
	            }
	        }
	        else {
	            jquery('#type').val('local');
	            jquery('#err_msg_host').html('');
	            jquery('#err_msg_port').html('');
	        }
	        return ok;
	    }
	    jquery('input').on('input', function () {
	        checkConfig();
	    });
	    jquery('#ok').on('click', function (e) {
	        e.preventDefault();
	        if (checkConfig()) {
	            jquery('#setup-storage-form').submit();
	        }
	    });
	}
	exports.init_storage_setup = init_storage_setup;

	});

	unwrapExports(storage);
	var storage_1 = storage.init_storage_setup;

	var install = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	var InstallServer = /** @class */ (function () {
	    function InstallServer(step) {
	        switch (step) {
	            case 'database':
	                database.init_database_setup();
	                break;
	            case 'admin':
	                admin.init_admin_setup();
	                break;
	            case 'storage':
	                storage.init_storage_setup();
	                break;
	        }
	    }
	    return InstallServer;
	}());
	exports.InstallServer = InstallServer;

	});

	var install$1 = unwrapExports(install);
	var install_1 = install.InstallServer;

	exports.default = install$1;
	exports.InstallServer = install_1;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
