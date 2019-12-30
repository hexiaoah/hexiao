<template>
    <div class="alert-apply">
        <div class="wrapper">
            <span @click="toBack" class="close"></span>
            <h3 class="title">请仔细阅读以下申请须知</h3>
            <ul class="rule">
                <li class="rule-list">
                    1、目前仅支持个体和企业商户申请；
                </li>
                <li class="rule-list">
                    2、商户简称和门头照一致，商户名称和营业执照一致；
                </li>
                <li class="rule-list">
                    3、需要在任意餐饮平台上开过店（美团，饿了么，口碑，大众点评，百度外卖）；
                </li>
                <li class="rule-list">
                    4、申请成功后，活动期间支付宝不收取支付手续费（具体活动结束时间请以通知为准）；
                </li>
                <li class="rule-list">
                    5、申请成功后，消费者通过支付宝支付的收入将会在T+1日结算到您申请的银行卡中（活动特殊，可能产生多笔入帐）；
                </li>
                <li class="rule-list">
                    6、活动结束后，将会恢复到原来的支付结算方式；
                </li>
                <li class="rule-list">
                    7、不建议口碑直连商户参与本活动，如需参与，需要先关闭口碑服务，否则将导致口碑服务无法使用（包括但不限于口碑优惠券核销，点餐等功能），具体可以联系客服协助处理（4000166588）；
                </li>
                <li class="rule-list">
                    提示：请尽快绑定电子收款帐户，以免活动结束后无法正常交易；活动结束前一周，会通过内部消息通知；
                </li>
            </ul>
            <div class="bottom">
                <label class="checkbox-wrapper">
                    <span class="checkbox"><input type="checkbox" v-model="isChecked"/><i
                            class="checkbox-bg"></i></span>
                    我已阅读并同意以上说明
                </label>
                <button class="btn-submit" :class="isChecked?' active':''" @click="toApply">确认</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'rule',
  data() {
    return {
      isChecked: false
    }
  },
  created() {},
  methods: {
    toApply() {
      if (!this.isChecked) {
        return false
      }
      this.isChecked = false
      this.$emit('hide')
      window.location.href = `ocean.html#/input/first/first`
    },
    toBack() {
      this.isChecked = false
      this.$emit('hide')
    }
  }
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

    .alert-apply {
        background: rgba(0, 0, 0, .5);
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        .wrapper {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -250px;
            margin-left: -172.5px;
            width: 345px;
            height: 450px;
            background: white;
            border-radius: 13px;
            .close {
                position: absolute;
                top: 1px;
                right: 1px;
                display: inline-block;
                width: 40px;
                height: 40px;
                background: url("https://assets.2dfire.com/frontend/30818e3f363f037134d50124f7e3fad9.png") no-repeat center;
                background-size: 12px;
            }
            .title {
                font-size: 15px;
                color: #333333;
                letter-spacing: 0;
                text-align: center;
                line-height: 20px;
                margin-top: 25px;
            }
            .rule {
                font-size: 13px;
                color: #666666;
                letter-spacing: 0;
                line-height: 18px;
                margin: 15px 5px 0;
                padding: 0 10px;
                height: 280px;
                overflow-y: auto;
                /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
                &::-webkit-scrollbar {
                    width: 3px;
                }

                /*定义滚动条轨道 内阴影+圆角*/
                &::-webkit-scrollbar-track {
                    border-radius: 3px;
                }

                /*定义滑块 内阴影+圆角*/
                &::-webkit-scrollbar-thumb {
                    border-radius: 3px;
                    background-color: #CCCCCC;
                }
                .rule-list {
                    margin-bottom: 18px;
                }
            }
            .bottom {
                background: #FFFFFF;
                box-shadow: 0 0 1px 0 #333333;
                border-radius: 0 0 13px 13px;
                height: 110px;
                .btn-submit {
                    display: block;
                    margin: 0 auto;
                    width: 300px;
                    background: #CCCCCC;
                    border-radius: 6px;
                    border: 0;
                    font-size: 15px;
                    color: #FFFFFF;
                    text-align: center;
                    line-height: 44px;
                    outline: none;
                    transition: .2s;
                    &.active {
                        background: #0088FF;
                    }
                }
            }
        }
    }

    .checkbox-wrapper {
        display: block;
        padding: 15px;
        font-size: 15px;
        color: #333333;
        letter-spacing: 0;
        line-height: 20px;
        .checkbox {
            .checkbox-bg {
                display: inline-block;
                vertical-align: middle;
                margin-top: -3px;
                width: 20px;
                height: 20px;
                background: url("https://assets.2dfire.com/frontend/98b1ffb4e490cf765122e9c4382f1a26.png") no-repeat center;
                background-size: 100%;
                transition: .2s;
            }
            input {
                position: absolute;
                opacity: 0;
                width: 0;
                &:checked + i.checkbox-bg {
                    background: url("https://assets.2dfire.com/frontend/c1418b70b132bf3e72f1c787ed6f3eeb.png") no-repeat center;
                    background-size: 100%;
                }
            }

        }
    }

</style>

