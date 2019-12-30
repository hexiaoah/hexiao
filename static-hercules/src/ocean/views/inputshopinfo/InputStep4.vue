<template>
    <div class="">
        <section class="main">
            <h3 class="h3">补充材料</h3>
            <ul class="input-main border-b border-t">

                <!--<shop-select :title="'是否需要支付宝台牌物料(快递到付)'"-->
                             <!--:select-name="'needMaterial'"-->
                             <!--:value="getNeedMaterial" ></shop-select>-->

                <li class="input-list photo required">
                    <div class="name">
                        <span class="title">门头照</span>
                        <span class="example" v-if="!canEdit" @click="showExample('https://assets.2dfire.com/frontend/ba0a5ec23a724be7c4124ea8fe298409.jpg')">查看图片示例</span>
                        <span class="content" v-if="!canEdit&&!applyInfo.doorPic">必传</span>
                    </div>
                    <shop-photo :title="'含完整招牌；门店门口照片清晰可见。'"
                                :img-name="'doorPic'"
                                :img-src="applyInfo.doorPic||''"
                                :edit-sub-status="true"></shop-photo>
                </li>
                <li class="input-list photo required">
                    <div class="name">
                        <span class="title">收银台</span>
                        <span class="example" v-if="!canEdit" @click="showExample('https://assets.2dfire.com/frontend/2313581ddc14fcb956826ad1f51157c5.jpg')">查看图片示例</span>
                        <span class="content" v-if="!canEdit&&!applyInfo.checkoutCounterPic">必传</span>
                    </div>
                    <shop-photo :title="'含支付宝台牌，收款二维码，扫码领红包，扫码盒子等物料（需露出“推荐使用支付宝/支付就用支付宝”字样;'"
                                :titleColorRed='true'
                                :img-name="'checkoutCounterPic'"
                                :img-src="applyInfo.checkoutCounterPic||''"
                                :edit-sub-status="true"></shop-photo>
                </li>
                <li class="input-list photo required">
                    <div class="name">
                        <span class="title">店内环境照</span>
                        <span class="example" v-if="!canEdit" @click="showExample('https://assets.2dfire.com/frontend/0c8d3bba26edfbfda5b8b755e4091cba.jpg')">查看图片示例</span>
                        <span class="content" v-if="!canEdit&&!applyInfo.shopEvnPic">必传</span>
                    </div>
                    <shop-photo :title="'需可判断具有餐饮营业的环境基础。'"
                                :img-name="'shopEvnPic'"
                                :img-src="applyInfo.shopEvnPic||''"
                                :edit-sub-status="true"></shop-photo>
                </li>
                <li class="input-list photo required">
                    <div class="name">
                        <span class="title">其他平台图片</span>
                        <span class="example" v-if="!canEdit" @click="showExample('https://assets.2dfire.com/frontend/556194d4757031c8696d41bfbb5c89fa.jpg')">查看图片示例</span>
                        <span class="content" v-if="!canEdit&&!applyInfo.otherPlatformPic">必传</span>
                    </div>
                    <shop-photo :title="'请上传在任一餐饮平台上（美团、饿了么、口碑、大众点评、百度外卖）的店铺主页图'"
                                :img-name="'otherPlatformPic'"
                                :img-src="applyInfo.otherPlatformPic||''"
                                :edit-sub-status="true"></shop-photo>
                </li>
            </ul>
        </section>
        <section class="main" v-if="viewState!=='detail'">
            <h3 class="h3">安全验证</h3>
            <ul class="input-main border-b border-t">
                <li class="input-list no-input border-b">
                    <span class="title">银行账号</span>
                    <span class="content">{{applyInfo.accountNumber}}</span>
                </li>
                <li class="input-list no-input border-b">
                    <span class="title">银行账号预留手机号</span>
                    <span class="content">{{applyInfo.accountMobile}}</span>
                </li>
                <li class="input-list no-input border-b">
                    <span class="title">验证码</span>
                    <span class="content">
            <button class="btn-send " :class="sendTime>0?'z-send':''" @click="toSendCode">
              {{sendTime>0?`${sendTime}s重新获取`:'发送验证码'}}
            </button>
          </span>
                </li>
                <shop-input :title="'输入验证码'"
                            :input-name="'smsCode'"
                            :value="applyInfo.smsCode"
                            :edit-sub-status="true"></shop-input>
            </ul>
        </section>
        <section class="main" v-if="viewState!=='detail'">
            <h3 class="h3"></h3>
            <ul class="input-main">
                <li class=" no-input rule input-list">
                    <label class="checkbox-wrapper"><input type="checkbox" class="checkbox" v-model="isAgree"/><i
                            class="btn"></i></label>
                    <span class="content">我已阅读并同意
                        <router-link :to="{ path: '/rule'}" class="link">《网商银行因动支付收单服务协议》</router-link>
                    </span>
                </li>
            </ul>
        </section>
        <button class="btn-submit" v-if="viewState!=='detail'" @click="nextStep">提交申请</button>
        <div class="hint" v-if="viewState!=='detail'">
            1:建议您绑定开户银行是主流银行的帐户，比如工行，农行，中行，建行等，将会更加及时收到转账金额；<br/>
            2:请仔细核对以上信息，申请成功后，顾客成功使用支付宝的钱将会在第2天中午12:00后自动转账到您所填的银行帐户，并按照协议约定的费率收取服务费（报名支付宝优惠费率活动成功的，将下调支付宝服务费率0.35%）；<br/>
            3:变更帐户后，顾客成功使用支付宝的钱将会在变更成功后的第2天中午12:00后自动转账到您所填的银行帐户。
        </div>
        <shop-img-example></shop-img-example>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { inputIsOk } from 'src/ocean/libs/rules'
