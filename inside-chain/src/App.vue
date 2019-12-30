<template>
    <div>
        <leftNav></leftNav>
        <div class="right-wrap">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
/**
Model 组件使用：
this.$Modal.info(config)
this.$Modal.success(config)
this.$Modal.warning(config)
this.$Modal.error(config)
this.$Modal.confirm(config)
config详见https://www.iviewui.com/components/modal

 */
import leftNav from "@/components/nav/left-nav";

export default {
	name: "app",
	components: {
		leftNav
	},
	created() {
	}
};
</script>
<style lang="less" src="./theme/default.less"></style>
<style lang="scss" src="./style/common.scss"></style>

<style lang="scss" scoped>
.right-wrap{
    margin-left: 200px;
}
</style>




