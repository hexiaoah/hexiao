<template>
  <div class="table-wrap">
    <div class="table-scroll">
      <table class="table">
        <tr>
          <th v-for="(item,index) in tableHead" :key="index">{{item.title}}</th>
        </tr>
        <tr v-for="(item,index) in tableBody" :key="index">
          <td v-for="(subitem,index) in item" :key="index">
            <TableText v-if="isText(subitem)" :text-data="subitem"></TableText>
            <TableImg v-if="isImage(subitem)" :img-data="subitem"></TableImg>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import TableImg from './InnerTable/table-img'
import TableText from './InnerTable/table-text'

export default {
	props: ['table-data'],
	components: {
		TableImg,
		TableText
	},
	methods: {
		isImage(t) {
			return t.type === 'image' ? true : false
		},
		isText(t) {
			return t.type === 'text' || t.type === 'date' || t.type === 'dateTime'
				? true
				: false
		}
	},
	computed: {
		tableHead() {
			return this.tableData.value.tableHead
		},
		tableBody() {
			let t = []
			let data = this.tableData.value
			data.tableBody.map((k, i) => {
				let o = {}
				data.tableHead.map(v => {
					o[v.key] = k[v.key]
				})
				t.push(o)
			})
			return t
		}
	},
	created() {
	}
}
</script>
<style lang="scss" scoped>
.table-wrap {
	padding-right: 20px;
	margin: 20px auto;
	width: 100%;
	overflow: hidden;
	.table-scroll {
		width: 100%;
		overflow-x: scroll;
	}
}
.table {
	width: 100%;
	overflow-x: scroll;
	text-align: center;
	border-top: 1PX solid #cecece;
	border-left: 1PX solid #cecece;
	border-collapse: collapse;
	td,
	th {
		border-bottom: 1PX solid #cecece;
		border-right: 1PX solid #cecece;
		padding: 10px;
		font-size: 0;
		min-width: 180px;
	}
	th {
		background-color: #ececec;
		font-size: 30px;
	}
}
</style>

