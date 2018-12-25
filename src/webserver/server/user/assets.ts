import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as sharp from 'sharp';
import { Utils } from '../../../common/utils';

const MAX_USER_ID_LENGTH:number = 16;
const THUMBNAIL_SIZE:number = 128;

export enum AssetType {
    Unknown = 0,
    Text,
    Image,
    Object
}

export class AssetManager {
    private _userDataPath: string;
    constructor () {
        this._userDataPath = path.join(os.homedir(), '.open_teaching', 'data');
    }
    getUserDataPathById (userId: number): string {
        return this._getUserDataPathById (userId);
    }
    getUserAssetPathById (userId: number): string {
        return path.join(this.getUserDataPathById(userId), 'assets');
    }
    loadAssetList (userId: number, relPath: string): string[] {
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
    uploadAssetBaset64 (userId: number, relPath: string, contentBase64: string, filename: string): boolean {
        return this.uploadAssetBuffer (userId, relPath, new Buffer(contentBase64, 'base64'), filename);
    }
    uploadAssetBuffer (userId: number, relPath: string, buffer: Buffer, filename: string): boolean {
        try {
            const filePath = path.join (this.getUserAssetPathById(userId), relPath);
            this._mkdirsSync (filePath);
            const fullName = path.join (filePath, filename);
            fs.writeFileSync (fullName, buffer);

            sharp(buffer).resize (THUMBNAIL_SIZE, THUMBNAIL_SIZE, {
                fit: 'contain',
                background: {r:0,g:0,b:0,alpha:0},
                withoutEnlargement: true
            }).toFile (path.join (filePath, '.' + path.basename(filename) + '.png'), (err, info) => {
                if (err) {
                    throw new Error (err.message);
                }
            });
            return true;
        } catch (err) {
            return false;
        }
    }
    private _getUserIdString (userId: number): string {
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
    private _getUserDataPathById (userId: number): string {
        const strId = this._getUserIdString (userId);
        return path.join (this._userDataPath, strId);
    }
    private _mkdirsSync(dirpath: string) { 
        if (!fs.existsSync(dirpath)) {
            let pathtmp = '';
            dirpath.split(/[/\\]/).forEach(function (dirname) {
                pathtmp = pathtmp ? path.join(pathtmp, dirname) : dirname;
                if (pathtmp === '') {
                    pathtmp = '/';
                }
                if (!fs.existsSync(pathtmp)) {
                    fs.mkdirSync (pathtmp)
                } else if (!fs.statSync(dirpath).isDirectory()) {
                    throw new Error(`[AssetManager._mkdirsSync] path already exists but is not a directory <${dirpath}>`);
                }
            });
        } else if (!fs.statSync(dirpath).isDirectory()) {
            throw new Error(`[AssetManager._mkdirsSync] path already exists but is not a directory <${dirpath}>`);
        }
    }
}