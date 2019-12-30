<template>
    <section class="index-page">
        <Banner :lists="bannerList"></Banner>
        <div class="pay-total border">
            <sub-title>收款明细</sub-title>
            <ul class="total-inner clear-fix" :class="differClass">
                <li class="day f-l">
                    <p class="title">当日电子收款收入</p>
                    <p class="amount">{{bill.todayTotalAmt|money}}<span class="unit">元</span><i class="icon"></i></p>
                    <p class="diff">
                        <span class="mr-10">较前一天</span>
                        <span class="num">{{symbol(bill.differAmount)}}{{bill.differAmount|money}}</span>
                    </p>
                    <router-link class="link" to="/receipt-info">查看当日收款明细</router-link>
                </li>
                <li class="weekly f-l">
                    <p class="title">{{lastSettle.billDateStr|date('MM月dd日')}}支付结算</p>
                    <p class="amount">{{lastSettle.amount|money}}<span class="unit">元</span></p>
                    <p class="diff">(不包含直连交易)</p>
                    <a class="link" @click="toReceiptInfo">查看历史结算明细</a>
                </li>
            </ul>
        </div>
        <div class="day-total-chart border">
            <sub-title>日累计电子收款收入和结算趋势</sub-title>
            <div class="chart-con">
                <div class="chart" style="height: 280px" id="chart"></div>
            </div>
        </div>
    </section>
</template>

