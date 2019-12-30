<template>
    <div class="analyze-wrapper" id="analyze-wrapper">
        <h2 class="h2">结果分析</h2>
        <div class="section-main border-t border-b">
            <section class="detail">
                <p v-for="i in analyze.detail.split(/\\n/g)">
                    {{i}}
                </p>
            </section>
            <ul class="setting-icon border-t" v-if="analyze.settingIcon">
                <li class="icon-list" v-for="(item, index) in analyze.settingIcon" :key="index" :class="index!==0?'border-t':''">
                    <a :href="item.url">
                        <div class="icon-wrapper"
                             :class="item.type==='PASS'?(item.permission?'z-pass':'z-noPass'):(item.permission?'z-update':'z-noUpdate')">
                            <img :src="item.icon">
                        </div>
                        <div class="title">{{item.name}}</div>
                        <div class="hint" :class="item.permission?'z-green':'z-red'">{{item.type==='PASS'?(item.permission?'已开通':'未开通'):(item.permission?'已是最新版':'版本偏低')}}</div>
                    </a>
                </li>
            </ul>
            <div v-for="(item ,index) in analyze.chart" :key="index">
                <!--<div v-for="(item ,index) in chartDatas" :key="index">-->
                <!--<charts :type="item.type" :chartId="'chart_'+index" :chartData="item"></charts>-->
                <charts :type="item.type" :chartId="'chart_'+index" :chartData="getItem(item)" class="border-t"></charts>
            </div>
        </div>
    </div>
</template>

<script>
    import {chartDatas} from '../utils/chartData'
    // import Chart from './chart//Chart'
    console.log(1)
    import {getResultTop} from '../config/api'

    export default {
        name: 'result',
        props: {
            analyze: {
                required: true,
            }
        },
        data() {
            return {
            }
        },
        created() {},
        methods: {
            getItem(item) {
                let items = Object.assign({config: {}}, item);
                if (item.type === 'BAR' || item.type === 'BAR_HEAP' || item.type === 'BAR_CROSSWISE') {
                    items.config.barWidth = 20
                }
                if (item.type === 'BAR_CROSSWISE') {
                    items.config.labelFormatter = (a) => {
                        return `${item.series[0].name || '销量'}:${a.value}${a.data.utc ? ',utc:' + a.data.utc : ''}`
                    }
                }
                if (item.type === 'LINE_GRAPH') {
                    items.config.interval = !isNaN(items.interval ) ? items.interval : 4;
                }
                if(item.type==='LINE_GRAPH'||item.type==='LINE'){
                    items.config.tooltipFormatter = `{b0}{a0}:</br>{c0}`
                }
                if(item.type==='PIE'){
                    items.config.legendValueShort = true
                }
                items.series = item.series.map((val, index) => {
                    return {
                        data: val.points || val.simpPoints || val.data,
                        name: val.name || ''
                    }
                });
                return items
            }
        },
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .detail {
        font-size: 15PX;
        color: #333333;
        letter-spacing: 0.3PX;
        text-align: justify;
        line-height: 20PX;
        padding: 15PX;
    }

    .setting-icon {
        margin-left: 15PX;
        padding: 0 15PX 0 0;
        overflow: hidden;
        .icon-list {
            height: 120px;
            position: relative;
        }
        .icon-wrapper {
            width: 44PX;
            height: 44PX;
            line-height: 0;
            position: absolute;
            left: 0;
            top: 50%;
            margin-top: -22PX;
            border-radius: 6PX;
            overflow: hidden;
            /*&:after {*/
                /*content: '';*/
                /*font-size: 8PX;*/
                /*height: 10PX;*/
                /*line-height: 10PX;*/
                /*position: absolute;*/
                /*bottom: 0;*/
                /*left: 0;*/
                /*right: 0;*/
            /*}*/
            /*&.z-noPass:after {*/
                /*background: #FF0033 url("https://assets.2dfire.com/frontend/64cae77f92d4b72adf13ba70aec67785.png") no-repeat center;*/
                /*background-size: 30PX;*/
            /*}*/
            /*&.z-pass:after {*/
                /*background: #0acc47 url("https://assets.2dfire.com/frontend/0ba4d8c8ad16f3303b29b081687d0a89.png") no-repeat center;*/
                /*background-size: 30PX;*/
            /*}*/
            /*&.z-noUpdate:after {*/
                /*background: #FF0033 url("https://assets.2dfire.com/frontend/b4e14268a75bac822bbb5ee74af3b627.png") no-repeat center;*/
                /*background-size: 30PX;*/
            /*}*/
            /*&.z-update:after {*/
                /*background: #0acc47 url("https://assets.2dfire.com/frontend/13a804c056189b1e6be7b9d84b490e93.png") no-repeat center;*/
                /*background-size: 30PX;*/
            /*}*/
            img {
                width: 100%;
                height: 100%;
            }
        }
        .title {
            font-size: 15PX;
            color: #333333;
            letter-spacing: 0.26PX;
            line-height: 120px;
            margin-left: 120px;
            /*margin: 9PX 0 10PX;*/
        }
        .hint{
            position: absolute;
            right: 0;
            top: 0;
            &.z-green{
                font-size: 15PX;
                color: #00CC33;
                letter-spacing: 0;
                text-align: right;
                line-height: 120px;
            }
            &.z-red{
                font-size:15PX;
                color: #FF0033;
                letter-spacing: 0;
                text-align: right;
                line-height: 120px;
            }
        }
    }
</style>
