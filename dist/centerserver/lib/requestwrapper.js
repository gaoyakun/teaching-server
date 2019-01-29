"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
function requestWrapper(url, method, json) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const options = {
                url: url,
                method: method,
                callback: (err, response, body) => {
                    if (!err && response.statusCode === 200) {
                        resolve(body);
                    }
                    else {
                        reject(err);
                    }
                }
            };
            if (json) {
                options.json = json;
            }
            request(options);
        });
    });
}
exports.requestWrapper = requestWrapper;
//# sourceMappingURL=requestwrapper.js.map