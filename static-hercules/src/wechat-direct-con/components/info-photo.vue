<template>
  <div class="upload-photo">
    <!-- <p class="hint" :class="!title?'none':'border-b'">{{title}}</p> -->
    <p :class="['hint',{'none':!title},{'titleColorRed':titleColorRed}]">{{title}}</p>

    <div class="camera-wrapper border-f" @click="getPhoto">
      <div v-show="!value&&canEdit">
        <div class="camera">
          <img src="https://assets.2dfire.com/frontend/3b308d2eadb900c53315c8530db321fd.png" />
          <span>添加图片</span>
        </div>
        <p class="rule">图片支持jpeg,jpg,bmp,png格式；大小不超过2MB 。</p>
      </div>
      <div v-show="value">
        <div class="photoimg" :style="'background: url(' + value + ') center center / contain no-repeat;'"></div>
        <i class="removeImg" @click="removeImg($event)" v-if="canEdit"></i>
      </div>
    </div>
    <div :class="['tips',{'none':!explain}]">{{explain}}</div>
  </div>
</template>

<script>
import { isRestApp } from '../../base/utils/tool'
import { mapState, mapActions } from 'vuex'
import { isAndroid, isIos } from 'src/wechat-direct-con/libs/client'
import API from '../config/api'

export default {
  name: 'InfoPhoto',
  props: {
    title: {
      type: String,
      default: ''
    },
    titleColorRed: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    imgName: {
      type: String
    },
    editSubStatus: {
      required: false
    },
    explain: {
      type: String,
      required: false,
      default: ''
    },
    ocrType: {
      type: Number,
      required: false,
      default: 0 // 1为营业执照，2为身份证正面
    }
  },
  computed: {
    ...mapState(['viewState']),
    canEdit() {
      if (this.viewState === 'detail') {
        return false
      } else if (this.viewState === 'edit') {
        return true
      }
    }
  },
  methods: {
    ...mapActions(['modifyInputInfo']),
    getPhoto() {
      if (this.value || this.viewState === 'detail') {
        return false
      }
      let self = this
      if (isIos) {
        try {
          // window.webkit.messageHandlers.uploadImageAction.postMessage('')
          window.tdfire.uploadImage()
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
      // native回调
      window.getImageUrl = function(url) {
        // 兼容云掌柜和云收银上 上传组件返回Url的不同
        if (!isRestApp()) {
          url = 'https://assets.2dfire.com/' + url
        }

        console.log(self.imgName, url)
        self.modifyInputInfo({
          type: self.imgName,
          value: url
        })
        // 调用ocr识别
        if (self.ocrType === 1 || self.ocrType === 2) {
          let type = 0
          if (self.ocrType === 1) {
            type = 'BUSINESS_LICENSE' // 营业执照
          } else if (self.ocrType === 2) {
            type = 'IDCARD' // 身份证号
          }
          API.ocrNetImage({
            url: url,
            ocrType: type
          }).then(data => {
            let info = JSON.parse(data.infoMessage) // 转为json对象
            if (data.ocrType === 'IDCARD') {
              // 身份证号识别
              let num = info.number
              let name = info.name
              self.modifyInputInfo({ type: 'idCardNumber', value: num }) // 修改证件号码
              self.modifyInputInfo({ type: 'idCardName', value: name })
              self.modifyInputInfo({ type: 'accountName', value: name })
            }
          })
        }
      }
    },
    removeImg($event) {
      $event.stopPropagation()
      this.modifyInputInfo({
        type: this.imgName,
        value: ''
      })
    },
    changeImg(e) {
      console.log(e)
    }
  }
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
  .tips {
    font-size: 26px;
    color: #999999;
    margin-top: -20px;
    &.none {
        margin-top: 20px;
    }
}
</style>