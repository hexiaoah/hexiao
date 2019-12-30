<template>
	<div class="tt-wrap" :class="isEdit">
		{{content}}
	</div>
</template>
<script>
import { getDate, getDateTime } from 'base/utils/tool'

export default {
	props: ['text-data'],
	computed: {
		isEdit() {
			return this.textData.isEdit ? 'edit' : ''
		},
		content() {
			if (this.textData && this.textData.type === 'text') {
				return this.textData.value
			} else if (this.textData && this.textData.type === 'date') {
				return getDate(this.textData.value)
			} else if (this.textData && this.textData.type === 'dateTime') {
				return getDateTime(this.textData.value)
			} else if (this.textData && this.textData.type === 'dateMonth') {
				return getDateMonth(this.textData.value)
			}
			return ''
		}
	}
}
</script>
<style lang="scss" scoped>
.tt-wrap {
	font-size: 30px;
}
.edit {
	color: #ff3300;
}
</style>
