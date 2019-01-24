import { Session } from '../../lib/session';
import { Utils } from '../../common/utils';
import { ErrorCode } from '../../common/errcodes';
import { AssetManager } from '../server/user/assets';
import { GetConfig } from '../../lib/config';
import { Server } from '../../lib/servermgr';
import { ServerType } from '../../lib/constants';
import { requestWrapper } from '../../lib/requestwrapper';
import { RoomState, RoomType } from '../../common/defines';
import * as request from 'request';
import * as express from 'express';
import 'express-async-errors';

export const indexRouter = express.Router();

indexRouter.get('/', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const session:Session = req.session as Session;
    const data: any = {};
    if (session.loginUserId) {
        data.user = {
            name: session.loginUserAccount
        }
        res.render ('index', data);
    } else {
        res.render ('login');
    }
});

indexRouter.get('/login', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    res.render ('login');
});

indexRouter.get('/register', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    res.render ('register');
});

indexRouter.get('/trust/settings/profile', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const session = req.session as Session;
    const user:any = await GetConfig.engine.query ({
        sql:'select u.name as name, u.email as email, p.gender as gender, p.mobile as mobile, p.avatar as avatar from user u inner join user_profile p on u.id=p.user_id where u.id=?',
        param: [session.loginUserId]
    });
    if (!user || user.length !== 1) {
        throw new Error ('未找到该用户');
    }
    res.render ('settings/userprofile', {
        user: {
            id: session.loginUserId,
            name: user[0].name,
            email: user[0].email,
            gender: user[0].gender,
            mobile: user[0].mobile,
            avatar: user[0].avatar
        }
    });
});

indexRouter.get('/trust/settings/reset', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    res.render ('settings/resetpass', {
        user: {
            name: (req.session as Session).loginUserAccount
        }
    });
});

indexRouter.get('/trust/assets/image', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const thumb = Utils.safeParseInt(req.query.thumb) || 0;
    const relPath = req.query.relPath;
    const name = req.query.name;
    if (!name || !relPath) {
        return res.status(404).json (Utils.httpResult(ErrorCode.kParamError));
    }
    const content = await AssetManager.readAssetContent((req.session as Session).loginUserId, relPath, name, thumb !== 0);
    if (!content) {
        return res.status(404).json (Utils.httpResult(ErrorCode.kFileNotFound));
    } else {
        res.writeHead (200, {
            'Content-Type': 'image/jpeg'
        });
        res.end (content);
    }
});

indexRouter.get('/avatar/:id', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const userId = Utils.safeParseInt(req.params.id);
    if (userId === null) {
        return res.status(404).json (Utils.httpResult(ErrorCode.kParamError));
    }
    try {
        const content = await AssetManager.readAvatarImage(userId);
        if (!content) {
            return res.status(404).json (Utils.httpResult(ErrorCode.kFileNotFound));
        } else {
            res.writeHead (200, {
                'Content-Type': 'image/jpeg'
            });
            res.end (content);
        }
    } catch (err) {
        res.redirect ('/images/face.jpg');
    }
});

indexRouter.get('/trust/settings/assets', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    res.render ('settings/assets', {
        user: {
            name: (req.session as Session).loginUserAccount
        }
    });
});

indexRouter.get('/trust/settings/sessions', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const session = req.session as Session;
    const sessionList:any = await GetConfig.engine.objects('room').filter(['owner', session.loginUserId]).all();
    const sessionArray: any[] = [];
    for (let i = 0; i < sessionList.length; i++) {
        sessionArray.push ({
            id: sessionList[i].id,
            name: sessionList[i].name,
            detail: sessionList[i].detail,
            type: sessionList[i].type,
            state: sessionList[i].state
        });
    }
    res.render ('settings/sessions', {
        user: {
            name: (req.session as Session).loginUserAccount
        },
        sessions: sessionArray
    });
});

indexRouter.get('/trust/publish_room', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const session = req.session as Session;
    const roomId = Utils.safeParseInt (req.query.room_id);
    if (roomId === null) {
        throw new Error ('参数错误');
    }
    // Query room information
    const rooms:any = await GetConfig.engine.objects('room').filter(['id', roomId]).all();
    if (rooms.length !== 1) {
        throw new Error ('没有可以进入的房间');
    }
    let serverInfo: any = null;
    if (rooms[0].server === 0) {
        // room has not been published
        if (Number(rooms[0].owner) !== session.loginUserId) {
            throw new Error ('房间已关闭');
        }
        serverInfo = await Server.pickServer (ServerType.Room);
        if (!serverInfo) {
            throw new Error ('服务器维护中，目前无法进入房间');
        }
        await requestWrapper (`${serverInfo.ip}:${serverInfo.port}/publish_room`, 'POST', {
            room: roomId
        });
    } else {
        // room has been published
        serverInfo = await Server.getServerInfo (ServerType.Room, Number(rooms[0].server));
        if (!serverInfo) {
            throw new Error ('服务器维护中，目前无法进入房间');
        }
    }
    res.render ('room.ejs', {
        user: {
            name: (req.session as Session).loginUserAccount
        },
        serverinfo: {
            host: `${serverInfo.ip}:${serverInfo.port}?room=${roomId}&token=${(req.session as Session).id}`
        }
    });
});

indexRouter.get('/trust/settings/whiteboards', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    res.render ('settings/whiteboards', {
        user: {
            name: (req.session as Session).loginUserAccount,
        },
        whiteboards: []
    });
});

indexRouter.get('/trust/create-whiteboard', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    res.render ('create_whiteboard', {
        user: {
            name: (req.session as Session).loginUserAccount,
        }
    });
});

