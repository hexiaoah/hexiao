<script>
const router = require("@2dfire/utils/router");
const cookie = require("@2dfire/utils/cookie");
let isPortrait = true;
let supportOrientation = (typeof window.orientation === 'number' && typeof window.onorientationchange === 'object');
import {
     mapState,
     mapActions
} from 'vuex'

module.exports = {
    data() {
        return { 
            token: '',
            isPortrait: isPortrait,
            title:'员工管理',
            routerPath: '/staffmanage',
         }
    },
    components: {
        'dialogs': require('base/components/dialogs/index.vue'),
        'TopHeader': require('./components/top-header.vue'),
    },
    methods: {
        ...mapActions(['modifyShowSaveButton' ,'changeInfo']),
        init(){
             this.token = router.route.query["token"] || "";
        },
        setToken() {
            if (this.token) {
                cookie.setItem("token", this.token);
            }
        },
        updateOrientation() {
            let self = this;
            if (supportOrientation) {
                let orientation = window.orientation;
                switch (orientation) {
                    case 90:
                    case - 90:
                        self.isPortrait = false;
                        break;
                    default:
                        self.isPortrait = true;
                        break;
                }
            } else {
                if (window.innerWidth > window.innerHeight) {
                    console.log("横屏");
                    self.isPortrait = false;
                } else {
                    console.log("竖屏");
                    self.isPortrait = true;
                }
            }
        },
        orientation() {
            let self = this;
            if (supportOrientation) {
                // window.addEventListener('orientationchange', self.updateOrientation(), false);
                window.onorientationchange = function () {
                    let orientation = window.orientation;
                    switch (orientation) {
                        case 90:
                        case - 90:
                            self.isPortrait = false;
                            break;
                        default:
                            self.isPortrait = true;
                            break;
                    }
                };
            } else {
                //监听resize事件
                // window.addEventListener('resize', self.updateOrientation(), false);
                window.onresize = function () {
                    if (window.innerWidth > window.innerHeight) {
                        console.log("横屏");
                        self.isPortrait = false;
                    } else {
                        console.log("竖屏");
                        self.isPortrait = true;
                    }
                };
            }
            self.updateOrientation();
        },
        clickKeyDown() {
            let self = this;
            window.clickKeyDown = function() {
                if(self.routerPath === '/staffmanage') {
                    window.tdfire.closeWebView()
                } else if(self.routerPath === 'addstaff') {
                    if(self.isShowSaveButton) {  // 添加员工页面表单内容修改了
                        self.$confirm({
                            content: '内容有变更尚未保存，确定要退出吗？',
                            confirm: () => {
                            window.history.back() 
                            }
                        })
                    } else {
                        window.history.back()
                    }
                }  else {
                    window.history.back()
                }
            }
        }
    },
    created() {
        this.init();
        this.setToken();
        this.orientation();
        this.clickKeyDown();
    },
    watch: {
        '$route'(newval) {
            let self = this
            self.modifyShowSaveButton(false)  // 路由变化的时候更改top-header为返回按钮
            let pageTitle = self.pageTitle
            let arr = Object.keys(pageTitle)
            arr.forEach(item => {
                if (newval.path === item) {
                    self.title = pageTitle[item]
                    self.routerPath = newval.path
                    if(item != '/staffinfo') {
                        self.changeInfo({type: 'staffInfoTitle', value: '员工'})
                    }
                    if(item != '/addstaff') {
                        self.changeInfo({type: 'addStaffTitle', value: '添加员工'})
                    }
                }
            })
        },
        staffInfoTitle(newval) {
            if(this.routerPath === '/staffinfo') {
                this.title = newval
            }
        },
        addStaffTitle(newval) {
            if(this.routerPath === '/addstaff') {
                this.title = newval
            }
        }
    },
    computed: {
        ...mapState([
            'pageTitle',
            'staffInfoTitle',
            'addStaffTitle',
            'isShowSaveButton',
        ])
    },
};
</script>

<template>
    <div id="wrapper" :class="['wrapper router-view']">
        <dialogs></dialogs>
        <top-header :title="title"></top-header>
        <router-view class="hastop position"></router-view>
    </div>
</template>

<style src="../base/styles/index.scss" lang="scss"></style>

<style lang="scss" scoped>

.wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-repeat: repeat-y;
    background-size: cover;
    background-position: center;
    background-color: rgba(255, 255, 255, 0.9);
    -webkit-overflow-scrolling: touch;
}

.portrait-tip {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
}

.hastop {
    padding-top: 88px;
}

.position {
    position: relative;
}
</style>
