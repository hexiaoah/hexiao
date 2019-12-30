<template>
    <div class="table-view border-top">
        <div class="container">
            <table class="inner border-all" border="0" cellspacing="0" cellpadding="0">
                <thead>
                <tr>
                    <th class="border-bottom border-right" v-for="col in columns" :style="colStyle">{{col.text}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="showSummary">
                    <td class="border-bottom border-right" v-for="col in columns">{{total[col.prop]}}</td>
                </tr>
                <tr v-for="item,index in pageList" v-if="showTable">
                    <td class="border-bottom border-right" v-for="col in columns">{{formatCol(item,col)}}</td>
                </tr>
                <tr @click="handleToggle" v-if="showToggle">
                    <td class="border-bottom toggle" colspan="4">{{toggleText}}</td>
                </tr>
                </tbody>
            </table>

        </div>
    </div>
</template>

<script>
    import tools from '../utils/tools'

    export default {
        name: "table-view",
        props: {
            columns: {
                type: Array,
                default: []
            },
            pageList: {
                type: Array,
                default: []
            },
            showSummary: {
                type: Boolean,
                default: false
            },
            showToggle: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                showTable: true
            }
        },
        computed: {
            colStyle() {
                let len = this.columns.length
                return {
                    "width": 100 / len + '%'
                }
            },
            total() {
                let total = {}
                let columns = this.columns
                let pageList = this.pageList

                for (let i = 0; i < columns.length; i++) {
                    let col = columns[i]
                    let prop = col.prop
                    let sum = 0
                    for (let j = 0; j < pageList.length; j++) {
                        let val = pageList[j][prop]
                        if (tools.isNumber(val)) {
                            sum += val
                        } else {
                            sum = ''
                            break
                        }
                    }

                    if (i === 0) {
                        total[prop] = '合计'
                    }
                    if (sum || sum === 0) {
                        total[prop] = this.formatVal(sum, col)
                    }
                }
                return total
            },
            toggleText() {
                if (this.showTable) {
                    return "收起数据"
                } else {
                    return "展开数据"
                }
            }
        },
        methods: {
            handleToggle() {
                this.showTable = !this.showTable
            },
            formatCol(item, col) {
                let value = item[col.prop]
                return this.formatVal(value, col, item)
            },
            formatVal(value, col, item = {}) {
                let {formatter} = col
                if (formatter && typeof formatter === 'function') {
                    return formatter(value, item)
                } else {
                    return value
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .table-view {
        margin-left: 30px;
        padding-top: 20px;
        padding-right: 32px;
        padding-bottom: 30px;
        .container {
            .inner {
                width: 100%;
                thead th {
                    height: 70px;
                    line-height: 70px;
                    background: rgba(204, 204, 204, 0.30);
                    font-size: 20px;
                    &:last-child:before {
                        border-right: none;
                    }
                }
                tbody tr {
                    height: 70px;
                }
                tbody td {
                    text-align: center;
                    font-size: 22px;
                    &.toggle {
                        font-size: 26px;
                        color: #0088ff;
                    }
                    &:last-child:before {
                        border-right: none;
                    }
                }
                tbody tr:last-child td:before {
                    border-bottom: none;
                }
            }
        }
    }
</style>