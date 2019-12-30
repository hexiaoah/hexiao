export const chartDatas = [
    {
        "title": "营业额对比",
        "unit": "(万元)",
        "type": "LINE",
        xData: ['2017.12', '2018.01', '2018.02', '2018.03', '2018.04', '2018.05'],
        series: [{
            name: '营业额',
            // data: [10000, 12000, 13000, 15000, 18000, 15000],
            data: [{
                value: 10000,
                sum: 125555,
                precent: '10%'
            }, {
                value: 10000,
                sum: 125555,
                precent: '10%'
            }, 13000, 15000, 18000, 15000],
        }],
        config: {
            seriesLabel: true,//是否显示标注值
            color: ['#44cbff'],//全局颜色
            // tooltipFormatter: '{b0}11233</br >{a0}:{c0}</br>'
            // height: 400,
            // width: '100%',
            // grid: {
            //     top: 100,
            //     bottom: 100,
            //     left: 100,
            //     right: 100
            // }
        }
    },
    {
        "title": "营业额对比",
        "unit": "(万元)",
        "type": "LINE_DEFAULT",
        xData: ['2017.12', '2018.01', '2018.02', '2018.03', '2018.04', '2018.05'],
        series: [{
            name: '营业额',
            // data: [10000, 12000, 13000, 15000, 18000, 15000],
            data: [{
                value: 10000,
                sum: 125555,
                precent: '10%'
            }, {
                value: 10000,
                sum: 125555,
                precent: '10%'
            }, 13000, 15000, 18000, 15000],
        }],
        config: {
            seriesLabel: true,//是否显示标注值
            color: ['#44cbff'],//全局颜色
            tooltipFormatter: '{b0}11233</br >{a0}:{c0}</br>'
            // height: 400,
            // width: '100%',
            // grid: {
            //     top: 100,
            //     bottom: 100,
            //     left: 100,
            //     right: 100
            // }
        }
    },
    {
        "title": "营业额对比",
        "unit": "(万元)",
        "type": "LINE_GRAPH",
        xData: [
            '2009.6.12', '2009.6.13', '2009.6.14', '2009.6.15', '2009.6.16', '2009.6.17', '2009.6.18', '2009.6.19', '2009.6.20', '2009.6.21',
            '2009.6.22', '2009.6.24', '2009.6.25', '2009.6.26', '2009.6.27', '2009.6.28', '2009.6.29', '2009.6.30', '2009.7.1', '2009.7.2',
            '2009.7.3', '2009.7.4', '2009.7.5', '2009.7.6', '2009.7.7', '2009.7.8', '2009.7.9', '2009.7.10', '2009.7.11', '2009.7.12',
            '2009.7.13', '2009.7.14'],
        series: [{
            name: '1次',
            data: [10000, 12000, 13000, 15000, 18000, 15000, 10000, 12000, 13000, 15000, 18000, 15000,
                10000, 12000, 13000, 15000, 18000, 15000, 10000, 12000, 13000, 15000, 18000, 15000,
                10000, 12000, 13000, 15000, 18000, 15000, 10000, 12000, 13000, 15000, 18000, 15000,
                10000, 12000],
        }],
        config: {
            seriesLabel: false,//是否显示标注值
            color: ['#44cbff'],//全局颜色
            // tooltipFormatter: '{b0}11233</br >{a0}:{c0}</br>'
            // height: 400,
            // width: '100%',
            // grid: {
            //     top: 100,
            //     bottom: 100,
            //     left: 100,
            //     right: 100
            // }
        }
    },
    {
        "title": "营业额对比",
        "unit": "(万元)",
        "type": "LINE_HEAP",
        xData: ['饿了么', '美团', '百度外卖'],
        series: [{
            name: '1次',
            data: [60, 20, 30],
        }, {
            name: '2-3次',
            data: [30, 30, 40],
        }, {
            name: '4-5次',
            data: [50, 70, 30],
        }],
        config: {
            seriesLabel: false,//是否显示标注值
            // color: ['#44cbff'],//全局颜色
            // tooltipFormatter: '{b0}11233</br >{a0}:{c0}</br>'
            // height: 400,
            // width: '100%',
            // grid: {
            //     top: 100,
            //     bottom: 100,
            //     left: 100,
            //     right: 100
            // }
        }
    },
    {
        "title": "营业额对比",
        "unit": "(万元)",
        "type": "LINE_GRAPH_DEFAULT",
        xData: [
            '2009.6.12', '2009.6.13', '2009.6.14', '2009.6.15', '2009.6.16', '2009.6.17', '2009.6.18', '2009.6.19', '2009.6.20', '2009.6.21',
            '2009.6.22', '2009.6.24', '2009.6.25', '2009.6.26', '2009.6.27', '2009.6.28', '2009.6.29', '2009.6.30', '2009.7.1', '2009.7.2',
            '2009.7.3', '2009.7.4', '2009.7.5', '2009.7.6', '2009.7.7', '2009.7.8', '2009.7.9', '2009.7.10', '2009.7.11', '2009.7.12',
            '2009.7.13', '2009.7.14'],
        series: [{
            name: '1次',
            data: [10000, 12000, 13000, 15000, 18000, 15000, 10000, 12000, 13000, 15000, 18000, 15000,
                10000, 12000, 13000, 15000, 18000, 15000, 10000, 12000, 13000, 15000, 18000, 15000,
                10000, 12000, 13000, 15000, 18000, 15000, 10000, 12000, 13000, 15000, 18000, 15000,
                10000, 12000],
        }],
        config: {
            seriesLabel: true,//是否显示标注值
            color: ['#44cbff'],//全局颜色
            // tooltipFormatter: '{b0}11233</br >{a0}:{c0}</br>'
            // height: 400,
            // width: '100%',
            // grid: {
            //     top: 100,
            //     bottom: 100,
            //     left: 100,
            //     right: 100
            // }
        }
    },
    {
        "title": "营业额对比",
        "unit": "(万元)",
        "type": "LINE_AREA",
        xData: ['2017.12', '2018.01', '2018.02', '2018.03', '2018.04', '2018.05'],
        series: [{
            name: '营业额',
            data: [10000, 12000, 13000, 15000, 18000, 15000],
        }],
        config: {
            tooltipFormatter: '{b0}11233</br >{a0}:{c0}</br>'
            //     seriesLabel: true,//是否显示标注值
            //     color: ['#44cbff'],//全局颜色
            // height: 400,
            // width: '100%',
            // grid: {
            //     top: 100,
            //     bottom: 100,
            //     left: 100,
            //     right: 100
            // }
        }
    },
    {
        "title": "营业额对比",
        "unit": "(万元)",
        "type": "BAR",
        xData: ['近30天', '预期月'],
        series: [{
            name: '营业额',
            type: 'bar',
            data: [33, 30],
        }],
        config: {
            //     seriesLabel: false,//是否显示标注值
            //     color: ['#999'],//全局颜色
            // height: 400,
            // width: '100%',
            // grid: {
            //     top: 100,
            //     bottom: 100,
            //     left: 100,
            //     right: 100
            // }
        }
    },
    {
        "title": "营业额对比",
        "unit": "(万元)",
        "type": "BAR_HEAP",
        xData: ['饿了么', '美团', '百度外卖'],
        series: [{
            name: '1次',
            data: [60, 20, 30],
        }, {
            name: '2-3次',
            data: [30, 30, 40],
        }, {
            name: '4-5次',
            data: [50, 70, 30],
        }],
        config: {
            seriesLabel: false,//是否显示标注值
            color: ['#999'],//全局颜色
            barWidth: 20,
            tooltipFormatter: '{b0}</br >{a0}:{c0}</br>{a1}:{c1}</br>{a2}:{c2}</br>总计:{sum}'
            // height: 400,
            // width: '100%',
            // grid: {
            //     top: 100,
            //     bottom: 100,
            //     left: 100,
            //     right: 100
            // }
        }
    },
    {
        "title": "营业额对比",
        "unit": "(万元)",
        "type": "BAR_CROSSWISE",
        yData: ['菜品名称1菜品名称1菜品名称1', '菜品名称2', '菜品名称3'],
        series: [{
            type: 'bar',
            name: '1次',
            data: [{
                value: 60,
                utc: 120
            }, {
                value: 20,
                utc: 130
            }, {
                value: 60,
                utc: 160
            }],
        }],
        config: {
            // seriesLabel: false,//是否显示标注值
            // color: ['#999'],//全局颜色
            barWidth: 20,
            xAxisName: '商品销量及utc',
            // labelFormatter(a) {
            //     return `销量:${a.value},utc:${a.data.utc}`
            // }
            // height: 400,
            // width: '100%',
            // grid: {
            //     top: 100,
            //     bottom: 100,
            //     left: 100,
            //     right: 100
            // }
        }
    },
    {
        "title": "近30天营业额组成",
        "unit": "(万元)",
        "type": "PIE",
        series: [{
            name: '1次',
            data: [{value: 335, name: '老客'},
                {value: 679, name: '新客'},
                {value: 1048, name: '领卡会员'},
                {value: 1548, name: '充值会员'}]
        }],
        config: {
            tooltipFormatter: '{b0}11233</br >{a0}:{c0}</br>'
            // seriesLabel: true,//是否显示标注值
            // color: ['#999'],//全局颜色
            // height: 400,
            // width: '100%',
            // grid: {
            //     top: 100,
            //     bottom: 100,
            //     left: 100,
            //     right: 100
            // }
        }
    },
    {
        "title": "回头客占比",
        "unit": "",
        "type": "PIE_ANNULAR",
        series: [
            {
                name: '近30天占比',
                data: [{value: 479, name: '老客'},
                    {value: 679, name: 'other'}]
            },
            {
                name: '近15天占比',
                data: [{value: 479, name: '老客'},
                    {value: 679, name: 'other'}]
            },
            {
                name: '近30天占比',
                data: [{value: 479, name: '老客'},
                    {value: 679, name: 'other'}]
            },
            // {
            //     name: '近15天占比',
            //     data: [{value: 479, name: '老客'},
            //         {value: 679, name: 'other'}]
            // }
        ],
        config: {
            seriesLabel: false,//是否显示标注值
            color: ['#999'],//全局颜色,
            columnNumber: 3,
            tooltipFormatter: '{b0}11233</br >{a0}:{c0}%{d0}</br>'
            // height: 400,
            // width: '100%',
            // grid: {
            //     top: 100,
            //     bottom: 100,
            //     left: 100,
            //     right: 100
            // }
        }
    },
    {
        "title": "近30天营业额组成",
        "unit": "(万元)",
        "type": "RADAR",
        radarIndicator: [
            {name: '菜品复购率', max: 6500},
            {name: '新会员占比', max: 16000},
            {name: '人均消费次数', max: 30000},
            {name: '午餐交易占比', max: 38000},
            {name: '平均客单价', max: 52000},
            {name: '扫码点餐占比', max: 25000},
            {name: '顾客复购率', max: 25000},
            {name: '男会员占比', max: 25000}
        ],
        series: [{
            name: '1次',
            data: [{
                value: [4300, 10000, 28000, 35000, 50000, 19000, 19000, 19000],
                name: '预算分配',
                showArea: '#c7efff'
            }, {
                value: [5000, 14000, 28000, 31000, 42000, 21000, 14000, 14000],
                name: '实际开销',
                showArea: true
            }]
        }],
        config: {
            // height: 400,
            // width: '100%',
            // grid: {
            //     top: 100,
            //     bottom: 100,
            //     left: 100,
            //     right: 100
            // }
        }
    },
    {
        "title": "近30天营业额组成",
        "unit": "(万元)",
        "type": "GAUGE",
        series: [{
            name: '盈亏达成率',
            data:1
        }]
    },
]