import errorToast from 'src/ocean/libs/errorToast'
import { sendCode, getSubmitShopInfo } from 'src/ocean/config/api.js'
import ShopImgExample from 'src/ocean/components/ShopImgExample.vue'
import { fixedBody, looseBody } from 'base/utils/unit.js'
export default {
  name: 'fourth',
  data() {
    return {
      sendTime: 0,
      isAgree: false,
      isToSendCode: true,
      isNextStep: true
    }
  },
  computed: {
    ...mapState(['applyInfo', 'viewState', 'subStatus']),
    ...mapGetters([
      'applyStepFourth'
      // "getNeedMaterial"
    ]),
    canEdit() {
      if (this.viewState === 'detail') {
        return true
      } else {
        return false
      }
    }
  },
  created() {},
  methods: {
    ...mapActions(['modifyShopInfo', 'changeExamplePhoto']),
    nextStep() {
      const self = this
      if (!self.isNextStep) {
        return false
      }
      self.isNextStep = false
      for (let key in this.applyInfo) {
        const ret = inputIsOk(this.applyInfo[key], key)
        if (!ret.data) {
          errorToast.show(ret.message)
          self.isNextStep = true
          return false
        }
      }
      if (!self.isAgree) {
        errorToast.show('您还没有同意协议')
        self.isNextStep = true
        return false
      }
      getSubmitShopInfo(JSON.stringify(self.applyInfo))
        .then(data => {
          self.isNextStep = true
          self.$router.push({
            path: '/result'
          })
        })
        .catch(e => {
          self.isNextStep = true
          // errorToast.show(e.result.message);
          console.log(e)
        })
    },
    //发送验证码
    toSendCode() {
      let self = this
      if (self.sendTime > 0 || !self.isToSendCode) {
        return false
      }
      self.isToSendCode = false
      if (!self.applyInfo.accountMobile) {
        errorToast.show('请先输入银行预留手机号')
        return false
      }
      sendCode(self.applyInfo.accountMobile)
        .then(data => {
          self.isToSendCode = true
          //倒计时初始化
          self.sendTime = 59
          let interval = setInterval(() => {
            self.sendTime--
            if (self.sendTime <= 0) {
              clearInterval(interval)
            }
          }, 1000)
        })
        .catch(e => {
          self.isToSendCode = true
          // errorToast.show(e.result.message)
          console.log(e)
        })
    },
    /**
     * 显示图片
     * */
    showExample(url) {
      fixedBody()
      this.changeExamplePhoto({ img: url, isShow: true })
    }
  },

  components: { ShopImgExample }
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
.btn-send {
  height: 30px;
  width: 130px;
  text-align: center;
  background: #0088ff;
  border-radius: 5px;
  border: 0;
  font-size: 14px;
  color: #ffffff;
  outline: 0;
  transition: 0.2s;
  &.z-send {
    background: #cccccc;
  }
}
.example {
  color: #0088ff;
  font-size: 14px;
  margin-left: 10px;
}

.checkbox-wrapper {
  width: 30px;
  .checkbox {
    // display: inline-block;
    width: 0;
    height: 0;
    float: right;
    opacity: 0;

    & + i {
      display: inline-block;
      width: 20px;
      height: 20px;
      background: url('https://assets.2dfire.com/frontend/98b1ffb4e490cf765122e9c4382f1a26.png')
        no-repeat center;
      background-size: 20px;
      transition: 0.2s;
    }
    &:checked + i {
      background: url('https://assets.2dfire.com/frontend/c1418b70b132bf3e72f1c787ed6f3eeb.png')
        no-repeat center;
      background-size: 20px;
    }
  }
}

.rule {
  font-size: 15px;
  color: #333333;
  letter-spacing: 0;
  line-height: 20px !important;
  padding: 12px 0;
  .content {
    text-align: left !important;
  }
  .link {
    color: #0088ff;
  }
}

.hint {
  font-size: 13px;
  color: #999999;
  letter-spacing: 0;
  line-height: 18px;
  margin: 36px 15px 0;
}
</style>

