<template>
	<div class="train-wrap">
		<h1 class="title bg">高铁扫码点餐使用指南-乘务员篇</h1>
		<h2 class="subtitle bg">一、安装云收银</h2>
		<p class="text bg pt-10 pb-40">在发车之前需要先确认是否已经安装云收银，如果未安装，则需要进行安装，安装时需要连接火车上的Wi-Fi，或者使用自己的手机热点。</p>
		<h2 class="thdtitle bg">桌面上有【云收银】，表示已经安装。</h2>
		<div class="imgbox bg pt-20 pb-20">
			<img class="img1" v-lazy="require('../../images/1.png')" />
		</div>
		<h2 class="thdtitle bg">如果没有看到【云收银】，则可以向右滑动打开应用市场。</h2>
		<div class="imgbox bg pt-20 pb-20">
			<img class="img2" v-lazy="require('../../images/2.png')" />
		</div>
		<h2 class="thdtitle bg">点击下载。</h2>
		<p class="text bg pt-10">如果已安装【云收银】，但不是最新版，请及时更新。</p>
		<div class="imgbox bg pt-20 pb-40">
			<img class="img3" v-lazy="require('../../images/3.png')" />
		</div>
		<h2 class="subtitle bg">二、登录餐乘助手进行扫码开店</h2>
		<p class="text bg pt-10">在每次发车前，必须先登录餐乘助手，然后使用扫码开店功能，扫描车底号二维码，开店成功后，乘客才能进行扫码点餐。</p>
		<div class="imgbox bg pt-20 pb-80">
			<img class="img4" v-lazy="require('../../images/4.png')" />
		</div>
		<h2 class="subtitle bg">三、登录云收银</h2>
		<p class="text bg pt-10">扫码开店成功后，点击打开餐乘助手里的云收银，自动登录后，点击主页的餐乘助手，可以重新回到餐乘助手。</p>
		<p class="text notice bg pt-20">
			1、必须要餐乘助手扫码开店成功后，再点击云收银；<br>
			2、必须通过餐乘助手打开云收银。
		</p>
		<div class="imgbox bg pt-20 pb-80">
			<img class="img5" v-lazy="require('../../images/5.png')" />
		</div>
		<h2 class="subtitle bg">四、设置餐厅车厢</h2>
		<div class="text bg pt-20">
			<ol>
				<li>每次登录后都会自动进入餐厅车厢设置页面，只有设置餐厅所在的车厢后，乘客才可以进行点餐。</li>
				<li>当餐厅所在的车厢发生变化时需要设置餐厅位置，有以下两种方式：
					<ol style="list-style-type:lower-latin">
						<li>退出登录，然后重新登录，自动进入设置页面；</li>
						<li>进入“我的”-“餐厅车厢设置”页面进行设置。</li>
					</ol>
				</li>
			</ol>
		</div>
		<div class="imgbox bg pt-20 pb-80">
			<img class="img6" v-lazy="require('../../images/6.png')" />
		</div>
		<h2 class="subtitle bg">五、上下班</h2>
		<div class="text bg pt-20">
			<ol>
				<li>上班状态：乘客可以进行扫码点餐；</li>
				<li>下班状态：乘客不能进行扫码点餐；</li>
				<li>每次登录时，需要点击开始上班，如果登录时未点击开始上班，则在“我的”页面也可以开始上班。</li>
			</ol>
		</div>
		<div class="imgbox bg pt-20 pb-80">
			<img class="img7" v-lazy="require('../../images/7.png')" />
		</div>
		<h2 class="subtitle bg">六、订单配送</h2>
		<div class="text bg pt-20">
			<ol>
				<li>当听到语音提醒有订单时，我们就可以进入订单配送页面进行配送了，音量可以在POS机上方的“-”“+”来调节，建议调到最大；</li>
				<li>订单配送有四个列表：座位订单、餐车订单、已结账单以及已撤单。</li>
			</ol>
		</div>
		<div class="imgbox bg pt-20 pb-40">
			<img class="img8" v-lazy="require('../../images/8.png')" />
		</div>
		<h2 class="thdtitle bg">座位订单：展示乘客扫座位码点餐的订单</h2>
		<div class="imgbox bg pt-20 pb-40">
			<img class="img9" v-lazy="require('../../images/9.png')" />
		</div>
		<h2 class="thdtitle bg">餐车订单：展示乘客扫餐车码点餐的订单，餐车订单没有下车站店和联系电话。</h2>
		<div class="imgbox bg pt-20 pb-40">
			<img class="img10" v-lazy="require('../../images/10.png')" />
		</div>
		<h2 class="thdtitle bg">已结账单：展示所有已完结的订单，包括扫座位码的和扫餐车码的订单。</h2>
		<p class="text notice bg pt-10">注意：已结账单取消了反结账的功能，撤单后会将钱退还给顾客。</p>
		<div class="imgbox bg pt-20 pb-40">
			<img class="img11" v-lazy="require('../../images/11.png')" />
		</div>
		<h2 class="thdtitle bg">已撤单：已撤单页面用于查看已结撤单的订单，不能进行操作。</h2>
		<div class="imgbox bg pt-20 pb-80">
			<img class="img12" v-lazy="require('../../images/12.png')" />
		</div>
		<h2 class="subtitle bg">七、今日收益</h2>
		<div class="imgbox bg pt-20 pb-40">
			<img class="img13" v-lazy="require('../../images/13.png')" />
		</div>
		<h2 class="thdtitle bg">今日收益：点击进入今日收益页面，可以查看今天的收益情况。<br>
			a.账单总数=已结账单数+未结账单数<br>
			b.账单总金=已结账金额+未结账金额<br>
			c.今日收益=已结账金额
		</h2>
		<div class="imgbox bg pt-20 pb-40">
			<img class="img14" v-lazy="require('../../images/14.png')" />
		</div>
		<h2 class="thdtitle bg">收益详情：已结账金额=商品金额+配送费=今日收益</h2>
		<div class="imgbox bg pt-20 pb-80">
			<img class="img15" v-lazy="require('../../images/15.png')" />
		</div>
		<h2 class="subtitle bg">八、注意事项</h2>
		<div class="text bg pt-20 pb-80">
			<ol>
				<li>总金额 = 商品总金额 + 服务费 = 现金 + 在线支付 = 现金 + (在线商品款+服务费) = 现金 +(微信+支付宝+银联)；</li>
				<li>为保证可售商品库存数正确性，领班对需销毁的商品(含生鲜到期及各类不符合销售条件的商品)必须第一时间在POS机中进行退损维护。</li>
				<li>领班在同一交路的时间内，离开车底或者退乘时必须在云收银里点“下班”，进行关店操作!</li>
			</ol>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {};
	},
	methods: {},
	components: {},
	created() {}
};
</script>
<style lang="scss" scoped>
.train-wrap {
	width: 100%;
	margin: 0 auto;
	letter-spacing: 0;
}
.bg {
	position: relative;
	&:before {
		position: absolute;
		width: 1PX;
		height: 100%;
		content: "";
		background-color: #000;
		display: block;
		left: 22px;
		top: 0;
	}
}
.title {
	text-align: center;
	padding: 40px 0 50px;
	margin: 0;
	font-size: 34px;
	letter-spacing: 0;
}
.subtitle {
	text-align: left;
	font-size: 30px;
	position: relative;
	letter-spacing: 0;
	padding: 0 0 0 64px;
	line-height: 1;
	margin: 0;
	&:after {
		display: block;
		content: "";
		position: absolute;
		width: 0px;
		height: 0px;
		border-left: 28px solid #df2000;
		border-top: 15px solid transparent;
		border-right: 28px solid transparent;
		border-bottom: 15px solid transparent;
		background-color: transparent;
		left: 22px;
		top: 0;
	}
}
.thdtitle {
	text-align: left;
	font-size: 26px;
	position: relative;
	padding: 0 0 0 64px;
	line-height: 1.5;
	letter-spacing: 0;
	margin: 0;
	width: 720px;
	font-weight: normal;
	&:after {
		display: block;
		content: "";
		position: absolute;
		width: 26px;
		height: 26px;
		border-left: 1PX solid transparent;
		border-top: 1PX solid #000;
		border-right: 1PX solid #000;
		border-bottom: 1PX solid transparent;
		background-color: transparent;
		transform: rotate(45deg) skew(-15deg, -15deg);
		background-color: #fff;
		left: 7px;
		top: 7px;
	}
}
.text {
	font-size: 24px;
	margin: 0;
	padding-left: 64px;
	width: 670px;
	letter-spacing: 0;
	line-height: 1.5;
	ol {
		padding-left: 32px;
		margin: 0;
	}
}
.notice {
	color: #df2000;
}
.imgbox {
	width: 100%;
	text-align: center;
	img {
		display: block;
		margin: 0 auto;
		&.img1 {
			width: 620px;
		}
		&.img2,
		&.img3 {
			width: 572px;
		}
		&.img4,
		&.img5,
		&.img6,
		&.img7,
		&.img9,
		&.img10,
		&.img11,
		&.img14,
		&.img15 {
			width: 640px;
		}
		&.img8,
		&.img12,
		&.img13 {
			width: 300px;
		}
	}
}
.pt-10 {
	padding-top: 10px;
}
.pt-20 {
	padding-top: 20px;
}
.pb-20 {
	padding-bottom: 20px;
}
.pb-80 {
	padding-bottom: 80px;
}
.pb-40 {
	padding-bottom: 40px;
}
</style>

