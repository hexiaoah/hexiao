<template>
    <div class="telPhone-bind">
        <div class="telPhone-bind-main" @click="cancle"></div>
        <div class="telPhone-bind-content">
            <div class="close-popup" @click="cancle"></div>
            <div class="telPhone-bind-logo"></div>
            <p class="telPhone-bind-notice">客官，为了更好的为你服务，请告诉小二你的手机号码。</p>
            <div class="telPhone-get-code-group">
                <div class="area-wrap">
                    <div :class="{'show-select select-active': selectShow, 'show-select': !selectShow}">{{ areaCode }}
                    </div>
                    <select ref="select-areacode" class="area-code" @click="handleSelectShow" v-model="area_code"
                            onblur="hideSelectShow">
                        <option value="86">中国+86</option>
                        <option value="65">新加坡+65</option>
                        <option value="852">中国香港+852</option>
                        <option value="853">中国澳门+853</option>
                        <option value="886">中国台湾+886</option>
                    </select>
                </div>
                <input  ref="phoneInput"
                       type="tel"
                       class="telephone-input"
                       v-model.trim.lazy="phone"
                       placeholder="请输入手机号码"
                       maxLength="11"
                />
            </div>
            <div class="validate-code-op">
                <input ref="codeInput"
                       type="text"
                       class="telPhone-identifying-code"
                       v-model.trim.lazy="code"
                       placeholder="请输入验证码"
                       maxLength="4"/>
                <a class="telephone-get-identifying-code"
                   :class="{ active: phoneStatus }"
                   @click="handleGetCode">{{ getCodeText }}</a>
            </div>
            <a @click="ok" class="telPhone-ok-submit" :style="{ background: submitBgColor }">确定</a>
			<!-- <div>
				<p class="voice-p">收不到短信？<span class="text-span" @click='getMobileReg'>试试语音验证码</span></p>
			</div> -->
        </div>
    </div>
</template>

