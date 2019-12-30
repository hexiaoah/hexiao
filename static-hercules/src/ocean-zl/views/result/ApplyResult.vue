<template>
    <div class="result-wrapper">
        <!--申请审核中-->
        <div class="applying-wrapper" v-if="openStatus === 'ALIPAY_BLUE_SEA_AUDITING'">
            <i class="applying"></i>
            <p class="title">审核中</p>
            <p class="content reason">提交成功，支付宝预计2个工作日内审核完成，还请你耐心等待。</p>
            <span class="view-material" @click="viewInfo">查看已递交的材料</span>
        </div>
        <!--申请失败-->
        <div class="fail-wrapper" v-if="openStatus === 'ALIPAY_BLUE_SEA_AUDIT_FAIL'">
            <i class="fail"></i>
            <p class="title">审核失败</p>
            <div class="content">
                <p class="reason"><span>失败原因：</span>{{auditMessage}}</p>
            </div>
            <span class="view-material result-btn" @click="applyAgain">重新申请</span>
        </div>
        <!--申请成功-->
        <div class="success-wrapper" v-if="openStatus === 'ALIPAY_BLUE_AUDIT_SUCCESS'">
            <i class="success"></i>
            <p class="title">申请成功</p>
            <p class="content">恭喜你，申请成功！现在开始享受超低的费率！</p>
            <span class="view-material" @click="viewInfo">查看已递交的材料</span>
        </div>
    </div>
</template>

<script>
import { getApplyStatus } from '../../config/api'
import { mapActions } from 'vuex'

export default {
  name: 'ApplyResult',
  data() {
    return {
      auditMessage: '',
      openStatus: ''
    }
  },
  created() {
    let { openStatus } = this.$route.query
    this.openStatus = openStatus
    this.getApplyStatus()
  },
  methods: {
    ...mapActions(['changeViewState', 'updataShopInfo']),
    // 重新申请
    applyAgain() {
      this.changeViewState('edit')
      this.$router.push({ path: '/input' })
    },
    // 查看申请资料
    viewInfo() {
      this.changeViewState('detail')
      this.$router.push({ path: '/input' })
    },
    getApplyStatus() {
      const params = {
        entityId: sessionStorage.getItem('entityId') || '',
        applyType: 'ALIPAY_BLUE_SEA'
      }
      getApplyStatus(params)
        .then(data => {
          console.log(data)
          /**
           * auditStatus
           *    ALIPAY_BLUE_SEA_AUDITING:审核中
           *    ALIPAY_BLUE_AUDIT_SUCCESS:审核成功
           *    ALIPAY_BLUE_SEA_AUDIT_FAIL:审核失败
           */
          let { auditStatus, auditMessage, alipayBlueSeaInfo } = data
          if (auditStatus) {
            this.openStatus = auditStatus
            this.auditMessage = auditMessage
            this.updataShopInfo(alipayBlueSeaInfo)
          } else {
            window.location.replace(
              './oasis.html#/introduce?openType=alipay_zl&openStatus=unopen'
            )
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
    .result-wrapper {

        i {
            display: block;
            width: 29px;
            height: 29px;
            margin: 0 auto 20px;
            background-repeat: no-repeat;
            &.applying {
                background-image: url(https://assets.2dfire.com/frontend/b5558aafd495fa5f5f26dc44f17ca784.png);
                background-size: cover;
            }
            &.fail {
                background-image: url(https://assets.2dfire.com/frontend/9a3d5a07f4fe2591ec0ac54877b8c1a0.png);
                background-size: cover;
            }
            &.success {
                background-image: url(https://assets.2dfire.com/frontend/2a92d2054af1e46f78aa5163a94a5d77.png);
                background-size: cover;
            }
        }

        .title {
            font-size: 17PX;
            color: #333333;
            letter-spacing: 0;
            line-height: 22px;
            text-align: center;
            margin-bottom: 15px;
        }

        .content {
            font-size: 13PX;
            color: #666666;
            line-height: 18px;
            text-align: center;
            padding: 0 30px 15px;
            letter-spacing: 0;
            word-wrap: break-word;
            .reason{
                width: 200px;
                margin: 0 auto;
            }
        }

        .view-material {
            font-size: 13PX;
            color: #0088FF;
            line-height: 18px;
            text-align: center;
            display: block;
        }

        .applying-wrapper {
            padding-top: 183px;
        }

        .fail-wrapper {
            padding-top: 160px;

            .content {
                margin-bottom: 36px;
            }

            a {
                width: 300px;
                height: 44px;
                background: #0088FF;
                border-radius: 6px;
                font-size: 15PX;
                color: #FFFFFF;
                line-height: 44px;
                display: block;
                text-align: center;
                margin: auto;
            }
        }

        .success-wrapper {
            padding-top: 218px;
        }
        .result-btn {
            width: 300px;
            height: 44px;
            background: #0088FF;
            border-radius: 6px;
            font-size: 15PX;
            color: #FFFFFF;
            line-height: 44px;
            display: block;
            text-align: center;
            margin: auto;
        }
    }
</style>

