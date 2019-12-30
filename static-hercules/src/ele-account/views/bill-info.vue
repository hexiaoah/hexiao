<template>
    <section class="bill-info">
        <div class="tip">
            T日的支付结算信息，将在T+1 16:00对账后展示；交易金额包含直连交易，结算金额不包含直连交易。
        </div>
        <div class="query">
            <div class="time-group">
                <div class="start-time" :class="{'selected':!!query.startDate}" @click="showDatePicker('start')">{{startDateStr}}<i class="icon"></i></div>
                <p class="line"></p>
                <div class="end-time" :class="{'selected':!!query.endDate}" @click="showDatePicker('end')">{{endDateStr}}<i class="icon"></i></div>
            </div>
            <select-tab class="pay-type" :list="payTypes" :selected.sync="query.payType" title="支付方式"></select-tab>
        </div>
        <div class="total-amount">
            <div class="trade">
                <p class="text">交易总额</p>
                <p class="value">￥{{total.totalTrade|money}}</p>
            </div>
            <div class="settle">
                <p class="text">结算总额</p>
                <p class="value">￥{{total.totalSettle|money}}</p>
            </div>
            <div class="charge">
                <p class="text">手续费总额</p>
                <p class="value">￥{{total.totalCharge|money}}</p>
            </div>
        </div>
        <scroll-loading :pageLoad="pageLoad" :pageList.sync="pageList" :query.sync="query" :beforeLoad="beforeLoad">
            <div class="item" v-for="item in pageList" @click="linkTo(item)">
                <div class="top clear-fix">
                    <p class="text f-l">交易总额-{{item.billDateStr|date('MM月dd日')}}</p>
                    <p class="value c-666 f-r">{{item.totalTrade|money}}元</p>
                </div>
                <div class="mid clear-fix">
                    <p class="text f-l">结算总额</p>
                    <p class="value f-r">{{item.totalSettle|money}}元</p>
                </div>
                <div class="bottom clear-fix">
                    <p class="text f-l">手续费总额</p>
                    <p class="value f-r">{{item.totalCharge|money}}元</p>
                </div>
            </div>
            <div slot="no-results">
                <div class="fixed-center">
                    暂无结算明细
                </div>
            </div>
        </scroll-loading>
        <date-picker
                type="date"
                :visible.sync="datePicker.startVisible"
                :anchor="datePicker.startAnchor"
                textTitle="开始时间"
                @confirm="handleStartDateConfirm">
        </date-picker>

        <date-picker
                :visible.sync="datePicker.endVisible"
                type="date"
                :anchor="datePicker.endAnchor"
                textTitle="结束时间"
                @confirm="handleEndDateConfirm">
        </date-picker>
    </section>
</template>

