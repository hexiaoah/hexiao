<template>
    <div class="card-wrap">
        <h3 class="title">{{mainData.name}}</h3>
        <p class="limit-desc">最高借款额度（元）</p>
        <p class="limit">{{mainData.preMaxAmount*10000|number(2)}}</p>
        <div v-if="btnShow" class="btn" @click="toDetail">
            查看详情
        </div>
        <div class="specialty">
            <span v-if="mainData.feature1">{{mainData.feature1}}</span>
            <span v-if="mainData.feature2">{{mainData.feature2}}</span>
        </div>

    </div>
</template>

<script>
export default {
  name: 'main-banner',
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
  width: 690px;
  min-height: 320px;
  padding: 20px;
  color: #ffffff;
  font-size: 28px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0px 8px 12px #6da2fd;
  margin-bottom: 60px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url("https://assets.2dfire.com/frontend/9741b2993932b0a4d4cd99a547620211.png");
  .title {
    font-weight: bold;
    font-size: 36px;
    text-align: left;
    line-height: 40px;
  }
  .limit-desc {
    line-height: 32px;
    margin: 15px 0;
  }
  .limit {
    font-weight: bold;
    font-size: 60px;
    line-height: 72px;
    margin-bottom: 40px;
    letter-spacing: 2px;
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 240px;
    height: 68px;
    background: #ffffff;
    box-shadow: 0 4px 8px 0 rgba(74, 108, 255, 0.57);
    border-radius: 34px;
    font-weight: bold;
    font-size: 28px;
    color: #4a6cff;
    margin-bottom: 28px;
  }
  .specialty {
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    padding-top: 30px;
    padding-left: 30px;
    span {
      width: 35%;
      position: relative;
      opacity: 0.8;
      text-align: left;
      padding-left: 52px;
      &::before {
        position: absolute;
        left: 12px;
        top: 5px;
        content: "";
        width: 30px;
        height: 30px;
        background: url("../images/icon_specialty.png") no-repeat
          center;
        background-size: cover;
      }
    }
  }
}
</style>
