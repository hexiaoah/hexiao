<template>
  <div class="apply-steps-wrap">
    <Shadow :show="show"></Shadow>
    <div class="agreement-box" v-show="show">
      <div class="top">
        <p class="dialog-title">用户授权协议</p>
        <i class="icon-x" @click="close()"></i>
      </div>
      <div class="content">
        <p><b>重要提示</b></p>
        <p class="text-indent">
          <b>
            为了保障您的合法权益，您应当阅读并遵守本授权书，请您务必审慎阅读、充分理解授权书条款内容，特别是免除或者减轻杭州迪火科技有限公司（以下简称“被授权人”）责任，或限制您权利的条款，其中免除或者减轻责任条款可能以加粗形式提示您注意。
          </b>
        </p>
        <p class="text-indent">
          <b>
            除非您已阅读并接受本授权书所有条款，否则您无权使用二维火为您提供的“借款超市产品推荐”服务。您的使用、登录、提交信息等行为即视为您已阅读并同意本授权书条款的约束。
          </b>
        </p>
        <br />
        <p>杭州迪火科技有限公司：</p>
        <p class="text-indent">
          本人充分理解并同意，“借款超市平台推荐”服务是杭州迪火科技有限公司（以下简称“二维火”）于微信公众号“二维火吃喝购”中为本人提供的借款超市平台推荐服务。本人开通该项服务后，即可访问二维火所推荐的借款超市平台选择、申请相关借款产品，并与借款超市及借款产品提供方缔结相关借贷法律关系，该借贷法律关系仅对本人与借款超市及借款产品提供方产生约束力，与二维火无关。现本人主动申请开通此项服务，并就验证本人个人信息作出如下授权。
        </p>
        <br />
        <p class="text-indent">
          <b>
            一、本人同意并授权，二维火可收集、存储和使用本人于“验证个人信息”页面所填写的个人信息；
          </b>
        </p>
        <p class="text-indent">
          <b>
            二、本人同意并授权，为便于二维火为本人推荐更好的借款超市平台，二维火可以将本人的姓名、手机号及其他相关必要信息传输给与二维火有合作关系的借款超市平台使用。
          </b>
        </p>
        <p class="text-indent">
          <b>
            三、本人同意并授权，为便于二维火为本人提供或推荐更优质的产品和服务体验，本人授权二维火可以将前述信息分享给其他必要的合作伙伴，并向本人推荐优质的产品和服务。
          </b>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Shadow from './shadow'

export default {
  name: 'agreement',
  props: ['show'],
  components: {
    Shadow
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.agreement-box {
  position: fixed;
  width: 80%;
  height: 80%;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  background-color: #fff;
  border-radius: 20px;
  z-index: 101;
  padding: 20px;
  .top {
    height: 80px;
    line-height: 80px;
    .dialog-title {
      text-align: center;
      font-size: 32px;
      font-weight: 500;
    }
    .icon-x {
      position: absolute;
      top: 18px;
      right: 18px;
      width: 40px;
      height: 40px;
      background-image: url('https://assets.2dfire.com/frontend/e37aa2b9ad645208b707fbce7c740745.png');
      background-repeat: no-repeat;
      background-size: 20px 20px;
      background-position: center;
    }
  }
  .content {
    height: calc(100% - 80px);
    overflow-y: auto;
    .text-indent {
      text-indent: 56px;
    }
    .title {
      text-align: center;
      font-weight: 600;
      margin: 28px 0;
    }
  }
}
</style>
