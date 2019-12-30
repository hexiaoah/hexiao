<template>
    <div class="login ">
        <div v-bind:class='show_type'>
            <div class="main" v-bind:class='type[showState].className'>
                <div class="code" id="code" v-on:click="refresh">
                    <div class="code-hint-img" v-if="showState!=='NO_SCAN'"></div>
                    <qriously v-if="value" v-bind:value="value" :size="400"/>
                </div>

                <div class="hint">
                    <p class="text1">{{type[showState].text1}}</p>
                    <p class="text2">{{type[showState].text2}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import socket from '@2dfire/socket';
import Timer from '../js/interval';

const http = require('base/requester');
import API from '../config/api';
let isDisconnect = true;//是否断开连接
let timer = new Timer();
export default {
    data() {
        return {
            value: '', //二维码值
            s_os: this.$route.query.s_os || 'h5', // h5（默认、缺省值）、ios、android
            show_type:
                this.$route.query.show_type === '2'
                    ? 'only-code'
                    : 'login-wrapper', //1默认（缺省值），2只显示二维码
            showState: 'NO_SCAN', //显示方式，-1 ERROR 异常状态, 0 NO_SCAN 未扫描, 1 HAVE_SEAN 已扫描, 2 LOGIN已登录,
            type: {
                NO_ONLINE: {
                    text1: '网络连接已断开',
                    text2: '请检查你的网络设置',
                    className: 'type_none'
                },
                NO_SCAN: {
                    text1: '请登录二维火掌柜APP',
                    text2: '打开左侧栏“扫一扫”功能登录',
                    className: ''
                },
                HAVE_SEAN: {
                    text1: '扫描成功',
                    text2: '请在二维火掌柜上点击确认以登录',
                    className: 'type_ok'
                },
                LOGIN: {
                    text1: '登录成功',
                    text2: '',
                    className: 'type_ok'
                },
                ERROR: {
                    text1: '未知原因扫描失败',
                    text2: '请重新尝试扫描',
                    className: 'type_none'
                }
            }
        };
    },
    methods: {
        /**
         * Socket初始化
         * @param value 二维码id str
         * */
        initSocket(value) {
            let self = this;
            const io = window.io;
            // 必须先init socket,全局仅一次
            socket.init(
                io(API.getSocketUrl() + '/boss_ws', {
                    query: 'scanId=' + value,
                    transports: ['websocket']
                })
            );
            //扫描之后监听
            socket.on('scan_login', ret => {
                // console.log('===========**   scan_login   **=====================')
                switch (ret.status) {
                    case 0:
                        self.value = ret.data;
                        self.showState = 'NO_SCAN';
                        break;
                    case -1:
                        self.showState = 'ERROR';
                        timer.clear();
                        break;
                    case 1:
                        self.showState = 'HAVE_SEAN';
                        self.type.HAVE_SEAN.text2 = `请在${ret.scanApp}上点击确认以登录`;
                        timer.clear();
                        break;
                    case 2:
                        self.showState = 'LOGIN';
                        self.toLogin(ret);
                        break;
                    default:
                        self.showState = 'ERROR';
                        timer.clear();
                }
                if (window.tdfWebBridge) {
                    window.tdfWebBridge.scanTypeDes(
                        self.type[self.showState].text1,
                        self.type[self.showState].text2
                    );
                }
            });
            //监听断开连接事件
            socket.on('disconnect', function () {
                isDisconnect = false;
                setTimeout(() => {
                    if (isDisconnect) {
                        return false;
                    }
                    self.isNoOnLine('socket');
                }, 3000)
            });
            //监听重新建立连接事件
            socket.on('reconnect', function () {
                isDisconnect = true;
                self.showState = 'NO_SCAN';
                timer.init(self.getData);
                if (self.$route.query.show_type === '2' && window.tdfWebBridge && window.tdfWebBridge.socketState) {
                    window.tdfWebBridge.socketType('SUCCESS');
                }
            });
        },
        /**
         * 判断错误原因是没网还是异常
         * */
        isNoOnLine(type) {
            let self = this;
            if (navigator && navigator.onLine === false) {
                self.showState = 'NO_ONLINE';
            } else {
                self.showState = 'ERROR';
            }
            timer.clear();
            if (self.$route.query.show_type === '2') {
                if (window.tdfWebBridge) {
                    if (window.tdfWebBridge.scanTypeDes) {
                        window.tdfWebBridge.scanTypeDes(self.type[self.showState].text1, self.type[self.showState].text2)
                    }
                    if (window.tdfWebBridge.socketState) {
                        if (type === 'socket') {
                            window.tdfWebBridge.socketState('SOCKET_ERR');
                        } else if (type === 'ajax') {
                            window.tdfWebBridge.socketState('AJAX_ERR');
                        }
                    }
                }
            }
            setTimeout(() => {
                if (!isDisconnect) {
                    window.location.reload();
                }
            }, 10000)
        },
        /**
         * 去登陆
         * @param ret socket返回数据
         * */
        toLogin(ret) {
            const callback_type = this.$route.query.callback_type || '1';
            if (callback_type === '2') {
                if (window.tdfWebBridge) {
                    window.tdfWebBridge.scanLogin(ret.token);
                }
            } else {
                window.location.href = ret.callback;
            }
        },
        /**
         * 获取数据
         * */
        getData() {
            let self = this;
            API.getScanCode({
                biz_app_key: self.$route.query.biz_app_key || '200004'
            }).then(
                ret => {
                    window.sessionStorage.setItem('scan_uid', ret.uid);
                    const code = ret.uid;
                    if (!self.value) {
                        self.initSocket(code);
                        if (self.$route.query.show_type === '2') {
                            setTimeout(function() {
                                if (window.tdfWebBridge) {
                                    window.tdfWebBridge.scanTypeDes(
                                        self.type[self.showState].text1,
                                        self.type[self.showState].text2
                                    );
                                }
                            }, 500);
                        }
                    } else {
                        // 不需创建socket,直接开始使用
                        socket.emitServer('refresh_qr_code', code);
                        if (self.$route.query.show_type === '2') {
                            if (window.tdfWebBridge) {
                                window.tdfWebBridge.scanTypeDes(
                                    self.type[self.showState].text1,
                                    self.type[self.showState].text2
                                );
                            }
                        }
                    }
                    self.value = ret.url || '';
                },
                response => {
                    self.isNoOnLine();
                }
            );
        },
        refresh() {
            timer.init(this.getData);
        }
    },
    components: {},
    created() {
        timer.init(this.getData);
    }
};
</script>
<style type="text/scss" lang="scss">
@import '../styles/index';
</style>
