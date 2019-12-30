<template>
  <div class="img-wrap">
		<p class="img-title">{{imgData.name}}</p>
    <img :class="isEdit" :src="imgData.value">
  </div>
</template>
<script>
export default {
	props: ['img-data'],
	computed: {
		isEdit() {
			if (this.imgData.isEdit) return 'edit'
			return ''
		}
	}
}
</script>
<style lang="scss" scoped>
.img-wrap {
	padding: 20px 20px 0 0;
	font-size: 0;
	img {
		border: 4PX solid #fcfcfc;
		width: 100%;
	}
	.edit {
		border: 2PX solid #ff3300;
    box-shadow: 0 0 2PX #ff3300;
	}
	.img-title{
		font-size: 28px;
		padding-bottom: 10px;
	}
}
</style>

