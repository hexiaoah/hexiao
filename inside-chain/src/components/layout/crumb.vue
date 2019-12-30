<template>
    <div class="crumb-wrap">
        <a :class="{'unactive':crumb.secondName}" @click="jump()">{{crumb.name}}</a><span v-show="crumb.secondName" class="second">{{secondName}}</span>
		<div v-if="rightName" class="rightNavWarp">
			<router-link class="rightNav" :to="rightLink">{{rightName}}</router-link>
			<!-- <Poptip class="popTip" placement="bottom-end" content="提示">
				<Icon style="vertical-align:middle;margin:0 10px 0 5px" color="#999" size="20" type="ios-help-outline"></Icon>
			</Poptip> -->
		</div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
	props:{
		name:{
			type:String,
			default:''
		},
		rightName:{
			type: String,
			default:''
		},
		rightLink:{
			type: String,
			default:''
		}
	},
	computed: {
		...mapGetters({
			crumb: "crumb/data"
		}),
		secondName(){
			return this.name?this.name:this.crumb.secondName
		}
	},
	methods: {
		jump() {
			this.$store.dispatch("crumb/jump");
		}
	},
	created() {
		this.$store.dispatch("crumb/setCrumb");
	}
};
</script>
<style lang="scss" scoped>
.crumb-wrap {
	height: 20px;
	line-height: 20px;
	color: #151515;
	font-size: 14px;
	a.unactive {
		color: #999;
	}
	a {
		display: inline-block;
		vertical-align: middle;
		color: #151515;
	}
	&:before {
		content: "";
		display: inline-block;
		width: 3px;
		height: 20px;
		background-color: #d83f3f;
		border-radius: 3px;
		vertical-align: middle;
		margin-right: 10px;
	}
}
.second {
	padding-left: 20px;
	&:before {
		display: inline-block;
		position: relative;
		left: -10px;
		content: "/";
	}
}
.rightNavWarp{
	float: right;
	.rightNav{
		color: #999;
	}
}
</style>
