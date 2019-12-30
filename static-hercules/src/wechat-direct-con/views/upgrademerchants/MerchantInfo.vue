<template>
    <div>
        <section class="main">
            <h3 class="h3">基本信息</h3>
            <ul class="input-main border-b border-t">

                <info-input :title="'门店名称'" :input-name="'shopName'" :childStatus="false"
                    :value="merchantInfo.shopName" />
                <info-input :title="'店铺所在地'" :input-name="'shopAddress'" :childStatus="false"
                    :value="merchantInfo.shopAddress.province.name+merchantInfo.shopAddress.city.name" />
                <info-input :title="'详细地址'" :input-name="'detailAddress'" :childStatus="false"
                    :value="merchantInfo.detailAddress" />
                <div class="input-wrapper">
                    <li class="input-list photo required border-b">
                        <div class="name">
                            <span class="title">店铺门头照</span>
                        </div>
                        <info-photo :title="''" :img-name="'shopLicensePic'" :value="merchantInfo.shopLicensePic" />
                    </li>
                </div>
                <div class="input-wrapper">
                    <li class="input-list photo required border-b">
                        <div class="name">
                            <span class="title">店铺环境照</span>
                        </div>
                        <info-photo :title="''" :img-name="'shopEnvironmentPic'"
                            :value="merchantInfo.shopEnvironmentPic" />
                    </li>
                </div>

                <info-input :title="'客服电话'" :input-name="'serviceTel'" :max-length="'50'"
                    :value="merchantInfo.serviceTel" :explain="'将在交易记录中向买家展示，请确保电话畅通以便微信回拨确认。'" />

                <info-input :title="'服务类型'" :input-name="'serviceType'" :max-length="'50'"
                    :value="merchantInfo.serviceType" />
            </ul>
        </section>

        <section class="main">
            <h3 class="h3">身份信息</h3>
            <ul class="input-main border-b border-t">
                <div class="input-wrapper">
                    <li class="input-list photo required border-b">
                        <div class="name">
                            <span class="title">身份证正面</span>
                        </div>
                        <info-photo :title="'要求：卡片完整，字迹清晰。'" :img-name="'idCardFront'" :value="merchantInfo.idCardFront"/>
                    </li>
                </div>
                <div class="input-wrapper">
                    <li class="input-list photo required border-b">
                        <div class="name">
                            <span class="title">身份证反面</span>
                        </div>
                        <info-photo :title="'要求：卡片完整，字迹清晰。'" :img-name="'idCardReverse'" :value="merchantInfo.idCardReverse"/>
                    </li>
                </div>
                <info-input :title="'身份证姓名'" :input-name="'idCardName'" :max-length="'50'"
                    :value="merchantInfo.idCardName" />
                <info-input :title="'证件号码'" :input-name="'idCardNumber'" :max-length="'50'"
                    :value="merchantInfo.idCardNumber" />
                <info-input :title="'身份证有效期'" :input-name="'startDate'" :max-length="'50'"
                    :value="merchantInfo.startDate.replace(/\-/g, '.')+' - '+merchantInfo.endDate.replace(/\-/g, '.')" />
            </ul>
        </section>

        <section class="main">
            <h3 class="h3">收款信息</h3>
            <ul class="input-main border-b border-t">
                <info-input :title="'商户简称'" :input-name="'userSimpleName'" :max-length="'50'"
                    :value="merchantInfo.userSimpleName" :explain="'将在支付完成页向买家展示，需与商家的实际经营场景相符'" />
                <info-input :title="'开户名称'" :input-name="'accountName'" :max-length="'50'"
                    :value="merchantInfo.accountName" :explain="'必须与身份证姓名一致'" />
                <info-input :title="'开户银行'" :input-name="'accountBank'" :max-length="'50'"
                    :value="merchantInfo.accountBank" />
                <info-input :title="'银行卡号'" :input-name="'accountNumber'" :max-length="'50'"
                    :value="merchantInfo.accountNumber" />
                <info-input :title="'开户省'" :input-name="'accountAddressProvince'" :max-length="'50'"
                    :value="merchantInfo.accountAddressProvince" />
                <info-input :title="'开户市'" :input-name="'accountAddressCity'" :max-length="'50'"
                    :value="merchantInfo.accountAddressCity" />

                <info-input :title="'开户支行'" :input-name="'accountSubBank'" :max-length="'50'"
                    :value="merchantInfo.accountSubBank" />
            </ul>
        </section>

        <section class="main">
            <h3 class="h3">联系信息</h3>
            <ul class="input-main border-b border-t">
                <info-input :title="'联系人姓名'" :input-name="'idCardName'" :max-length="'50'"
                    :value="merchantInfo.idCardName" />
                <info-input :title="'手机号码'" :input-name="'userTelNumber'" :max-length="'50'"
                    :value="merchantInfo.userTelNumber" />
                <info-input :title="'联系邮箱'" :input-name="'userEmailNumber'" :max-length="'50'"
                    :value="merchantInfo.userEmailNumber" :explain="'用于获取审核进度通知，请仔细填写。'" />
            </ul>
        </section>
        <div class="footer" />
        <div v-show="isShow" class="edit" @click="edit"></div>
        <!--底部弹窗-->
        <popup class="popup"
               title="请选择修改内容"
               v-model="ispopShow"
               :list="popList"></popup>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { create } from 'domain'
import API from '../../config/api'
import tools from 'src/wechat-direct-con/libs/tools'
import Popup from '../../components/popup.vue'
import Clipboard from 'clipboard'
import { isRestApp } from '../../../base/utils/tool'

export default {
  name: 'merchantInfo',
  data() {
    return {
      isShow: false,
      popList: [
        {
          name: '商户信息',
          routerPath: '/edituserinfo'
        },
        {
          name: '收款银行卡',
          routerPath: '/editbankcard',
          query: { upgradeSigning: false }
        }
      ]
    }
  },
  computed: {
    ...mapState(['merchantInfo', 'ispopShow'])
  },
  created() {
    this.changeViewState('detail')
    this.init()
    if (
      isRestApp() &&
      (this.$route.query.canEditInfo === true ||
        this.$route.query.canEditInfo === 'true')
    ) {
      this.isShow = true
    }
  },
  components: {
    Popup
  },
  methods: {
    ...mapActions(['changeViewState', 'saveIsPopShow']),
    ...mapActions(['modifyInputInfo']),
    init() {
      API.getWxXwAuthInfoAndUpgradeInfo({
        entityId: sessionStorage.getItem('entityId')
      }).then(data => {
        let info = tools.paramToXwMerchantInfo(
          data.paymentWxXwAuthExtInfo,
          this.merchantInfo
        )
        this.modifyInputInfo(info) // 修改商户信息
        if (info.idCardEffLongTime === true) {
          this.modifyInputInfo({
            type: 'endDate',
            value: '长期'
          })
        }
      })
    },
    edit() {
      this.saveIsPopShow(true)
    }
  }
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .footer {
        height: 168px;
        width: 100%;
        bottom: 0;
        position: relative;
        margin-top: 36px;
        .btn {
            text-align: center;
        }
    }
    .edit{
        position: fixed;
        bottom: 10px;
        right: 20px;
        width: 112px;
        height: 112px;
        border-radius: 50%;
        background-image: url('https://assets.2dfire.com/frontend/d81ca08c14317cf074a2480391b07110.png');
        background-repeat: no-repeat;
        background-size: cover;
       
    }

</style>