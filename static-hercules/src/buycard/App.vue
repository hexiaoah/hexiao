<script>
const router = require("@2dfire/utils/router");
const cookie = require("@2dfire/utils/cookie");
let token = router.route.query["token"] || "";
let isPortrait = true;
let supportOrientation = (typeof window.orientation === 'number' && typeof window.onorientationchange === 'object');

module.exports = {
    data() {
        return { 
            token: token,
            isPortrait: isPortrait
         }
    },
    components: {
        'dialogs': require('base/components/dialogs/index.vue')
    },
    methods: {
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
    },
    created() {
        this.setToken();
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

<style src="./styles/index.scss" lang="scss"></style>

<style lang="scss" scoped>
.portrait-tip {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
}
</style>
<style>
@media (min-width: 320PX) {
  html {
      font-size: 16PX
  }
}

@media (min-width: 360PX) {
  html {
      font-size: 18PX
  }
}

@media (min-width: 375PX) {
  html {
      font-size: 18.75PX
  }
}

@media (min-width: 414PX) {
  html {
      font-size: 20.7PX
  }
}
</style>

