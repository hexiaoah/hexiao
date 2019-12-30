<template>
    <div class="index-wrapper">
        <h3 class="notice red">如果您已上传完整且正确的营业执照信息，此流程可忽略</h3>
        <h3 class="notice padding-b20"> 如果您未上传正确的营业执照信息或营业执照信息不完整，可按以下流程进行升级，升级后支付宝收款无限额（不升级将有单笔1000元，单日50000元限额）。</h3>
        <h3 class="title">1.点击网址<a class="link" href="https://b.alipay.com">https://b.alipay.com</a>进入支付宝商家中心，手机支付宝APP扫码登录。</h3>
       <img class="img" src="https://assets.2dfire.com/frontend/5999a156bee5a6ff6e9cf7cd326bde66.png" alt="">
        <h3 class="title">2.进入支付宝商家中心首页后，点击产品中心——产品签约管理。</h3>
       <img class="img" src="https://assets.2dfire.com/frontend/83c1a6e77f1f980ad6a4e6e8a06fc662.png" alt="">
       <img class="img" src="https://assets.2dfire.com/frontend/13bc4b17fe30ced5941b28b0beca6293.png" alt="">
       <h3 class="title">3.选择当面付快捷版，点击补全资料。</h3>
       <img class="img" src="https://assets.2dfire.com/frontend/0126dd55aafed82cc335df1dd530073e.png" alt="">
       <h3 class="title">4.填写需要补全的资料（上传营业执照，填写营业执照有效期、注册号等信息），点击下一步即可。</h3>
       <img class="img" src="https://assets.2dfire.com/frontend/b5aa7c515b3a35fb0f54cee7f0a10fe0.png" alt="">
       <h3 class="title">5.提交后支付宝会进行审核，如审核未通过，可重复以上步骤重新补全资料。</h3>
    </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {},
  computed: {},
  created() {}
}
</script>
<style type="text/scss" lang="scss" scoped>
    .index-wrapper{
        padding-top: 30px;
        padding-bottom: 30px;
        background-color: #ffffff;
        .red{
            color: red;
        }
        .notice{
            font-size: 28px;
            font-weight: bold;
            padding: 0 15px;
        }
        .padding-b20{
            padding-bottom: 20px;
        }
        .title{
            font-size: 28px;
            font-weight: bold;
            padding: 20px 15px;
            .link{
                color:#0088ff;
                text-decoration:underline;
            }
        }
        .img{
            padding: 5px 20px;
            display: block;
            width: 100%;
        }
    }

</style>

