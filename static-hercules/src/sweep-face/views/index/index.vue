<template>
    <div class="index-wrap">
        <p class="loading"></p>
    </div>
</template>
<script>
import api from '../../api'

export default {
	methods: {
		redirect() {
      this.$router.replace('/face')
			api.hasFace().then(res => {
				if (res.hasFaceFood === 0) {
					// 未绑定
					this.$router.replace('/face')
				} else {
					// 已绑定
					this.$router.replace('/setting')
				}
			})
		}
	},
	created() {
		this.redirect()
	}
}
</script>
<style lang="scss" src="./style.scss" scoped></style>
