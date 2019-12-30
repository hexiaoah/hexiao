<template>
    <div class="input-wrapper">
        <section class="main">
            <h3 class="h3">支付宝账号</h3>
             <ul class="input-main border-b border-t">
                 <shop-input class="special" 
                            :title="'支付宝账号'"
                            :input-name="'alipayAccount'"
                            :max-length="'30'"
                            :explain="'此账号用于收款，需填写掌柜支付宝账号'"
                            :value="applyInfo.alipayAccount">
                </shop-input>
            </ul> 
        </section>
        <section class="main ">
            <h3 class="h3">基础信息</h3>
            <ul class="input-main border-b border-t">

                <shop-input :title="'店铺名称'"
                            :input-name="'shopName'"
                            :max-length="'50'"
                            :editSubStatus="true"
                            :value="applyInfo.shopName"></shop-input>
                <shop-input :title="'店铺地址'"
                            :input-name="'detailAddress'"
                            :max-length="'128'"
                            :value="applyInfo.detailAddress"></shop-input>
            </ul>
        </section>
        <section class="main">
            <h3 class="h3">经营信息</h3>
            <ul class="input-main border-b border-t">
                <li class="input-list photo required">
                    <div class="name">
                        <span class="title">营业执照</span>
                        <span class="example" v-if="!canEdit" @click="showExample('https://assets.2dfire.com/frontend/b0636d2b0538323a44aae2c1ae71ae6e.jpg')">查看图片示例</span>
                        <span class="content" v-if="!canEdit&&!applyInfo.businessLicensePhoto">必传</span>
                    </div>
                    <shop-photo :title="'需要提供餐饮的营业执照。'"
                                :img-name="'businessLicensePhoto'"
                                :img-src="applyInfo.businessLicensePhoto||''"
                                :edit-sub-status="true"></shop-photo>
                </li>
                <li class="input-list photo required">
                    <div class="name">
                        <span class="title">店铺门头照</span>
                        <span class="example" v-if="!canEdit" @click="showExample('https://assets.2dfire.com/frontend/ba0a5ec23a724be7c4124ea8fe298409.jpg')">查看图片示例</span>
                        <span class="content" v-if="!canEdit&&!applyInfo.shopPhoto">必传</span>
                    </div>
                    <shop-photo :title="'含完整招牌；门店门口照片清晰可见。'"
                                :img-name="'shopPhoto'"
                                :img-src="applyInfo.shopPhoto||''"
                                :edit-sub-status="true"></shop-photo>
                </li>
                <li class="input-list photo required">
                    <div class="name">
                        <span class="title">收银台照片</span>
                        <span class="example" v-if="!canEdit" @click="showExample('https://assets.2dfire.com/frontend/71d026e37c2f5fbef6f39d012f6397f7.jpg')">查看图片示例</span>
                        <span class="content" v-if="!canEdit&&!applyInfo.shopCashierPhoto">必传</span>
                    </div>
                    <shop-photo :title="'需要包含支付宝收款码、红包码、“欢迎使用支付宝”等。'"
                                :img-name="'shopCashierPhoto'"
                                :img-src="applyInfo.shopCashierPhoto||''"
                                :edit-sub-status="true"></shop-photo>
                </li>
                <li class="input-list photo required">
                    <div class="name">
                        <span class="title">店内环境</span>
                        <span class="example" v-if="!canEdit" @click="showExample('https://assets.2dfire.com/frontend/5a42f13fd3d623f4b8d2c82ba928bfa1.jpg')">查看图片示例</span>
                        <span class="content" v-if="!canEdit&&!applyInfo.indoorPhoto">必传</span>
                    </div>
                    <shop-photo :title="'需要能展示出餐厅内具备就餐环境，包含桌椅等。'"
                                :img-name="'indoorPhoto'"
                                :img-src="applyInfo.indoorPhoto||''"
                                :edit-sub-status="true"></shop-photo>
                </li>
                <li class="input-list photo required">
                    <div class="name">
                        <span class="title">其他平台</span>
                        <span class="example" v-if="!canEdit" @click="showExample('https://assets.2dfire.com/frontend/556194d4757031c8696d41bfbb5c89fa.jpg')">查看图片示例</span>
                        <span class="content" v-if="!canEdit&&!applyInfo.otherPlatformPhoto">必传</span>
                    </div>
                    <shop-photo :title="'主流平台店铺入驻截图，比如饿了么、美团、口碑等。'"
                                :img-name="'otherPlatformPhoto'"
                                :img-src="applyInfo.otherPlatformPhoto||''"
                                :edit-sub-status="true"></shop-photo>
                </li>
            </ul>
        </section>
         <button :disabled='isDisabled' :class="['btn-submit',{disabled:isDisabled}]" v-if="viewState!=='detail'" @click="apply">提交申请</button>
         <!--图片预览-->
         <shop-img-example></shop-img-example>
        <!--底部选择弹窗-->
        <Picker></Picker>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { saveAlipayBlueSea } from '../../config/api'
import { fixedBody, looseBody } from 'base/utils/unit.js'
import { inputIsOk } from '../../utils/rules'
import ShopImgExample from 'src/ocean-zl/components/ShopImgExample.vue'
import Picker from 'src/ocean-zl/components/Picker.vue'

export default {
  name: 'inputs',
  data() {
    return {
      isDisabled: false,
      editTime: ''
    }
  },
  computed: {
    ...mapState(['applyInfo', 'viewState', 'picker']),
    canEdit() {
      if (this.viewState === 'detail') {
        return true
      } else {
        return false
      }
    }
  },
  created() {
    const self = this
    const viewState = self.$route.query.viewState
    if (viewState) {
      self.changeViewState(viewState)
    }
    if (self.$route.query.type === 'noRefresh') {
      return false
    }
  },
  methods: {
    ...mapActions(['changeExamplePhoto', 'changeViewState']),
    apply() {
      const { applyInfo } = this
      for (const key in applyInfo) {
        if (applyInfo.hasOwnProperty(key)) {
          const element = applyInfo[key]
          const ret = inputIsOk(element, key)
          if (!ret.data) {
            this.$toast(ret.message)
            return false
          }
        }
      }
      this.saveAlipayBlueSea()
    },
    saveAlipayBlueSea() {
      saveAlipayBlueSea(this.applyInfo).then(data => {
        this.$router.replace({ path: '/result' })
      })
    },
    showExample(url) {
      fixedBody()
      this.changeExamplePhoto({ img: url, isShow: true })
    }
  },
  components: { Picker, ShopImgExample }
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .input-wrapper {
        padding-bottom: 90PX;
        .example {
            color: #0088ff;
            font-size: 14px;
            margin-left: 10px;
        }
        .disabled{
            background: #CCCCCC;
        }
        &.no-scroll {
            overflow-y: hidden;
        }
    }
</style>

