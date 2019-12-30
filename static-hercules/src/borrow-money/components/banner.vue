<template>
    <div class="card-wrap">
      <h3 class="title">{{mainData.name}}</h3>
      <p class="limit-desc">最高借款额度（元）</p>
      <p class="limit">{{mainData.preMaxAmount*10000|number(2)}}</p>
      <div v-if="btnShow" class="btn" @click="toDetail">
        立即前往
      </div>
      <div class="specialty">
        <span v-if="mainData.feature1">{{mainData.feature1}}</span>
        <span v-if="mainData.feature2">{{mainData.feature2}}</span>
      </div>
    </div>
</template>

<script>
export default {
  name: 'banner',
  props: {
    mainData: {
      type: Object,
      default() {
        return {}
      }
    },
    btnShow: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  components: {},
  data() {
    return {}
  },
  methods: {
    toDetail() {
      this.$emit('on-tap', this.mainData)
    }
  }
}
</script>

<style lang="scss" scoped>
.card-wrap {
  position: relative;
  width: 690px;
  height: 320px;
  padding: 20px;
  color: #ffffff;
  font-size: 24px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0px 8px 12px #6da2fd;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url("https://assets.2dfire.com/frontend/9741b2993932b0a4d4cd99a547620211.png");
  .title {
    font-weight: bold;
    font-size: 32px;
    text-align: left;
    line-height: 40px;
  }
  .limit-desc {
    position: absolute;
    width:100%;
    top:48px;
    text-align: center;
    line-height: 32px;
  }
  .limit {
    font-weight: bold;
    font-size: 50px;
    line-height: 60px;
    letter-spacing: 2px;
    margin-top:44px;
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 24px auto;
    width: 180px;
    height: 56px;
    background: #ffffff;
    box-shadow: 0 4px 8px 0 rgba(74, 108, 255, 0.57);
    border-radius: 34px;
    font-weight: bold;
    font-size: 28px;
    color: #4a6cff;
  }
  .specialty {
    text-align: center;
    span {
      display: inline-block;
      position: relative;
      vertical-align: top;
      line-height:32px;
      &:first-child{
        margin:0 166px 0 42px;
      }
      &::before {
        content: "";
        position: absolute;
        left: -42px;
        top: 0;
        width: 32px;
        height: 32px;
        background: url("../images/icon_specialty.png") no-repeat
          center;
        background-size: cover;
      }
    }
  }
}
</style>
