
<script>
var dialogEvents = require("../events");
module.exports = {
	data() {
		return {
			logs: []
		};
	},
	components: {
		dialogs: require("../index.vue")
	},
	methods: {
		showTipDialog(content) {
			dialogEvents.tip.show(content);
		},
		showBindPhoneDialog(content) {
			dialogEvents.bindPhone.show({ content });
		},
		showConfirmDialog(content) {
			dialogEvents.confirm.show({
				content,
				okCallBack: () => {
					this.logs.push("confirm确认");
					dialogEvents.confirm.hide();
				},
				cancleCallBack: () => {
					this.logs.push("confirm取消");
					dialogEvents.confirm.hide();
				}
			});
		},
		showAlertDialog(content) {
			dialogEvents.alert.show({
				content,
				okBtnText: "我不这么认为",
				okCallBack: () => {
					this.logs.push("alert取消");
					dialogEvents.alert.hide();
				}
			});
		},
		showWarningDialog() {
			dialogEvents.warning.showError("授权失败，请重新扫码进入", { canClose: true });
		}
	}
};
</script>

<template>
    <div>
    <dialogs></dialogs>
    <button @click="showTipDialog('我是tip')">showTipDialog</button>
    <button @click="showBindPhoneDialog('我是BindPhone')">showBindPhoneDialog</button>
    <button @click="showConfirmDialog('我是Confirm')">showConfirmDialog</button>
    <button @click="showAlertDialog('阿哈哈哈')">showAlertDialog</button>
    <button @click="showWarningDialog">showWarningDialog</button>
    <ul>
        <li v-for="log of logs" > {{ log }}</li>
    </ul>
  </div>
</template>
