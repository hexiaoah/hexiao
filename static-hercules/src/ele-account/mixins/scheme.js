export default {
    methods: {
        payInfoLink(item) {
            let {tradeType, orderId} = item
            /*消费类型，订单号存在*/
            if (tradeType === 1) {
                if (orderId) {
                    window.location.href = `tdf-manager://2dfire.com/member/payInfo?orderId=${orderId}&totalPayId=`
                } else {
                    this.$alert({
                        content: '此账单还未经过收银员的同意，暂时无法查看详情哦',
                        confirmText: "我知道了"
                    })
                }
            }
        }
    }
}