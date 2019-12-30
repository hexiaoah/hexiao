<template>
    <div class="unbind-wrapper">
        <!--未激活-->
        <div v-if="accountStatus === 'NO_AUTH'">
            <div class="un-active">
                <i class="unactive-icon"></i>
                <h3 class="notice">通知</h3>
                <p class="content">你还未绑定收款银行卡<br>请前往二维火掌柜【绑定银行卡】模块进行<br>绑定！绑定后即可用申请本活动！</p>
            </div>
            <a href="javascript: void(0)"
               class="bind-btn"
               @click="changeAccount">立即绑定收款银行卡</a>
        </div>

        <!--激活中-->
        <div v-if="accountStatus === 'AUDITING'">
            <div class="activeing">
                <i class="applying"></i>
                <p class="title">绑定收款银行卡审核中</p>
                <p class="content">请留意绑卡进度，预计24小时内完成，完成后即可申请本活动！</p>
            </div>
        </div>

        <!--激活失败-->
        <div class="active-fail" v-if="accountStatus === 'AUTH_FAIL'">
            <i class="unactive-icon"></i>
             <h3 class="notice">通知</h3>
            <div class="content">
                <p>由于合作方要求，需要重新提交绑定银行卡<br>信息，才可以申请支付宝优惠费率活动。</p>
            </div>
            <a href="javascript: void(0)"
               class="bind-btn"
               @click="changeAccount">立即重新提交</a>
        </div> 
        <Info v-show="!isSuper" @close="close"></Info>
    </div>
</template>

<script>
import { checkIfAuthByBizType, judgeSuper } from '../../config/api'
import Info from 'src/oasis/components/Info.vue'

export default {
  data() {
    return {
      isSuper: true,
      accountStatus: '',
      appUrl: 'tdf-manager://2dfire.com/payment/info?bizType=4'
    }
  },
  components: {
    Info
  },
  created() {
    this.checkIfAuthByBizType()
    if (window.tdfire) {
      let app_version = window.tdfire.appVersion()
      if (app_version) {
        let versionNum = Number(app_version.replace(/\./g, ''))
        if (versionNum < 5830) {
          this.appUrl = 'tdf-manager://2dfire.com/payment/detail?bizType=4'
        }
      }
    }
  },
  methods: {
    checkIfAuthByBizType() {
      const params = {
        entityId: sessionStorage.getItem('entityId') || '',
        bizType: 'BLUE'
      }
      checkIfAuthByBizType(params)
        .then(data => {
          if (data === 'AUTH_SUCCESS') {
            this.$router.replace({ path: '/input-tl' })
          } else {
            this.accountStatus = data
          }
          //   this.accountStatus = 'AUDITING'
        })
        .catch(e => {})
    },
    close() {
      this.isSuper = true
    },
    activeAccount() {},
    changeAccount() {
      judgeSuper()
        .then(data => {
          if (data) {
            this.isSuper = true
            window.location.href = this.appUrl
          } else {
            this.isSuper = false
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>

    .unbind-wrapper {
        padding-top: 202px;
        .notice{
            font-size: 17px;
            color: #333333;
            text-align: center;
        }
        .title {
            font-size: 17PX;
            color: #333333;
            letter-spacing: 0;
            line-height: 22px;
            text-align: center;
        }

        .content {
           font-size: 13px;
            color: #666666;
            letter-spacing: 0;
            line-height: 18px;
            margin:15px 20px 36px;
            text-align: center;
            padding: 0 15px;
        }

        a {
            width: 300px;
            background: #0088FF;
            border-radius: 6px;
            font-size: 15PX;
            color: #FFFFFF;
            line-height: 44px;
            margin: auto;
            display: block;
            text-align: center;
        }
    }

    i {
        width: 29px;
        height: 29px;
        background-size: cover;
        background-repeat: no-repeat;
        display: block;
        margin: 0 auto 20px;
        &.unactive-icon {
            background-image: url(https://assets.2dfire.com/frontend/5229b39f7cd42a6c9f420da79cf0b26c.png);
        }
        &.applying {
            background-image: url(https://assets.2dfire.com/frontend/b5558aafd495fa5f5f26dc44f17ca784.png);
        }

        &.fail {
            background-image: url(https://assets.2dfire.com/frontend/9a3d5a07f4fe2591ec0ac54877b8c1a0.png);
        }

        &.success {
            background-image: url(https://assets.2dfire.com/frontend/2a92d2054af1e46f78aa5163a94a5d77.png);
        }
    }

</style>
