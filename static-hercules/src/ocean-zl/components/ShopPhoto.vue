<template>
    <div class="upload-photo">
        <!-- <p class="hint" :class="!title?'none':'border-b'">{{title}}</p> -->
        <p :class="['hint',{'none':!title},{'border-b':title},{'titleColorRed':titleColorRed}]">{{title}}</p>

        <div class="camera-wrapper border-f" @click="getPhoto">
            <div v-show="!imgSrc&&canEdit">
                <div class="camera">
                    <img src="https://assets.2dfire.com/frontend/3b308d2eadb900c53315c8530db321fd.png"/>
                    <span>添加图片</span>
                </div>
                <p class="rule">图片格式为png,bmp,jpeg,jpg,gif；需小于2MB 。</p>
            </div>
            <div v-show="imgSrc">
                <div class="photoimg"
                     :style="'background: url(' + imgSrc + ') center center / contain no-repeat;'"></div>
                <i class="removeImg" @click="removeImg($event)" v-if="canEdit"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { isAndroid, isIos } from 'src/ocean-zl/utils/client'

export default {
  name: 'ShopPhoto',
  props: {
    formId: {
      type: String,
      required: false,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    titleColorRed: {
      type: Boolean,
      default: false
    },
    imgSrc: {
      type: String,
      default: ''
    },
    imgName: {
      type: String
    },
    editSubStatus: {
      required: false
    }
  },
  computed: {
    ...mapState(['viewState', 'subStatus']),
    canEdit() {
      if (this.viewState === 'detail') {
        return false
      } else if (this.viewState === 'edit') {
        return true
      } else {
        if (this.editSubStatus) {
          return true
        } else {
          if (this.subStatus === 31) {
            return false
          } else {
            return true
          }
        }
      }
    }
  },
  methods: {
    ...mapActions(['modifyShopInfo']),
    getPhoto() {
      if (this.imgSrc || this.viewState === 'detail') {
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
        console.log(self.imgName, url)
        self.modifyShopInfo({
          type: self.imgName,
          value: url,
          formId: self.formId
        })
      }
    },
    removeImg($event) {
      $event.stopPropagation()
      this.modifyShopInfo({
        type: this.imgName,
        value: '',
        formId: this.formId
      })
    },
    changeImg(e) {
      console.log(e)
    }
  }
}
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
</style>

