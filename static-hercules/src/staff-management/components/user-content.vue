<template>
    <div class="user-item" @click="clickNext">
        <div class="name">{{title}}</div>
        <div class="rank" v-show="rank">{{'职级：'+rank}}</div>
        <div class="phone">{{getPhoneNumber}}</div>
        <i class="iconfont icon-next"></i>
    </div>
</template>

<script>

  export default {
    name: 'top-header',
    props: {
      title: {
        type: String,
        default: ''
      },
      mobile: {
        type: String,
        default: ''
      },
      countryCode: {
        type: String,
        default: ''
      },
      rank: {
        type: String,
        default: ''
      },
    },
    methods: {
      backUp() {
        window.history.back() 
      },
      clickNext() {
        this.$emit('clickNext')
      }
    },
    computed: {
        getPhoneNumber() {
            return '手机号码：' + this.countryCode + ' ' + this.mobile
        }
    }
  }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .user-item {
      position: relative;
      width: 100%;
      background: white;

      .name {
        color: #333333;
        font-size: 30px;
        padding-top: 20px;
        font-weight: bold;
      }

      .rank {
        color: #666666;
        font-size: 26px;
        margin-top: 12px;
      }

      .phone {
        color: #666666;
        font-size: 26px;
        margin-top: 12px;
        padding-bottom: 20px;
      }

      .icon-next {
        position: absolute;
        top: 40%;
        right: 30px;
        display: inline-block;
        color: #ccc;
      }

    }
</style>