<script>
  import API from '../config/api'
  import Router from "@2dfire/utils/router";
  import sessionStorage from "@2dfire/utils/sessionStorage";
  import tools from '../utils/tools'
  import Banner from "../components/banner";

  // 引入 ECharts 主模块
  let echarts = require('echarts/lib/echarts');
  // 引入柱状图
  require('echarts/lib/chart/line');
  // 引入提示框和标题组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/title');
  require('echarts/lib/component/legend');

  export default {
    name: "index",
    components: {
      Banner
    },
    data() {
      return {
        bannerList: [{
            bannerUrl: "https://assets.2dfire.com/frontend/c63868ee4facac4025a5f23c70beae13.jpg",
            jumpUrl: "http://d.2dfire.com/static-boss-center/#/NewsDetail?id=80a543433c054ed882bad27c4a3a4ff6"
        },{
            bannerUrl: "https://assets.2dfire.com/frontend/eaa447fee8e265293058831aa1e69498.jpg",
            jumpUrl: "http://h5.eqxiu.com/ls/VIMXRgix"
        },{
          bannerUrl: "https://assets.2dfire.com/frontend/3ff333665d725703d855caf36ae4021a.jpg",
          jumpUrl: "oasis.html#/entrance"
        }, {
          bannerUrl: "https://assets.2dfire.com/frontend/fd5b8846f94f3133acbb11677004ad08.jpg",
          jumpUrl: "/credit/page/auth.html#/index?companyCode=ppdjy"
        }],
        ticket: Router.route.query["s_tk"] || "",
        token: sessionStorage.getItem('token'),
        bill: {},
        lastSettle: {},
        week: [],
        xyIncomeMap: {},
        xySettlementMap: {},
        xData: [],
        yIncome: [],
        ySettlement: []
      }
    },
    computed: {
      differClass() {
        let differAmount = this.bill.differAmount;
        if (differAmount > 0) {
          return 'up'
        } else if (differAmount < 0) {
          return 'down'
        } else {
          return ''
        }
      }
    },
    methods: {
      toReceiptInfo() {
        this.$router.push('/bill-info')
      },
      symbol(differAmount) {
        if (differAmount > 0) {
          return '+'
        } else {
          return ''
        }
      },
      getWeeklyTotal() {
        Promise.all([API.getWeeklyTotal(), API.getWeeklySettle()]).then((data) => {
          data[0].map((val) => {
            this.xyIncomeMap[val.billDateStr] = tools.divide(val.amount, 100)
          })
          data[1].map((val) => {
            this.xySettlementMap[val.billDateStr] = tools.divide(val.amount, 100)
          })
          this.week.map((val) => {
            this.yIncome.push(this.xyIncomeMap[val])
            this.ySettlement.push(this.xySettlementMap[val])
          })
          this.initChart()
        })
      },
      getHomeBill() {
        API.getHomeBill().then((data) => {
          this.bill = data || {}
        })
      },
      getEmphasisCircle(color) {
        return {
          color: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [{
              offset: 0, color: color // 0% 处的颜色
            }, {
              offset: 0.59, color: color // 0% 处的颜色
            }, {
              offset: 0.60, color: 'white' // 0% 处的颜色
            }, {
              offset: 1, color: 'white' // 100% 处的颜色
            }],
          }
        }
      },
      initChart() {
        let myChart = echarts.init(document.getElementById('chart'));
        let xNum = this.xData.length
        myChart.setOption({
          grid: {
            top: 40,
            bottom: 85,
            left: 60
          },
          tooltip: {
            trigger: 'axis',
            backgroundColor: '#fff',
            borderColor: '#ccc',
            borderWidth: 1,
            textStyle: {
              color: '#999',
            },
            axisPointer: {
              z: 0,
              type: 'none',
            },
            padding: [10, 15, 10, 23],
            position: (pos, params, dom, rect, size) => {
              // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
              let obj = {top: pos[1] - size.contentSize[1] - 20};
              if (params[0].dataIndex >= xNum - 2) {
                obj['left'] = pos[0] - size.contentSize[0] * 3 / 4
              } else {
                obj['left'] = pos[0] - size.contentSize[0] / 4
              }
              return obj;
            },
            formatter: (params) => {
              let name = ["电子收款", "日结算"];
              let html = `<div class="tooltip-wrapper tooltip-bottom-${params[0].dataIndex >= xNum - 2 ? 'right' : 'left'}">
                                                <p class="title">${params[0].name}</p>`
              let sum = 0;
              for (let i = 0, leg = params.length; i < leg; i++) {
                html += `<p class='list'>
                                                    <span class="label" style="background:${params[i].color} "></span>
                                                    ${name[i]}：${params[i].data}
                                             </p>`
                sum += params[i].data;
              }
              return html;
            }
          },
          legend: {
            data: [{
              name: "当日电子收款收入",
              icon: 'roundRect'
            }, {
              name: "日结算金额",
              icon: 'roundRect'
            }],
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 20,
            bottom: 10
          },
          xAxis: {
            type: 'category',
            data: this.xData,
            axisLabel: {
              interval: 0,
              rotate: 45,
              margin: 17,
              textStyle: {
                color: "#333",
                fontSize: 10
              }
            },
            axisLine: {
              lineStyle: {
                color: "#999"
              }
            }
          },
          yAxis: {
            name: '单位 (元)',
            nameTextStyle: {
              color: '#333',
              fontSize: 10,
              padding: [0, 30, 3, 0]
            },
            type: 'value',
            splitNumber: 5,
            splitLine: {
              lineStyle: {
                color: ['#ccc']
              }
            },
            axisLabel: {
              textStyle: {
                color: "#333",
                fontSize: 11
              }
            },
            axisLine: {
              lineStyle: {
                color: "#999"
              }
            },
            formatter(val) {
              return tools.number(val)
            }
          },
          series: [{
            name: '当日电子收款收入',
            data: this.yIncome,
            type: 'line',
            symbolSize: 6,
            itemStyle: {
              normal: {
                color: "#ff9900",
                lineStyle: {
                  color: "#ff9900",
                  width: 2
                },
                label: {
                  show: false,
                  color: "#333",
                  fontSize: "10",
                  formatter(a) {
                    return tools.number(a.value)
                  }
                }
              },
              emphasis: this.getEmphasisCircle("#ff9900")
            }
          }, {
            name: '日结算金额',
            data: this.ySettlement,
            type: 'line',
            symbolSize: 6,
            itemStyle: {
              normal: {
                color: "#08f",
                lineStyle: {
                  color: "#08f",
                  width: 2
                },
                label: {
                  show: false,
                  color: "#333",
                  fontSize: "10",
                  formatter(a) {
                    return tools.number(a.value)
                  }
                }
              },
              emphasis: this.getEmphasisCircle("#08f")
            }
          }]
        });
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 1,
          dataIndex: 6
        })
      },
      init() {
        this.getWeeklyConfig()
        this.getHomeBill()
        this.getWeeklyTotal()
        this.getLastDayTotalSettle()
      },
      getToken() {
        let ticket = sessionStorage.getItem("s_tk");
        let token = sessionStorage.getItem("token");
        if ((ticket === this.ticket || !this.ticket) && token) {
          this.init()
        } else {
          API.getToken({
            serviceTicket: this.ticket
          }).then(data => {
            let token = data.dfireToken;
            console.log("token:", token);
            sessionStorage.setItem("s_tk", this.ticket);
            sessionStorage.setItem("token", token);
            this.token = token
            this.init()
          })
        }
      },
      getWeeklyConfig() {
        for (let i = 6; i >= 0; i--) {
          let date = tools.getCurrDate(-i)
          let dateStr = date.join('-')
          this.week.push(dateStr)
          this.xData.push(date.slice(1).join('-'))
          this.xyIncomeMap[dateStr] = 0
          this.xySettlementMap[dateStr] = 0
        }
      },
      getLastDayTotalSettle() {
        API.getLastDayTotalSettle().then(res => {
          this.lastSettle = res || {}
        })
      }
    },
    mounted() {
      this.getToken()
    }
  }
