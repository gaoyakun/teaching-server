import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as sharp from 'sharp';
import { Utils } from '../../../common/utils';
import { UID } from '../../lib/uid';

const MAX_USER_ID_LENGTH:number = 16;
const THUMBNAIL_SIZE:number = 128;

export enum AssetType {
    Unknown = 0,
    Text,
    Image,
    Object
}

export class AssetManager {
    private static _userDataPath = path.join(os.homedir(), '.open_teaching', 'data');
    static getUserDataPathById (userId: number): string {
        return this._getUserDataPathById (userId);
    }
    static getUserAssetPathById (userId: number): string {
        return path.join(this.getUserDataPathById(userId), 'assets');
    }
    static loadAssetList (userId: number, relPath: string): string[] {
        const result: string[] = [];
        const dir = path.join (this.getUserAssetPathById(userId), relPath);
        if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
            fs.readdirSync(dir).forEach(function(file) {
                let curPath = path.join(dir, file);
                if(fs.statSync(curPath).isDirectory()) {
                    file += '/';
                }
                result.push (file);
            });
        }
        return result;
    }
    static uploadAssetBaset64 (userId: number, relPath: string, contentBase64: string, filename: string): boolean {
        return this.uploadAssetBuffer (userId, relPath, new Buffer(contentBase64, 'base64'), filename);
    }
    static uploadAssetBuffer (userId: number, relPath: string, buffer: Buffer, filename: string): boolean {
        try {
            const filePath = path.join (this.getUserAssetPathById(userId), relPath);
            this._mkdirsSync (filePath);
            const u = UID('FILE');
            const fullName = path.join (filePath, u + path.extname (filename));
            fs.writeFileSync (fullName, buffer);

            const thumbFileName = path.join (filePath, `.${u}.jpg`);
            sharp(buffer).resize (THUMBNAIL_SIZE, THUMBNAIL_SIZE, {
                fit: 'contain',
                background: {r:0,g:0,b:0,alpha:1},
                withoutEnlargement: true
            }).toFile (thumbFileName, (err, info) => {
                if (err) {
                    throw new Error (err.message);
                }
            });
            return true;
        } catch (err) {
            return false;
        }
    }
    private static _getUserIdString (userId: number): string {
        if (!Utils.isInt (userId)) {
            throw new Error (`[AssetManager._getUserDataPath]: Invalid user id ${userId}`);
        }
        let strId = String(userId);
        if (strId.length > MAX_USER_ID_LENGTH) {
            throw new Error ('[AssetManager._getUserDataPath]: Invalid user id ${userId}');
        }
        for (let i = 0; i < MAX_USER_ID_LENGTH; i++) {
            strId = '0' + strId;
        }
        return strId;
    }
    private static _getUserDataPathById (userId: number): string {
        const strId = this._getUserIdString (userId);
        return path.join (this._userDataPath, strId);
    }
    private static _mkdirsSync(dirpath: string) { 
        if (!fs.existsSync(dirpath)) {
            let pathtmp = '';
            dirpath.split(/[/\\]/).forEach(function (dirname) {
                pathtmp = pathtmp ? path.join(pathtmp, dirname) : dirname;
                if (pathtmp === '') {
                    pathtmp = '/';
                }
                if (!fs.existsSync(pathtmp)) {
                    fs.mkdirSync (pathtmp)
                } else if (!fs.statSync(pathtmp).isDirectory()) {
                    throw new Error(`[AssetManager._mkdirsSync] path already exists but is not a directory <${dirpath}>`);
                }
            });
        } else if (!fs.statSync(dirpath).isDirectory()) {
            throw new Error(`[AssetManager._mkdirsSync] path already exists but is not a directory <${dirpath}>`);
        }
    }
}