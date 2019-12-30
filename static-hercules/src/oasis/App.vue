<script>
    let isPortrait = true;
    let supportOrientation = (typeof window.orientation === 'number' && typeof window.onorientationchange === 'object');

    module.exports = {
        data() {
            return {
                token: '',
                isPortrait: isPortrait
            }
        },
        components: {
            'dialogs': require('base/components/dialogs/index.vue')
        },
        methods: {
            updateOrientation() {
                let self = this;
                if (supportOrientation) {
                    let orientation = window.orientation;
                    switch (orientation) {
                        case 90:
                        case -90:
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
                            case -90:
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
        },
        created() {
            this.orientation();
        }
    };
</script>

<template>
    <div id="wrapper" class="wrapper">
        <div v-show="isPortrait">
            <dialogs></dialogs>
            <router-view></router-view>
        </div>
        <div class="portrait-tip" v-show="!isPortrait">
            请在竖屏体验
        </div>
    </div>
</template>

<style src="../base/styles/index.scss" lang="scss"></style>

<style type="text/scss" lang="scss" scoped>
    .portrait-tip {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
</style>
