<template>
    <div class="header_title p-l p-r fixed">
        <i class="iconfont icon-back theme-prev pull-left" @click="backUp"></i>
        <span>{{ title }}</span>
        <span class="edit" v-if="showEdit" @click="edit">{{editText}}</span>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'top-header',
  props: {
    title: {
      type: String,
      default: ''
    },
    editText: {
      type: String,
      default: '修改'
    },
    showEdit: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions(['saveIsPopShow']),
    backUp() {
      let self = this
      const { path } = this.$route
      console.log(path, 'path')
      if (path === '/redirect') {
        console.log('window.tdfire.closeWebView', 'path')
        window.tdfire.closeWebView()
      } else if (path === '/input') {
        if (self.merchantInfoString !== JSON.stringify(self.merchantInfo)) {
          self.$confirm({
            // 这个是fire-ui中的组件
            content: '有信息修改，是否退出',
            confirm: () => {
              window.history.back()
            }
          })
        } else {
          window.history.back()
        }
      } else {
        window.history.back()
      }
    },
    edit() {
      this.saveIsPopShow(true)
    }
  },
  computed: {
    ...mapState(['merchantInfo', 'merchantInfoString'])
  }
}
</script>

<style type="text/less" lang="less" scoped>
.header_title {
  height: 90px;
  line-height: 90px;
  text-align: center;
  background: white;
  border-bottom: 1px solid #e6e6e6;

  &.no_border {
    border: none;
  }

  &.fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 200;
  }

  .icon-back {
    font-size: 32px;
    font-weight: bold;
    margin-left: 30px;
  }

  span {
    font-size: 34px;
    color: #333333;
    text-align: center;
    font-weight: bold;
  }

  .edit {
    font-size: 30px;
    color: #0088ff;
    text-align: center;
    float: right;
    padding-right: 30px;
  }
}
</style>
