<template>
<div class="main-wrap">
    <h3 class="title">微信商户实名认证流程</h3>
    <p>1. 商户实名认证:商户扫描渠道商拓展二维码后，按页面指引提交商家联系人信息、 营业执照照片、法人/经营者身份证照片，并进行主体身份验证。一个营业执照仅 需注册一次。</p>
    <p>　i. 选择商家主体类型(若商家主体已经注册，可直接跳到商户号授权步骤)</p>
    <img class="pic" src="https://assets.2dfire.com/frontend/9e9b389a9798cd4fae5d52695046adf0.png" alt="">
    <p>ii. 填写联系人姓名及手机号码</p>
    <p>　联系信息中的微信号会根据实际扫描的微信号自动带出，填写的姓名、联系方式必须是与微信号为同一个人的信息。</p>
    <img class="pic" src="https://assets.2dfire.com/frontend/bacf98e9a544c7acf116651084ab4b50.png" alt="">
    <p>iii. 提交商家营业执照信息</p>
     <!-- <img class="pic" src="https://assets.2dfire.com/frontend/a742b1cdc1633276ba742744389fd179.png?x-oss-process=image/format,jpg" alt=""> -->
    <img class="pic" src="https://assets.2dfire.com/frontend/c725e1c07130a8879e6212fce55531db.png?x-oss-process=image/format,jpg" alt="">
    <img  class="pic" src="https://assets.2dfire.com/frontend/c5f1f47650a24c7efc73f085d5e7a9af.png?x-oss-process=image/format,jpg" alt="">
    <p>iv. 提交商家法人/经营者身份证信息</p>
    <img class="pic" src="https://assets.2dfire.com/frontend/34192fc1f48006fc1a8ba3549e7e101e.png?x-oss-process=image/format,jpg" alt="">
     <p>v. 按指引进行商家身份验证</p>
     <p>　1. 个体户商家可使用“经营者的已认证并绑定银行卡微信号”扫二维码进行商家身份验证;</p>
     <p>　2. 企业商家可使用“法定代表人的已认证并绑定银行卡微信号” 扫二维码进行商家身份验证;也可以使用“对公账户汇款”来进行商家身份验证;</p>
     <img class="pic" src="https://assets.2dfire.com/frontend/36877266e1335d591375ae1a242dd4fc.jpg" alt="">
    <p>　3. 企业商家若使用 “对公账户汇款”进行验证，需要商家使用对公账户往微 信支付指定的银行卡号汇入一笔指定金额(0.01 元~1 元)。</p>
     <img class="pic" src="https://assets.2dfire.com/frontend/3bdb4f8a19698d72be48fe963f7d2c85.png" alt="">
    <p>vi. 商户号授权:完成商户实名认证后，商家需再次扫描渠道商拓展二维码，点击授权方，输入微信子商户号，勾选对应的商户号，完成商户号授权。注意:只有商户全称与所注册商家名称一致的商户号才能进行授权。</p>
    <p class="red">　点击搜索，进去。输入微信子商户号，搜索出的信息，确认正确后点击添加。授权方下出现如下信息，核实正确后，点击同意授权。</p>
     <img class="pic" src="https://assets.2dfire.com/frontend/c7a80973d1bf7d74e4e546f6a345b430.png" alt="">
</div>
</template>
<script>
import Router from '@2dfire/utils/router'

export default {
  data() {
    return {}
  },
  methods: {},
  components: {},
  created() {
    document.title = '微信商户实名认证流程'
  }
}
</script>
<style lang="scss" scoped>
.main-wrap{
    padding: 40px 30px;
    .title{
        text-align: center;
        font-size: 36px;
        font-weight: bold;
        margin-bottom: 15px;
    }
    p{
         font-size: 32px;
         line-height: 40px;
         color: #333333;
         margin: 10px 0;
    }
    .red{
        color: red;
    }
    .pic{
        width: 100%;
        display: block;
        margin: 20px 0 40px 0;
    }
    
}
</style>

