<template>
    <div class="index-wrapper" v-if="isShow">
        <!--头部-->
        <div class="firstfloat">
            <p class="top-title">支付宝支付特约商户即支付宝直连商户，开通支付宝直连后，顾客使用支付宝支付成功，钱款会实时进入您绑定的支付宝账号中。</p>
            <div class="align-center btn">
                <btn-custom @click.native="clickApply" :disabled="disabled">立即申请</btn-custom>
            </div>
        </div>
        <h3 class="title">支付宝特约商户优势</h3>
        <!--介绍item-->
         <ul class="introduce-list">
            <function-introfuce-item 
                    v-for="(item, $index) in itemList"
                    :item-data="item"
                    :key="$index">
            </function-introfuce-item>
        </ul> 
        <div class="bottom">
            <p>1. 申请成功后暂不支持修改资料，如需修改请联系客服处理。</p>
            <p>2. 连锁门店如需绑定同一支付宝账号，可线下联系运营处理。</p>
        </div>
    </div>
</template>

<script>
import FunctionIntrofuceItem from '../../components/function-introfuce-item.vue'
import BtnCustom from '../../components/btn-custom.vue'
import API from '../../config/api'
import Router from '@2dfire/utils/router'
import sessionStorage from '@2dfire/utils/sessionStorage'
import errorToast from 'src/wechat-direct-con/libs/errorToast'
import { mapActions } from 'vuex'
import { introduceList } from '../../constant/index'

export default {
  data() {
    return {
      itemList: introduceList,
      entityId: sessionStorage.getItem('entityId') || '',
      disabled: false,
      isShow: false
    }
  },
  methods: {
    ...mapActions(['modifyInputInfo']),
    getPaymentStatus() {
      // 查看申请状态
      API.getPaymentStatus({
        entityId: this.entityId,
        applyType: 'ALIPAY_DIRECT'
      })
        .then(data => {
          const { isApply } = data
          this.isShow = !isApply
          if (isApply) {
            this.checkAuditStatus(data)
          }
        })
        .catch(e => {
          this.disabled = true
        })
    },
    checkAuditStatus(data) {
      const {
        isEnable,
        auditStatus, // 申请状态
        signUrl, // 签约url
        upgradeTime, // 申请提交时间
        applyTime, // 申请提交时间
        alipayAccount, //支护宝收款账号
        auditMessage // 审核失败原因
      } = data
      /*
            ALIPAY_AUTH_AUDITING("21", "支付宝进件审核中"),
            ALIPAY_AUTH_SIGN("22", "支付宝进件待确认"),
            ALIPAY_AUTH_SUCCESS("23", "支付宝进件成功"),
            ALIPAY_AUTH_FAIL("24", "支付宝进件失败");
        */
      if (auditStatus === 'ALIPAY_AUTH_AUDITING') {
        this.$router.replace({
          path: '/auth/auditing/auditing',
          query: { applyTime }
        })
      } else if (auditStatus === 'ALIPAY_AUTH_SIGN') {
        this.$router.replace({
          path: '/auth/sign/sign',
          query: { signUrl }
        })
      } else if (auditStatus === 'ALIPAY_AUTH_FAIL') {
        this.$router.replace({
          path: '/auth/fail/fail',
          query: { auditMessage }
        })
      } else if (auditStatus === 'ALIPAY_AUTH_SUCCESS') {
        this.$router.replace({
          path: '/auth/success/success',
          query: { alipayAccount, isEnable }
        })
      }
    },
    clickApply() {
      // 点击申请
      this.$router.push({
        path: '/input',
        query: { isNeedGetInfo: false, pageType: 'edit' }
      }) // 不需要从服务端获取表单数据
    }
  },
  components: {
    FunctionIntrofuceItem,
    BtnCustom
  },
  created() {
    this.getPaymentStatus()
  }
}
</script>
<style type="text/scss" lang="scss" scoped>

    .index-wrapper{
        .firstfloat{
            background: white;
            padding-top: 332px;
            background-size: 380px 248px;
            background-image: url("https://assets.2dfire.com/frontend/5c16915d73ce7da956eacaae5d8ed939.png");
            background-position:center 40px; 
            background-repeat:no-repeat; 
            border-bottom: 1PX solid #cccccc;
            margin-bottom: 72px;
            .top-title{
                padding:0 30px 40px;
                font-size: 26px;
                color: #333333;
                line-height: 36px;
            }
            .btn {
              margin: 0 auto;
              width: 600px;
              padding-bottom: 40px;
            }
        }
        .title{
            height: 56px;
            background: rgba(204,204,204,0.50);
            font-weight: bold;
            font-size: 30px;
            padding-left: 30px;
            color: #333333;
            letter-spacing: 0;
            line-height: 56px;
        }
        .introduce-list{
            background: white;
            padding: 40px 0;
            border-bottom: 1PX solid #cccccc;

        }
        .bottom{
            padding: 30px 30px 112px;
            font-size: 26px;
            color: #999999;
            line-height: 36px;
        }
    }

</style>

