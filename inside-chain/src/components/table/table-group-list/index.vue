<template>
    <div class="list">
        <div class="list-header">
            <table-group-title :title-list="titleList"></table-group-title>
        </div>
        <sub-title :name="name"
                   :is-required="isRequired"
                   @add-goods="addGoods"
                   @delete-suit-group="deleteSuitGroup"
                   @edit-suit-group="editSuitGroup">
        </sub-title>

        <div v-for="(items, $index) in transformTableData"
             class="list-body"
             v-show="items.isValid"
             :key="$index">

            <div class="operation">
                <a href="javascript: void(0)" class="delete" @click="removeTable($index)">删除</a>
            </div>

            <div class="list-item">
                <base-info class="base-info"
                           :style="{width: titleList[0].width}"
                           :item-data="items">
                </base-info>

                <div class="spec-name" :style="{width: titleList[1].width}">{{items.specName || '无规格'}}</div>

                <div class="add-price" v-if="isRequired === 0" :style="{width: titleList[2].width}">
                    <InputNumber v-model="items.discountValue"
                                 :min="0"
                                 :step="1"
                                 placeholder="设置金额"
                                 @on-change="changeVal(items.discountValue, $index)">
                    </InputNumber>
                </div>

                <Select v-model="items.num"
                        v-if="isRequired === 0"
                        class="limit-num"
                        :style="{width: titleList[3].width}"
                        @on-change="changeSelect(items.num, $index)">
                    <Option v-for="item in numlist"
                            :value="item"
                            :key="item">
                        {{ item }}
                    </Option>
                </Select>

                <div class="limit-num-input" v-if="isRequired === 1" :style="{width: titleList[2].width}">
                    <InputNumber v-model="items.num"
                                 :min="0"
                                 :step="1"
                                 @on-change="changeSelect(items.num, $index)">
                    </InputNumber>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {suitGroupTitle, suitGroupTitleChoosedAll} from '@/const/emu-table-title.js'
    import BaseInfo from './components/base-info.vue'
    import TableGroupTitle from './components/title-list.vue'
    import SubTitle from './components/sub-title.vue'

    export default {
        name: 'table-group-list',
        props: {
            tableData: {
                type: Array,
                default: null
            },
            name: {
                type: String,
                default: ''
            },
            maxNum: {
                type: [String, Number],
                default: 1
            },
            isRequired: {
                type: Number,
                default: 0
            },
            suitIndex: {
                type: Number,
                default: 0
            }
        },
        computed: {
            numlist(){
                let arr = []
                if (this.isRequired === 1) {
                    return 100
                }
                else {
                    arr.push('不限制')
                    for (let i = 1; i < this.maxNum + 1; i++) {
                        arr.push(i)
                    }
                    return arr
                }
            },
            titleList(){
                return this.isRequired ? suitGroupTitleChoosedAll : suitGroupTitle
            },
            transformTableData(){
                if(this.isRequired === 1){
                    return (this.tableData || []).map(item => {
                        if(item.num === '不限制'){
                            item.num = 1
                        }
                        return item
                    })
                }
                return this.tableData || []
            }
        },
        methods: {
            editSuitGroup(){
                this.$emit('edit-suit-group', this.suitIndex)
            },
            deleteSuitGroup(){
                this.$emit('delete-suit-group', this.suitIndex)
            },
            addGoods(){
                this.$emit('add-goods', this.suitIndex, this.isRequired)
            },
            removeTable(index){
                this.$emit('remove-table-data', this.suitIndex, index)
            },
            changeVal(val, index){
                this.$emit('change-goods-price', val, this.suitIndex, index)
            },
            changeSelect(val, index){
                this.$emit('change-goods-limitnum', val, this.suitIndex, index)
            }
        },
        components: {
            TableGroupTitle,
            SubTitle,
            BaseInfo
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

    .list-header {
        height: 40px;
        position: relative;
        margin-top: 15px;

        /deep/ label {
            position: absolute !important;
        }

        .title-wrapper {
            width: 100%;
            position: relative;

            /deep/ .ivu-checkbox {
                position: absolute;
                top: 13px;
                left: 10px;
            }
        }
    }

    .list-body {
        padding-left: 110px;
        background: white;
        border: 1px solid #E5E5E5;
        border-top: 0;

        .list-item {
            margin-right: 172px;
            box-sizing: border-box;
            font-size: 0;

            .base-info {
                margin-left: -90px;
                margin-right: 90px;
            }

            /deep/ .ivu-select-selection, /deep/ input {
                width: 88px;
                height: 32px;
            }

            /deep/ .ivu-select-dropdown {
                width: 88px !important;
            }

            .base-info, .add-price, .limit-num, .spec-name {
                 display: inline-block;
                 vertical-align: middle;
                 font-size: 12px;

                 /deep/ .ivu-input-number{
                     width: 88px;

                     input{
                         margin-top: 0;
                     }
                 }
             }

            .limit-num-input{
                width: 23%;
                display: inline-block;

                &>div{
                    width: 88px;

                    /deep/ input{
                        margin-top: 0;
                    }
                }
            }
        }

        /deep/ .ivu-select-placeholder {
            font-size: 12px;
            color: #333333;
        }
    }

    .operation {
        width: 172px;
        margin-top: 45px;
        font-size: 0;
        float: right;
        text-align: left;

        a.delete {
            font-size: 12px;
            color: #5599FF;
            line-height: 12px;
        }
    }

    .hidden {
        visibility: hidden;
    }
</style>
