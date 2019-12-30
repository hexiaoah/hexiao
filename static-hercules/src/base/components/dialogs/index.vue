<template>
    <div>
        <bind-phone
            v-show="dialogs.bindPhone.show"
            @cancle="handleDialogEvent(dialogs.bindPhone, 'cancle')"
            @success="handleDialogEvent(dialogs.bindPhone, 'success', $arguments)"
        >
            {{ dialogs.bindPhone.content}}
        </bind-phone>
        <tip
            @timeout="handleDialogEvent(dialogs.tip, 'timeout')"
            v-show="dialogs.tip.show"
            :show="dialogs.tip.show"
            :index="dialogs.tip.index"
        >
            {{ dialogs.tip.content }}
        </tip>
        <confirm
            @ok="handleDialogEvent(dialogs.confirm, 'ok')"
            @cancle="handleDialogEvent(dialogs.confirm, 'cancle')"
            v-show="dialogs.confirm.show"
            :ok-btn-text="dialogs.confirm.okBtnText"
            :cancle-btn-text="dialogs.confirm.cancleBtnText"
        >
            {{ dialogs.confirm.content }}
        </confirm>
        <alert
            @ok="handleDialogEvent(dialogs.alert, 'ok')"
            v-show="dialogs.alert.show"
            :ok-btn-text="dialogs.alert.okBtnText"
        >
            {{ dialogs.alert.content }}
            <template slot="okBtnText">
                {{ dialogs.alert.okBtnText }}
            </template>
        </alert>

        <warning
            @close="handleDialogEvent(dialogs.warning, 'close')"
            v-show="dialogs.warning.show"
            :type="dialogs.warning.type"
            :can-close="dialogs.warning.canClose"
        >
            {{ dialogs.warning.content }}
        </warning>
        <div class="preloader"></div>
    </div>
</template>

<script>
/**
 * 此组件为了统一管理弹窗而引入，更合理的方案应该在各自组件中挂载需要的弹窗，然后在各自组件管理这些弹窗的状态
 */

const dialogEvents = require("./events");

// 默认弹窗的状态，通过此来重置组件
const defaultDialogs = {
	tip: {
		content: "",
		show: false,
		// FIXME 为了触发autohide引入
		index: 0
	},
	confirm: {
		content: "",
		show: false,
		okBtnText: "",
		cancleBtnText: "",
		okCallBack: null,
		cancleCallBack: null
	},
	alert: {
		show: false,
		content: "",
		okBtnText: "",
		okCallBack: null
	},
	bindPhone: {
		show: false,
		content: "",
		successCallBack: null,
		cancleCallBack: null
	},
	warning: {
		show: false,
		content: "",
		type: null,
		canClose: true
	}
};

module.exports = {
	data: function() {
		return {
			dialogs: Object.assign({}, defaultDialogs)
		};
	},
	components: {
		tip: require("./dialogs/tip.vue"),
		alert: require("./dialogs/alert.vue"),
		confirm: require("./dialogs/confirm.vue"),
		warning: require("./dialogs/warning.vue"),
		"bind-phone": require("./dialogs/bindPhone.vue")
	},
	created() {
		dialogEvents.$on("dialog-change", this.dialogChange);
	},
	methods: {
		dialogChange({ name, options }) {
			// 获取默认弹窗状态
			const defaultDialog = defaultDialogs[name] || {};
			// 在默认状态上修改
			this.dialogs[name] = Object.assign({}, defaultDialog, options);
		},
		handleDialogEvent(dialog, eventName, args) {
			const cb = dialog[eventName + "CallBack"];
			if (cb) {
				args = args || [];
				cb(...args);
			} else {
				dialog.show = false;
			}
		},
		handleTipTimeout() {
			this.dialogs.tip.show = false;
		}
	}
};
</script>

<style lang="scss" scoped>
// 预加载图片
.preloader {
	background-image: url("./images/cry.png");
	width: 0px;
	height: 0px;
}
</style>
