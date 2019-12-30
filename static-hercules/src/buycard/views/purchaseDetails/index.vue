<template>
    <div class="box">
        <div id="scroll-wrap">
            <div class="purchaseDetails_main">
                <div class="purchaseDetails_main_top">
                    <div class="shop_main">
                        <!-- 判断是否有活动，如果有，显示活动图标 -->
                        <img :src="valueData.iconUrl" class="icon_activity" v-if="activityType"/>
                        <img :src="valueData.imgPath" class="icon_shop"/>
                        <div class="shop_name">
                            <p class="shop_title">{{ valueData.baseData.name }}</p>
                            <p class="p_base" v-if="valueData.shopPrice">
                                {{ valueData.shopPrice }}
                            </p>
                            <p class="p_base" v-if="valueData.simpleIntro">
                                {{ valueData.simpleIntro }}
                            </p>
                            <p class="p_base" v-if="valueData.serviceCharge">
                                服务费:{{ valueData.serviceCharge }}
                            </p>
                        </div>
                    </div>
                    <!-- 立即购买调用安卓或ios的方法 -->
                    <div class="shop_buy" @click="moneyOpen()" v-if="valueData.showBtn">
                        立即购买
                    </div>
                </div>
                <!-- <ul :class='valueData.styleBtn'> -->
                <ul class="shop_info">
                    <li :class="['shop_price', { widthVal: valueData.priceArr.length == 2 }]"
                        v-for="(item, index) in valueData.priceArr" :key="index">
                        <div class="shopInfo">
                            <p class="shop_type_name">{{ item.name }}</p>
                            <div class="price_detail">
                                <p :class="['base_price', { color: item.originPrice }]">
                                    <span>{{ item.price | priceFormat }}</span>
                                    <span>{{ item.unit }}</span>
                                </p>
                                <p class="origin_price" v-if="item.originPrice">
                                    {{ item.originPrice | priceFormat }}{{ item.unit }}
                                </p>
                                <p v-if="item.serviceCharge" class="service">
                                    服务费:{{ item.serviceCharge | priceFormat }}{{ item.serviceUnit }}
                                </p>
                                <div v-if="valueData.serviceType === 1">
                                    <span>{{ item.num }}</span>
                                    <span>{{ item.numUnit }}</span>
                                </div>
                                <p class="limit" v-if="item.isLimit && item.isLimit > 0">
                                    限购{{ item.limitNum }}份
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>

                <!-- 判断是否有活动 -->
                <div v-if="activityType">
                    <div class="purchaseDetails_main_time">
                        <p class="purchaseDetails_main_time_p1">优惠时间</p>
                        <p class="purchaseDetails_main_time_p2">
                            {{ valueData.baseData.startTime | transTime }}~{{
                            valueData.baseData.endTime | transTime }}
                        </p>
                    </div>
                    <div class="purchaseDetails_main_active">
                        <p class="purchaseDetails_main_active_name">活动说明</p>
                        <p>{{ valueData.baseData.description }}</p>
                    </div>
                </div>
                <!--判断是否有优惠券的权限-->
                <div class="purchaseDetails_main_coupon"
                     v-if="showCoupon(valueData.baseData.coupons)" @click="showCouponModal">
                    <p>优惠券</p>
                    <div class="coupon_label">{{valueData.couponLabel}}</div>
                    <img src="../../images/more.png" class="purchaseDetails_main_coupon_icon">
                </div>

                <!--判断是否有点券并判断是否有点券分店管理的权限-->
                <div class="purchaseDetails_main_coupon" v-if="couponType" @click="ticketOpen()">
                    <p>点券开通</p>
                    <img src="../../images/more.png" class="purchaseDetails_main_coupon_icon">
                </div>
                <!--判断是否有点券并判断是否有点券分店管理的权限-->
                <div class="purchaseDetails_main_coupon" v-if="couponType1"
                     @click="ticketSubbranchManage()">
                    <p>点券分店管理</p>
                    <img src="../../images/more.png" class="purchaseDetails_main_coupon_icon">
                </div>
            </div>

            <!-- 判断是否有试用 -->
            <div class='purchaseDetails_bottom'>
                <div class="cantry" v-if="canTry && !valueData.integralVO">
                    <p class="convert-info"><span class="text">提示:您有一个试用机会。</span><span class="convert-btn" @click="onCanTry()">立即试用</span></p>
                </div>
                <div class="cantry" v-if="valueData.integralVO && valueData.integralVO.explain">
                    <p class="convert-info"><span class="text">{{valueData.integralVO.explain}}</span><span class="convert-btn" @click="convert()">立即兑换</span></p>
                </div>
            </div>

            <!-- tab页显示顺序为'功能介绍','商家案例','购买说明' -->
            <div class="content-body">
                <ul class="tab-head">
                    <li v-for="(item, index) in valueData.tabs"
                        :class="{ active: index == valueData.num }" @click="handleTab(index, item)"
                        :key="index">
                        {{ item }}
                    </li>
                </ul>
                <div class="tab-cont" v-for="(itemCont, index) in valueData.tabCont"
                     v-show="index == valueData.num" track-by="$index" :key="index"
                     v-html="itemCont"></div>
            </div>
        </div>
        <coupon-list :show="valueData.couponShow" :data="valueData.availableCoupon"
                     @close='closeCouponModal'></coupon-list>
    </div>
