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
const path = require("path");
const sharp = require("sharp");
const uid_1 = require("../../lib/uid");
const config_1 = require("../../config");
const fileutils = require("../../lib/fileutils");
const THUMBNAIL_SIZE = 128;
class WhiteboardManager {
    static getUserAssetPathById(userId) {
        return path.join(config_1.Config.getUserDataPathById(userId), 'whiteboards');
    }
    static loadAssetList(userId, relPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const dir = path.join(this.getUserAssetPathById(userId), relPath);
            return fileutils.loadFileList(dir);
        });
    }
    static uploadAssetBase64(userId, relPath, width, height, channels, boardData, contentBase64, filename) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.uploadAssetBuffer(userId, relPath, width, height, channels, boardData, new Buffer(contentBase64, 'base64'), filename);
        });
    }
    static uploadAssetBuffer(userId, relPath, width, height, channels, boardData, buffer, filename) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = path.join(this.getUserAssetPathById(userId), relPath);
            yield fileutils.mkdirs(filePath);
            const u = uid_1.UID('FILE');
            const fullName = path.join(filePath, u + '.wb');
            yield fileutils.writeFile(fullName, boardData);
            const thumbFileName = path.join(filePath, `.${u}.jpg`);
            yield sharp(buffer, {
                raw: {
                    width: width,
                    height: height,
                    channels: channels
                }
            }).resize(THUMBNAIL_SIZE, THUMBNAIL_SIZE, {
                fit: 'contain',
                background: { r: 0, g: 0, b: 0, alpha: 1 },
                withoutEnlargement: true
            }).toFile(thumbFileName);
        });
    }
    static readAssetContent(userId, relPath, filename, thumb) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (thumb) {
                    const index = filename.lastIndexOf('.');
                    filename = '.' + filename.substring(0, index) + '.jpg';
                }
                const filePath = path.join(this.getUserAssetPathById(userId), relPath, filename);
                return yield fileutils.readFile(filePath);
            }
            catch (err) {
                return null;
            }
        });
    }
}
exports.WhiteboardManager = WhiteboardManager;
//# sourceMappingURL=whiteboards.js.map