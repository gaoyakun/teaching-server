const mediasoup = require('mediasoup');
import * as crypto from 'crypto';
import { Config } from '../lib/config';
import { Client } from './roommgr';

const TURN_SERVERS: string[] = process.env.TURN_SERVERS ? process.env.TURN_SERVERS.split(',') : [];
const PASSWORD_EXPIRY_SECONDS = 300;

export function getTurnServers(key?: string) {
    const urls = TURN_SERVERS;
    if (!urls.length) {
        return [];
    }
    if (key) {
        // Return the TURN REST API credential.
        const timestamp = Math.floor(Date.now() / 1000) + PASSWORD_EXPIRY_SECONDS;
        const temporary_username = String(timestamp) + ':msbe';
        const hmac = crypto.createHmac('sha1', key).update(temporary_username).digest('base64');
        return [{urls: urls,
            username: temporary_username,
            credential: hmac,
            credentialType: 'password',
        }];
    }
    else {
        // No credentials;
        return [{urls: urls}];
    }
};

const msOptions: any = {
    rtcIPv4: true,
    rtcIPv6: false,
};

if (Config.rtcAnnouncedIPv4) {
    msOptions.rtcAnnouncedIPv4 = Config.rtcAnnouncedIPv4;
}
if (Config.rtcAnnouncedIPv6) {
    msOptions.rtcAnnouncedIPv6 = Config.rtcAnnouncedIPv6;
}

if (process.env.LOG_LEVEL) {
    console.log('Setting logLevel to', process.env.LOG_LEVEL)
    msOptions.logLevel = process.env.LOG_LEVEL;
    msOptions.logTags = [ 'info', 'ice', 'dlts', 'rtp', 'srtp', 'rtcp', 'rbe', 'rtx' ];
}
const ms = mediasoup.Server(msOptions);

const MEDIA_CODECS = [{
    kind        : "audio",
    name        : "opus",
    clockRate   : 48000,
    channels    : 2,
    parameters  :
    {
        useinbandfec : 1
    }
}, {
    kind       : "video",
    name       : "h264",
    clockRate  : 90000,
    parameters :
    {
        "packetization-mode"      : 1,
        "profile-level-id"        : "42e01f",
        "level-asymmetry-allowed" : 1
    }
}];

export function handlePubsub(client: Client, isPublisher: boolean) {
    if (!client.room!.mediaRoom) {
        client.room!.mediaRoom = ms.Room(MEDIA_CODECS);
    }
    function sendAction(obj: any) {
        if (client.socket && client.socket.connected) {
            client.socket!.emit ('media', obj);
        }
    }
    client.socket!.on ('media', (data: any) => {
        switch (data.type) {
            case 'MS_SEND': {
                let target;
                switch (data.payload.target) {
                    case 'room':
                        target = client.room!.mediaRoom;
                        break;
                    case 'peer':
                        target = client.mediaPeer;
                        break;
                }
                if (data.meta.notification) {
                    if (!target) {
                        console.log ('unknown notification target', data.payload.target);
                    } else {
                        target.receiveNotification (data.payload);
                    }
                    break;
                }
                if (!target) {
                    console.log('unknown request target', data.payload.target);
                    sendAction({type: 'MS_ERROR', payload: 'unknown request target', meta: data.meta});
                    break;
                }
                if (data.payload.method === 'join') {
                    data.payload.peerName = String(client.userId);
                    // Kick out the old peer.
                    var oldPeer = client.room!.mediaRoom.getPeerByName(data.payload.peerName);
                    if (oldPeer) {
                        oldPeer.close();
                    }
                }
                target.receiveRequest(data.payload)
                    .then((response: any) => {
                        if (data.payload.method === 'join') {
                            // Detected a join request, so get the peer.
                            var peerName = data.payload.peerName;
                            client.mediaPeer = client.room!.mediaRoom.getPeerByName(peerName);
                            client.mediaPeer.on('notify', (notification: any) => {
                                if (notification.method === 'newPeer' || notification.method === 'peerClosed' ) {
                                    if (!isPublisher && notification.name !== String(client.room!.owner)) {
                                        // Skip the notification to hide all but the publisher.
                                        return;
                                    }
                                }
                                // console.log(addr, 'sending notification', notification);
                                sendAction({type: 'MS_NOTIFY', payload: notification, meta: {channel: `media-room-${client.room!.id}`}});
                            });
                            console.log('new peer joined the room', peerName);
                            if (!isPublisher) {
                                // Filter out all peers but the publisher.
                                response = Object.assign({}, response, {
                                    peers: response.peers.filter((peer:any) => {
                                        return (peer.name === String(client.room!.owner));
                                    })
                                });
                            }
                        }
                        // console.log(addr, 'sending response', response);
                        sendAction({type: 'MS_RESPONSE', payload: response, meta: data.meta});
                    }).catch((err:any) => {
                        sendAction({
                            type: 'MS_ERROR', 
                            payload: err, 
                            meta: data.meta
                        });
                    });
                break;
            }
            default: {
                throw Error('Unrecognized action type ' + data.type);
                break;
            }
        }
    });
}


