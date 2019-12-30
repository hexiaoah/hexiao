<script>
const router = require('@2dfire/utils/router')
const cookie = require('@2dfire/utils/cookie')
const langZh = require('./lang/zh')
let isPortrait = true
let supportOrientation =
  typeof window.orientation === 'number' &&
  typeof window.onorientationchange === 'object'
import { mapState, mapGetters, mapActions } from 'vuex'
import { isRestApp, createAndroidBridge } from '../base/utils/tool'
module.exports = {
  data() {
    return {
      token: '',
      isPortrait: isPortrait,
      title: '微信支付特约商户',
      noLine: false,
      isShow: true,
      routerPath: '/index',
      canEditUserInfo: false
    }
  },
  components: {
    dialogs: require('base/components/dialogs/index.vue'),
    TopHeader: require('./components/top-header.vue')
  },
  methods: {
    init() {
      this.token = router.route.query['token'] || ''
      // 小微项目 在掌柜端需要去除头部
      this.isShow = !isRestApp()
    },
    setToken() {
      if (this.token) {
        cookie.setItem('token', this.token)
      }
    },
    updateOrientation() {
      let self = this
      if (supportOrientation) {
        let orientation = window.orientation
        switch (orientation) {
          case 90:
          case -90:
            self.isPortrait = false
            break
          default:
            self.isPortrait = true
            break
        }
      } else {
        if (window.innerWidth > window.innerHeight) {
          console.log('横屏')
          self.isPortrait = false
        } else {
          console.log('竖屏')
          self.isPortrait = true
        }
      }
    },
    orientation() {
      let self = this
      if (supportOrientation) {
        // window.addEventListener('orientationchange', self.updateOrientation(), false);
        window.onorientationchange = function() {
          let orientation = window.orientation
          switch (orientation) {
            case 90:
            case -90:
              self.isPortrait = false
              break
            default:
              self.isPortrait = true
              break
          }
        }
      } else {
        //监听resize事件
        // window.addEventListener('resize', self.updateOrientation(), false);
        window.onresize = function() {
          if (window.innerWidth > window.innerHeight) {
            console.log('横屏')
            self.isPortrait = false
          } else {
            console.log('竖屏')
            self.isPortrait = true
          }
        }
      }
      self.updateOrientation()
    },
    clickKeyDown() {
      let self = this
      window.clickKeyDown = function() {
        if (
          self.routerPath === '/index' ||
          self.routerPath === '/input/second/second' ||
          self.routerPath === '/input/third/third' ||
          self.routerPath === '/input/fourth/fourth' ||
          self.routerPath === '/merchants/fourth/fourth'
        ) {
          window.tdfire.closeWebView()
        } else if (self.routerPath === '/input/first/first') {
          if (self.merchantInfoString !== JSON.stringify(self.merchantInfo)) {
            self.$confirm({
              // 这个是fire-ui中的组件
              content: '有信息修改，是否退出',
              confirm: () => {
                window.tdfire.closeWebView()
              }
            })
          } else {
            window.tdfire.closeWebView()
          }
        } else if (self.routerPath == '/merchants/first/first') {
          if (self.merchantInfo.xwUpgradeChanged == true) {
            self.$confirm({
              content: '有信息修改，是否退出',
              confirm: () => {
                self.$router.replace({ path: '/input/fourth/fourth' })
              }
            })
          } else {
            self.$router.replace({ path: '/input/fourth/fourth' })
          }
        } else if (
          self.routerPath == '/merchants/second/second' ||
          self.routerPath == '/merchants/third/third'
        ) {
          self.$router.replace({ path: '/input/fourth/fourth' })
        } else {
          window.history.back()
        }
      }
    },
    getRestAppSetting() {
      createAndroidBridge()
      const self = this
      if (tdfire.requirePlugins) {
        eval(tdfire.requirePlugins(['observe']))
      }
      window.tdfire.observe(function(data) {
        const routerPath = self.$route.path
        if (data && data.type === 'left') {
          if(routerPath === '/index' || routerPath === '/input/second/second' || routerPath === '/input/third/third' || routerPath === '/input/fourth/fourth' || routerPath === '/merchants/fourth/fourth') {
            window.location.href='./alipay-agent.html#/redirect'
          } else if (routerPath === '/input/first/first') {
            if (self.merchantInfoString !== JSON.stringify(self.merchantInfo)) {
              self.$confirm({
                // 这个是fire-ui中的组件
                content: '有信息修改，是否退出',
                confirm: () => {
                  window.history.back()
                }
              })
            } else {
              window.history.back()
            }
          } else if (self.routerPath == '/merchants/first/first') {
            if (self.merchantInfo.xwUpgradeChanged == true) {
              self.$confirm({
                content: '有信息修改，是否退出',
                confirm: () => {
                  self.$router.replace({ path: '/input/fourth/fourth' })
                }
              })
            } else {
              self.$router.replace({ path: '/input/fourth/fourth' })
            }
          } else if(routerPath === '/merchants/second/second' 
                    || routerPath === '/merchants/third/third') {
            self.$router.replace({path: '/input/fourth/fourth'})
          } else {
            window.history.back()
          }
        }
      })
    }
  },
  created() {
    this.init()
    this.setToken()
    this.orientation()
    if (!isRestApp()) {
      this.clickKeyDown()
    } else {
      // 掌柜环境中
      this.getRestAppSetting()
    }
  },
  watch: {
    $route(newval) {
      let self = this
      let pageTitle = langZh.default.pageTitle
      let arr = Object.keys(pageTitle)
      console.log(newval, 'newval')
      // 注 代码没有看懂 为啥有个foreach？
      arr.forEach(item => {
        if (newval.path === item) {
          self.canEditUserInfo = false
          self.title = pageTitle[`${item}`]
          self.routerPath = newval.path
          if (item === '/merchantinfo') {
            // 查看商户信息页面展示右上角的修改按钮
            console.log('lai l  laodi', isRestApp())
            // 云收银是h5自带的headerBar  掌故是自带了 headerBar 则在掌柜环境中去掉h5 headerBar
            if (
              self.$route.query.canEditInfo === true ||
              self.$route.query.canEditInfo === 'true'
            ) {
              self.canEditUserInfo = true
            } else {
              self.canEditUserInfo = false
            }
          }
        }
      })
    }
  },
  computed: {
    ...mapState(['merchantInfo', 'merchantInfoString'])
  }
}
</script>

<template>
    <div id="wrapper" :class="['wrapper router-view']">
        <div v-show="isPortrait">
            <dialogs></dialogs>
            <top-header v-if="isShow" :class="{ 'no_line': noLine}" :title="title" :showEdit="canEditUserInfo"></top-header>
            <router-view :class="['position',{hastop:isShow}]"></router-view>
        </div>
        <div class="portrait-tip" v-show="!isPortrait">
            请在竖屏体验
        </div>
    </div>
</template>

<style src="../base/styles/index.scss" lang="scss"></style>

<style lang="scss" scoped>
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

.isindustry {
    background: rgba(249, 249, 249, 0.90);
}

.no_line{
    border: none;
}
</style>
