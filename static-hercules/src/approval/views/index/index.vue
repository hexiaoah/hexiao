<template>
	<div class="approval-wrap">
		<div v-if="datas.length>0" v-for="item in datas" :key="item.id">
			<Title v-if="item.title && item.list.length>0">{{item.title}}</Title>
			<Wrap v-if="item.list.length>0">
				<div v-for="subitem in item.list" :key="subitem.id">
					<TextLine v-if="isText(subitem)" :text-data="subitem"></TextLine>
					<TableLine v-if="isTable(subitem)" :table-data="subitem"></TableLine>
					<ImgLine v-if="isImage(subitem) && subitem.value" :img-data="subitem"></ImgLine>
					<DateLine v-if="isDate(subitem)" :date-data="subitem"></DateLine>
				</div>
			</Wrap>
		</div>
	</div>
</template>
<script>
// import d from '../../mockjs'
import Title from '../../components/form-title'
import Wrap from '../../components/form-wrap'
import TextLine from '../../components/form-text'
import TableLine from '../../components/form-table'
import ImgLine from '../../components/form-img'
import DateLine from '../../components/form-date'
import API from '../../config/api'

export default {
	data() {
		return {
			datas: {}
		}
	},
	methods: {
		isText(item) {
			return item.type && item.type === 'text' ? true : false
		},
		isTable(item) {
			return item.type && item.type === 'table' ? true : false
		},
		isImage(item) {
			return item.type && item.type === 'image' ? true : false
		},
		isDate(item) {
			return (item.type && item.type === 'date') || item.type === 'dateTime'
				? true
				: false
		}
	},
	components: {
		Title,
		Wrap,
		TextLine,
		TableLine,
		ImgLine,
		DateLine
	},
	created() {
		let self = this
		API.getData().then(d => {
			console.log(JSON.parse(d).data)
			self.datas = JSON.parse(d).data
		})
	}
}
</script>
<style lang="scss" scoped>
.approval-wrap {
	padding-bottom: 40px;
}
</style>
<style lang="scss">
body {
	background-color: #efefef;
}
</style>

