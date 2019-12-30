&<template>  
<!-- 填写资料页面 -->
    <div>
        <section class="main">
            <h3 class="h3">支付宝账号</h3>
             <ul class="input-main border-b border-t">
                 <info-input class="special" 
                            :title="'支付宝账号'"
                            :input-name="'alipayAccount'"
                            :max-length="'30'"
                            :explain="'此账号用于收款，需填写掌柜支付宝账号'"
                            :value="merchantInfo.alipayAccount">
                </info-input>
            </ul> 
        </section>

        <section class="main">
            <h3 class="h3">联系人信息</h3>
            <ul class="input-main border-b border-t">
                <info-input :title="'联系人名称'"
                            :input-name="'linkman'"
                            :max-length="'30'"
                            :value="merchantInfo.linkman">
                </info-input>
                <info-input :title="'联系人手机号'"
                            :input-name="'mobile'"
                            :input-type="'tel'"
                            :max-length="'11'"
                            :value="merchantInfo.mobile">
                </info-input>

                <info-input :title="'常用邮箱'"
                            :input-name="'email'"
                            :max-length="'50'"
                            :input-type="'email'"
                            :value="merchantInfo.email">
                </info-input>
            </ul>
        </section>

        <section class="main mb-20px">
            <h3 class="h3">经营信息</h3>
            <ul class="input-main border-b border-t">
                <info-select :title="'经营类目'"
                             :select-name="'industryType'"
                             :value="merchantInfo.industryType">
                </info-select>
                <div v-if="!isNeedGetInfo ||(isNeedGetInfo && merchantInfo.licensePhoto)" class="input-wrapper">
                    <li class="input-list photo  border-b">
                        <div class="name">
                            <span class="title">营业执照</span>
                            <span class="content" v-show="merchantInfo.licensePhoto == ''">选填</span>
                        </div>
                        <info-photo 
                                    :img-name="'licensePhoto'"
                                    :value="merchantInfo.licensePhoto">
                        </info-photo>
                    </li>
                </div>
                <info-input v-if="!isNeedGetInfo ||(isNeedGetInfo && merchantInfo.licenseNo)"
                            :title="'营业执照号码'"
                            :optionalType='true'
                            :input-name="'licenseNo'"
                            :max-length="'50'"
                            :value="merchantInfo.licenseNo">
                </info-input>

                <info-switch v-if="!isNeedGetInfo ||(isNeedGetInfo && merchantInfo.isLongValid)"
                            class="required" 
                            :title="'营业执照是否长期有效'"
                            :switch-name="'isLongValid'"
                            :value="merchantInfo.isLongValid">
                </info-switch>

                <info-select 
                            v-if="!isNeedGetInfo ||(isNeedGetInfo && merchantInfo.startTime)"
                            :title="'开始时间'"
                            :select-name="'startTime'"
                            :childStatus="true"
                            :optionalType='true'
                            :value="merchantInfo.startTime">
                </info-select>

                <info-select v-show="!merchantInfo.isLongValid && (!isNeedGetInfo ||(isNeedGetInfo && merchantInfo.endTime))" 
                            :title="'结束时间'"
                            :select-name="'endTime'"
                            :childStatus="true"
                            :optionalType='true'
                            :value="merchantInfo.endTime">
                </info-select>
                
                
                <div class="input-wrapper">
                    <li class="input-list photo required border-b">
                        <div class="name">
                            <span class="title">店铺门头照</span>
                            <span class="content" v-show="merchantInfo.shopPhoto == ''">必填</span>
                        </div>
                        <info-photo :title="'含完整招牌；门店门口照片清晰可见。'"
                                    :img-name="'shopPhoto'"
                                    :value="merchantInfo.shopPhoto">
                        </info-photo>
                    </li>
                </div>
            </ul>
        </section>
         <!--button-->
        <div class="footer" v-if="viewState!=='detail'">
            <div class="align-center btn">
                <button class="footer-button" @click="nextStep">立即申请</button>
            </div>
        </div>
        
        <!--底部弹窗-->
        <Picker></Picker>
        <!--日期选择器-->
        <BaseDatePicker :startDate="startDate" :endDate="endDate"></BaseDatePicker>
    </div>
</template>

<script>
import Picker from '../../components/info-picker'
import BtnCustomShort from '../../components/btn-custom-short.vue'
import { mapState, mapGetters, mapActions } from 'vuex'
import { inputValIsOk } from '../../libs/rules'
// import { isiOS } from '../../../base/utils/tool'
import errorToast from '../../libs/errorToast'
import tools from '../../libs/tools'
import API from '../../config/api'

