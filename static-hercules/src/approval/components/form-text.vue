<template>
  <div class="text-wrap">
    <div class="key">{{textData.name}}</div>
    <div class="value" :class="edit">{{textData.value}}</div>
  </div>
</template>
<script>
export default {
	props: ['text-data'],
	computed: {
		edit() {
			if (this.textData.isEdit) {
				return 'edit'
			}
			return ''
		}
	}
}
</script>

<style lang="scss" scoped>
.text-wrap {
	line-height: 100px;
	border-bottom: 1PX solid #ccc;
	overflow: hidden;
}
.key {
	float: left;
}
.value {
	float: right;
  color: #888;
  padding-right: 20px;
}
.edit {
	color: #ff3300;
}
</style>
