<template>
    <div class="entrances-wrapper" >
        <!-- <h3 class="title">支付宝优惠费率</h3> -->
        <!-- 网商间连和通联间连2选一  由后端数据给出 -->
        <div v-if="wsJlData.openStatus" class="item" @click="toRule('wsjl')">
            <span class="unopen label" v-if="wsJlData.openStatus === 'no_permission'">{{wsJlData.statusTitle}}</span>
            <span class="unopen label" v-else-if="wsJlData.openStatus === 'unopen'">未开通</span>
            <span class="opening label" v-else-if="wsJlData.openStatus === 'opening'">审核中</span>
            <span class="success label" v-else-if="wsJlData.openStatus === 'opened'">已开通</span>
            <span class="fail label" v-else-if="wsJlData.openStatus === 'open_fail'">开通失败</span>
            <div class="content">
                <img src="https://assets.2dfire.com/frontend/d8deb5e67e9aed34955fe5f1ed3add6b.png" class="pic" alt="">
                <div class="info">
                    <h3 class="title2">间连</h3>
                    <p class="text">会在活动页重新绑定收款银行卡。</p>
                </div>
            </div>
        </div>
        <div v-if="tlJlData.openStatus" class="item" @click="toRule('tljl')">
            <span class="unopen label" v-if="tlJlData.openStatus === 'unopen'">未开通</span>
            <span class="opening label" v-else-if="tlJlData.openStatus === 'opening'">审核中</span>
            <span class="success label" v-else-if="tlJlData.openStatus === 'opened'">已开通</span>
            <span class="fail label" v-else-if="tlJlData.openStatus === 'open_fail'">开通失败</span>
            <div class="content">
                <img src="https://assets.2dfire.com/frontend/d8deb5e67e9aed34955fe5f1ed3add6b.png" class="pic" alt="">
                <div class="info">
                    <h3 class="title2">间连</h3>
                    <p class="text">需要在二维火绑定收款银行卡。</p>
                </div>
            </div>
        </div>
        <div v-show="isMore" class="item" @click="toRule('zl')">
            <span class="unopen label" v-if="zlData.openStatus === 'unopen'">未开通</span>
            <span class="opening label" v-else-if="zlData.openStatus === 'opening'">审核中</span>
            <span class="success label" v-else-if="zlData.openStatus === 'opened'">已开通</span>
            <span class="fail label" v-else-if="zlData.openStatus === 'open_fail'">开通失败</span>
            <div class="content">
                <img src="https://assets.2dfire.com/frontend/d8deb5e67e9aed34955fe5f1ed3add6b.png" class="pic" alt="">
                <div class="info">
                    <h3 class="title2">直连</h3>
                    <p class="text">你的支付宝账号需要入驻二维火，并已经开通当面付。</p>
                </div>
            </div>
            <span class="zl-icon"></span>
        </div>
        <p class="more" @click="more">{{moreText}}</p>
    </div>
</template>

<script>
import {
  applyAliPayState,
  getAlipayApplyStatus,
  getMerchantAuthApplyByEntityId
} from 'src/oasis/config/api.js'
import hintToast from 'src/ocean/libs/hintToast'

