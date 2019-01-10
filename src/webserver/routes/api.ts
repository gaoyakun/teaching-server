import { GetConfig } from '../../lib/config';
import { Utils} from '../../common/utils';
import { ErrorCode } from '../../common/errcodes';
import { Session } from '../../lib/session';
import { AssetManager } from '../server/user/assets';
import { WhiteboardManager } from '../server/user/whiteboards';
import { RoomState } from '../../common/defines';
import { ServerType } from '../../lib/constants';
import { Server } from '../../lib/servermgr';
import { requestWrapper } from '../../lib/requestwrapper';
import * as fileUpload from 'express-fileupload';
import * as express from 'express';
import * as xss from 'xss';
import 'express-async-errors';

export const apiRouter = express.Router();

apiRouter.get('/auth', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    let session = req.session as Session;
    if (session.loginUserId) {
        res.json(Utils.httpResult(ErrorCode.kSuccess));
    } else {
        res.json(Utils.httpResult(ErrorCode.kAuthError));
    }
});

apiRouter.post('/login', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    let session: Session = req.session as Session;
    if (!session.loginUserId) {
        let account = req.body.account;
        let password = req.body.md5password;
        if (!account || !password) {
            return res.json (Utils.httpResult(ErrorCode.kParamError));
        } else if (account !== xss(account) || password !== xss(password)) {
            return res.json (Utils.httpResult(ErrorCode.kInvalidContent));
        } else {
            const rows = await GetConfig.engine.objects('user').filter([{ or:[['account', account],['email',account]] }, ['passwd', password]]).fields(['id','account','name']).all();
            if (rows.length === 1) {
                session.set ({
                    loginUserAccount: account,
                    loginUserId: rows[0].id
                });
                let remember = Utils.safeParseInt(req.body.remember);
                res.cookie(GetConfig.sessionToken, session.id, {
                    expires: remember ? new Date(Date.now() + 1000*3600*24*7) : undefined
                });
                return res.json (Utils.httpResult(ErrorCode.kSuccess));
            } else {
                return res.json (Utils.httpResult(ErrorCode.kAuthError));
            }
        }
    } else {
        return res.json (Utils.httpResult(ErrorCode.kSuccess));
    }
});

apiRouter.post('/register', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    let session: Session = req.session as Session;
    if (session.loginUserId) {
        return res.json (Utils.httpResult(ErrorCode.kInvalidOperation));
    }
    let account = req.body.account;
    let email = req.body.email;
    let password = req.body.md5password;
    if (!account || !email || !password) {
        return res.json (Utils.httpResult(ErrorCode.kParamError));
    } else if (account !== xss(account) || email !== xss(email) || password !== xss(password)) {
        return res.json (Utils.httpResult(ErrorCode.kInvalidContent));
    } else {
        const rows = await GetConfig.engine.query({
            sql:'insert into user (account, email, passwd, name) select ?, ?, ?, ? from dual where not exists (select id from user where account=? or email=?)',
            param:[account, email, password, account, account, email]
        });
        if (rows.affectedRows === 1) {
            return res.json (Utils.httpResult(ErrorCode.kSuccess));
        } else {
            return res.json (Utils.httpResult(ErrorCode.kAuthError));
        }
    }
});

apiRouter.get('/trust/asset', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const relPath = req.query.relPath || '/';
    if (relPath !== xss(relPath)) {
        return res.json (Utils.httpResult(ErrorCode.kInvalidContent));
    }
    const result = Utils.httpResult(ErrorCode.kSuccess);
    result.data = await AssetManager.loadAssetList ((req.session as Session).loginUserId, relPath);
    return res.json (result);
});

apiRouter.post('/trust/asset', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    if (req.files && req.files.content) {
        const file = req.files.content as fileUpload.UploadedFile;
        await AssetManager.uploadAssetBuffer ((req.session as Session).loginUserId, '/', file.data, file.name);
    }
    return res.json (Utils.httpResult(ErrorCode.kSuccess));
});

apiRouter.get('/trust/whiteboard', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const relPath = req.query.relPath || '/';
    if (relPath !== xss(relPath)) {
        return res.json (Utils.httpResult(ErrorCode.kInvalidContent));
    }
    const result = Utils.httpResult(ErrorCode.kSuccess);
    result.data = await WhiteboardManager.loadAssetList ((req.session as Session).loginUserId, relPath);
    return res.json (result);
});

apiRouter.post('/trust/create_room', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const roomName = req.body.name;
    const roomDesc = req.body.desc || '';
    if (roomName !== xss(roomName) || roomDesc !== xss(roomDesc) || roomDesc.length > 250) {
        return res.json (Utils.httpResult(ErrorCode.kInvalidContent));
    }
    const roomType = Utils.safeParseInt(req.body.type);
    const session = req.session as Session;
    const lastInsertId = (await GetConfig.engine.objects('room').add ({
        owner: session.loginUserId,
        creation_time: Math.round(Date.now()/1000),
        close_time: 0,
        type: roomType||0,
        state: 0,
        name: roomName,
        detail: roomDesc
    })).insertId;
    const result = Utils.httpResult (ErrorCode.kSuccess);
    result.data = {
        room_id: Number(lastInsertId)
    };
    return res.json (result)
});

apiRouter.get('/trust/public_rooms', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const rooms:any = await GetConfig.engine.query ({
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
});

apiRouter.post('/trust/close_room', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const session = req.session as Session;
    const roomId = Utils.safeParseInt (req.body.room_id);
    if (roomId === null) {
        throw new Error ('参数错误');
    }
    const rooms:any = await GetConfig.engine.objects('room').filter([['id', roomId],['owner',session.loginUserId]]).all();
    if (rooms.length !== 1) {
        throw new Error ('没有可以结束的房间');
    }
    const serverInfo: any = await Server.getServerInfo (ServerType.Room, Number(rooms[0].server));
    if (!serverInfo) {
        throw new Error ('没有可以结束的房间');
    }
    const result = await requestWrapper (`${serverInfo.ip}:${serverInfo.port}/close_room`, 'POST', {
        room: roomId
    });
    console.log (JSON.stringify(result));
    return res.json (Utils.httpResult(ErrorCode.kSuccess));
});
