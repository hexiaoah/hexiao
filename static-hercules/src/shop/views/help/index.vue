<template>
  <div class="container">
    <div class="download">
      <analysis-click>
        <open-app :options="openAppOptions">
          <a class="download-but"></a>
        </open-app>
      </analysis-click>
    </div>
    <!--助力-->
    <img class="bg-img" src="../../images/bg01.jpg" alt="">
    <img class="bg-img" src="../../images/tip/tip-1.jpg" alt="">
    <img class="bg-img" src="../../images/tip/tip-2.jpg" alt="">
    <img class="bg-img" src="../../images/tip/tip-3.jpg" alt="">
    <img class="bg-img" src="../../images/tip/tip-4.jpg" alt="">
    <img class="bg-img" src="../../images/tip/tip-5.jpg" alt="">
    <img class="bg-img" src="../../images/tip/tip-6.jpg" alt="">
    <img class="bg-img" src="../../images/tip/tip-7.jpg" alt="">
    <img class="bg-img" src="../../images/tip/tip-8.jpg" alt="">
    <img class="bg-img" src="../../images/tip/tip-9.jpg" alt="">
    <img class="bg-img" src="../../images/tip/tip-10.jpg" alt="">
    <img class="bg-img" src="../../images/tip/tip-11.jpg" alt="">
    <div class="item help-action" v-if="!status">
      <input
          type="tel"
          pattern="[0-9]*"
          class="phone"
          v-model="phone"
          maxlength="11"
          placeholder="请输入手机号"
      >
      <div class="code-content">
        <span class="code-input">
          <input
              type="text"
              v-model="auth_code"
              maxlength="6"
              placeholder="请输入验证码"
          >
        </span>
        <span class="code-but" :class="{disabled:disabled}" @click="getCode">{{text}}</span>
      </div>
      <div class="help-but" @click="checkCode"></div>
    </div>
    <!--助力成功，我也要开店-->
    <div class="item help-success" v-if="status===1">
      <div class="help-success-text">
        <p>助力成功</p>
        <p>您的好友已获得二维火收银5天试用时间，</p>
        <p>在三个月免费试用期结束后可继续使用5天。</p>
      </div>
      <analysis-click>
        <open-app :options="openAppOptions">
          <span class="set-up-shop">我也要开店</span>
        </open-app>
      </analysis-click>
    </div>
    <!--您已经帮好友助力过了-->
    <div class="item help-already" v-if="status===2">
      <div class="help-already-text">
        <p>您已经帮好友助力过了，</p>
        <p>未助力的新号码才能帮忙完成本次助力，</p>
        <p>您可通过开店帮好友的店铺再增加30天试用时间！</p>
      </div>
      <analysis-click>
        <open-app :options="openAppOptions">
          <span class="set-up-shop">立即开店</span>
        </open-app>
      </analysis-click>
    </div>
  </div>
</template>
<script>
import Api from '../../api'
import { getQuery } from '../../../base/utils/tool'
const { activity_id } = getQuery()
export default {
  data() {
    return {
      phone: '',
      auth_code: '',
      status: 0,
      text: '获取验证码',
      mask: true,
      disabled: true,
      openAppOptions: {
        schemaurl: 'tdf-cloudcash://2dfire.com/app/mainActivity',
        iosdlurl:
          'https://itunes.apple.com/cn/app/%E4%BA%8C%E7%BB%B4%E7%81%AB%E6%8E%8C%E6%9F%9C/id900873713?mt=8',
        androiddlurl: 'http://www.2dfire.com/downloadService.html'
      }
    }
  },
  watch: {
    phone() {
      this.disabled = this.phone.length !== 11
    }
  },
  methods: {
    toast(t) {
      this.$toast.center(t)
    },
    isPhone() {
      return /^1\d{10}$/.test(this.phone)
    },
    countDown() {
      this.t--
      if (this.t <= 0) {
        this.text = '获取验证码'
        this.t = 60
        clearInterval(this.timer)
      } else {
        this.text = `重新获取${this.t}s`
      }
    },
    resetCodeBut() {
      clearInterval(this.timer)
      this.text = '获取验证码'
      this.t = 60
    },
    //获取验证码
    getCode() {
      const self = this
      if (this.text === '获取验证码') {
        if (!this.isPhone()) {
          return this.toast('请正确填写手机号码')
        }
        const codeLocation = Date.now() + ''
        sessionStorage.setItem('codeLocation', codeLocation)
        Api.getVerCode({
          param: JSON.stringify({
            appKey: '200017',
            countryCode: '+86',
            phone: this.phone,
            location: codeLocation,
            event: '好友助力',
            validMin: 10,
            length: 4
          })
        })
          .then(res => {
            if (!res.data) {
              self.toast('获取验证码失败')
              self.resetCodeBut()
            }
          })
          .catch(e => {
            const { message } = e.result || {}
            self.resetCodeBut()
            self.toast(message)
          })
        this.t = 60
        clearInterval(this.timer)
        this.countDown()
        this.timer = setInterval(this.countDown, 1000)
      }
    },
    //校验验证码
    checkCode() {
      const self = this
      const { phone, auth_code } = this
      const codeLocation = sessionStorage.getItem('codeLocation')
      if (!this.isPhone()) {
        return this.toast('请正确填写手机号码')
      }
      if (!auth_code.trim() || !codeLocation) {
        return this.toast('验证码错误')
      }
      Api.verifyCCode({
        param: JSON.stringify({
          appKey: '200017',
          countryCode: '+86',
          phone,
          location: codeLocation
        }),
        auth_code
      })
        .then(res => {
          if (res.data.result) {
            self.help()
          } else {
            self.resetCodeBut()
            self.toast('验证码错误')
          }
        })
        .catch(e => {
          self.resetCodeBut()
          self.toast('验证码错误')
        })
    },
    help() {
      const self = this
      const { phone } = this
      Api.help({
        phone,
        activity_id,
        timestamp: Date.now()
      })
        .then(() => {
          this.status = 1
        })
        .catch(e => {
          const { errorCode, message } = e.result || {}
          if (errorCode === 'ERR_CLC108') {
            return (this.status = 2)
          } else {
            self.resetCodeBut()
            this.toast(message)
          }
        })
    },
    closeMask() {
      this.mask = false
    },
    setUpShop() {
      // openApp()
    }
  },
  components: {},
  created() {
    sessionStorage.removeItem('codeLocation')
  },
  mounted() {
    clearInterval(this.timer)
  }
}
</script>
<style lang="scss" scoped src="./style.scss">
</style>
