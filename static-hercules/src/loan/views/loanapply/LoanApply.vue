<template>
  <div class="loan-wrapper">
    <div class="banner"></div>
    <div class="firstfloat">
      <p>
        二维火作为专业餐饮服务商，以让天下没有难开的店为使命。与宜信集团强强联合引进专业的金融服务为平台餐饮商家解决资金周转问题。
      </p>
      <p>
        商通贷是宜信集团专为小微企业主解决融资难题的实时授信金融产品，它基于大数据金融云平台，借款用户在线提交基本信息与实际经营数据进行实时授信，高效快捷的为用户解决资金周转。
      </p>
    </div>
    <div class="secondfloat">
      <a href="javascript: void(0)">一键借款 迅速到账</a>
    </div>
    <div class="thirdfloat">
      <a href="javascript: void(0)">四大优势 开店必备</a>
    </div>
    <div class="applynow">
      <open-app :options="openAppOptions">
        立即申请
      </open-app>
    </div>
    <p class="comment">注：常规审批时间2小时；极速模式下支持最快放款时间8分钟。</p>
  </div>
</template>
<script>
  import Requester from '../../../base/requester'
  export default {
    name: "LoanApply",
    data() {
      return {
        openAppOptions: {
          schemaurl: 'tdf-manager://2dfire.com/finance/loanCompany',
          iosdlurl: 'https://itunes.apple.com/cn/app/%E4%BA%8C%E7%BB%B4%E7%81%AB%E6%8E%8C%E6%9F%9C/id900873713?mt=8',
          androiddlurl: 'http://www.2dfire.com/downloadService.html'
        }
      }
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  .buttontitle{
    width: 410px;
    height: 72px;
    line-height: 72px;
    text-align: center;
    position: absolute;
    left: 50%;
    top: -36px;
    margin-left: -205px;
    color: white;
    font-size: 36px;
    display: block;
    background: #FA5B5D;
    box-shadow: 0 4px 8px 0 rgba(242,67,54,0.50), inset 0 4px 8px 0 rgba(239,163,163,0.50);
    border-radius: 36px;
    font-weight: 100;
  }

  .loan-wrapper{
    background-color: #f95c49;
    background-size: 750px 3140px;
    height: 3140px;
    background-image: url("../../images/bg@2x.jpg");

    .banner{
      width: 750px;
      height: 650px;
      background-size: cover;
      margin: auto;
      background-image: url("../../images/banner@2x.jpg");
    }

    .firstfloat{
      width: 690px;
      height: 458px;
      background-size: cover;
      margin: -42px auto 96px;
      box-shadow: 0 6px 20px rgba(105, 5, 5, 0.5);
      padding: 126px 50px 0;
      border-radius: 4PX;
      background-image: url("../../images/first@2x.jpg");

      p{
        font-size: 26px;
        text-indent: 1em;
        color: #A42525;
        line-height: 36px;
        letter-spacing:0;

        &:first-child{
          margin-bottom: 20px
        }
      }
    }

    .secondfloat{
      width: 710px;
      height: 862px;
      position: relative;
      background-size: cover;
      box-shadow: 0 2px 20px #c91B20;
      margin: auto;
      border-radius: 20px;
      margin-bottom: 98px;
      background-image: url("../../images/second@2x.jpg");

      a{
        @extend .buttontitle
      }
    }

    .thirdfloat{
      width: 710px;
      height: 764px;
      position: relative;
      background-size: cover;
      margin: auto;
      border-radius: 20px;
      box-shadow: 0 2px 20px #c91B20;
      background-image: url("../../images/third@2x.jpg");

      a{
        @extend .buttontitle
      }
    }

    .applynow{
      position: fixed;
      bottom: 0;
      left: 0;
      background: rgba(86, 10, 0, 0.73);
      width: 100%;
      height: 176px;
      padding-top: 40px;

      /deep/ a{
        margin: auto;
        display: block;
        width: 592px;
        height: 96px;
        line-height: 96px;
        text-align: center;
        font-size: 36px;
        color: white;
        border-radius: 52px;
        box-shadow: 0 4px 8px 0 rgba(255,124,11,0.50), inset 0 4px 6px 0 rgba(255,253,239,0.50);
        background-image: linear-gradient(-180deg, #FED962 0%, #FFA23C 100%);
        text-shadow: 0 2px 4px #DC8513;
      }
    }

    .comment{
      font-size: 24px;
      color: #BC2420;
      line-height: 28px;
      margin-left: 28px;
      margin-top: 30px;
      letter-spacing: 0;
    }
  }

</style>
