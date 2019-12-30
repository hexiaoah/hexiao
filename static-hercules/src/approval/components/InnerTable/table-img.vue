<template>
  <img class="ti-wrap" :src="imgData.value" :class="isEdit">
</template>
<script>
export default {
	props: ['img-data'],
	computed: {
		isEdit() {
			return this.imgData.isEdit ? 'edit' : ''
		}
	}
}
</script>
<style lang="scss" scoped>
.ti-wrap{
  width: 160px;
  border: 2PX solid #fff;
}
.edit{
  border: 2PX solid #ff3300;
}
</style>