export default {
  name: 'InputInformation',
  data() {
    return {
      isNextStep: true,
      startDate: new Date('1950'),
      endDate: new Date('2050'),
      source: this.$route.query.source,
      pageType: this.$route.query.pageType || 'edit',
      isNeedGetInfo: false //是否需要从服务端获取数据
    }
  },
  methods: {
    ...mapActions([
      'modifyInfo',
      'modifyInputInfo',
      'changeViewState',
      'saveMerchantInfo'
    ]),
    init() {
      const isNeed = this.$route.query.isNeedGetInfo
      if (isNeed === true || isNeed === 'true') {
        if (this.source !== 'fail') {
          this.isNeedGetInfo = true
        } else {
          this.isNeedGetInfo = false
        }
        this.getAlipayAuthInfo()
      } else {
        this.isNeedGetInfo = false
        this.getMerchantInfoString()
      }
    },
    getAlipayAuthInfo() {
      API.getAlipayAuthInfo({
        entityId: sessionStorage.getItem('entityId')
      })
        .then(data => {
          let info = tools.paramToMerchantInfo(data)
          let merchantInfoString = JSON.stringify(info)
          this.saveMerchantInfo(merchantInfoString) // 保存表单信息
          this.modifyInfo(info) // 重置商户信息
        })
        .catch(e => {
          this.getMerchantInfoString()
        })
    },
    getMerchantInfoString() {
      // 保存表单信息，用于点击返回按钮时对比表单内容是否变化
      let merchantInfoString = JSON.stringify(this.merchantInfo)
      this.saveMerchantInfo(merchantInfoString)
    },
    nextStep() {
      const self = this
      console.log(self.isNextStep, 'self.isNextStep')
      if (!self.isNextStep) {
        return false
      }
      self.isNextStep = false
      for (let i = 0, leg = self.merchantInfoKeys.length; i < leg; i++) {
        let key = self.merchantInfoKeys[i]
        const ret = inputValIsOk(self.merchantInfo[key], key)
        if (!ret.data) {
          self.isNextStep = true
          errorToast.show(ret.message)
          return false
        }
      }
      if (self.merchantInfo.licensePhoto === '') {
        self.$confirm({
          content:
            '未填写营业执照信息，将有单笔1000元，单日50000元限额。是否确认提交？',
          confirm: () => {
            self.authAlipayDirect()
          },
          cancel: () => {
            self.isNextStep = true
          }
        })
      } else {
        self.authAlipayDirect()
      }
    },
    authAlipayDirect() {
      const self = this
      if (
        self.merchantInfo.isLongValid === false &&
        self.merchantInfo.endTime &&
        self.merchantInfo.startTime
      ) {
        // 结束时间需大于开始时间
        if (
          self.changeDate(self.merchantInfo.endTime) <=
          self.changeDate(self.merchantInfo.startTime)
        ) {
          self.isNextStep = true
          errorToast.show('结束时间需大于开始时间')
          return false
        }
      } else {
        self.modifyInputInfo({ type: 'endTime', value: '' })
      }
      let param = tools.MerchantInfoToParam(self.merchantInfo)
      API.authAlipayDirect({ param }).then(data => {
        const applyTime = new Date().getTime()
        self.$router.replace({
          path: '/auth/auditing/auditing',
          query: { applyTime }
        })
      })
    },
    changeDate(strTime) {
      // 将字符串转换为日期格式
      let strBeginTime = strTime.replace('-', '/').replace('-', '/')
      let beginDate = new Date(Date.parse(strBeginTime))
      return beginDate
    },
    // 拦截原生返回事件
    backObserve() {
      const self = this
      if (window.tdfire && window.tdfire.requirePlugins) {
        eval(tdfire.requirePlugins(['observe']))
        // console.log(tdfire.requirePlugins(['observe']))
      }
      if (window.tdfire && window.tdfire.observe) {
        window.tdfire.observe(function(data) {
          console.log(data, 'data')
          if (data && data.type == 'left') {
            const { path } = self.$route
            console.log(path)
            if (
              path === '/input' &&
              self.merchantInfoString !== JSON.stringify(self.merchantInfo)
            ) {
              self.$confirm({
                // 这个是fire-ui中的组件
                content: '有信息修改，是否退出',
                confirm: () => {
                  window.history.back()
                }
              })
            } else if (path === '/redirect') {
              window.tdfire.pop()
            } else if (path === '/auth/auditing/auditing') {
              self.$router.replace({
                path: '/redirect'
              })
            } else {
              window.history.back()
            }
          }
        })
      }
    }
  },
  computed: {
    ...mapState(['viewState', 'merchantInfo', 'picker', 'merchantInfoString']),
    ...mapGetters(['merchantInfoKeys'])
  },
  components: {
    BtnCustomShort,
    Picker
  },
  created() {
    this.changeViewState(this.pageType)
    this.init()
    this.backObserve()
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
.main{
    /deep/ .special .explain{
         color: #FF0033;
    }
}

.footer {
    height: 336px;
    width: 100%;
    bottom: 0;
    position: relative;
    margin-top: 72px;

    .btn {
        text-align: center;

        .footer-button {
            background-color: #0088ff;
            width: 600px;
            height: 88px;
            border-radius: 12px;
            font-size: 30px;
            color: white;
            text-align: center;
            line-height: 40px;
            padding: 24px 30px;
            border: none;
        }
    }
}

</style>