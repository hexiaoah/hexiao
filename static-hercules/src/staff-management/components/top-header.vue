<template>
    <div class="header_title p-l p-r fixed">
        <i class="iconfont icon-back theme-prev pull-left" v-if="!isShowSaveButton" @click="backUp"></i>
        <span class="cancel theme-prev pull-left" v-if="isShowSaveButton" @click="cancel">取消</span>
        <span class="save" v-if="isShowSaveButton" @click="saveInfo">保存</span>
        <span class="top-title">{{ title }}</span>
    </div>
</template>

<script>
import {
     mapState,
     mapGetters,
     mapActions
} from 'vuex'

  export default {
    name: 'top-header',
    props: {
      title: {
        type: String,
        default: ''
      },
    },
    methods: {
      ...mapActions([
            "changeInfo"
        ]),
      backUp() {
        const {path} = this.$route
        if(path === '/staffmanage') {
          window.tdfire.closeWebView()
        } else {
          window.history.back() 
        }
      },
      cancel() {
        this.$confirm({
                content: '内容有变更尚未保存，确定要退出吗？',
                confirm: () => {
                  window.history.back() 
                }
            })
      },
      saveInfo() {
        this.changeInfo({type: 'clickedSaveButton', value: true})
      }
    },
    computed: {
      ...mapState([
            "isShowSaveButton"
        ]),
    },
    
  }
</script>

<style type="text/less" lang="less" scoped>
    .header_title {
        height: 90px;
        line-height: 90px;
        text-align: center;
        background: white;
        border-bottom: 1PX solid #e6e6e6;
        
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
        }

        .top-title {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          font-size: 34px;
          color: #333333;  
          font-weight: bold;
        }

        .cancel {
            font-size: 30px;
            color: #0088ff;
        }

        .save {
            font-size: 30px;
            color: #0088ff;
            text-align: center;
            float: right;
        }
    }
</style>