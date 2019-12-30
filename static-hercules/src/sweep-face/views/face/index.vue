<template>
	<div class="root">
		<div class="content">
			<p class="desc">验证后,可到开通人脸识别的商家体验无手机会员身份验证,刷脸取餐</p>
			<div class="face">
			</div>
			<div class="tip">
				<p>请拍摄并上传一张免冠照片进行验证</p>
				<p>并确保是本人操作</p>
			</div>
			<Button type="primary" @click="enable" :disabled="disabled">同意协议并开启验证</Button>
			<input type="file" @change="fileChange" v-show="false" ref="fileInput" accept="image/*" multiple :capture="capture">
		</div>
		<div class="agreement">
			<div class="radio-action">
				<input type="radio" :checked="agreement">
				<span @click="agree" class="radio-clone" :class="{'radio-checked':agreement}"></span>
			</div>
			<span @click="agree">我已阅读并同意</span>
			<a @click="toProt">《二维火刷脸用户协议》</a>
		</div>
		<div class="footer">
			<img src="../../images/footer.png" alt="">
		</div>
		<Modal :visible="uploading">
			<div class="re-shoot-modal-content">
				<p>提示</p>
				<p>照片上传中...</p>
			</div>
		</Modal>
    <Modal
        maskClosable
        :visible.sync="iosVerTip"
        title="提示"
        footer="我知道了"
        @ok="closeTip('iosVerTip')"
    >
      <p class="ios-ver-tip">当前IOS系统版本较低，请系统升级后再进行验证</p>
    </Modal>
    <Modal
        maskClosable
        :visible.sync="alipayTip"
        title="提示"
        footer="我知道了"
        @ok="closeTip('alipayTip')"
    >
      <p class="ios-ver-tip">请使用微信扫码完成人脸验证，支付宝内暂未支持人脸验证</p>
    </Modal>
	</div>
</template>
<script>
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import api from '../../api'

import {
  setFace,
  uploadImg,
  getCapture,
  getUploadedImgUrl,
  chooseImage
} from '../../utils'
const {
  warning: warningDialog
} = require('../../../base/components/dialogs/events')
const router = require('@2dfire/utils/router')
import { isiOS, isAlipay } from '../../../base/utils/tool'
export default {
  data() {
    return {
      agreement: true,
      capture: getCapture(),
      uploading: false,
      imgSrc: '',
      iosVerTip: false,
      alipayTip: false
    }
  },
  methods: {
    redirect() {
      api.hasFace().then(res => {
        if (res.hasFaceFood === 0) {
          // 未绑定
          this.$router.replace('/face')
        } else {
          // 已绑定
          this.$router.replace('/setting')
        }
      })
    },
    closeTip(type) {
      this[type] = false
    },
    toProt() {
      this.$router.push({
        name: 'protocol'
      })
    },
    agree() {
      this.agreement = !this.agreement
    },
    enable() {
      if (isAlipay()) {
        return (this.alipayTip = true);
      }
      if (isiOS()) {
        const str = navigator.userAgent.toLowerCase()
        const ios = str.match(/cpu iphone os (.*?) like mac os/)
        if (ios) {
          const ver = ios[1]
            .replace(/_/g, '.')
            .trim()
            .split('.')[0]
          if (+ver <= 9) {
            return (this.iosVerTip = true)
          }
        }
      }
      chooseImage({
        success: data => {
          setFace({
            base64: data,
            agreement: true
          })
          this.$router.push({
            path: '/complete',
            query: {
              token: router.route.query['token'],
              nickname: router.route.query['nickname']
            }
          })
        },
        fail(e, type) {
          console.log(e, type)
          warningDialog.showError('服务器抖了一下')
        }
      })
      // this.$refs.fileInput.click()
    },
    /*
    获取到file调用上传接口获取到url，
    存入face
     */
    fileChange(e) {
      const file = e.target.files[0]
      this.uploading = true
      uploadImg(file, {
        success: res => {
          if (res.ok) {
            let result = res.body
            if (result.code == 1) {
              if (result.data && result.data.data) {
                setFace({
                  url: getUploadedImgUrl(result.data.data),
                  agreement: true
                })
                this.uploading = false
                this.$router.push({
                  path: '/complete',
                  query: {
                    token: router.route.query['token'],
                    nickname: router.route.query['nickname']
                  }
                })
              } else {
                this.uploading = false
                warningDialog.showError('服务器抖了一下')
              }
            } else if (result.code == -1) {
              this.uploading = false
              warningDialog.showError('请先授权')
            } else {
              if (result.data && result.data.message) {
                this.uploading = false
                warningDialog.showError(result.data.message)
              }
            }
          }
          // console.log('data', data)
          // setFace({ agreement: true })
          // this.uploading = false
          // this.$router.replace('/complete')
        },
        fail: err => {
          this.uploading = false
          warningDialog.showError('上传失败，请重试')
          console.log(err)
        }
      })
    }
  },
  computed: {
    disabled() {
      return !this.agreement
    }
  },
  components: { Button, Modal },
  created() {
    this.redirect()
    document.title = '刷脸设置'
  }
}
</script>
<style lang="scss" scoped src="./style.scss">
</style>
