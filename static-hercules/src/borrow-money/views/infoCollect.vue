<template>
  <div class="check-info-box">
    <div class="top-tips">
      提醒：后续只能绑定该用户的银行卡
    </div>
    <div class="check-content">
      <!-- <div class="check-content-item border-bottom">
        <label for="userName">姓名</label>
        <input
          id="userName"
          v-model="userName"
          type="text"
          maxlength="6"
          placeholder="请输入姓名"
          oninput="value = this.value.trim().replace(/[^\u4e00-\u9fa5]/g,'').slice(0,6)"
        />
      </div> -->
      <!--      <div class="check-content-item border-bottom">-->
      <!--        <label for="certNo">身份证</label>-->
      <!--        <input-->
      <!--          id="certNo"-->
      <!--          v-model="certNo"-->
      <!--          type="tel"-->
      <!--          maxlength="18"-->
      <!--          placeholder="请输入身份证号"-->
      <!--        />-->
      <!--      </div>-->
      <div class="check-content-item border-bottom">
        <label for="mobile">手机号</label>
        <input
          id="mobile"
          type="tel"
          v-model="mobile"
          maxlength="11"
          oninput="value = this.value.replace(/[^\d]+/g, '')"
          placeholder="请输入手机号码"
        />
      </div>
      <div class="check-content-item">
        <label for="validCode">手机验证码</label>
        <input
          id="validCode"
          v-model="validCode"
          type="tel"
          maxlength="4"
          oninput="value = this.value.trim().replace(/[^\d]+/g, '')"
          placeholder="请输入手机验证码"
        />
        <span v-if="!seconds" class="get-code-text blue" @click="getCode">
          获取验证码
        </span>
        <span v-else class="get-code-text gray">{{ seconds }}s后重新获取</span>
      </div>
    </div>
    <div class="footer-box">
      <img
        class="checkbox-img"
        :src="isSelected ? selectedImg : unselectedImg"
        alt=""
        @click="selectAgreement"
      />
      <span>我已阅读并同意</span>
      <a @click="changeVisible">《用户授权协议》</a>
    </div>
    <div
      class="submit-box"
      :class="canClick ? 'blue-color' : 'gray-color'"
      @click="submit"
    >
      提交信息
    </div>
    <agreement :show="visible" @close="changeVisible"></agreement>
  </div>
</template>

<script>
import Router from '@2dfire/utils/router'
import agreement from '../components/agreement'
import {
  userInfoCheckApply,
  sendMobileValidCode,
  getValidCodeErrorTimes
} from '../config/api'

export default {
  name: 'infoCollect',
  components: { agreement },
  data() {
    return {
      isSelected: false,
      selectedImg:
        'https://assets.2dfire.com/frontend/5c156d0f9f27e7c7d00350817a15a63a.png',
      unselectedImg:
        'https://assets.2dfire.com/frontend/21412bd6bd1c588d62fe204b10bc5270.png',
      seconds: 0,
      interval: null,
      userName: '匿名', // 姓名
      certNo: '', // 身份证
      mobile: '', // 手机号
      validCode: '', // 验证码
      visible: false
    }
  },
  computed: {
    canClick() {
      const { isSelected, userName, mobile, validCode } = this
      return isSelected && userName && mobile && validCode
    }
  },
  created() {
    document.title = '验证个人信息'
  },
  methods: {
    selectAgreement() {
      this.isSelected = !this.isSelected
    },
    changeVisible() {
      this.visible = !this.visible
    },
    getCode() {
      const _this = this
      const { mobile } = _this
      const {
        query: { thirdId, consumerId }
      } = _this.$route
      if (mobile) {
        const reg = /^[1]([3-9])[0-9]{9}$/
        if (!reg.test(mobile)) {
          _this.$toast({ text: '请输入正确的手机号码', duration: 1500 })
          return
        }
        sendMobileValidCode({
          mobile,
          thirdId: thirdId || consumerId || ''
        }).then(res => {
          let time = 60
          _this.seconds = time
          const countDown = setInterval(function() {
            time--
            _this.seconds = time
            if (time === 0) {
              clearInterval(countDown)
            }
          }, 1000)
          _this.interval = countDown
        })
      } else {
        _this.$toast({ text: '请填写手机号', duration: 1500 })
      }
    },
    async submit() {
      const _this = this
      const { canClick, userName, mobile, validCode } = _this
      const {
        query: { thirdId, consumerId, url, name }
      } = _this.$route
      if (canClick) {
        _this.logger({
          name: '验证信息',
          info: name + '&thirdId=' + (thirdId || consumerId)
        })
        try {
          const errotTimes = await getValidCodeErrorTimes({
            thirdId: thirdId || consumerId
          })
          if (errotTimes >= 10) {
            _this.$toast({ text: '验证操作频繁', duration: 1500 })
          } else {
            userInfoCheckApply({
              thirdId: thirdId || consumerId,
              userSource: thirdId ? 1 : 2,
              userName,
              mobile,
              validCode
            }).then(res => {
              if (res.resultCode === '0000') {
                _this.$toast({
                  text: '验证成功',
                  duration: 1000,
                  onClose() {
                    window.location.href = url || ''
                  }
                })
              } else {
                _this.$toast({
                  text: res.resultMsg,
                  duration: 1500
                })
              }
            })
          }
        } catch (e) {}
      }
    }
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }
}
</script>

<style scoped lang="scss">
.check-info-box {
  width: 100%;
  height: 100%;
  background-color: #f7f8fa;
  position: absolute;
  font-size: 28px;
  letter-spacing: 0;
  .top-tips {
    color: #ff5539;
    height: 90px;
    line-height: 90px;
    padding: 0 32px;
  }
  .check-content {
    background-color: #fff;
    padding: 0 32px;
    .check-content-item {
      height: 91px;
      line-height: 90px;
      position: relative;
      label {
        width: 180px;
        display: inline-block;
        color: #333333;
      }
      input {
        border: unset;
        font-size: 28px;
        padding: unset;
        color: #666666;
      }
      input:focus {
        outline: unset;
      }
      ::placeholder {
        color: #ccc;
        font-size: 28px;
        letter-spacing: 0;
      }
      #validCode {
        width: calc(100% - 400px);
      }
      .get-code-text {
        font-size: 28px;
        position: absolute;
        right: 0;
        letter-spacing: 0;
      }
      .blue {
        color: #3b73ff;
      }
      .gray {
        color: #ccc;
      }
    }
    .border-bottom {
      /* prettier-ignore */
      border-bottom: 1PX solid rgba(0, 0, 0, 0.08);
    }
  }
  .footer-box {
    height: 90px;
    line-height: 90px;
    padding: 0 32px;
    display: flex;
    font-size: 28px;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      margin-right: 22px;
    }
    a {
      color: #3b73ff;
    }
  }
  .submit-box {
    margin: 50px 32px;
    color: #ffffff;
    font-size: 32px;
    text-align: center;
    height: 88px;
    border-radius: 8px;
    line-height: 88px;
  }
  .blue-color {
    background-color: #3b73ff;
  }
  .gray-color {
    background-color: #ccc;
  }
}
</style>
