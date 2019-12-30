import tools from './tools'

/**
 * @param xNum tooltip 自适应左侧或者右侧
 * */
const leftOrRight = (xNum) => {
    return (pos, params, dom, rect, size) => {
        // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
        let obj = {top: pos[1] - size.contentSize[1] / 2};
        if (params[0].dataIndex < xNum / 2) {
            obj['left'] = pos[0] + 20
        } else {
            obj['right'] = size.viewSize[0] - pos[0] + 15
        }
        return obj;
    }
}
/**
 * @param arrow formatter箭头自适应
 * @param percent 是否显示占比率
 * */
const getFormatter = (arrow, percent) => {
    return (params) => {
        console.log(params)
        let percentHtml = percent ? `<p class='list'>占比:${tools.number(params.percent)}%</p>` : '';
        return `<div class="tooltip-wrapper tooltip-${arrow}">
                      <p class="title">${params.seriesName}</p>
                      <p class='list'>
                            <span class="label" style="background:${params.color}"></span>
                            ${params.name}:${params.value}
                      </p>
                      ${percentHtml}
                 </div>`
    }
}

export let setOption = {
    grid: {
        top: 10,
        bottom: 50,
        left: 60,
        right: 30
    },
    tooltip: {
        // 提示框触发的条件
        triggerOn: 'mousemove|click',
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        axisPointer:{
            z:0
        },
        textStyle: {
            color: '#999',
        },
        padding: [10, 15, 10, 23],
        // confine:true,
        position: 'bottom',
        formatter: getFormatter('top')
    },
    // 图例组件
    legend: {
        type: 'plain',
        show: true,
        itemWidth: 10,
        itemHeight: 10,
        borderRadius: 2,
        left: 'center',
        // 图例列表的布局朝向
        orient: 'horizontal',
        bottom: 15,
    },
    xAxis: {
        type: 'category',
        // 坐标轴刻度标签的相关设置
        axisLabel: {
            interval: 0,
            margin: 5,
            textStyle: {
                fontSize: 10
            }
        }
    },
    yAxis: {
        type: 'value',
        // 坐标轴刻度标签的相关设置
        axisLabel: {
            textStyle: {
                fontSize: 11
            }
        },
        formatter(val) {
            return tools.number(val)
        }
    },
    series: [{
        type: 'line',
        barWidth: 20,
        itemStyle: {
            normal: {
                // 标签
                label: {
                    show: false
                }
            }
        },
    }],
    leftOrRight: leftOrRight,
    getFormatter: getFormatter
}
