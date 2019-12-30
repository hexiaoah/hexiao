<template>
    <div class="unbind-wrapper">
        <!--未激活-->
        <div v-if="accountStatus === 'unactivate'">
            <div class="un-active">
                <p class="title">您还未激活电子收款账户</p>
                <p class="content">申请微信支付优惠费率需要先激活电子收款账户</p>
            </div>
            <a href="javascript: void(0)"
               class="bind-btn"
               @click="activeAccount">点击激活电子收款账户</a>
        </div>

        <!--激活中-->
        <div v-if="accountStatus === 'activating'">
            <div class="activeing">
                <i class="applying"></i>
                <p class="title">电子收款账户激活中</p>
                <p class="content">电子收款账户激活动作将在24小时内完成，请耐心等待</p>
            </div>
        </div>

        <!--激活失败-->
        <div class="active-fail" v-if="accountStatus === 'activate_fail'">
            <i class="fail"></i>
            <p class="title">电子收款账户激活失败</p>
            <div class="content">
                <p>失败原因:</p>
                <p>出现当前错误属于正常现象，使用“点击修改电子收款账户”按钮，重新提交电子收款账户信息即可解决。</p>
            </div>
            <a href="javascript: void(0)"
               class="bind-btn"
               @click="changeAccount">点击修改电子收款账户</a>
        </div>
        <!-- <Info v-show="!isSuper" @close="close"></Info> -->
    </div>
</template>

<script>
import { activateAccount, judgeSuper, emergencyChange } from '../../config/api'
import hintToast from 'src/ocean/libs/hintToast'
// import errorToast from 'src/oasis/libs/errorToast'
// import Info from 'src/oasis/components/Info.vue'

export default {
  data() {
    return {
      accountStatus: '',
      isSuper: true,
      appUrl: 'tdf-manager://2dfire.com/payment/info?bizType=1'
    }
  },
  created() {
    document.titile = '电子收款账户商户申请'
    this.accountStatus = this.$route.query.accountStatus
    if (window.tdfire) {
      let app_version = window.tdfire.appVersion()
      if (app_version) {
        let versionNum = Number(app_version.replace(/\./g, ''))
        if (versionNum < 5830) {
          this.appUrl = 'tdf-manager://2dfire.com/payment/detail?bizType=1'
        }
      }
    }
  },
  methods: {
    activeAccount() {
      activateAccount()
        .then(data => {
          this.$router.push({
            path: '/inactive',
            query: {
              accountStatus: data.data
            }
          })
          this.accountStatus = data.data
        })
        .catch(e => {
          // errorToast.show(e.result.message)
          console.log(e)
        })
    },
    changeAccount() {
      judgeSuper()
        .then(data => {
          if (data.data) {
            emergencyChange()
              .then(data => {
                // this.isSuper = true
                window.location.href = this.appUrl
              })
              .catch(e => {
                // this.isSuper = true
                window.location.href = this.appUrl
              })
          } else {
            hintToast.show(
              '您没有收款账户的操作权限，请联系店铺管理者(老板或主管)开通权限。'
            )
          }
        })
        .catch(e => {
          // errorToast.show(e.result.message)
          console.log(e)
        })
    }
    // close() {
    //   this.isSuper = true
    // }
  },
  components: {
    // Info
  }
}
</script>

<style type="text/scss" lang="scss" scoped>

    .unbind-wrapper {
        padding-top: 202px;

        .title {
            font-size: 17PX;
            color: #333333;
            letter-spacing: 0;
            line-height: 22px;
            text-align: center;
        }

        .content {
            font-size: 13PX;
            color: #666666;
            letter-spacing: 0;
            line-height: 18px;
            margin-bottom: 36px;
            margin-top: 15px;
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
