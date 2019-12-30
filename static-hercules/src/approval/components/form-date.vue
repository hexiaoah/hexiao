<template>
  <div class="date-wrap">
    <div class="key">{{dateData.name}}</div>
    <div class="value" :class="edit">{{dateValue}}</div>
  </div>
</template>
<script>
import { getDate, getDateTime } from 'base/utils/tool'

export default {
	props: ['date-data'],
	computed: {
		edit() {
			return this.dateData.isEdit ? 'edit' : ''
		},
		dateValue() {
			switch (this.dateData.type) {
				case 'date':
					return getDate(this.dateData.value)
					break
				case 'dateTime':
					return getDateTime(this.dateData.value)
				case 'dateMonth':
					return getDateMonth(this.dateData.value)
				default:
					return getDate(this.dateData.value)
					break
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.date-wrap {
	line-height: 100px;
	border-bottom: 1px solid #ccc;
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