export default {
  name: 'alipay-entrance',
  data() {
    return {
      isMore: false,
      isNoApply: false, // 没有进件
      isNaturalPerson: false, //通联间连 判断是否是自然人
      moreText: '查看全部',
      isApplyTe: false, // 是否开通特约商户账号
      applyPermission: false, //是否有申请权限
      tlJlData: {}, // 通联间连
      wsJlData: {}, // 网商间连
      zlData: {} // 支付宝直连
    }
  },
  created() {
    document.title = '支付宝支付优惠费率'
    this.getAliPayState()
    this.getAlipayApplyStatus()
    this.getMerchantAuthApplyByEntityId()
  },
  methods: {
    getAliPayState() {
      applyAliPayState()
        .then(data => {
          const { applyPermission, openStatusVoList = [] } = data.data
          openStatusVoList.forEach((item, index) => {
            if (item.blueOpenChannel === 'MYBANK') {
              // 网商间连
              this.wsJlData = openStatusVoList[index] || {}
            }
            if (item.blueOpenChannel === 'ALLIN') {
              // 通联间连
              this.tlJlData = openStatusVoList[index] || {}
            }
            if (item.blueOpenChannel === 'ALIPAY') {
              // 支付宝直连
              this.zlData = openStatusVoList[index] || {}
            }
          })
          this.applyPermission = applyPermission
        })
        .catch(e => {
          console.log(e)
        })
    },
    // 查询支付宝特约商户开通状态
    getAlipayApplyStatus() {
      getAlipayApplyStatus().then(data => {
        if (data.data === 'APPLIED') {
          this.isApplyTe = true
        }
      })
    },
    // 查询开通状态 --  是否为自然人
    getMerchantAuthApplyByEntityId() {
      getMerchantAuthApplyByEntityId().then(data => {
        if (data.data) {
          const { authInfo } = data.data
          if (authInfo) {
            const authInfoObj = JSON.parse(authInfo)
            const { merchantBaseInfo = {} } = authInfoObj
            const merchantType = merchantBaseInfo.merchantType
            if (merchantType === 'NATURAL') {
              // 自然人
              this.isNaturalPerson = true
            }
          } else {
            this.isNoApply = true // 没有进件
          }
        } else {
          this.isNoApply = true // 没有进件
        }
      })
    },
    // 支付宝跳转
    toRule(type) {
      const alipayApplyState = this.alipayApplyState
      const { applyPermission } = this
      // 通联间连  申请时不需要admin权限  绑卡是需要
      if (type === 'tljl') {
        if (!this.isNoApply) {
          if (this.isNaturalPerson) {
            hintToast.show(
              '目前暂不支持自然人商户申请本活动，如需申请，请去【绑定银行卡】变更为个体或企业，完善资料后可以申请'
            )
            return false
          }
        }

        const { openStatus } = this.tlJlData
        if (openStatus === 'unopen') {
          this.$router.push({
            path: '/introduce',
            query: {
              openType: 'alipay_tljl',
              openStatus
            }
          })
        } else {
          window.location.href = `ocean-zl.html#/result-tl?version=1.2`
        }
        return false
      }

      if (!applyPermission) {
        hintToast.show(
          '抱歉，您的账号暂无权限申请本活动，请使用超级管理员账号申请。'
        )
        return false
      }
      // 网商间连
      if (type === 'wsjl') {
        const { openStatus } = this.wsJlData
        if (openStatus === 'unopen') {
          this.$router.push({
            path: '/introduce',
            query: {
              openType: 'alipay_jl',
              openStatus
            }
          })
        } else {
          window.location.href = `ocean.html#/result`
        }
      }

      // 支付宝直连
      if (type === 'zl') {
        const { openStatus } = this.zlData
        if (!this.isApplyTe) {
          hintToast.show('根据支付宝要求，请先开通“支付宝特约商户”再申请本活动')
          return false
        }
        if (openStatus === 'unopen') {
          this.$router.push({
            path: '/introduce',
            query: {
              openType: 'alipay_zl',
              openStatus
            }
          })
        } else {
          window.location.href = `ocean-zl.html#/result`
        }
      }
    },
    more() {
      this.isMore = !this.isMore
      this.isMore ? (this.moreText = '收起') : (this.moreText = '查看全部')
    },
    jump() {
      this.$router.push({
        path: '/introduce',
        query: { source: 1 }
      })
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
.entrances-wrapper{
    padding-top: 36px;
    .title{
        text-align: center;
        font-size: 17px;
        color: #333333;
        font-weight: bold;
    }
    .item{
        position: relative;
        margin: 15px auto 0;
        background: #FFFFFF;
        box-shadow: 0 -4px 4px 0 rgba(247,248,250,0.50), 0 4px 4px 0 rgba(235,236,237,0.50);
        border-radius: 8px;
        width: 320px;
        height: 110px;
        padding: 35px 15px 15px 30px;
        .zl-icon{
            position: absolute;
            top: 0;
            left: 0;
            width: 43px;
            height: 43px;
            background:url('https://assets.2dfire.com/frontend/5b61d4dd1a617b02ee671ee1406de68d.png') no-repeat;
            background-size: cover;
        }
        .label{
            position: absolute;
            right: 15px;
            top: 15px;
            padding: 1px 4px;
            display: inline-block;
            font-size: 11px;
            border-radius: 3px;
            border: 1px solid;
            line-height: 16px;
            vertical-align: 3px;
        }

        .unopen {
          color: #ff0033;
          border-color: #ff0033;
        }

        .opening {
          color: #ff9900;
          border-color: #ff9900;
        }

        .success {
          color: #00cc33;
          border-color: #00cc33;
        }

        .fail {
          color: #ff0033;
          border-color: #ff0033;
        }
    }
    .content{
        display: flex;
        .pic{
            height: 44px;
            width: 44px;
            margin-right: 15px;
        }
        .info{
            .title2{
                font-weight: bold;
                font-size: 17px;
                color: #333333;
                margin-bottom: 2px;
            }
            .text{
                font-size: 13px;
                color: #999999;
                letter-spacing: 0;
                line-height: 18px;
            }
        }
    }
    .more{
        font-size: 13px;
        color: #0088FF;
        text-align: center;
        line-height: 18px;
        padding-top: 15px;
    }
}

</style>

