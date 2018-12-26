"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const os = require("os");
const sharp = require("sharp");
const utils_1 = require("../../../common/utils");
const uid_1 = require("../../lib/uid");
const MAX_USER_ID_LENGTH = 16;
const THUMBNAIL_SIZE = 128;
var AssetType;
(function (AssetType) {
    AssetType[AssetType["Unknown"] = 0] = "Unknown";
    AssetType[AssetType["Text"] = 1] = "Text";
    AssetType[AssetType["Image"] = 2] = "Image";
    AssetType[AssetType["Object"] = 3] = "Object";
})(AssetType = exports.AssetType || (exports.AssetType = {}));
class AssetManager {
    static getUserDataPathById(userId) {
        return this._getUserDataPathById(userId);
    }
    static getUserAssetPathById(userId) {
        return path.join(this.getUserDataPathById(userId), 'assets');
    }
    static loadAssetList(userId, relPath) {
        const result = [];
        const dir = path.join(this.getUserAssetPathById(userId), relPath);
        if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
            fs.readdirSync(dir).forEach(function (file) {
                let curPath = path.join(dir, file);
                if (fs.statSync(curPath).isDirectory()) {
                    file += '/';
                }
                result.push(file);
            });
        }
        return result;
    }
    static uploadAssetBaset64(userId, relPath, contentBase64, filename) {
        return this.uploadAssetBuffer(userId, relPath, new Buffer(contentBase64, 'base64'), filename);
    }
    static uploadAssetBuffer(userId, relPath, buffer, filename) {
        try {
            const filePath = path.join(this.getUserAssetPathById(userId), relPath);
            this._mkdirsSync(filePath);
            const u = uid_1.UID('FILE');
            const fullName = path.join(filePath, u + path.extname(filename));
            fs.writeFileSync(fullName, buffer);
            const thumbFileName = path.join(filePath, `.${u}.jpg`);
            sharp(buffer).resize(THUMBNAIL_SIZE, THUMBNAIL_SIZE, {
                fit: 'contain',
                background: { r: 0, g: 0, b: 0, alpha: 1 },
                withoutEnlargement: true
            }).toFile(thumbFileName, (err, info) => {
                if (err) {
                    throw new Error(err.message);
                }
            });
            return true;
        }
        catch (err) {
            return false;
        }
    }
    static _getUserIdString(userId) {
        if (!utils_1.Utils.isInt(userId)) {
            throw new Error(`[AssetManager._getUserDataPath]: Invalid user id ${userId}`);
        }
        let strId = String(userId);
        if (strId.length > MAX_USER_ID_LENGTH) {
            throw new Error('[AssetManager._getUserDataPath]: Invalid user id ${userId}');
        }
        for (let i = 0; i < MAX_USER_ID_LENGTH; i++) {
            strId = '0' + strId;
        }
        return strId;
    }
    static _getUserDataPathById(userId) {
        const strId = this._getUserIdString(userId);
        return path.join(this._userDataPath, strId);
    }
    static _mkdirsSync(dirpath) {
        if (!fs.existsSync(dirpath)) {
            let pathtmp = '';
            dirpath.split(/[/\\]/).forEach(function (dirname) {
                pathtmp = pathtmp ? path.join(pathtmp, dirname) : dirname;
                if (pathtmp === '') {
                    pathtmp = '/';
                }
                if (!fs.existsSync(pathtmp)) {
                    fs.mkdirSync(pathtmp);
                }
                else if (!fs.statSync(pathtmp).isDirectory()) {
                    throw new Error(`[AssetManager._mkdirsSync] path already exists but is not a directory <${dirpath}>`);
                }
            });
        }
        else if (!fs.statSync(dirpath).isDirectory()) {
            throw new Error(`[AssetManager._mkdirsSync] path already exists but is not a directory <${dirpath}>`);
        }
    }
}
AssetManager._userDataPath = path.join(os.homedir(), '.open_teaching', 'data');
exports.AssetManager = AssetManager;
//# sourceMappingURL=assets.js.map