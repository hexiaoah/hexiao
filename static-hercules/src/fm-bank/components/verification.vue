<template>
    <section class="verification">
        <Shadow :visible="visible"></Shadow>
        <div class="container" v-show="visible">
             <img class="close-btn"  @click="close"  src="https://assets.2dfire.com/frontend/3f3daf505b90a52f8cf35f431db2fdb0.png" alt="">
             <div class="title">验证手机</div>
             <p class="notice1">发送短信验证码到银行预留手机</p>
             <p class="notice2">{{params.mobile | replaceNum}}</p>
             <p class="notice3">（本次提现不收取手续费）</p>
             <div class="code-wrap">
                 <input type="number" v-model="applyParams.validCode"  placeholder="输入6位验证码" class="code">
                 <Btn class="send-btn" :disabled="disabled" @click="getCode">{{text}}</Btn>
             </div>
             <p class="notice-text">{{notice}}</p>
           <div class="sure-btn">
                <Btn @click="sure">确认并提现{{moneyVal | number}}元</Btn>
           </div>
        </div>
    </section>
</template>

<script>
import Shadow from './mask-layer'
import Btn from './fire-button'
import API from '../config/api'
import tools from '../utils/tools'

export default {
  name: 'verification',
  components: {
    Shadow,
    Btn
  },
  props: {
    visible: false,
    moneyVal: ''
  },
  data() {
    return {
      text: '获取验证码',
      disabled: false,
      notice: '',
      params: {
        entityId: '',
        userNo: '',
        shopName: '',
        bankInfo: '',
        mobile: ''
      },
      applyParams: {}
    }
  },
  filters: {
    replaceNum: function(val) {
      return val.replace(/^(\d{3})\d{4}(\d+)/, '$1****$2')
    }
  },
  methods: {
    close() {
      this.applyParams.validCode = ''
      this.notice = ''
      this.$emit('update:visible', false)
    },
    resetCodeBut() {
      clearInterval(this.timer)
      this.text = '获取验证码'
      this.disabled = false
      this.t = 60
    },
    countDown() {
      this.t--
      if (this.t <= 0) {
        this.resetCodeBut()
      } else {
        this.text = `重新获取${this.t}s`
      }
    },
    // 能否获取验证码，依照倒计时秒数
    getCode() {
      // 先检查验证码输入错误次数
      const self = this
      API.getValidCodeErrTimes()
        .then(data => {
          if (data > 5) {
            self.$alert({
              confirmText: '我知道了',
              content: '由于验证码连续输入错误，提现暂不可用，请您明天再次尝试',
              confirm: function() {
                self.$emit('beyond')
                self.close()
              }
            })
          } else {
            self.sendCode()
          }
        })
        .catch(e => {})
    },
    sendCode() {
      const self = this
      if (this.text === '获取验证码') {
        const params = {
          entityId: '',
          userNo: '',
          shopName: '',
          bankInfo: '',
          mobile: ''
        }
        self.disabled = true
        API.sendValidCode(self.params)
          .then(res => {
            if (!res) {
              self.$toast('获取验证码失败')
              self.resetCodeBut()
            }
          })
          .catch(e => {
            self.resetCodeBut()
          })
        self.t = 60
        clearInterval(this.timer)
        self.countDown()
        self.timer = setInterval(self.countDown, 1000)
      }
    },
    sure() {
      const self = this
      const { validCode } = self.applyParams

      const amout = tools.divide(self.moneyVal, 0.01, 0)
      self.applyParams.amount = amout
      if (!validCode) {
        self.notice = '验证码不能为空'
        return false
      }
      API.merchantWithdrawApply(self.applyParams)
        .then(res => {
          console.log(res)
          const { resultCode, resultMsg } = res
          if (resultCode === '2004') {
            const { errTimes } = res
            if (errTimes >= 5) {
              self.close()
              self.$alert({
                confirmText: '我知道了',
                content:
                  '由于验证码连续输入错误，提现暂不可用，请您明天再次尝试',
                confirm: function() {
                  self.$emit('beyond')
                  self.close()
                }
              })
            } else {
              self.notice = `验证码输入错误，您还有${5 - errTimes}次机会`
            }
          } else if (resultCode === '0000') {
            self.$emit('apply-success')
            self.applyParams.validCode = ''
            self.notice = ''
          } else {
            self.$toast(resultMsg)
          }
        })
        .catch(e => {})
    }
  },
  created() {
    const shopName = sessionStorage.getItem('shopName')
    const dataStr = sessionStorage.getItem('currentAccount')
    if (dataStr) {
      const pageData = JSON.parse(dataStr)
      const {
        entityId,
        userNo,
        bankName,
        mobile,
        cardNo,
        accountType
      } = pageData
      this.params = {
        mobile,
        userNo,
        entityId,
        shopName,
        bankInfo: `${bankName} (${cardNo.substr(-4)})`
      }
      this.applyParams = {
        userNo,
        accountType,
        poundage: '0',
        amount: '',
        validCode: ''
      }
    }
  },
  mounted() {
    clearInterval(this.timer)
    window.addEventListener('hashchange', this.close)
  },
  destroyed() {
    window.removeEventListener('hashchange', this.close)
  }
}
</script>

<style lang="scss" scoped>
    .verification {
        .container {
            position: fixed;
            top: 50%;
            left: 50%;
            width: 540px;
            transform: translate(-50%, -50%);
            background-color: #fff;
            border-radius: 26px;
            font-size: 30px;
            text-align: center;
            z-index: 1001;
            height: 540px;
            .title {
                padding: 54px 30px 28px 0;
                font-weight: bold;
            }
            .notice1{
                font-size: 26px;
                color: #666666;
                margin-bottom: 12px;
            }
            .notice2{
                font-size: 44px;
                color: #333333;
                font-weight: bold;
                line-height: 56px;
            }
            .notice3{
                font-size: 22px;
                color: #999999;
                margin-bottom: 30px;
            }
            .code-wrap {
                padding:0 54px;
                display: flex;
                justify-content: space-between;
                .code{
                    width: 232px;
                    height: 60px;
                    border: 1PX solid #CCCCCC;
                    padding: 12px;
                    &::-webkit-input-placeholder { /* WebKit browsers */
                        color: #CCCCCC;
                        font-size: 26px;
                        line-height: 100px;
                    }
                }
                .send-btn{
                     width: 190px;
                    height: 60px;
                    font-size: 26px;
                    line-height: 60px;
                }
                
            }
            .notice-text{
                height: 60px;
                padding: 8px 54px 20px;
                text-align: left;
                color: #ff0033;
                font-size: 26px;
            }
            .sure-btn{
                    padding:0 30px;
                }
            .close-btn{
                position: absolute;
                width: 24px;
                height: 24px;
                top: 30px;
                right: 30px;
            }
            
        }
    }

</style>
