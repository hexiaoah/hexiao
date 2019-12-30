<template>
	<div class="root">
		<div class="phone">
			<img :src="facePhone" alt="">
		</div>
		<div class="action">
			<Button class="re-upload" :icon="true" @click="reShoot">
				重新拍摄
			</Button>
			<input type="file" @change="fileChange" v-show="false" ref="fileInput" accept="image/*" multiple :capture="capture">
			<Button type="primary" @click="upload">
				确认上传
			</Button>
		</div>
		<p class="footer">由商汤科技提供技术支持</p>
		<Modal :visible.sync="reShootVisible" footer="重新拍摄" @ok="reShoot" maskClosable>
			<div class="re-shoot-modal-content">
				<p>提示</p>
				<p>未检测到人脸信息</p>
			</div>
		</Modal>
		<Modal :visible="verifyVisible">
			<div class="shooting-modal-content">
				<div class="shooting-modal-face">
					<span class="shooting-loading"></span>
					<img src="../../images/face-verify.png" alt="">
				</div>
				<p class="shooting-tip">
					脸验证中...
				</p>
				<div class="shooting-desc">您的颜值已经美出天际啦！</div>
			</div>
		</Modal>
		<Modal :visible="uploading" :maskClosable="false">
			<div class="re-shoot-modal-content">
				<p>提示</p>
				<p>照片上传中...</p>
			</div>
		</Modal>
	</div>
</template>

<script>
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import api from '../../api'
import {
  getFace,
  setFace,
  uploadImg,
  getCapture,
  getUploadedImgUrl,
  base64ToFile,
  chooseImage
} from '../../utils'
const {
  warning: warningDialog
} = require('../../../base/components/dialogs/events')
export default {
  data() {
    return {
      reShootVisible: false,
      facePhone: '',
      verifyVisible: false,
      capture: getCapture(),
      uploading: false
    }
  },
  components: { Button, Modal },
  methods: {
    upload() {
      if (!this.facePhone) {
        this.verifyFail()
      } else {
        this.verifyVisible = true
        uploadImg(base64ToFile(this.facePhone), {
          success: res => {
            if (res.ok) {
              let result = res.body
              if (result.code === 1) {
                if (result.data && result.data.data) {
                  setFace({
                    url: getUploadedImgUrl(result.data.data)
                  })
                  this.fireUploadFace()
                } else {
                  this.verifyVisible = false
                  warningDialog.showError('服务器抖了一下')
                }
              } else if (result.code === -1) {
                this.verifyVisible = false
                warningDialog.showError('请先授权')
              } else {
                if (result.data && result.data.message) {
                  this.verifyVisible = false
                  warningDialog.showError(result.data.message)
                }
              }
            }
          }
        })
        // this.fireUploadFace()
      }
    },
    //验证失败
    verifyFail() {
      this.verifyVisible = false
      this.reShootVisible = true
    },
    /*
    图片url上传到公司人脸识别服务器
      /cash/v1/face_save
      参数：face_url（图片url）
     */
    fireUploadFace() {
      api
        .uploadSaveFace({ params: { face_url: getFace('url') } })
        .then(
          res => {
            if (res === 1) {
              this.timer = new Date().getTime()
              this.awaitFaceVerify()
            }
          },
          err => {
            warningDialog.showError(err.result.message)
            this.verifyVisible = false
          }
        )
        .catch(() => {
          // this.verifyFail()
          warningDialog.showError('服务器抖了一下')
          this.verifyVisible = false
        })
    },
    /*
      人脸识别验证结果轮询
      /cash/v1/poll_person_info
      参数：无
     */
    awaitFaceVerify() {
      api
        .verifyFace()
        .then(
          res => {
            if (res.terminate === true) {
              this.$router.replace('/success')
            } else {
              setTimeout(() => {
                this.awaitFaceVerify()
              }, res.frequency)
            }
          },
          err => {
            console.log(err)
            warningDialog.showError(err.result.message)
            this.verifyVisible = false
          }
        )
        .catch(() => {
          warningDialog.showError('服务器抖了一下')
          this.verifyVisible = false
        })
    },
    //重新拍摄
    reShoot() {
      this.reShootVisible = false
      // this.$refs.fileInput.click()
      chooseImage({
        success: data => {
          setFace({
            base64: data
          })
          this.facePhone = data
        },
        fail() {
          warningDialog.showError('服务器抖了一下')
        }
      })
    },
    fileChange(e) {
      let self = this
      self.uploading = true
      uploadImg(e.target.files[0], {
        success: res => {
          if (res.ok) {
            let result = res.body
            if (result.code == 1) {
              if (result.data && result.data.data) {
                setFace({
                  url: getUploadedImgUrl(result.data.data),
                  agreement: true
                })
                self.uploading = false
                setTimeout(function() {
                  self.facePhone = getFace('url')
                }, 0)
              } else {
                self.uploading = false
                warningDialog.showError('服务器抖了一下')
              }
            } else if (result.code == -1) {
              self.uploading = false
              warningDialog.showError('请先授权')
            } else {
              if (result.data && result.data.message) {
                self.uploading = false
                warningDialog.showError(result.data.message)
              }
            }
          }
        }
      })
    }
  },
  created() {
    document.title = '拍照完成'
    // this.facePhone = getFace('url')
    this.facePhone = getFace('base64')
  }
}
</script>

<style scoped lang="scss" src="./style.scss">
</style>