<script>
	const validateMobile = require('../apis/validateMobile');
	const checkMobileReg = require('../apis/checkMobileReg');
	const sendMobileVerificationCode = require('../apis/sendMobileVerificationCode');
	const requester = require('base/requester');
	const API = require('../../../config/api');
	const {
		alert: alertDialog,
		tip: tipDialog,
		confirm: confirmDialog,
		warning: { showNetworkError, showFail, showError },
	} = require('../events');
	module.exports = {
		props: {
			'show': {
				type: Boolean,
				default: false
			}
		},
		data () {
			return {
				area_code: '86', // 区号
				// 倒计时timeout的index
				countDownTimeoutIndex: null,
				// 电话号码
				phone: '',
				// 输入的验证码
				code: '',
				// 倒计时的秒数
				seconds: 0,
				selectShow: false // 下拉列表
			};
		},
		watch: {
			show: function () {
				// TODO需要 touchMove
				// if (this.show) {
				//     $('body').unbind('touchmove').bind('touchmove', function (e) {
				//         e.preventDefault();
				//     });
				// } else {
				//     $('body').unbind('touchmove');
				// }
			}
		},
		methods: {

			// 检查手机注册情况
			requestGetMobileReg (callback) {
				let self = this;
				if (!this.phoneStatus) {
					return false;
				}

				let requestPrams = {
					mobile: this.phone,
					area_code: this.requestAreaCode
				};

				checkMobileReg(requestPrams)
					.then(() => {
						this.setVerifyState();
						callback(); // 60秒倒计时
					})
					.catch(({errorType, result}) => {
						if (errorType !== requester.ERROR_TYPES.RESULT_FAIL) {
							return;
						}
						const {code, errorCode, message} = result;
						if (+code !== 0) {
							return;
						}
						if (errorCode === 'ERR_102932') {
							// 手机号格式错误
							tipDialog.show('手机号码格式不正确!');
						} else if (errorCode === 'ERR_WMI077') {
							// 输入的手机号与当前号码一致,验证过
							this.clearPhone();
							tipDialog.show('你输入的手机号码与已绑手机号码相同，请重新输入!');
						} else if (errorCode === 'ERR_WMI079') {
							// 这个手机号下有会员卡
							confirmDialog.show({
								content: '你输入的新手机号码已注册过二维火账户，如果确认更换，我们会把两个手机号码的会员卡等信息合并，合并后请用新手机号码登录！',
								okBtnText: '继续更换',
								okCallBack: () => {
									confirmDialog.hide();
									self.setVerifyState();
									callback();
								},
								cancleCallBack: () => {
									confirmDialog.hide();
									self.clearCode();
								}
							})
						} else if (errorCode === 'ERR_WMI072') {
							// 手机号一致,未验证过
							self.setVerifyState();
							callback();// 60秒倒计时
						} else if (errorCode === 'ERR_101550') {
							tipDialog.show(message);
						}
					});
			},

			// 获取验证码
			requestGetCode () {
				let self = this;
				this.clearCode();
				this.$els.codeInput.focus();

				const params = {
					mobile: this.phone,
					area_code: this.requestAreaCode
				};

				return requester.post(API.GET_VERIFY_CODE, params, {emulateJSON: true})
					.then((data) => {
						if (data) {
							// 开始倒计时
//                        sessionInfo.setAreaCode(area_code);  //将区号存入session
							self.countDownStart();// 60秒倒计时
						}
					})
					.catch(() => {
						tipDialog.show('验证码获取失败,请稍后再试')
					});
//                sendMobileVerificationCode(data)
			},

			// 确定按钮
			ok () {
				if (!this.phoneStatus || !this.codeStatus) {
					return false;
				}

				let self = this;
				let phone = this.phone;
				let requestParams = {
					area_code: self.requestAreaCode,
					mobile: phone,
					code: this.code
				};


				return requester.post(API.COINFIRMvERIFY, requestParams, {emulateJSON: true})
					.then((data) => {
						// 绑定成功
						if (data) {
							self.clearCode();
							self.clearPhone();
							self.seconds = 0;
							this.success(phone);
						}
					})
					.catch(({errorType, result}) => {
						const {code, errorCode, message} = result;
						if (errorType !== requester.ERROR_TYPES.RESULT_FAIL) {
							return;
						}
						if (+code !== 0) {
							return;
						}

						if (errorCode === 'ERR_WMI074') {
							self.clearCode();
							tipDialog.show('验证码输入有误，请重新输入!');
						} else if (errorCode === 'ERR_WMI077') {
							self.clearCode();
							self.clearPhone();
							tipDialog.show('你输入的手机号码与已绑手机号码相同，请重新输入!');
						} else if (errorCode === 'ERR_WMI078') {
							tipDialog.show('修改太过频繁!');
						} else if (errorCode === 'ERR_102932') {
							tipDialog.show('手机号码格式不正确!');
						} else if (errorCode === 'ERR_101550') {
							tipDialog.show(message);
						} else if (errorCode === 'ERR_WMI224') {
							// 换绑
							confirmDialog.show({
								content: '该手机已与另一个第三方账户关联，请在app中使用该手机号登录解绑后重新操作',
								okBtnText: '确定',
								okCallBack: () => {
									confirmDialog.hide();
								},
								cancleCallBack: () => {
									confirmDialog.hide();
									self.clearCode();
								}
							})
						} else {
							alertDialog.show({
								content: '手机号码修改失败，请稍后再试！',
								okBtnText: '我知道了',
								okCallBack: () => {
									alertDialog.hide();
									this.clearCode();
								}
							});
                        }
					});

			},
			handleSelectShow() {
				this.selectShow = !this.selectShow;
			},
			hideSelectShow() {
				this.selectShow = false;
			},
			cancle() {
				this.$emit('cancle');
			},
			success (phone) {
				this.$emit('success', phone);
			},
			clearPhone () {
				this.phone = '';
				return this;
			},
			clearCode () {
				this.code = '';
				return this;
			},
			// 验证手机号后 把 v 设置成1 先放这儿吧
			setVerifyState () {
				sessionStorage.setItem('v', 1);
			},

			handleGetCode () {
				let self = this;
				if (!this.canGetCode) {
					return;
				}
				this.$els.phoneInput.blur();
				this.requestGetMobileReg(function () {
					self.code = '';
					self.codeStatus = false;
					self.requestGetCode();
				});
			},
			// 开始倒计时
			// seconds还需要的秒数
			countDownStart: function (seconds) {
				this.seconds = seconds || 60;

				let nowTime = parseInt(Date.now() / 1000, 10);
				// 重新设置倒计时解释时间
				this.setBindPhoneCountDownEndTime(nowTime + this.seconds);

				const times = () => {
					// 倒计时结束时间
					const endTime = parseInt(this.getBindPhoneCountDownEndTime() || 0, 10);

					nowTime++;
					const seconds = Math.max(endTime - nowTime, 0);

					// 当前时间减一
					this.seconds = seconds - 1;
					if (this.seconds <= 0) {
						this.countDownEnd();
					} else {
						this.countDownTimeoutIndex = setTimeout(times, 1000);
					}
				};

				times();
			},
			// 结束倒计时
			countDownEnd () {
				// 倒计时结束时间置为0
				this.setBindPhoneCountDownEndTime(0);
				this.seconds = 0;

				clearTimeout(this.countDownTimeoutIndex);
			},
			setBindTel (val) {
				window.sessionStorage.setItem('BindTel', val);
			},
			getBindTel () {
				return window.sessionStorage.getItem('BindTel');
			},
			setBindPhoneCountDownEndTime (val) {
				window.sessionStorage.setItem('receiptBindPhoneCountDownEndTime', val);
			},
			getBindPhoneCountDownEndTime () {
				return window.sessionStorage.getItem('receiptBindPhoneCountDownEndTime');
			},


			// 获取语音验证码之前检查手机注册情况
			getMobileReg () {
				let self = this;
				if (!this.phoneStatus) {
					return false;
				}
				if (self.phone == null || self.phone.length < 1) {
					alertDialog.show({ content: "手机号码不能为空", okBtnText: "确定" });
					return false;
				}
				let requestPrams = {
					mobile: this.phone,
					area_code: this.requestAreaCode
				};
				
				checkMobileReg(requestPrams)
					.then(() => {
						this.getVoiceCode();
					})
					.catch(({errorType, result}) => {
						if (errorType !== requester.ERROR_TYPES.RESULT_FAIL) {
							return;
						}
						const {code, errorCode, message} = result;
						if (+code !== 0) {
							return;
						}
						if (errorCode === 'ERR_102932') {
							// 手机号格式错误
							tipDialog.show('手机号码格式不正确!');
						} else if (errorCode === 'ERR_WMI077') {
							// 输入的手机号与当前号码一致,验证过
							this.clearPhone();
							tipDialog.show('你输入的手机号码与已绑手机号码相同，请重新输入!');
						} else if (errorCode === 'ERR_WMI079') {
							// 这个手机号下有会员卡
							confirmDialog.show({
								content: '你输入的新手机号码已注册过二维火账户，如果确认更换，我们会把两个手机号码的会员卡等信息合并，合并后请用新手机号码登录！',
								okBtnText: '继续更换',
								okCallBack: () => {
									confirmDialog.hide();
									self.getVoiceCode();
								},
								cancleCallBack: () => {
									confirmDialog.hide();
									self.clearCode();
								}
							})
						} else if (errorCode === 'ERR_WMI072') {
							// 手机号一致,未验证过
							self.getVoiceCode();
						} else if (errorCode === 'ERR_101550') {
							tipDialog.show(message);
						}
					});
			},

			// 获取语音验证码
			getVoiceCode(){
				let self = this;
				if (self.phone == null || self.phone.length < 1) {
					alertDialog.show({ content: "手机号码不能为空", okBtnText: "确定" });
					return false;
				}
				let requestParams = {
					area_code: self.requestAreaCode,
					mobile: self.phone,
				};
				return requester.post(API.GET_VOICE_CODE, requestParams, {emulateJSON: true})
					.then((data) => {
						if (data) {
							alertDialog.show({ content: "验证码将通过电话通知到您，请注意接听", okBtnText: "我知道了" });
						}
					})
					.catch(e => {
						if (e.errorType == requester.ERROR_TYPES.RESULT_FAIL) {
							showError(e.result.message, { canClose: true });
						} else if (e.errorType == requester.ERROR_TYPES.NETWORK_FAIL) {
							showNetworkError();
						}
					});
				return false;
			}
		},
		computed: {
			areaCode () {
				return this.area_code ? this.area_code.replace('+', '') : '';
			},
			requestAreaCode() {
				return "+" + this.areaCode;
			},
			// 按钮颜色
			submitBgColor () {
				return (this.phoneStatus && this.codeStatus)
					? '#e42700'
					: '#c8c8c8';
			},
			// 能否获取验证码，依照倒计时秒数
			canGetCode () {
				return this.seconds <= 0;
			},
			// 获取验证码按钮上的文字,60S秒后重发
			getCodeText () {
				return this.canGetCode ? '获取验证码' : this.seconds + '秒后重发';
			},
			// 验证码是否是4位纯数字
			codeStatus () {
				return !!this.code && /^\d{4}$/.test(this.code);
			},
			// 电话号码是否符合格式
			phoneStatus () {
				const status = !!this.phone && /^1[34578]\d{9}$/.test(this.phone);
				if (status) {
					this.setBindTel(this.phone);
				}
				return status;
			}
		},
		created () {
			// 倒计时结束时间
			const endTime = parseInt(this.getBindPhoneCountDownEndTime() || 0, 10);
			// 现在时间
			const nowTime = parseInt(Date.now() / 1000, 10);
			// 倒计时剩余秒数
			const seconds = Math.max(endTime - nowTime, 0);
			// 倒计时结束了没
			if (endTime - nowTime > 0) {
				this.countDownStart(seconds);
			}
			// 设置默认电话
			this.phone = this.getBindTel();
		}
	};
