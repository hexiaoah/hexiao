<template>
  <div class="root">
    <div class="part-top">
      <div class="phone">
        <img src="../../images/face.png" alt="">
      </div>
      <p class="tip">验证已完成，您可到开通人脸识别的商家体验无手机会员身份验证，刷脸取餐~</p>
    </div>
    <div class="part-bottom">
      <div class="verify-info">
        <div class="face">
          <span>人脸识别验证</span>
          <img @click="answer" src="../../images/question.png" alt="">
        </div>
        <p class="switch">
          已开启
        </p>
      </div>
      <p class="verify-tip">
        可到开通人脸识别的商家体验无手机会员身份验证、刷脸取餐
      </p>
    </div>
    <div class="footer">
      <img src="../../images/footer.png" alt="">
    </div>
    <Modal :visible.sync="answers" maskClosable>
      <div class="re-shoot-modal-content">
        <h1>说明</h1>
        <p>人脸识别使用场景：</p>
        <article>用户完成人脸信息绑定后，可到开通人脸识别的商家体验无手机会员身份验证和刷脸取餐服务。</article>
        <p>人脸信息管理：</p>
        <article>人脸信息一旦拍摄上传绑定后，暂时不支持删除、关闭和重新拍摄上传，后期优化过程中会逐渐开通这些场景的服务。</article>
      </div>
    </Modal>
  </div>
</template>
<script>
import Modal from '../../components/Modal/index'
export default {
	data() {
		return {
			answers: false
		}
	},
	methods: {
		answer() {
			this.answers = true
		},
	},
	components: {
		Modal
	},
	created() {
		document.title = '刷脸设置'
	}
}
</script>
<style lang="scss" scoped src="./style.scss">
</style>
