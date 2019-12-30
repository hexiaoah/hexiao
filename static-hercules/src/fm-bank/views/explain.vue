<template>
    <section class="explain">
        <div class="main-wrap">
            <p>1.用户通过火拼拼拼团业务购买的商家会员卡，根据《消保法》规定，当用户发起退款时，应该退款给用户；</p>
            <p>2.为了保障用户能够正常退款以及方便商家清晰对账，用户购买会员卡的储值金额会冻结，由支付机构放在备付金账户，受央行监管；</p>
            <p>3.单店商家每日结算时，用户前一日核销的本金金额，会统一结算给商家；</p>
            <p>（本金金额：拼团业务可以让用户以折扣价买到商户设置的拼团会员卡，例如：以140元（7折）的折扣买到200元面额会员卡，定义140元为本金，60元为赠送金，200元为卡余额，当用户使用拼团会员卡消费时，等比例扣减本金和赠送金）；</p>
            <p>4.连锁总部商家每日结算时，用户前一日在各门店核销的本金金额，会统一结算给各门店，实现连锁-门店的会员卡自动清分；</p>
            <p>5.当用户发起退款时，会从冻结账户退款给用户。</p>
        </div>
        
    </section>
</template>

<script>
export default {
  name: 'explain',
  components: {},
  data() {
    return {}
  },
  computed: {},
  methods: {},
  created() {}
}
</script>

<style lang="scss" scoped>
    .explain {
        background: #F7F8FA;
        
    }
    .main-wrap{
        background: #FFFFFF;
        padding: 30px;
        font-size: 26px;
        color: #333333;
        line-height: 36px;
        border-bottom: 1px solid #ccc;
        p{
            margin: 6px 0;
        }
    }
</style>