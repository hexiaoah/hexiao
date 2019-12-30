<template>
  <div class="item" @click="choosed(data)">
    <div class="content-wrapper">
      <span class="title theme-point">{{labelName}}</span>
      <img class="theme-next" src="https://assets.2dfire.com/frontend/c5503b2c96d7061210b3d89446988334.png"/>
    </div>
    <div class="line" v-show="!lineHidden"></div>
  </div>
</template>

<script>
export default {
  name: 'rank-list-item',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    labelName: {
      type: String,
      default: 'name'
    },
    icon: {
      type: String,
      default: 'theme-next'
    },
    lineHidden: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    choosed(item) {
      this.$emit('choosed', item)
      console.log(this.lineHidden)
    }
  }
}
</script>

<style type="text/less" lang="less" scoped>
.item {
    background-color: white;
}
.content-wrapper {
  height: 88px;
  position: relative;
  background: white;
  .title {
    position: absolute;
    margin-left: 30px;
    margin-top: 24px;
    font-size: 30px;
    color: #333333;
  }

  .theme-next {
    position: absolute;
    width: 24px;
    height: 24px;
    right: 30px;
    top:50%;
    transform: translateY(-50%);
  }
}

.line {
  margin-left: 30px;
  border-bottom: 1px solid #e6e6e6;
}
</style>