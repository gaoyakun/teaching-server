"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Long = require("long");
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.isNumber = function (obj) {
        return typeof obj === 'number';
    };
    Utils.isBoolean = function (obj) {
        return typeof obj === 'boolean';
    };
    Utils.isString = function (obj) {
        return Object.prototype.toString.call(obj) === '[object String]';
    };
    Utils.isUndefined = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Undefined]';
    };
    Utils.isNull = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Null]';
    };
    Utils.isObject = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    };
    Utils.isArray = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };
    Utils.isFunction = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Function]';
    };
    Utils.isPrimitive = function (obj) {
        return this.isNumber(obj) || this.isString(obj) || this.isBoolean(obj) || this.isNull(obj) || this.isUndefined(obj);
    };
    Utils.deepCopy = function (obj) {
        return this.isPrimitive(obj) ? obj : JSON.parse(JSON.stringify(obj));
    };
    Utils.equals = function (obj1, obj2) {
        for (var propName in obj1) {
            if (obj1.hasOwnProperty(propName) !== obj2.hasOwnProperty(propName)) {
                return false;
            }
            else if (typeof obj1[propName] !== typeof obj2[propName]) {
                return false;
            }
        }
        for (var propName in obj2) {
            if (obj1.hasOwnProperty(propName) !== obj2.hasOwnProperty(propName)) {
                return false;
            }
            else if (typeof obj1[propName] !== typeof obj2[propName]) {
                return false;
            }
            if (!obj1.hasOwnProperty(propName)) {
                continue;
            }
            if (obj1[propName] instanceof Array && obj2[propName] instanceof Array) {
                if (!this.equals(obj1[propName], obj2[propName])) {
                    return false;
                }
            }
            else if (obj1[propName] instanceof Object && obj2[propName] instanceof Object) {
                if (!this.equals(obj1[propName], obj2[propName])) {
                    return false;
                }
            }
            else if (obj1[propName] !== obj2[propName]) {
                return false;
            }
        }
        return true;
    };
    Utils.trimLeft = function (str) {
        return str.replace(/(^\s*)/g, '');
    };
    Utils.trimRight = function (str) {
        return str.replace(/(\s*$)/g, '');
    };
    Utils.trim = function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    };
    Utils.safeParseNumber = function (value) {
        return isNaN(value) ? null : parseFloat(value);
    };
    Utils.safeParseInt = function (value, defaultValue) {
        var result = value !== null && value !== undefined && /^[-+]?\d+$/.test(value.toString()) ? parseInt(value, 10) : null;
        if (result == null && this.isNumber(defaultValue)) {
            result = parseInt(defaultValue, 10);
        }
        return result;
    };
    Utils.safeParseLong = function (value) {
        if (isNaN(value)) {
            return null;
        }
        else if (this.isString(value)) {
            return Long.fromString(value);
        }
        else if (this.isNumber(value)) {
            return Long.fromNumber(value);
        }
        else {
            return null;
        }
    };
    Utils.isMD5 = function (str) {
        return this.isString(str) && /^[0-9a-f]{32}$/.test(str);
    };
    Utils.longDivToFixed = function (value, n) {
        var lval = value;
        if (this.isNull(lval) || this.isUndefined(lval)) {
            return null;
        }
        else if (this.isString(lval)) {
            lval = Long.fromString(lval);
        }
        else if (this.isNumber(lval)) {
            lval = Long.fromNumber(lval);
        }
        var sign = '';
        if (lval.lt(0)) {
            lval = lval.neg();
            sign = '-';
        }
        var divisor = Long.ONE;
        for (var i = 0; i < n; i++) {
            divisor = divisor.mul(10);
        }
        var iPart = lval.div(divisor).toString();
        var fPart = lval.mod(divisor).toString();
        while (fPart.length < n) {
            fPart = '0' + fPart;
        }
        return sign + iPart + '.' + fPart;
    };
    Utils.genDebugStr = function (str, up) {
        var skip = 1 + (up || 0);
        var f = arguments.callee;
        while (f && skip > 0) {
            f = f.caller;
            skip--;
        }
        var funcName = f ? this.getFunctionName(f) + ': ' : '';
        return "" + funcName + str;
    };
    Utils.debugOut = function (str, up) {
        if (this.debug) {
            console.log(this.genDebugStr(str, up));
        }
    };
    Utils.getFunctionName = function (callee) {
        var _callee = callee.toString().replace(/[\s\?]*/g, '');
        var comb = _callee.length >= 50 ? 50 : _callee.length;
        _callee = _callee.substring(0, comb);
        var name = _callee.match(/^function([^\(]+?)\(/);
        if (name && name[1]) {
            return name[1];
        }
        var caller = callee.caller;
        var _caller = caller.toString().replace(/[\s\?]*/g, '');
        var last = _caller.indexOf(_callee);
        var str = _caller.substring(last - 30, last);
        name = str.match(/var([^\=]+?)\=/);
        if (name && name[1]) {
            return name[1];
        }
        return 'anonymous';
    };
    Utils.debug = false;
    Utils.mergeBlank = function (str) {
        return str.replace(/\s+/g, ' ');
    };
    return Utils;
}());
exports.Utils = Utils;
