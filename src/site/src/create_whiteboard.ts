import './ui';
import './mod_mediasoup';
import * as wb from './whiteboard';
import * as lib from './catk';
import * as proto from '../../common/protocols/protolist';
import { SocketCommandServer } from './cmdserver/cmdserver';
import { MediaProducer } from './mod_mediasoup';

declare global {
    interface Window {
        mediasoupClient: any;
        mediaProducer: MediaProducer|null;
    }
}

export function init (uri: string) {
    const WB = new wb.WhiteBoard (document.querySelector('#playground-canvas') as HTMLCanvasElement, true);
    wb.installTools (WB);
    wb.installFactories (WB);
    let server: SocketCommandServer|null = null;


    if (uri) {
        server = new SocketCommandServer (WB, uri);
        server.start ();
    }

    const toolToolboxDiv: HTMLDivElement = document.querySelector('#toolbar-main') as HTMLDivElement;
    const subToolboxDiv: HTMLDivElement = document.querySelector('#toolbar-sub') as HTMLDivElement;
    const objPropGridDiv: HTMLDivElement = document.querySelector('#object-options') as HTMLDivElement;
    const toolPropGridDiv: HTMLDivElement = document.querySelector('#tool-options') as HTMLDivElement;
    const editor = new wb.WBEditor (WB, toolToolboxDiv, subToolboxDiv, objPropGridDiv, toolPropGridDiv);
    WB.on (wb.WBMessageEvent.type, (ev: wb.WBMessageEvent) => {
        if (ev.messageType === proto.MsgType.room_JoinRoomMessage) {
            $('#chat-list').chatList('addUser', {
                id: ev.messageData.user.userId,
                name: ev.messageData.user.name,
                icon: `/avatar/${ev.messageData.user.userId}`
            });
        } else if (ev.messageType === proto.MsgType.room_LeaveRoomMessage) {
            $('#chat-list').chatList('removeUser', ev.messageData.user.userId);
        } else if (ev.messageType === proto.MsgType.room_ListUsersMessage) {
            $('#chat-list').chatList('clear');
            for (const user of ev.messageData.users) {
                $('#chat-list').chatList('addUser', {
                    id: user.userId,
                    name: user.name,
                    icon: `/avatar/${user.userId}`
                });
            }
            if (!window.mediaProducer) {
                window.mediaProducer = new MediaProducer (server!.socket!, `room-${ev.messageData.roomId}`, ev.messageData.turnServers);
            }
                if (!window.mediaProducer.isDeviceSupported) {
                    alert ('WebRTC not supported on this device');
                } 
        }else if (ev.messageType === proto.MsgType.room_MediaOptionMessage) {
            const buttonCSS = {
                padding: '4px 4px'
            };
            $('#room-toolbar').toolbar ({
                iconWidth: 20,
                iconHeight: 20,
                groups: {
                    settings: {
                        tools: [{
                            id: 'tb-room-settings',
                            type: 'button',
                            styles: {
                                css: buttonCSS,
                                icon: '/images/settings.png',
                            },
                            callback: function (this:Element) {
                                console.log ('settings clicked');
                            }
                        }]
                    },
                    live: {
                        tools: [{
                            id: 'tb-live',
                            type: 'check',
                            radioGroup: 1,
                            disabled: !window.mediaProducer!.isDeviceSupported,
                            styles: {
                                css: buttonCSS,
                                icon: '/images/toolbar-select.png',
                            },
                            callback: function (this:Element, type) {
                                console.log (`live broadcast ${type}`);
                                navigator.mediaDevices.getUserMedia({audio:true}).catch (err => {
                                    alert (`打开音频输入设备失败：${err.message}`);
                                }).then (() => {
                                    navigator.mediaDevices.enumerateDevices().catch (err => {
                                        alert (`搜索音频输入设备失败：${err.message}`);
                                    }).then ((devices: void|MediaDeviceInfo[]) => {
                                        if (devices) {
                                            const deviceList = devices.filter(device => {
                                                return device.kind === 'audioinput' && device.deviceId !== 'default'
                                            }).map (device => {
                                                return {
                                                    id: device.deviceId,
                                                    label: device.label
                                                }
                                            });
                                            console.log (deviceList);
                                            if (deviceList.length === 0) {
                                                alert ('未找到音频输入设备');
                                            } else {
                                                $(this).toolbar('setStyle', 'tb-live', {
                                                    icon: type === 'selected' ? '/images/toolbar-undo.png' : '/images/toolbar-select.png'
                                                });
                                                const $popupSelectDevice = $('<div></div>').addClass(['modal']).appendTo ($('body'));
                                                const $dlg = $('<div></div>').addClass ('modal-dialog').appendTo($popupSelectDevice);
                                                const $dlgContent = $('<div></div>').addClass ('modal-content').appendTo ($dlg);
                                                const $dlgHeader = $('<div></div>').addClass ('modal-header').appendTo ($dlgContent);
                                                $('<h5></h5>').addClass('modal-title').html('请选择音频输入设备').appendTo ($dlgHeader);
                                                $('<button></button>').addClass('close').attr('type', 'button').attr('data-dismiss', 'modal').html('&times;').appendTo($dlgHeader);
                                                const $dlgBody = $('<div></div>').addClass ('modal-body').appendTo ($dlgContent);
                                                const $formGroup = $('<div></div>').addClass ('form-group').appendTo ($dlgBody);
                                                const $select = $('<select></select>').addClass ('form-control').appendTo ($formGroup);
                                                deviceList.forEach ((device, index) => {
                                                    const option = $('<option></option>').attr('value', device.id).html(device.label);
                                                    if (index === 0) {
                                                        option.attr('selected', 'selected');
                                                    }
                                                    option.appendTo ($select);
                                                });
                                                const $dlgFooter = $('<div></div>').addClass ('modal-footer').appendTo ($dlgContent);
                                                $('<button></button>').attr('type', 'button').addClass(['btn', 'btn-primary']).html('确定').appendTo($dlgFooter).on ('click', function(){
                                                    $popupSelectDevice.modal ('hide');
                                                });
                                                $('<button></button>').attr('type', 'button').addClass(['btn', 'btn-secondary']).html('取消').appendTo($dlgFooter).on ('click', function(){
                                                    $popupSelectDevice.modal ('hide');
                                                });
                                                $popupSelectDevice.modal ({
                                                    show: false
                                                });
                                                $popupSelectDevice.on ('hidden.bs.modal', function(){
                                                    $(this).remove ();
                                                });
                                                $popupSelectDevice.on ('show.bs.modal', function (){
                                                    $(this).each (function (i) {
                                                        const $clone:any = $(this).clone().css('display','block').appendTo('body');
                                                        let top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
                                                        top = top > 0 ? top : 0;
                                                        $clone.remove ();
                                                        $(this).find('.modal-content').css('margin-top', top);
                                                    });
                                                });
                                                $popupSelectDevice.modal ('show');
                                            }
                                        }
                                    });                                    
                                });
                            }
                        }]
                    }
                }
            });
            if (!window.mediaProducer) {
                window.mediaProducer = new MediaProducer (server!.socket!, `room-${ev.messageData.roomId}`, ev.messageData.turnServers);
                if (!window.mediaProducer.isDeviceSupported) {
                    alert ('WebRTC not supported on this device');
                } else {
                    window.mediaProducer.pubsub (`peer-${ev.messageData.userId}`, ev.messageData.publish).then (function () {
                        if (ev.messageData.publish) {
                            window.mediaProducer!.capture ();
                        }
                    });
                }
            }
        }
    });

    $('#chat-list').chatList ({
        name: '测试教室'
    });
/*
    WB.on (wb.WBObjectSelectedEvent.type, (ev: wb.WBObjectSelectedEvent) => {
        if (ev.object) {
            editor.objectPropertyGrid && editor.objectPropertyGrid.loadObjectProperties (ev.object);
        }
    });
    WB.on (wb.WBObjectDeselectedEvent.type, (ev: wb.WBObjectDeselectedEvent) => {
        if (ev.object) {
            editor.objectPropertyGrid && editor.objectPropertyGrid.loadObjectProperties (ev.object);
        }
    });
    WB.on (wb.WBToolActivateEvent.type, (ev: wb.WBToolActivateEvent) => {
        editor.toolPropertyGrid && editor.toolPropertyGrid.loadToolProperties (ev.tool);
    });
    WB.on (wb.WBToolDeactivateEvent.type, (ev: wb.WBToolDeactivateEvent) => {
        editor.toolPropertyGrid && editor.toolPropertyGrid.clear ();
    });
*/
    lib.App.run ();
}