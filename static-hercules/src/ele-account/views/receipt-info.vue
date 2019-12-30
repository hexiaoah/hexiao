<template>
    <section class="receipt-info">
        <div class="query">
            <select-tab class="pay-type" :list="payTypes" :selected.sync="query.payType" title="支付方式"></select-tab>
            <select-tab class="trading-type" :list="tradeTypes" :selected.sync="query.tradeType" title="交易类型"></select-tab>
        </div>
        <p class="total-amount">合计收款金额：<span :class="total|amountColor">{{total|money}}</span>元</p>
        <scroll-loading :pageLoad="pageLoad" :pageList.sync="pageList" :query.sync="query">
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
                    <p class="value f-r" @click="payInfoLink(item)">{{item.payType|formatPayType}}</p>
                </div>
                <div class="bottom">
                    <p class="text">{{item.payTime|date('yyyy.MM.dd hh:mm:ss')}}</p>
                </div>
            </div>
            <div slot="no-results">
                <div class="fixed-center">
                    暂无当日收款明细
                </div>
            </div>
        </scroll-loading>
    </section>
</template>

<script>
    import API from '../config/api'
    import LineText from "../components/line-text";
    import {payTypes, tradeTypes} from '../constants/index'
    import scheme from '../mixins/scheme'
    import SelectTab from '../components/select-tab'

    export default {
        components: {
            LineText,
            SelectTab
        },
        mixins: [scheme],
        name: "receipt-info",
        data() {
            return {
                select: {
                    show: false,
                    list: [],
                    selected: '',
                    title: ''
                },
                query: {
                    payType: '',
                    tradeType: ''
                },
                selectedType: '',
                pageList: [],
                total: 0,
                payTypes: [{
                    code: 0,
                    name: "全部"
                }, ...payTypes
                ],
                tradeTypes: [{
                    code: 0,
                    name: "全部"
                }, ...tradeTypes],
                pageLoad: API.getTodayFlowList
            }
        },
        methods: {
            getTodayTotalAmount() {
                API.getTodayTotalAmount(this.query).then(res => {
                    this.total = res
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
        watch: {
            'select.show'(val) {
                if (!val) {
                    this.selectedType = ''
                }
            },
            query: {
                handler() {
                    this.getTodayTotalAmount()
                },
                deep: true
            }
        },
        created() {
            this.getTodayTotalAmount()
        }
    }
</script>

<style lang="scss" scoped>
    .receipt-info {
        .query {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 80px;
            line-height: 80px;
            text-align: center;
            font-size: 30px;
            background-color: #fff;
            border-top: 1PX solid #ccc;
            border-bottom: 1PX solid #ccc;
            z-index: 101;
            .pay-type, .trading-type {
                float: left;
                width: 50%;
            }
        }
        .total-amount {
            margin-top: 80px;
            height: 80px;
            line-height: 80px;
            padding-left: 30px;
            color: #999;
            font-size: 26px;
        }
    }

</style>