<template>
    <img :src="src" class="img" :class="pos" alt="IMAGE">
</template>
<style lang="scss" scoped>
.img {
	position: absolute;
	opacity: 0;
	&.hl {
		width: 100%;
		height: auto;
		top: 50%;
		transform: translateY(-50%);
		opacity: 1;
	}
	&.vl {
		height: 100%;
		width: auto;
		left: 50%;
		transform: translateX(-50%);
		opacity: 1;
	}
}
</style>
<script>
export default {
	props: ["src"],
	data() {
		return { pos: "" };
	},
	methods: {
		imgLoad() {
			let self = this;
			let img = new Image();
			// 改变图片的src
			img.src = self.src + "?" + new Date().getTime();
			// 定时执行获取宽高
			let check = function() {
				if (img.width > 0 && img.height > 0) {
					if (img.width / img.height > 1) self.pos = "vl";
					else self.pos = "hl";
					clearInterval(set);
				}
			};
			let set = setInterval(check, 40);
		}
	},
	created() {
		if (this.src) this.imgLoad();
	},
	updated() {
		if (this.src) this.imgLoad();
	}
};
</script>