<script>
    import API from '../config/api'
    import tools from '../utils/tools'
    import SelectTab from "../components/select-tab";
    import {payTypes} from '../constants/index'

    export default {
        name: "bill-info",
        components: {
            SelectTab
        },
        data() {
            return {
                payTypes: [{
                    code: 0,
                    name: "全部"
                }, ...payTypes],
                query: {
                    startDate: '',
                    endDate: '',
                    payType: ''
                },
                queryStr: {
                    startDate: '',
                    endDate: ''
                },
                datePicker: {
                    startAnchor: [],
                    endAnchor: [],
                    startVisible: false,
                    endVisible: false
                },
                pageList: [],
                total: {},
                pageLoad: API.getTotalBillList
            }
        },
        computed: {
            startDateStr() {
                let startDate = this.queryStr.startDate
                return startDate ? startDate : '开始时间'
            },
            endDateStr() {
                let endDate = this.queryStr.endDate
                return endDate ? endDate : '结束时间'
            }
        },
        methods: {
            linkTo(item) {
                this.$router.push(`/bill-day-info/${item.billDate}?payType=${this.query.payType}`)
            },
            showDatePicker(type) {
                this.datePicker[type + 'Visible'] = true
            },
            getTotalSettleBill() {
                API.getTotalSettleBill(this.query).then(res => {
                    this.total = res
                })
            },
            formatDate(arr, point = '') {
                let result = arr.map((val) => {
                    return val.value
                })
                return result.join(point)
            },
            handleStartDateConfirm(val) {
                this.datePicker.startAnchor = val
                this.query.startDate = this.formatDate(val)
                this.queryStr.startDate = this.formatDate(val, '.')

            },
            handleEndDateConfirm(val) {
                this.datePicker.endAnchor = val
                this.query.endDate = this.formatDate(val)
                this.queryStr.endDate = this.formatDate(val, '.')
            },
            beforeLoad() {
                let {startDate, endDate} = this.queryStr
                let ms = 30 * 24 * 60 * 60 * 1000;
                /*ios date格式必须是2018-01-01，ui需要显示2018.01.01*/
                let startTime = new Date(startDate.replace(/\./g, '-')).getTime()
                let endTime = new Date(endDate.replace(/\./g, '-')).getTime()
                if (endTime - startTime < 0) {
                    this.$toast("结束时间必须大于等于开始时间！")
                    return false
                }
                else if (endTime - startTime > ms) {
                    this.$toast("最多只能查询30天数据！")
                    return false
                } else {
                    return true
                }
            },
            saveQuery() {
                let {path} = this.$route
                this.$router.replace({path, query: {...this.query, ...this.queryStr}})
            }
        },
        watch: {
            query: {
                handler() {
                    this.getTotalSettleBill()
                    this.saveQuery()
                },
                deep: true
            }
        },
        created() {
            let {startDate, endDate, payType = ''} = this.$route.query
            this.query.payType = payType
            let yesterday = [], lastWeek = []
            if (startDate) {
                lastWeek = startDate.split('.')
            } else {
                lastWeek = tools.getCurrDate(-7)
            }
            if (endDate) {
                yesterday = endDate.split('.')
            } else {
                yesterday = tools.getCurrDate(-1)
            }

            let _yesterday = [], _lastWeek = []
            for (let val of yesterday) {
                _yesterday.push({
                    value: val
                })
            }
            for (let val of lastWeek) {
                _lastWeek.push({
                    value: val
                })
            }
            this.handleStartDateConfirm(_lastWeek)
            this.handleEndDateConfirm(_yesterday)
        }
    }
</script>

<style lang="scss" scoped>
    .bill-info {
        .total-amount {
            margin-top: 230px;
            color: #999;
            width: 100%;
            padding: 12px 0;
            text-align: center;
            overflow: hidden;
            & > div {
                float: left;
                width: 33%;
                .value {
                    font-size: 26px;
                }
            }
        }
        .tip {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            padding: 20px 20px;
            background: rgb(245, 236, 177);
            box-shadow: 0 0 0 0 #ccc;
            font-size: 30px;
            color: #333333;
            z-index: 101;
        }
        .query {
            position: absolute;
            top: 150px;
            left: 0;
            width: 100%;
            border-top: 1PX solid #ccc;
            border-bottom: 1PX solid #ccc;
            background-color: #fff;
            height: 80px;
            line-height: 80px;
            font-size: 30px;
            z-index: 101;
            .time-group {
                position: relative;
                float: left;
                width: 500px;
                height: 100%;
                &:before {
                    content: '';
                    position: absolute;
                    right: 0;
                    top: 20px;
                    width: 1PX;
                    height: 40px;
                    background-color: #ccc;
                }
                .line {
                    float: left;
                    position: relative;
                    width: 60px;
                    height: 100%;
                    &:after {
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translateX(-50%);
                        background-color: #999;
                        width: 28px;
                        height: 1PX;
                    }
                }
                .start-time {
                    text-align: right;
                }
                .end-time {
                    text-align: left;
                }
                .start-time, .end-time {
                    float: left;
                    width: 212px;
                    .icon {
                        display: inline-block;
                        width: 20px;
                        height: 16px;
                        vertical-align: middle;
                        margin-left: 10px;
                        background: url("https://assets.2dfire.com/frontend/6fb5bc03423e9171e4cb179df7cc3ffc.png") no-repeat;
                        background-size: 100%;
                    }
                    &.open {
                        .icon {
                            background: url("https://assets.2dfire.com/frontend/87f0478b66af0aa9f6c0006045e2084a.png") no-repeat;
                            background-size: 100%;
                        }
                    }
                    &.selected {
                        color: #0088ff;
                        .icon {
                            background: url("https://assets.2dfire.com/frontend/80d2ca6242bfc2716b9600e853793de6.png") no-repeat;
                            background-size: 100%;
                        }
                    }
                }
            }
            .pay-type {
                float: left;
                width: 250px;
                text-align: center;
            }

        }
    }
</style>