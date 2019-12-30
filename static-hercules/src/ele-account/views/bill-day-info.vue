<template>
    <section class="bill-day-info">
        <div class="channel-info border mt-72">
            <sub-title>结算渠道明细</sub-title>
            <table-view
                    :columns="columns"
                    :pageList="channelList"
                    show-summary
                    show-toggle
            >
            </table-view>
        </div>
        <div class="tip">
            <p>1、带有直连标志的支付流水不计入结算金额，由微信/支付宝结算；</p>
            <p>2、不同支付场景下可能存在不同的服务费率，详细请查看
                <router-link to="/fee">《服务费率说明》</router-link>
                。
            </p>
        </div>
        <p class="title">明细信息</p>
        <scroll-loading :pageLoad="pageLoad" :pageList.sync="pageList" :query="query">
            <div class="item" v-for="item,index in pageList">
                <div class="top clear-fix">
                    <p class="text f-l">{{item.tradeType|formatTradeType}}-{{item.payer}}</p>
                    <p class="value f-r" @click="payInfoLink(item)">
                        <b :class="item.payStatus|formatPayStatusSymbol|symbolColor"><span>{{item.payStatus|formatPayStatusSymbol}}</span>{{item.amount|money}}</b><span class="c-666">元</span>
                        <i class="icon-right" v-show="item.tradeType===1"></i>
                    </p>
                </div>
                <div class="mid clear-fix">
                    <p class="text f-l">{{item.payStatus|formatPayStatusStr}}流水号：{{tradeNo(item)}}</p>
                    <clip-board class="copy f-l" :index="index" :text="tradeNo(item)">复制</clip-board>
                    <p class="value f-r" v-show="item.channelType!==1" @click="payInfoLink(item)">手续费：{{item.payStatus|formatPayStatusSymbol}}{{item.charge|money}}元</p>
                </div>
                <div class="bottom clear-fix">
                    <p class="text f-l">{{item.payTime|date('yyyy.MM.dd hh:mm:ss')}}</p>
                    <p class="value f-r" :class="{'icon-direct':item.channelType===1}" @click="payInfoLink(item)">{{item.payType|formatPayType}}</p>
                </div>
            </div>
            <div class="no-result" slot="no-results">
                暂无数据
            </div>
        </scroll-loading>
    </section>
</template>

<script>
    import API from '../config/api'
    import tools from '../utils/tools'
    import scheme from '../mixins/scheme'

    export default {
        name: "bill-day-info",
        mixins: [scheme],
        data() {
            return {
                query: {
                    billDate: '',
                    payType: ''
                },
                columns: [{
                    prop: "settleChannel",
                    text: "渠道名称"
                }, {
                    prop: "totalTrade",
                    text: "交易金额(元)",
                    formatter(val) {
                        return tools.divide(val, 100)
                    }
                }, {
                    prop: "totalSettle",
                    text: "结算金额(元)",
                    formatter(val, item) {
                        if (item["settleChannel"] && item["settleChannel"].indexOf('直连') > -1) {
                            return ''
                        } else {
                            return tools.divide(val, 100)
                        }
                    }
                }, {
                    prop: "totalCharge",
                    text: "手续费(元)",
                    formatter(val, item) {
                        if (item["settleChannel"] && item["settleChannel"].indexOf('直连') > -1) {
                            return ''
                        } else {
                            return tools.divide(val, 100)
                        }
                    }
                }],
                channelList: [],
                pageList: [],
                pageLoad: API.getOneDayFlowList
            }
        },
        methods: {
            getChannelList() {
                API.getChannelList(this.query).then(data => {
                    this.channelList = data
                })
            },
            tradeNo(item) {
                if (item.payStatus === 1) {
                    return item.outTradeNo
                } else {
                    return item.refundTradeNo
                }
            }
        },
        created() {
            this.query.billDate = this.$route.params.billDate
            this.query.payType = this.$route.query.payType || ''
            let dateStr = `${this.query.billDate.slice(0, 4)}年${this.query.billDate.slice(4, 6)}月${this.query.billDate.slice(6, 8)}日`
            document.title = dateStr + document.title
            this.getChannelList()
        }
    }
</script>

<style lang="scss" scoped>
    .bill-day-info {
        .no-result {
            padding: 68px 0;
            font-size: 30px;
            color: #ccc;
            text-align: center;
            background-color: #fff;
        }
        .title {
            padding-left: 30px;
            margin-top: 72px;
            margin-bottom: 20px;
            font-size: 30px;
            font-weight: bold;
            color: #333;
        }
        .tip {
            padding: 20px 30px;
            padding-bottom: 0;
            font-size: 26px;
            color: #999;
            a {
                color: #0088ff;
            }
        }
    }

</style>