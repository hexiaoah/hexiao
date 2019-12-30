<template>
  <div class="upload-photo">
    <p :class="['hint',{'none':!title},{'titleColorRed':titleColorRed}]">{{title}}</p>

    <div class="photo-wrap" ref="photoWrap">
      <ul class="photo-list" ref="photoTab">
        <div class="photo-item" v-for="(item,index) in list" :key="index">
          <div class="photo-multi-img" :style="'background: url(' + item + ') center center / contain no-repeat;'" />
          <i class="remove-img" @click="removeImg($event, index)" v-if="canEdit" />
        </div>
        <div class="photo-item" @click="getPhoto" v-show="list.length<5" v-if="canEdit">
          <div class="camera-multi">
            <img src="https://assets.2dfire.com/frontend/3b308d2eadb900c53315c8530db321fd.png" />
            <span>添加图片</span>
          </div>
        </div>
      </ul>
    </div>
    <div class="tips">
      <span>只支持jpg格式</span>
      <span class="span-length">{{list.length}}/5</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { isAndroid, isIos } from 'src/wechat-direct-con/libs/client'
import BScroll from 'better-scroll'
import { isRestApp } from '../../base/utils/tool'

export default {
  name: 'InfoMultiPhoto',
  props: {
    title: {
      type: String,
      default: ''
    },
    titleColorRed: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: []
    },
    imgName: {
      type: String
    },
    editSubStatus: {
      type: Boolean,
      required: false,
      default: true
    },
    explain: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {}
  },
  created() {
    this.$nextTick(() => {
      this.personScroll()
    })
  },
  computed: {
    ...mapState(['viewState']),
    canEdit() {
      if (this.viewState === 'detail') {
        return false
      } else if (this.viewState === 'edit') {
        return this.editSubStatus
      }
    }
  },
  methods: {
    ...mapActions(['modifyInputInfo']),
    getPhoto() {
      if (this.viewState === 'detail') {
        return false
      }
      let self = this
      if (isIos) {
        try {
          // window.webkit.messageHandlers.uploadImageAction.postMessage('')
          window.tdfire.uploadImage('new')
        } catch (err) {
          console.log(err)
        }
      } else if (isAndroid) {
        try {
          window.tdfire.uploadImage()
        } catch (err) {
          console.log(err)
        }
      }
      window.getImageUrl = function(url) {
        // 兼容云掌柜和云收银上 上传组件返回Url的不同
        if (!isRestApp()) {
          url = 'https://assets.2dfire.com/' + url
        }
        self.list.push(url)
        self.modifyInputInfo({
          type: self.imgName,
          value: self.list
        })
      }
    },
    removeImg($event, index) {
      let self = this
      $event.stopPropagation()
      self.list.splice(index, 1)
      this.modifyInputInfo({
        type: this.imgName,
        value: this.list
      })
    },
    changeImg(e) {
      console.log(e)
    },
    personScroll() {
      // 默认有六个div子元素，每个子元素的宽度
      let width = 6 * 200
      this.$refs.photoTab.style.width = width + 'Px'
      // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.photoWrap, {
            startX: 0,
            click: true,
            scrollX: true,
            // 忽略竖直方向的滚动
            scrollY: false,
            eventPassthrough: 'vertical'
          })
        } else {
          this.scroll.refresh()
        }
      })
    }
  }
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
  .tips {
    display: flex;
    position: relative;
    font-size: 22px;
    color: #999999;
    margin-top: -40px;
    .span-length {
      flex: 1;
      text-align: right;
    }
}
.photo-wrap {
    .photo-list {
      margin-right: 20px;
      .photo-item {
        background: rgba(204, 204, 204, 0.1);
        position: relative;
        display: inline-block;
        height: 108Px;
        width: 108Px;
        margin-right: 20px;
        border: 1Px solid #e6e6e6;
        border-style: dashed;
      }
    }
}
.camera-multi {
    font-size: 0;
    text-align: center;
    display: inline-block;
    position: absolute;
    img {
        width: 76px;
        height: 60px;
        display: table-row;
        margin-left: 70px;
        margin-top: 52px;
    }
    span {
        font-size: 30px;
        color: #999999;
        display: inline-block;
        line-height: 40px;
        margin-top: 24px;
        margin-left: 48px;
    }
}
.photo-multi-img {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
}
.remove-img {
    position: absolute;
    background-image: url(https://assets.2dfire.com/frontend/ae288cfb7ec950a88b43a9cb390cb973.png);
    background-position: 50%;
    background-size: cover;
    width: 40px;
    height: 40px;
    display: block;
    top: 20px;
    right: 20px;
    z-index: 90;
}
</style>