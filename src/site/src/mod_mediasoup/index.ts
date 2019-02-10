import * as $ from 'jquery';
import * as io from 'socket.io-client';
import { request } from 'http';

declare global {
    interface Window {
        mediasoupClient: any;
        webkitURL: any;
    }
}

export class MediaProducer {
    private _pending: any;
    private _errors: any;
    private _capturing: any;
    private _producers: any;
    private _lastProduced: any;
    private _socket: SocketIOClient.Socket;
    private _roomName: string;
    private _requestId: number;
    private _room: any;
    private _transport: any;
    private _sendStream: MediaStream|null;
    private _playStream: MediaStream|null;
    private _turnServers: { urls: string[] }[];
    private _streamActiveTimeout: any;
    private _mediaElement: HTMLAudioElement|null;
    constructor (socket:SocketIOClient.Socket, roomName: string, turnServers?:{urls: string[]}[]) {
        this._socket = socket;
        this._roomName = roomName;
        this._pending = {};
        this._errors = {};
        this._capturing = {};
        this._producers = {};
        this._lastProduced = {};
        this._requestId = 0;
        this._room = null;
        this._transport = null;
        this._sendStream = null;
        this._turnServers = turnServers||[];
        this._streamActiveTimeout = {};
        this._mediaElement = null;
        this._playStream = null;
        if (window.navigator && window.navigator.userAgent.match(/\sEdge\//)) {
            // On Edge, having any secure turn (turns:...) URLs
            // cause an InvalidAccessError, preventing connections
            this._turnServers = this._turnServers.map (srv => {
                const urls = srv.urls.filter (url => {
                    // remove the turns: url
                    return !url.match (/^turns:/);
                });
                return Object.assign({}, srv, { urls: urls });
            });
        }
        this._socket.on ('media', (data: any) => {
            try {
                switch (data.type) {
                    case 'MS_RESPONSE': {
                        const cb = this._pending[data.meta.id];
                        delete this._pending[data.meta.id];
                        delete this._errors[data.meta.id];
                        cb && cb (data.payload);
                        break;
                    }
                    case 'MS_ERROR': {
                        const errb = this._errors[data.meta.id];
                        delete this._pending[data.meta.id];
                        delete this._errors[data.meta.id];
                        errb && errb (data.payload);
                        break;
                    }
                    case 'MS_NOTIFY': {
                        this._room.receiveNotification (data.payload);
                        break;
                    }
                }
            } catch (err) {
                console.log ('Error', err, 'handling', data);
            }
        });
        this._socket.on ('disconnect', () => {
            if (this._room) {
                this._room.leave ();
            }
        });
    }
    get isDeviceSupported () {
        return window.mediasoupClient.isDeviceSupported();
    }
    stopCapture () {
        for (const src in this._capturing) {
            if (this._capturing[src].cancel) {
                this._capturing[src].cancel ();
            }
            const stream = this._capturing[src].stream;
            if (stream) {
                for (const track of stream.getAudioTracks()) {
                    track.stop ();
                }
                for (const track of stream.getVideoTracks()) {
                    track.stop ();
                }
            }
        }
        this._capturing = {};
        this._connectProducer ('audio');
        this._connectProducer ('video');
    }
    capture () {
        this.stopCapture ();

        this._sendStream = this._sendStream || new MediaStream ();
        const constraints = {
            audio: true
        };
        navigator.mediaDevices.getUserMedia (constraints).then ((stream) => {
            this._capturing.gum = {
                stream: stream,
                audio: true
            };
            this._hookup (this._capturing.gum, this._sendStream!);
        }).catch ((err) => {
            alert (`Error getting media (error code: ${err.code})`);
        });
    }
    async pubsub (peerName: string, pub: boolean) {
        return new Promise ((resolve, reject) => {
            const kind = 'publish';
            this._room = new window.mediasoupClient.Room ({
                requestTimeout: 8000,
                turnServers: this._turnServers
            });
            this._room.on ('request', (request:any, callback:any, errback:any) => {
                if (!this._socket.connected) {
                    return errback (new Error ('Socket is not open'));
                }
                this._pending[++this._requestId] = callback;
                this._errors[this._requestId] = errback;
                this._socket.emit ('media', {
                    type: 'MS_SEND',
                    payload: request,
                    meta: {
                        id: this._requestId,
                        channel: this._roomName
                    }
                });
            });
            this._room.on ('notify', (notification:any) => {
                if (!this._socket.connected) {
                    console.log ('Socket is not open');
                    return;
                }
                this._socket.emit ('media', {
                    type: 'MS_SEND',
                    payload: notification,
                    meta: {
                        channel: this._roomName,
                        notification: true
                    }
                });
            });
            this._room.join (peerName).then ((peers:any) => {
                console.log ('Channel', this._roomName, 'joined with peers', peers);
                if (pub) {
                    this._transport = this._room.createTransport ('send');
                    this._maybeStream (this._sendStream!);
                    resolve ({ 
                        room: this._room, 
                        peers: peers 
                    });
                } else {
                    this._transport = this._room.createTransport ('recv');
                    // The server will only ever send us a single publisher.
                    // Stream it if it is new...
                    this._room.on('newpeer', (peer: any) => {
                        console.log('New peer detected:', peer.name);
                        this._setSource(this._startStream(peer));
                    });
                    // ... or if it already exists.
                    if (peers[0]) {
                        console.log('Existing peer detected:', peers[0].name);
                        this._setSource(this._startStream(peers[0]));
                    }
                }
            }).catch (reject);
        });
    }
    private _startStream(peer: any) {
        let stream = new MediaStream();
        const that = this;
        function addConsumer(consumer: any) {
            if (!consumer.supported) {
                console.log('consumer', consumer.id, 'not supported');
                return;
            }
            consumer.on('stats', that._showStats);
            consumer.enableStats(1000);
            consumer.receive(that._transport)
                .then(function receiveTrack(track: MediaStreamTrack) {
                    stream.addTrack(track);
                    consumer.on('close', function closeConsumer() {
                        // Remove the old track.
                        console.log('removing the old track', track.id);
                        that._clearStats(consumer.kind);
                        stream.removeTrack(track);
                        if (stream.getTracks().length === 0) {
                            // Replace the stream.
                            console.log('replacing stream');
                            stream = new MediaStream();
                            that._setSource(stream);
                        }
                    });
                }).catch(function onError(e: any) {
                    console.log('Cannot add track', e);
                });
        }
        // Add consumers that are added later...
        peer.on('newconsumer', addConsumer);
        peer.on('closed', function closedPeer() {
            that._setSource(stream);
        });
        // ... as well as the ones that were already present.
        for (var i = 0; i < peer.consumers.length; i ++) {
            addConsumer(peer.consumers[i]);
        }
        return stream;
    }
    private _setSource(stream: MediaStream) {
        const that = this;
        if (this._playStream && !stream) {
            try {
                if (this._playStream.stop) {
                    this._playStream.stop();
                }
                else if (this._playStream.getTracks) {
                    var tracks = this._playStream.getTracks();
                    for (var i = 0; i < tracks.length; i ++) {
                        tracks[i].stop();
                    }
                }
            } catch (e) {
                console.log('Error stopping stream', e);
            }
            this._playStream = null;
        }
    
        if (!stream) {
            if (this._mediaElement) {
                this._mediaElement.removeAttribute('src');
                try {
                    this._mediaElement.srcObject = null;
                } catch (e) {
                }
                this._mediaElement.style.background = 'blue';
                this._mediaElement.load();
            }
            return;
        }
    
        // We have an actual MediaStream.
        this._playStream = stream;
        this._whenStreamIsActive(function getStream() { return stream }, setSrc);
        function setSrc() {
            console.log('adding active stream');
            if (!that._mediaElement) {
                that._mediaElement = document.createElement ('audio');
                that._mediaElement.autoplay = true;
                document.body.appendChild (that._mediaElement);
            }
            that._mediaElement.style.background = 'black';
            try {
                that._mediaElement.srcObject = stream;
            } catch (e) {
                var url = (window.URL || window.webkitURL);
                if (url) {
                    that._mediaElement.src = url.createObjectURL(stream);
                }
            }
        }
    }
    private _hookup (capturing: any, newStream: MediaStream) {
        const vtrack = capturing.stream.getVideoTracks ();
        if (capturing.video && vtrack.length > 0) {
            for (const track of newStream.getVideoTracks()) {
                track.stop ();
            }
            newStream.addTrack (vtrack[0]);
        }
        const atrack = capturing.stream.getAudioTracks ();
        if (capturing.audio && atrack.length > 0) {
            for (const track of newStream.getAudioTracks ()) {
                track.stop ();
            }
            newStream.addTrack (atrack[0]);
        }
        this._maybeStream (newStream);
    }
    private _maybeStream (stream: MediaStream) {
        const that = this;
        if (!stream) {
            console.log ('no sending stream yet');
            return;
        }
        this._sendStream = stream;
        console.log ('streaming');
        function doConnects () {
            if (!stream) {
                return;
            }
            const atrack = stream.getAudioTracks ();
            const vtrack = stream.getVideoTracks ();
            function notEnded (track: MediaStreamTrack) {
                if (track.readyState === 'ended' && stream.removeTrack) {
                    stream.removeTrack (track);
                    return false;
                }
                return true;
            }
            that._connectProducer ('audio', atrack.find (notEnded));
            that._connectProducer ('video', vtrack.find (notEnded));
        }
        that._whenStreamIsActive (()=>{
            return stream;
        }, doConnects);
    }
    private _whenStreamIsActive (getStream: ()=>MediaStream, callback: ()=>void) {
        const that = this;
        const stream = getStream ();
        if (!stream) {
            return;
        }
        const id = stream.id;
        if (stream.active) {
            callback ();
        } else if ('onactive' in stream) {
            stream.onactive = maybeCallback;
        } else if (!this._streamActiveTimeout[id]) {
            maybeCallback ();
        }
        function maybeCallback () {
            delete that._streamActiveTimeout[id];
            const stream = getStream ();
            if (!stream) {
                return;
            }
            if (stream.onactive === maybeCallback) {
                stream.onactive = null;
            }
            if (!stream.active) {
                that._streamActiveTimeout[id] = setTimeout (maybeCallback, 500);
                return;
            }
            callback ();
        }
    }
    private _connectProducer (type: string, track?: any) {
        if (this._producers[type]) {
            if (this._room && track && this._lastProduced[type] === track.id) {
                return;
            }
            console.log ('Stop producing', type, this._producers[type].track.id);
            this._producers[type].close ();
            delete this._producers[type];
            delete this._lastProduced[type];
        }
        if (this._room && track) {
            console.log ('Producing', type, track.id);
            this._lastProduced[type] = track.id;
            const opts = type === 'video' ? { simulcast: true } : {};
            this._producers[type] = this._room.createProducer(track, opts);
            this._producers[type].on ('stats', this._showStats);
            this._producers[type].enableStats (1000);
            this._producers[type].send (this._transport);
            this._producers[type].on ('close', () => {
                this._clearStats (type);
            })
        }
    }
    private _showStats (s: any) {
        for (let i = 0; i < s.length; i++) {
            const o = s[i];
            console.log (`${o.type[0]}${o.mediaType}kBps: ${Math.round(o.bitrate/1024/8)}`);
        }
    }
    private _clearStats (kind: string) {
    }
}
