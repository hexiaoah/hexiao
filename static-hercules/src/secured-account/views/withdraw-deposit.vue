<template>
    <section class="withdraw-deposit">
        <div class="bank-info border-bottom border-top">
            <p class="bank-name">{{pageData.accountBank}}（{{pageData.bankCardNo | subStr}}）</p>
            <p class="bank-time">预计2小时内到账</p>
        </div>
        <div class="border-bottom item-wrap " >
           <div class="top">
               <span >提现金额（元）</span>
               <span class="right" @click="all">全部提现</span>
           </div>
           <input ref='inputDom' @input="inputChange" type="number" @blur="blur" class="input"  placeholder="请输入提现金额">
           <p class="availBln border-top">
               <span v-if="isTip" class="c-ff0033">{{tipText}}</span>
               <span v-else>可用余额：{{pageData.balance | fen2yuan}}元</span>
            </p>
        </div>
        <div class="btn-wrap" >
            <Btn @click="sure()" :disabled="isDisabled">确认提现</Btn>
            <p class="notice">本次提现不收取手续费</p>
        </div>
        <div class="main-notice ">
            提示：<br>
            请您尽量在8:00-20:00点之间发起提现操作，晚于20:00提现预计会顺延到第二天到账。
        </div>

         <Verify v-if="visible" :visible.sync="visible" @beyond='beyond' @apply-success='applySuccess' :moneyVal='query.money'></Verify>
    </section>
</template>

<script>
import Router from '@2dfire/utils/router'
import API from '../config/api'
import Btn from '../components/fire-button'
import Verify from '../components/verification'
import tools from '../utils/tools'

export default {
  name: 'withdraw-deposit',
  data() {
    return {
      isTip: false,
      isVal: false,
      isBeyond: false,
      visible: false,
      isNeedValidCode: true, // 提现是否需要验证码
      tipText: '',
      query: {
        money: ''
      },
      pageData: {
        balance: '',
        mobile: '',
        accountBank: '',
        bankCardNo: ''
      }
    }
  },
  components: {
    Btn,
    Verify
  },
  computed: {
    isDisabled() {
      return this.isTip || !this.isVal
    }
  },
  methods: {
    initData2() {
      const entityId = sessionStorage.getItem('entityId')
      // API.accountBankInfoQuery({ entityId }).then(data => {
      API.queryWithdrawBankAccountInfo({ entityId }).then(data => {
        this.pageData = data
        sessionStorage.setItem('currentAccount', JSON.stringify(data))
      })
    },
    all() {
      const val = tools.divide(this.pageData.balance, 100)
      this.$refs.inputDom.value = val
      if (val < 1) {
        this.tipText = '提现金额不能低于1元'
        this.isTip = true
      } else {
        this.isVal = true
      }
    },
    sure() {
      const val = this.$refs.inputDom.value
      this.query.money = val
      if (this.isBeyond) {
        this.$alert({
          confirmText: '我知道了',
          content: '由于验证码连续输入错误，提现暂不可用，请您明天再次尝试'
        })
        return false
      }
      if (this.isNeedValidCode) {
        this.visible = true
      } else {
        this.merchantWithdrawApply()
      }
    },
    // 发起提现申请
    merchantWithdrawApply() {
      const self = this
        const amount = tools.divide(self.query.money, 0.01, 0)
        const applyParams = {
          entityId: sessionStorage.getItem('entityId'),
          amount,
          validCode: 'noCheckValidCode'
        }
        // API.merchantWithdrawApply(applyParams)
        API.merchantWithdrawApplyNew(applyParams)
          .then(res => {
            if(res){ //只返回true 和 false
              self.$toast('操作成功')
              self.applySuccess()
            }else{
              self.$toast('操作失败，请再次尝试')
            }
          })
          .catch(e => {})
    },
    applySuccess() {
      const self = this
      self.visible = false
      self.$alert({
        confirmText: '我知道了',
        content: '提现操作成功，预计2小时内到账，请留意银行信息。',
        confirm: function() {
          // self.$router.push({
          //   path: '/index'
          // })
          window.location.href = `fm-bank.html`
        }
      })
    },
    beyond() {
      this.isBeyond = true
    },
    blur() {
      const reg = /,$/gi
      const val = this.$refs.inputDom.value.replace(reg, '')
      if (!val) {
        this.$refs.inputDom.value = ''
        this.isVal = false
        this.isTip = false
        this.tipText = ''
      }
    },
    // 金额输入验证
    inputChange(event) {
      let val = event.target.value.trim()
      const pattern = /^(?!0+(\.0+)?$)\d+(\.\d+)?$/ //匹配非负浮点数（正浮点数 + 0）
      const re = pattern.test(val)
      if (re) {
        if (val < 1) {
          this.tipText = '提现金额不能低于1元'
          this.isTip = true
        } else {
          this.isTip =
            Number(val) > Number(tools.divide(this.pageData.balance, 100))
          this.tipText = '输入金额超过可提现金额'
          this.isVal = true
        }
        let Arr = val.split('.')
        if (Arr[1] && Arr[1].length > 2) {
          Arr[1] = Arr[1].substr(0, 2)
          event.target.value = Arr.join('.')
        }
      } else {
        this.isTip = true
        this.tipText = '输入字符不合法'
      }
    }
  },
  created() {
    this.initData2()
  }
}
</script>

<style lang="scss" scoped>
    .withdraw-deposit {
        .bank-info {
            background: #ffffff;
            height: 120px;
            padding: 20px 30px 0;
            margin-bottom: 22px;
          .bank-name{
             font-size: 30px;
            color: #333333; 
            font-weight: bold;
            margin-bottom: 4px;
          }
          .bank-time{
             font-size: 26px;
             color: #999999;
          }
        }
        .item-wrap{
            height: 284px;
            background-color: #ffffff;
            margin-bottom: 72px;
            padding: 28px 30px 20px ;

            .top{
                display: flex;
                justify-content: space-between;
                font-size: 30px;
                color: #333333;
                margin-bottom: 6px;
                .right{
                    color: #0088FF;
                }

            }
            .input{
                padding: 20px;
                width: 100%;
                font-size: 80px;
                color: #333333;
                &::-webkit-input-placeholder { /* WebKit browsers */
                    color: #CCCCCC;
                    font-size: 48px;
                    line-height: 100px;
                }
            }
            .availBln{
                padding-top: 20px;
                font-size: 26px;
                color: #666666;
            }
        }
        .btn-wrap{
           padding: 0 76px;
           .notice{
                font-size: 26px;
                color: #999999;
                text-align: center;
                margin-top: 20px;
           }
        }
        .main-notice{
                font-size: 26px;
                color: #999999;
                margin-top: 72px;
                padding: 0 30px;
        }

    
    }
</style>