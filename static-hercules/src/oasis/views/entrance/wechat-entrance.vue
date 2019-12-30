<template>
    <div class="entrances-wrapper" >
        <!-- <h3 class="title">微信优惠费率</h3> -->
            <!-- 间连 -->
            <div v-if="jlData.openType==='e_payment'" class="item" @click="goApply(jlData)">
                <span class="unopen label" v-if="jlData.openStatus === 'no_permission'">{{jlData.statusTitle}}</span>
                <span class="unopen label" v-if="jlData.openStatus === 'unopen'">未开通</span>
                <span class="opening label" v-if="jlData.openStatus === 'opening'">审核中</span>
                <span class="success label" v-if="jlData.openStatus === 'opened'">已开通</span>
                <span class="fail label" v-if="jlData.openStatus === 'open_fail'">开通失败</span>
                <div class="content">
                    <img src="https://assets.2dfire.com/frontend/248916a36f9f66a2637ec2e995fdca3e.png" class="pic" alt="">
                    <div class="info">
                        <h3 class="title2">间连</h3>
                        <p class="text">需要在二维火绑定收款银行卡。</p>
                    </div>
                </div>
            </div>
             <!-- 直连 -->
            <div v-if="zlData.openType==='wechat_payment'">
                <div v-show="isMore" class="item" @click="goApply(zlData)">
                    <span class="unopen label" v-if="zlData.openStatus === 'no_permission'">{{zlData.statusTitle}}</span>
                    <span class="unopen label" v-if="zlData.openStatus === 'unopen'">未开通</span>
                    <span class="opening label" v-if="zlData.openStatus === 'opening'">审核中</span>
                    <span class="success label" v-if="zlData.openStatus === 'opened'">已开通</span>
                    <span class="fail label" v-if="zlData.openStatus === 'open_fail'">开通失败</span>
                    <div class="content">
                        <img src="https://assets.2dfire.com/frontend/248916a36f9f66a2637ec2e995fdca3e.png" class="pic" alt="">
                        <div class="info">
                            <h3 class="title2">直连</h3>
                            <p class="text">需要在二维火开通微信特约商户。</p>
                        </div>
                    </div>
                     <span class="zl-icon"></span>
                </div>
            </div>

         <p class="more" @click="more">{{moreText}}</p>
    </div>
</template>

<script>
import {
  applyState,
  getWechatApplyStatus,
  getWechatApplyStatusByPeople,
  getMerchantAuthInfoByEntityId
} from 'src/oasis/config/api.js'
import hintToast from 'src/ocean/libs/hintToast'

export default {
  name: 'wechat-entrance',
  data() {
    return {
      isMore: false,
      payChannelZl: false, // 支付管理中的微信支付切换成微信直连
      isExistZl: false, // 是否已开通直连
      isExistJl: false, // 是否已开通间连
      isApplyTe: false, // 是否开通特约商户账号
      moreText: '查看全部',
      jlData: {},
      zlData: {}
    }
  },
  created() {
    document.title = '微信支付优惠费率'
    this.getApplyState()
    this.getMerchantAuthInfoByEntityId()
    this.getWechatApplyStatusByPeople()
  },
  methods: {
    getApplyState() {
      applyState()
        .then(data => {
          //   data.data = [
          //     {
          //       accountStatus: 'activated',
          //       naturalPerson: false,
          //       openStatus: 'unopen',
          //       openType: 'e_payment',
          //       statusContent: '状态内容',
          //       statusTitle: '状态标题'
          //     },
          //     {
          //       isSpecial: false,
          //       openStatus: 'unopen',
          //       openType: 'wechat_payment',
          //       statusContent: '状态内容',
          //       statusTitle: '状态标题'
          //     }
          //   ]
          let dataArr = data.data
          dataArr.forEach((item, index) => {
            if (item.openType === 'e_payment') {
              this.isExistZl = true
              this.jlData = dataArr[index] || {}
            }
            if (item.openType === 'wechat_payment') {
              this.isExistJl = true
              this.zlData = dataArr[index] || {}
            }
          })
        })
        .catch(e => {
          // errorToast.show(e.result.message)
          console.log(e)
        })
    },
    getMerchantAuthInfoByEntityId() {
      getMerchantAuthInfoByEntityId().then(data => {
        const { wechatAccountInfo } = data.data
        //支付管理中的微信支付切换成微信直连
        if (!wechatAccountInfo.ourAccount) {
          this.payChannelZl = true
        }
      })
    },
    // 获取微信直连开通状态
    getWechatApplyStatus() {
      getWechatApplyStatus().then(data => {
        if (data.data === 'APPLIED') {
          this.isApplyTe = true
        }
      })
    },
    getWechatApplyStatusByPeople() {
      getWechatApplyStatusByPeople().then(data => {
        data = data.data
        if (data.length >= 1) {
          if (data[0].directStatus === 4) {
            this.isApplyTe = true
          }
        } else {
          this.getWechatApplyStatus()
        }
      })
    },

    more() {
      this.isMore = !this.isMore
      this.isMore ? (this.moreText = '收起') : (this.moreText = '查看全部')
    },
    jumpInfo(item) {
      // 新版UI界面有改动 逻辑由以前老版迁移过来。
      /**
       * openType
       *   e_payment 间连
       *   wechat_payment 直连
       */
      let conditionsA = item.openStatus === 'unopen' //是否未开通
      let conditionsB = item.openStatus === 'no_permission' //是否需要补全
      let routerpath = [
        {
          path: '/input',
          query: {
            openType: item.openType
          }
        },
        {
          path: '/result',
          query: {
            openType: item.openType,
            openStatus: item.openStatus,
            title: item.statusTitle,
            content: item.statusContent,
            accountStatus: item.accountStatus
          }
        },
        {
          path: '/unbind'
        },
        {
          path: '/inactive',
          query: {
            accountStatus: item.accountStatus
          }
        },
        {
          path: '/natural',
          query: {
            // accountStatus: this.applyState.accountStatus
          }
        },
        {
          // 新增未开通时的介绍页面
          path: '/introduce',
          query: {
            openType: item.openType,
            naturalPerson: item.naturalPerson,
            accountStatus: item.accountStatus
          }
        }
      ]
      // 如果是已开通或者开通失败
      if (item.openStatus === 'opened' || item.openStatus === 'open_fail') {
        this.$router.push(routerpath[1])
      } else if (conditionsA) {
        // 未开通 先跳转到介绍页面
        this.$router.push(routerpath[5])
      } else if (conditionsB) {
        this.$router.push(routerpath[2])
      } else if (item.openType === 'e_payment' && !!item.naturalPerson) {
        this.$router.push(routerpath[4])
      } else {
        this.$router.push(routerpath[1])
      }
    },
    goApply(item) {
      //   if (item.openType === 'wechat_payment' && !this.isApplyTe) {
      //     hintToast.show('根据微信要求，请先开通“微信特约商户”再申请本活动。')
      //     return false
      //   }
      // 如果是直连
      if (item.openType === 'wechat_payment') {
        // 且支付渠道是微信直连
        if (this.payChannelZl) {
          this.jumpInfo(item)
          return false
        }
        if (!this.isApplyTe) {
          hintToast.show('根据微信要求，请先开通“微信特约商户”再申请本活动。')
          return false
        }
      }
      this.jumpInfo(item)
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

