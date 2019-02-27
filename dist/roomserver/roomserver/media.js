"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mediasoup = require('mediasoup');
const config_1 = require("../lib/config");
const msOptions = {
    rtcIPv4: true,
    rtcIPv6: false,
};
if (config_1.Config.rtcAnnouncedIPv4) {
    msOptions.rtcAnnouncedIPv4 = config_1.Config.rtcAnnouncedIPv4;
}
if (config_1.Config.rtcAnnouncedIPv6) {
    msOptions.rtcAnnouncedIPv6 = config_1.Config.rtcAnnouncedIPv6;
}
if (process.env.LOG_LEVEL) {
    console.log('Setting logLevel to', process.env.LOG_LEVEL);
    msOptions.logLevel = process.env.LOG_LEVEL;
    msOptions.logTags = ['info', 'ice', 'dlts', 'rtp', 'srtp', 'rtcp', 'rbe', 'rtx'];
}
const ms = mediasoup.Server(msOptions);
const MEDIA_CODECS = [{
        kind: "audio",
        name: "opus",
        clockRate: 48000,
        channels: 2,
        parameters: {
            useinbandfec: 1
        }
    }, {
        kind: "video",
        name: "h264",
        clockRate: 90000,
        parameters: {
            "packetization-mode": 1,
            "profile-level-id": "42e01f",
            "level-asymmetry-allowed": 1
        }
    }];
function handlePubsub(client, isPublisher) {
    if (!client.room.mediaRoom) {
        client.room.mediaRoom = ms.Room(MEDIA_CODECS);
        client.room.mediaRoom.on('close', () => {
            console.log('MediaRoom closed');
            client.room.mediaRoom = null;
        });
        client.room.mediaRoom.on('newpeer', (peer) => {
            console.log('MediaRoom peer joined:', peer);
        });
    }
    else {
        if (client.room.mediaRoom.closed) {
            console.log('MediaRoom closed');
        }
        else {
            console.log('MediaRoom ');
        }
    }
    function sendAction(obj) {
        if (client.socket && client.socket.connected) {
            client.socket.emit('media', obj);
        }
    }
    client.socket.on('media', (data) => {
        switch (data.type) {
            case 'MS_SEND': {
                let target;
                switch (data.payload.target) {
                    case 'room':
                        target = client.room.mediaRoom;
                        break;
                    case 'peer':
                        target = client.mediaPeer;
                        break;
                }
                if (data.meta.notification) {
                    if (!target) {
                        console.log('unknown notification target', data.payload.target);
                    }
                    else {
                        target.receiveNotification(data.payload);
                    }
                    break;
                }
                if (!target) {
                    console.log('unknown request target', data.payload.target);
                    sendAction({ type: 'MS_ERROR', payload: 'unknown request target', meta: data.meta });
                    break;
                }
                if (data.payload.method === 'join') {
                    data.payload.peerName = String(client.userId);
                    // Kick out the old peer.
                    var oldPeer = client.room.mediaRoom.getPeerByName(data.payload.peerName);
                    if (oldPeer) {
                        oldPeer.close();
                    }
                }
                target.receiveRequest(data.payload)
                    .then((response) => {
                    if (data.payload.method === 'join') {
                        // Detected a join request, so get the peer.
                        var peerName = data.payload.peerName;
                        client.mediaPeer = client.room.mediaRoom.getPeerByName(peerName);
                        client.mediaPeer.on('notify', (notification) => {
                            if (notification.method === 'newPeer' || notification.method === 'peerClosed') {
                                if (!isPublisher && notification.name !== String(client.room.owner)) {
                                    // Skip the notification to hide all but the publisher.
                                    return;
                                }
                            }
                            // console.log(addr, 'sending notification', notification);
                            sendAction({ type: 'MS_NOTIFY', payload: notification, meta: { channel: `media-room-${client.room.id}` } });
                        });
                        console.log('new peer joined the room', peerName);
                        if (!isPublisher) {
                            // Filter out all peers but the publisher.
                            response = Object.assign({}, response, {
                                peers: response.peers.filter((peer) => {
                                    return (peer.name === String(client.room.owner));
                                })
                            });
                        }
                    }
                    // console.log(addr, 'sending response', response);
                    sendAction({ type: 'MS_RESPONSE', payload: response, meta: data.meta });
                }).catch((err) => {
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
exports.handlePubsub = handlePubsub;
//# sourceMappingURL=media.js.map