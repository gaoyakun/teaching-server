import { Config } from '../../../lib/config';
import { Utils} from '../../../common/utils';
import { ErrorCode } from '../../../common/errcodes';
import { Session } from '../../../lib/session';
import { AssetManager } from '../../server/user/assets';
import { RoomState } from '../../../common/defines';
import { ServerType } from '../../../lib/constants';
import { Server } from '../../../lib/servermgr';
import { requestWrapper } from '../../../lib/requestwrapper';
import * as fileUpload from 'express-fileupload';
import * as express from 'express';
import 'express-async-errors';

export function auth (req:express.Request, res:express.Response) {
    let session = req.session as Session;
    if (session.loginUserId) {
        res.json(Utils.httpResult(ErrorCode.kSuccess));
    } else {
        res.json(Utils.httpResult(ErrorCode.kAuthError));
    }
}

export async function login (req:express.Request, res:express.Response, next:express.NextFunction, params:any) {
    let session: Session = req.session as Session;
    if (!session.loginUserId) {
        const rows = await Config.engine.objects('user').filter([['account', params.account], ['passwd', params.md5password]]).fields(['id','account','name']).all();
        if (rows.length === 1) {
            session.set ({
                loginUserAccount: params.account,
                loginUserId: rows[0].id
            });
            let remember = Utils.safeParseInt(req.body.remember);
            res.cookie(Config.sessionToken, session.id, {
                expires: remember ? new Date(Date.now() + 1000*3600*24*7) : undefined
            });
            return res.json (Utils.httpResult(ErrorCode.kSuccess));
        } else {
            return res.json (Utils.httpResult(ErrorCode.kAuthError));
        }
    } else {
        return res.json (Utils.httpResult(ErrorCode.kSuccess));
    }
}

export async function register (req:express.Request, res:express.Response, next:express.NextFunction, params:any) {
    let session: Session = req.session as Session;
    if (session.loginUserId) {
        return res.json (Utils.httpResult(ErrorCode.kInvalidOperation));
    }
    const dbSession = await Config.engine.beginSession ();
    try {
        const res1 = await dbSession.query({
            sql:'insert into user (account, email, passwd, name) select ?, ?, ?, ? from dual where not exists (select id from user where account=? or email=?)',
            param:[params.account, params.email, params.md5password, params.account, params.account, params.email]
        });
        if (res1.affectedRows === 0) {
            await dbSession.cancel ();
            return res.json (Utils.httpResult(ErrorCode.kAuthError));
        }
        const res2 = await dbSession.query({
            sql: 'insert into `user_profile` (user_id, gender, mobile, avatar) values (?, ?, ?, ?)',
            param: [ res1.insertId, 0, '', '' ]
        });
        if (res2.affectedRows === 0) {
            await dbSession.cancel ();
            return res.json (Utils.httpResult(ErrorCode.kAuthError));
        }
        await dbSession.end ();
        return res.json (Utils.httpResult(ErrorCode.kSuccess));
    } catch (err) {
        await dbSession.cancel ();
        return res.json (Utils.httpResult(ErrorCode.kAuthError));
    }
}

export async function getAssetList (req:express.Request, res:express.Response, next:express.NextFunction, params: any) {
    const result = Utils.httpResult(ErrorCode.kSuccess);
    result.data = await AssetManager.loadAssetList ((req.session as Session).loginUserId, params.relPath);
    return res.json (result);
}

export async function updateProfile (req:express.Request, res:express.Response, next:express.NextFunction, params: any) {
    let session: Session = req.session as Session;
    const result = await Config.engine.query ({
        sql: 'update user u, user_profile p set u.name=?, u.email=?, p.mobile=?, p.gender=? where u.id=? and p.user_id=u.id',
        param: [params.name, params.email, params.mobile, params.gender, session.loginUserId]
    });
    if (result.affectedRows === 0) {
        return res.json (Utils.httpResult(ErrorCode.kServerError));
    }
    if (req.files && req.files.avatar) {
        const file = req.files.avatar as fileUpload.UploadedFile;
        await AssetManager.uploadUserAvatar ((req.session as Session).loginUserId, file.data, 'avatar.jpg');
    }
    return res.json (Utils.httpResult(ErrorCode.kSuccess));
}

export async function uploadAsset (req:express.Request, res:express.Response, next:express.NextFunction) {
    if (req.files && req.files.content) {
        const file = req.files.content as fileUpload.UploadedFile;
        await AssetManager.uploadAssetBuffer ((req.session as Session).loginUserId, '/', file.data, file.name);
    }
    return res.json (Utils.httpResult(ErrorCode.kSuccess));
}

export async function createRoom (req:express.Request, res:express.Response, next:express.NextFunction, params:any) {
    const session = req.session as Session;
    const lastInsertId = (await Config.engine.objects('room').add ({
        owner: session.loginUserId,
        creation_time: Math.round(Date.now()/1000),
        close_time: 0,
        type: params.type,
        state: 0,
        name: params.name,
        detail: params.desc
    })).insertId;
    const result = Utils.httpResult (ErrorCode.kSuccess);
    result.data = {
        room_id: Number(lastInsertId)
    };
    return res.json (result)
}

export async function getPublicRooms (req:express.Request, res:express.Response, next:express.NextFunction) {
    const rooms:any = await Config.engine.query ({
        sql: 'select a.id as id, a.name as name, a.detail as detail, b.account as account from room a inner join user b on a.owner=b.id where a.state=?',
        param: [ RoomState.Active ]
    });
    const roomlist = [];
    for (let i = 0; i < rooms.length; i++) {
        roomlist.push ({
            id: rooms[i].id,
            name: rooms[i].name,
            detail: rooms[i].detail,
            account: rooms[i].account
        });
    }
    const result = Utils.httpResult(ErrorCode.kSuccess);
    result.data = roomlist;
    res.json (result);
}

export async function closeRoom (req:express.Request, res:express.Response, next:express.NextFunction, params:any) {
    const session = req.session as Session;
    const rooms:any = await Config.engine.objects('room').filter([['id', params.room_id],['owner',session.loginUserId]]).all();
    if (rooms.length !== 1) {
        throw new Error ('没有可以结束的房间');
    }
    const serverInfo: any = await Server.getServerInfo (ServerType.Room, Number(rooms[0].server));
    if (!serverInfo) {
        throw new Error ('没有可以结束的房间');
    }
    const result = await requestWrapper (`${serverInfo.host}:${serverInfo.port}/close_room`, 'POST', {
        room: params.room_id
    });
    console.log (JSON.stringify(result));
    return res.json (Utils.httpResult(ErrorCode.kSuccess));
}
