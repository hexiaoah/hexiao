<template>
    <section class="fee-page">
        <div class="border mt-72">
            <sub-title>最新服务费率</sub-title>
            <table-view
                    :columns="columns"
                    :pageList="pageList"
            >
            </table-view>
        </div>
        <p class="tip">不同支付场景下可能存在不同的服务费率。</p>
    </section>
</template>

<script>
    import API from '../config/api'
    import {dateFormat} from "@2dfire/utils/date";
    import tools from '../utils/tools'

    export default {
        name: "fee",
        data() {
            return {
                columns: [{
                    prop: "payScene",
                    text: "支付场景"
                }, {
                    prop: "feeRate",
                    text: "服务费率(%)",
                    formatter(val) {
                        return tools.number(tools.multiply(val, 100))
                    }
                }, {
                    prop: "updateTime",
                    text: "最后更新时间",
                    formatter(val) {
                        return dateFormat(new Date(val), 'yyyy.MM.dd')
                    }
                }],
                pageList: []
            }
        },
        methods: {
            getFeeData() {
                API.getFeeData().then(data => {
                    this.pageList = data
                })
            }
        },
        created() {
            this.getFeeData()
        }
    }
</script>

<style lang="scss" scoped>
    .tip {
        font-size: 26px;
        color: #999;
        padding: 20px 30px;
    }
</style>