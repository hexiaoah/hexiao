<script>
/**
     -- zeqi@2dfire

     @props:
     name：盒子无图片(!src)时，显示的提示名称,
     src： 要显示的图片链接
     border: 1, 无虚线外框

     图片盒子
     */
import baseImg from './base-img';

export default {
	props: ["name", "src", "border"],
    components:{
        baseImg
    },
};
</script>

<template>
    <div class="img-box" :class="{'has-img':src,'no-border': border == 1}">
        <!-- <img v-if="src" class="img" :class="pos" :src="src" alt="IMAGE"> -->
        <baseImg v-if="src" :src="src"></baseImg>
        <div v-if="!src" class="no-img-box">
            <img class="no-img" src="https://assets.2dfire.com/frontend/074c32b6291a201eecaa5bd2c02f341a.png" alt="">
            <p class="no-name">{{name}}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.img-box {
	background: #f1f1f1;
	border: 1px dashed #cccccc;

	overflow: hidden;
	position: relative;
}

.has-img {
	border: 0;
}

.no-img-box {
	text-align: center;
	position: relative;
	top: 50%;
	transform: translateY(-50%);
}

.no-img {
	width: 48px;
	height: 36px;
}

.no-name {
	margin-top: 10px;
	font-size: 12px;
	color: #999999;
}

.no-border {
	border: 0;
}
</style>