</script>
<style lang="scss">
    .index-page {
        .pay-total {
            margin-top: 30px;
        }
        .pay-total .total-inner {
            border-top: 1PX solid #ccc;
            padding: 20px 0;
            text-align: center;
            font-size: 26px;
            li {
                width: 50%;
                .amount {
                    margin-top: 10px;
                    font-size: 44px;
                    .unit {
                        font-size: 22px;
                    }
                }
                .diff {
                    margin-top: 10px;
                    height: 36px;
                    line-height: 36px;
                    color: #999;
                    & > span {
                        display: none;
                    }
                }
                .link {
                    display: block;
                    margin-top: 10px;
                    color: #08f;
                }
            }
            &.up li .diff {
                & > span {
                    display: inline-block;
                }
                .num {
                    color: #f03;
                }
            }
            &.down li .diff {
                & > span {
                    display: inline-block;
                }
                .num {
                    color: #0c3;
                }
            }
            .day {
                border-right: 1PX solid #ccc;
                .amount .icon {
                    display: inline-block;
                    vertical-align: middle;
                    margin-left: 20px;
                    width: 18px;
                    height: 56px;
                    background: url("https://assets.2dfire.com/frontend/a8369eb416c47e13d7738b5eb537860c.png") no-repeat;
                    background-size: 16px 4px;
                    background-position: center;
                }
            }
            &.up .day .amount .icon {
                background: url("https://assets.2dfire.com/frontend/f8af52b272e59855b8ee992df6d47fce.png") no-repeat;
                background-size: 16px 20px;
                background-position: center;
            }
            &.down .day .amount .icon {
                background: url("https://assets.2dfire.com/frontend/0fabe4a6305c90ad10a15621c254f553.png") no-repeat;
                background-size: 16px 20px;
                background-position: center;
            }
        }
        .day-total-chart {
            margin-top: 30px;
            .chart-con {
                margin-left: 30px;
                border-top: 1PX solid #ccc;
            }
        }
        .activity {
            margin-top: 72px;
            margin-bottom: 88px;
        }
    }

    @mixin arrow($left, $size,$halfSize, $borderColor ) {
        content: "";
        position: absolute;
        height: 0;
        width: 0;
        border-top: $size solid $borderColor;
        border-left: $halfSize dashed transparent;
        border-right: $halfSize dashed transparent;
        bottom: -$size;
        left: $left;
        margin-left: -$halfSize;
    }

    .tooltip-bottom-left {
        &:before {
            @include arrow(25%, 18px, 10px, #999);
        }
        &:after {
            @include arrow(25%, 16px, 8px, #fff);
        }
    }

    .tooltip-bottom-right {
        &:before {
            @include arrow(75%, 18px, 10px, #999);
        }
        &:after {
            @include arrow(75%, 16px, 8px, #fff);
        }
    }

    .tooltip-wrapper {
        .title {
            font-size: 22px;
            color: #333333;
            letter-spacing: 0;
            line-height: 28px;
            margin: 0 0 6px 0;
        }
        .list {
            position: relative;
            font-size: 26px;
            color: #333333;
            letter-spacing: 0;
            line-height: 36px;
            margin: 0;
            .label {
                vertical-align: middle;
                display: inline-block;
                width: 10px;
                height: 10px;
                position: absolute;
                left: -20px;
                top: 50%;
                margin-top: -5px;
                border-radius: 2PX;
            }
        }
    }
</style>