</script>

<style lang="scss" scoped>
    .telPhone-bind {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        min-height: 400PX;
        z-index: 5;
    }

    .telPhone-bind-main {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: none rgba(0, 0, 0, 0.65) scroll 0 0 repeat;
    }

    .telPhone-bind-content {
        box-sizing: border-box;
        position: absolute;
        top: 100px;
        left: 0;
        z-index: 6;
        width: 94.67%;
        margin: 0 2.67%;
        padding: 0 20px 20px 20px;
        border-radius: 4px;
        background-color: #fff;
        .close-popup {
            width: 30px;
            height: 30px;
            float: right;
            margin-top: 26px;
            background: url(../images/close.png) no-repeat center;
            background-size: contain;
        }
        .telPhone-bind-logo {
            margin: 50px auto 0;
            width: 140px;
            height: 164px;
            background: #fff url(../images/bind-tel.png) center center no-repeat;
            -webkit-background-size: contain;
            background-size: contain;
        }
        .telPhone-bind-notice {
            margin: 30px auto 0;
            width: 15em;
            height: 64px;
            font-size: 20px;
            color: #666;
            text-align: center;
        }
    }

    .telPhone-get-code-group {
        overflow: hidden;
        margin-top: 24px;
        .area-wrap {
            box-sizing: border-box;
            position: relative;
            float: left;
            width: 17.315%;
            height: 68px;
            line-height: 68px;
            margin-right: 20px;
            @media screen and (min-width: 320px) and (max-width: 374px) {
                width: 16.4%;
            }
            @media screen and (min-width: 376px) and (max-width: 414px) {
                width: 17.1%;
            }
            .show-select {
                position: absolute;
                top: 0;
                left: 40px;
                bottom: 0;
                right: 0;
                line-height: 68px;
                @media screen and (max-width: 320px) {
                    left: 32px;
                }
                font-size: 18px;
                background: url(../images/down.png) no-repeat right center;
                -webkit-background-size: 20px 12px;
                background-size: 20px 12px;
                &::before {
                    content: '+';
                    position: absolute;
                    left: -0.625rem;
                    top: -1.38%;
                    font-size: 1em;
                }
            }
            .select-active {
                background: url(../images/hide.png) no-repeat right center;
                -webkit-background-size: 20px 12px;
                background-size: 20px 12px;
            }
            .area-code {
                width: 100%;
                height: 120%;
                opacity: 0;
                position: absolute;
                top: 0;
                left: 20px;
                bottom: 0;
                right: 0;
                @media screen and (max-width: 320px) {
                    left: 10px;
                }
            }

        }
    }

    .telephone-input {
        width: 78.21%;
        height: 68px;
        float: right;
        color: #333;
        font-size: 20px;
        border: 1px solid #f2f2f2;
        border-radius: 8px;
        box-shadow: inset 1px 2px 5px #F2F2F2;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        text-indent: 20px;
    }

    .validate-code-op {
        overflow: hidden;
    }

    .telPhone-identifying-code {
        display: inline-block;
        margin-top: 20px;
        width: 71.045%;
        height: 68px;
        line-height: 68px;
        border-radius: 8px;
        border: 1px solid #f2f2f2;
        box-shadow: inset 1PX 2PX 5PX #F2F2F2;
        color: #333;
        font-size: 20px;
        text-indent: 20px;
        cursor: none;
    }

    .telephone-get-identifying-code {
        width: 24.78%;
        height: 68px;
        margin-top: 20px;
        line-height: 68px;
        color: #FFF;
        border-radius: 8px;
        border: 1px solid #D7D7D7;
        font-size: 20px;
        float: right;
        background: #c8c8c8;
        pointer-events: none;
        text-align: center;
    }

    .telPhone-bind-content .active {
        background: #e42700;
        pointer-events: auto;
    }

    .telPhone-ok-submit {
        display: block;
        box-sizing: border-box;
        margin-top: 16px;
        height: 76px;
        line-height: 76px;
        border-radius: 8px;
        color: #fff;
        text-align: center;
        font-size: 28px;
    }

    .telPhone-splitlines {
        height: 1px;
        background-color: #D7D7D7;
        margin-top: 34px;
        position: absolute;
        width: 100%;
        left: 0;
    }

    .area-code {
        width: 100%;
        height: 120%;
        opacity: 0;
        position: absolute;
        top: 0;
        left: 20px;
        @media screen and (max-width: 320px) {
            left: 10px;
        }
        bottom: 0;
        right: 0;
    }
	.voice-p{
	text-align: center;
	margin-top: 27px;
	font-size: 24px;
	.text-span{
		color: #ED982B;
	}
}
</style>
