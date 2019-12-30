<template>
    <Form class="left-form" :label-width="215">
        <FormItem label="设置份量" class="category" v-show="!!specDetailList.length">
            <div class="table-wrapper">
                <ul class="table-title">
                    <li>规格名称</li>
                    <li>菜肴份量</li>
                    <li>选择菜量相当于普通的几份</li>
                </ul>
                <ul class="table-body">
                    <li v-for="(item, $tindex) in tableData" class="table-li">
                        <div>{{item.specDetailName}}</div>
                        <div>
                            <Select v-model="item.specDetailType"
                                    class="select"
                                    @on-change="changeSpecDetailType($tindex, $event)">
                                <Option v-for="(item, $index) in weightList"
                                        :value="item"
                                        :key="$index">
                                    {{ item }}
                                </Option>
                            </Select>
                        </div>
                        <div v-show="item.specDetailType === '特大量'">
                            <Select v-model="item.weight" class="select" @on-change="changeWeightList($tindex, $event, item.specDetailType)">
                                <Option v-for="(item, $index) in limitScope"
                                        :value="item"
                                        :key="$index">
                                    {{ item }}
                                </Option>
                            </Select>
                        </div>
                    </li>
                </ul>
            </div>
        </FormItem>
        <FormItem label="菜肴份量" class="category" v-show="!specDetailList.length">
            <Select v-model="transformWeight" class="weight" @on-change="changeWeight">
                <Option :value="item" v-for="item in weightList" :key="item">{{item}}</Option>
            </Select>
            <Select v-model="weight" class="weight" @on-change="changeBigWeight" v-show="transformWeight === '特大量'">
                <Option :value="item" v-for="item in limitScope" :key="item">{{item}}</Option>
            </Select>
        </FormItem>
    </Form>
</template>

<script>
    import {mapState, mapActions, mapGetters} from "vuex"
    export default {
        name: 'dishes-weight',
        props: {
            specWeightList: {
                type: Array,
                default(){
                    return []
                }
            }
        },
        data() {
            return {
                transformWeight: '标准菜量',
                weightList: ['极小份', '标准菜量', '特大量'],
                weight: 1,
                tableData: []
            }
        },
        computed: {
            limitScope(){
                let arr = []
                for (let i = 2; i < 101; i++) {
                    arr.push(i)
                }
                return arr
            },
            ...mapState({
                specDetailList(state){
                    if (state.setting.common.goods.detailToBack.specDetailList && state.setting.common.goods.detailToBack.specDetailList.length) {
                        return state.setting.common.goods.detailToBack.specDetailList.filter(item => item.isValid === 1)
                    }
                    return []
                }
            }),
            ...mapGetters({
                goodsDetailFromBackSpecWeight: "setting/goodsDetailFromBackSpecWeight",
            })
        },
        watch: {
            goodsDetailFromBackSpecWeight(newval){
                console.log(newval)
                if (newval.specWeightList && newval.specWeightList.length) {
                    newval.specWeightList.map(item => {
                        let index = item.weight > 2 ? 2 : item.weight
                        item.specDetailType = this.weightList[index]
                        return item
                    })
                    this.tableData = Object.assign([], newval.specWeightList)
                }
                if (newval.weight || newval.weight == 0) {
                    this.weight = newval.weight
                    let val = this.weight > 2 ? 2 : this.weight
                    this.transformWeight = this.weightList[val]
                }
            },
            specDetailList(newval){
                if (newval && newval.length) {
                    let validSpec = newval.filter(item => item.isValid === 1)
                    let validSpecId = validSpec.map(item => item.specDetailId)
                    this.tableData = this.tableData.filter(item => {
                        return validSpecId.indexOf(item.specDetailId) >= 0
                    })
                    let arr = this.tableData.map(item => item.specDetailId)
                    for(let i=0; i <validSpec.length; i++){
                        if(arr.indexOf(validSpec[i].specDetailId) < 0){
                            this.tableData.push({
                                specDetailName: newval[i].name,
                                specDetailType: '标准菜量',
                                weight: 1,
                                specDetailId: newval[i].specDetailId
                            })
                        }
                    }
                }
            }
        },
        methods: {
            ...mapActions({
                _changeGoodsItemVal: 'setting/changeGoodsItemVal'
            }),
            changeSpecDetailType(index, val){
                this.tableData[index].weight = this.weightList.findIndex(item => item === val)
                this._changeGoodsItemVal({attr: 'specWeightList', val: this.tableData})
            },
            changeWeightList(index, val, specDetailType){
                if (val) {
                    this.tableData[index].weight = val
                }
                else{
                    let value = this.weightList.indexOf(specDetailType)
                    this.tableData[index].weight = value
                }
                this._changeGoodsItemVal({attr: 'specWeightList', val: this.tableData})
            },
            changeWeight(val){
                console.log('changeWeight', val)
                let index = this.weightList.indexOf(val)
                this.weight = index
                this._changeGoodsItemVal({attr: 'weight', val: index})
            },
            changeBigWeight(val){
                if(val >= 2){
                    this.weight = val
                    this._changeGoodsItemVal({attr: 'weight', val: val})
                }
            }
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

    .category {

        .table-wrapper {
            width: 690px;

            .table-title {
                width: 690px;
                border: 1px solid #dddee1;
                background: #F1F1F1;
                overflow: hidden;

                li:first-child {
                    padding-left: 20px;
                }

                li {
                    width: 33%;
                    float: left;
                    color: #999;
                }
            }

            .table-body {
                width: 100%;

                .table-li {
                    width: 100%;
                    overflow: hidden;
                    border: 1px solid #dddee1;
                    border-top: none;

                    & > div:first-child {
                        padding-left: 20px;
                    }

                    & > div {
                        width: 229px;
                        float: left;
                        box-sizing: border-box;
                        height: 40px;
                        line-height: 40px;
                    }
                }
            }
        }

        .weight {
            width: 200px;
        }

        .select {
            width: 136px;
        }
    }
</style>

