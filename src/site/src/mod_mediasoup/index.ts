// openteaching:bigsail
// md5: 0xbb3936683736accd8241f3abb31b6c29
declare global {
    interface Window {
        mediasoupClient: any;
        webkitURL: any;
        AgoraRTC: any;
    }
}

export interface DeviceInfo {
    deviceId: string;
    deviceName: string;
}

export class MediaProducer {
    private _publish: boolean;
    private _peerName: string;
    private _roomName: string;
    private _client: any;
    private _joined: boolean;
    private _publishing: boolean;
    private _localStream: any;
    constructor (roomName: string, publish: boolean, peerName: string) {
        this._roomName = roomName;
        this._publish = publish;
        this._peerName = peerName;
        this._joined = false;
        this._localStream = null;
        this._publishing = false;
        this._client = window.AgoraRTC.createClient({mode: 'live'});
        this._client.init ('75832b52499b478287274f413804aa27', () => {
            console.log ('AgoraRTC client initialized');
            this._client.join (null, this._roomName, this._peerName, (uid:string) => {
                this._joined = true;
                console.log (`User ${uid} joined to channel ${this._roomName}`);
                this._client.on ('stream-added', (evt:any) => {
                    const stream = evt.stream;
                    console.log (`new stream added: ${stream.getId()}`);
                    this._client.subscribe (stream, (err:any) => {
                        console.log (`subscribe stream failed: ${err}`);
                    });
                });
                this._client.on ('stream-subscribed', (evt:any) => {
                    const stream = evt.stream;
                    console.log (`subscribe remote stream succeeded: ${stream.getId()}`);
                    const elementId = `remote-audio-${stream.getId()}`;
                    let audioContainer = document.getElementById (elementId);
                    if (!audioContainer) {
                        audioContainer = document.createElement ('div');
                        audioContainer.setAttribute ('id', elementId);
                        document.body.appendChild (audioContainer);
                    }
                    stream.play (elementId);
                });
                this._client.on ('stream-removed', (evt:any) => {
                    const stream = evt.stream;
                    console.log (`remote stream removed: ${stream.getId()}`);
                    stream.stop ();
                    const elementId = `remote-audio-${stream.getId()}`;
                    let audioContainer = document.getElementById (elementId);
                    if (audioContainer) {
                        audioContainer.remove ();
                    }
                });
            });
        });
    }
    static isDeviceSupported () {
        return !!window.AgoraRTC.checkSystemRequirements();
    }
    async join () {
        return new Promise ((resolve, reject) => {
            if (this._client) {
                if (!this._joined) {
                    this._client.join (null, this._roomName, this._peerName, (uid:string) => {
                        this._joined = true;
                        resolve ();
                    }, (err:any) => {
                        reject (new Error(err));
                    });
                } else {
                    resolve ();
                }
            } else {
                reject (new Error('AgoraRTC client is nulll'));
            }
        });
    }
    async leave () {
        return new Promise ((resolve, reject) => {
            if (this._client) {
                if (this._joined) {
                    this._client.leave (()=>{
                        resolve ();
                    }, (err:any)=>{
                        reject (new Error(err));
                    });
                } else {
                    resolve ();
                }
            } else {
                reject (new Error('AgoraRTC client is null'));
            }
        });
    }
    async publish () {
        return new Promise ((resolve, reject) => {
            if (!this.isPresenter ()) {
                reject (new Error('Only presenter can publish'));
            } else if (!this._publishing) {
                if (!this._localStream) {
                    this._localStream = window.AgoraRTC.createStream ({
                        streamID: this._peerName,
                        audio: true,
                        video: false,
                        screen: false
                    });
                    this._localStream.on ('accessAllowed', () => {
                        console.log ('accessAllowed');
                    });
                    this._localStream.on ('accessDenied', () => {
                        console.log ('accessDenied');
                    });
                    this._localStream.init (()=>{
                        console.log ('local stream initialized');
                        this._client.publish (this._localStream, (err:any) => {
                            reject (new Error(`publish local stream failed with error: ${err}`));
                        });
                        this._client.on ('stream-published', (evt:any) => {
                            console.log ('local stream successfully published');
                            this._publishing = true;
                            resolve ();
                        });
                    });
                } else {
                    this._client.publish (this._localStream, (err:any) => {
                        reject (new Error(`publish local stream failed with error: ${err}`));
                    });
                    this._client.on ('stream-published', (evt:any) => {
                        console.log ('local stream successfully published');
                        this._publishing = true;
                        resolve ();
                    });
                }
            } else {
                resolve ();
            }
        });
    }
    async unpublish () {
        return new Promise (resolve => {
            if (this._client && this._publishing && this._localStream) {
                this._client.unpublish (this._localStream, (err:any) => {
                    console.log (`unpublish failed with error: ${err}`);
                });
            }
            this._publishing = false;
            resolve ();
        });
    }
    isPresenter () {
        return this._publish;
    }
    get joined () {
        return this._joined;
    }
    get publishing () {
        return this._publishing;
    }
    async getAudioInputDevices (): Promise<DeviceInfo[]> {
        return new Promise((resolve, reject) => {
            window.AgoraRTC.getDevices((devices:any) => {
                const deviceList: DeviceInfo[] = [];
                for (let i = 0; i < devices.length; i++) {
                    const device = devices[i];
                    if (device.kind === 'audioinput' && device.deviceId !== 'default') {
                        deviceList.push ({
                            deviceId: device.deviceId,
                            deviceName: device.label || `microphone${i+1}`
                        });
                    }
                }
                resolve (deviceList);
            }, (err:string)=>{
                reject (new Error(err));
            });
        });
    }
}