</template>

<script>
	const Requester = require('base/requester')
	const router = require('@2dfire/utils/router')
	const API = require('../../config/api')
	import SdkAnalytics from '@2dfire/sdk-analytics';
	import {
		dateFormat
	} from '../../../base/utils/date'
	import couponList from '../../components/coupon';
	import {
		fixedBody,
		looseBody
	} from '../../../base/utils/unit.js'

	const {
		ANALYSYS_APPKEY,
		ANALYSYS_DEBUG_MODE,
		ANALYSYS_UPLOAD_URL
	} = require('apiConfig')

	let valueData = {
		shopPrice: null,
		serviceCharge: null,
		simpleIntro: '', //方案简介
		tabs: ['功能介绍', '商家案例', '购买说明'],
		num: 0,
		tabCont: [],
		textHtml: '',
		schemeId: '',
		priceArr: [],
		priceNum: null,
		baseData: {
			coupons: []
		},
		itemId: '',
		serviceType: '',
		imgPath: '',
		iconUrl: '',
		showBtn: false,
		couponLabel: "",
		availableCoupon: [
			// {
			//     id:"1",
			//     discount:"20",
			//     name:"哈哈哈哈哈",
			//     threshold:"满1000可用",
			//     startTime:1234567890123,
			//     endTime:1232143214
			// }
		], //可用的优惠券
		couponShow: false, //券弹窗展示
	}
	export default {
		data() {
			return {
				valueData,
				// 埋点信息
				trackInfo: {},
				// 页面访问来源
				pinsource: null,
				// 用户id
				userId: '',
			}
		},
		components: {
			'coupon-list': couponList
		},
		filters: {
			priceFormat(price) {
				return (price / 100).toFixed(2)
			},
			transTime(timestamp) {
				return dateFormat('yyyy.MM.dd', new Date(timestamp))
			}
		},
		computed: {
			activityType() {
				return this.valueData.baseData.activityType == 1
			},
			couponType() {
				return (
					this.valueData.baseData.hasVoucher &&
					this.valueData.baseData.couponType == 1
				)
			},
			couponType1() {
				return (
					this.valueData.baseData.hasVoucher &&
					this.valueData.baseData.couponType == 2
				)
			},
			canTry() {
				return this.valueData.baseData.canTry
			}
		},
		methods: {
			showCoupon(val) {
				return val.length > 0;
			},
			prevent(e) {
				e.preventDefault();
			},
			// 显示可用券弹窗
			showCouponModal() {
				this.valueData.couponShow = true;
				fixedBody();
			},
			// 关闭可用券弹窗
			closeCouponModal() {
				looseBody();
				this.valueData.couponShow = false;
			},
			//获取数据
			getData() {
				const t = this
				const params = {
					item_id: router.route.query['item_id'] || '',
					app_key: router.route.query['app_key'] || '200006',
					s_apv: router.route.query['s_apv'] || ''
				}
				Requester.get(API.BUY_DETAILS_CARD, {
					params: params
				}, false)
					.then(data => {

						t.valueData.baseData = data
						t.valueData.simpleIntro = data.simpleIntro
						t.valueData.priceArr = data.skuVOList
						t.valueData.priceNum = data.skuVOList.length
						t.valueData.schemeId = data.schemeId
						t.valueData.itemId = data.itemId
						t.valueData.serviceType = data.serviceType //0 线上  1 线下
						t.valueData.imgPath = data.imgPath
						t.valueData.iconUrl = data.iconUrl
						t.valueData.integralVO = data.integralVO
						t.valueData.name = data.name
						//判断返回值是否有商家案例，如果没有，将Tab栏的商家案例隐藏
						if (data.merchantCase) {
							t.valueData.tabCont = [
								data.intro,
								data.merchantCase,
								data.chargeIntro
							]
						} else {
							t.valueData.tabs.splice(1, 1)
							t.valueData.tabCont = [data.intro, data.chargeIntro]
						}
						//判断是否存在点券价格，如果有，不在价格栏显示，而显示在名称下面
						for (let i = 0; i < data.skuVOList.length; i++) {
							if (data.skuVOList[i].isCoupon > 0) {
								t.valueData.shopPrice =
									(data.skuVOList[i].price / 100).toFixed(2) +
									data.skuVOList[i].unit
								if (data.skuVOList[i].serviceCharge) {
									t.valueData.serviceCharge =
										(data.skuVOList[i].serviceCharge / 100).toFixed(2) +
										data.skuVOList[i].serviceUnit
								}
								t.valueData.priceArr.splice(i, 1)
							}
						}
						t.valueData.showBtn = true
						// 获取优惠券标签
						let arr = [];
						t.valueData.baseData.coupons.map(v => {
							arr.push(v.title);
						})
						t.valueData.couponLabel = arr.join(';');
						// 有可用优惠券时调用
						if (t.valueData.baseData.coupons.length > 0) {
							t.getCoupons();
						}
					})
					.catch(e => {
						console.log(e)
					})
			},
			//切换tab页内容
			handleTab(index, item) {
				this.valueData.num = index
				// 统计购买说明的点击量
				if (item === '购买说明') {
					this.trackBuyIntroduction()
				}
			},
			//调用安卓或ios的试用方法
			onCanTry() {
				const itemId = this.valueData.itemId
				const itemName = this.valueData.baseData.name
				window.tdfire.tryOut(itemId, itemName)
			},
			/*
             兑换
              */
			convert() {
				window.tdfire.integral(this.valueData.name, this.valueData.integralVO.skuId)
			},
			//调用安卓或ios的立即购买方法
			moneyOpen() {
				this.trackBuyButton()
				const itemId = this.valueData.itemId
				const serviceType = this.valueData.serviceType
				// console.log(itemId)
				// console.log(serviceType)
				// window.tdfire.moneyOpen(itemId,serviceType)
				window.tdfire.moneyOpen(itemId)
			},

			//调用安卓或ios的分店管理方法
			ticketSubbranchManage() {
				const schemeId = this.valueData.baseData.schemeId
				window.tdfire.ticketSubbranchManage(schemeId)
			},

			//调用安卓或ios的点券开通方法
			ticketOpen() {
				const schemeId = this.valueData.baseData.schemeId
				window.tdfire.ticketOpen(schemeId)
			},
			// 获取优惠券
			getCoupons() {
				const t = this
				const params = {
					// item_id:'331755747417358336',
					item_id: router.route.query["item_id"] || "387273512659830337",
					app_key: router.route.query["app_key"] || '200006'
				};
				Requester.get(API.AVAILABLE_COUPON, {
					params: params
				}, false).then(data => {
					t.valueData.availableCoupon = data;
				}).catch(e => {
					console.log(e)
				})
			},
			// 初始化埋点信息     由客户端传递 从url上获取
			initTrackInfo() {
				const { entity_type = '', role_name = '', is_super_user = '', entity_id = '', pinsource = '', user_id = ''} = router.route.query || {}
				const trackInfo = {
					entityType: entity_type,
					roleName: role_name,
					isSuperUser: is_super_user,
					entityId: entity_id,
				}
				this.trackInfo = trackInfo
				this.pinsource = pinsource
				this.userId = user_id
				console.log('trackInfo', trackInfo, pinsource)
			},
			// 埋点配置
			trackConfig() {
				// console.log('埋点注册～')
				SdkAnalytics.config({
					appkey: ANALYSYS_APPKEY,
					debugMode: ANALYSYS_DEBUG_MODE,
					uploadURL: ANALYSYS_UPLOAD_URL
				})
				SdkAnalytics.register(this.userId)
			},
			// 活动购买详情页面埋点
			trackPageView() {
				// console.log('pv埋点')
				SdkAnalytics.pageView('功能介绍页面', this.trackInfo)
			},

			trackPageSource() {
				// console.log('页面来源埋点')
				SdkAnalytics.track('ModulechargingPageSource', {
					pinsource: this.pinsource
				})
			},
			// 立即购买按钮埋点
			trackBuyButton() {
				// console.log('立即购买按钮埋点')
				SdkAnalytics.track('ModulechargingPageBuyButton', this.trackInfo)
			},
			// 购买说明埋点
			trackBuyIntroduction() {
				// console.log('购买说明埋点')
				SdkAnalytics.track('ModulechargingPageBuyIntroduction', this.trackInfo)
			}
		},
		created() {
			this.trackConfig()
			this.initTrackInfo()
		 	this.getData()
			this.trackPageView()
			this.trackPageSource()
		},
		mounted() {
		}
	}
</script>

<style src="./main.scss" lang="scss" scoped>

</style>

<style scoped>
    .wrap {
        width: 750px;
        height: 600px;
        overflow: auto;
    }

    .cont {
        height: 800px;
    }
</style>
