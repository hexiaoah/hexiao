import Vue from "vue";
import iView from "iview";

Vue.use(iView);

let Modal = iView.Modal;

function catchError(e) {
    if (e.result) {
        let errorCode = e.result.errorCode;
        let errorMsg = e.result.message;
        if (errorMsg === '保存的名称重复') {
                Modal.warning({
                    title: '请注意',
                    content: "已存在同名付款方式，请修改后再保存",
                });
        }else{
            Modal.warning({
                title: '请注意',
                content: errorMsg || '网络波动，请稍后再试',
            });
        }
    }
}

export default catchError
