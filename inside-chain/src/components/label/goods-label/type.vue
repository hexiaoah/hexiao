<template>
    <div class="container">
        <div class="type-wrapper">
            <div class="title">
                <span>类型</span>
                <span>(*必选)</span>
            </div>
            <ul class="label-list">
                <li v-for="(item, $index) in labelVoList"
                    @click="chanage(item)"
                    :class="{active: item.labelId === defaultTypeId}"
                    :key="$index">
                    {{item.labelName}}
                </li>
            </ul>
        </div>
        <div class="main-wrapper" v-show="[1, 2, 3, 4, 5].indexOf(defaultTypeId) >= 0">
            <div class="title">
                <span>选择主料</span>
                <span>（请登录手机掌柜，在主料标签库内选择主料标签）</span>
            </div>
            <div class="tab-wrapper">
                <div class="line-hide"></div>
                <Tabs type="card">
                    <TabPane v-for="items in tabData"
                             :label="items.labelMaterialName"
                             :name="items.labelMaterialName"
                             :key="items.labelMaterialId">
                        <ul class="label-list">
                            <li v-for="(item, $index) in items.mainMaterialLabelList"
                                :class="['pointer', {active: choosedLabelId.indexOf(item.labelId) >= 0}]"
                                @click="chooseMainIngredient(item, items.labelMaterialId)"
                                :key="$index">
                                {{item.labelName}}
                            </li>
                        </ul>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'type',
        props: {
            labelVoList: {
                type: Array,
                default(){
                    return []
                }
            },
            labelMaterialVoList: {
                type: Array,
                default(){
                    return []
                }
            },
            defaultTypeId: {
                type: Number,
                default: undefined
            },
            defaultMaterials: {
                type: Array,
                default(){
                    return []
                }
            }
        },
        computed: {
            choosedLabelId(){
                return this.defaultMaterials.map(item => item.labelId)
            },
            // 这里需要转换下， 因为tab是双层
            tabData(){
                let arr = this.labelMaterialVoList
                for(let i=0; i<arr.length; i++){
                    let arr2 = [].concat.apply([], arr[i].mainMaterialLabelList)
                    let arr3 = this.defaultMaterials.map(item => item.labelId)
                    arr2.map(item => {
                        item.isChoosed = Boolean(arr3.indexOf(item.labelId) >= 0)
                        return item
                    })
                    arr[i].mainMaterialLabelList = arr2
                }
                return arr
            }
        },
        methods: {
            chanage(item){
                this.$emit('change-main-ingredient', [])
                this.$emit('change-type', item)
            },
            chooseMainIngredient(item, fatherId){
                let arr = this.defaultMaterials.map(data => data.labelId)
                let arr2 = [].concat(this.defaultMaterials)
                let index = arr.indexOf(item.labelId)
                if(index >= 0){
                    arr2.splice(index, 1)
                    this.$emit('change-main-ingredient', arr2)
                }
                else{
                    arr2.push({
                        labelId: item.labelId,
                        labelName: item.labelName,
                        fatherId: fatherId
                    })
                    this.$emit('change-main-ingredient', arr2)
                }
            }
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

    .type-wrapper {

        .title {
            span:first-child {
                font-size: 14px;
                color: #333333;
            }

            span + span {
                font-size: 12px;
                color: #D83F3F;
                line-height: 20px;
            }
        }

        .label-list {
            overflow: hidden;

            li {
                width: 70px;
                height: 30px;
                line-height: 30px;
                background: #F1F1F1;
                border-radius: 67px;
                text-align: center;
                float: left;
                margin-top: 10px;
                margin-right: 10px;
                cursor: pointer;

                &.active {
                    background: #D83F3F;
                    color: white;
                }
            }
        }
    }

    .main-wrapper {
        margin-top: 30px;

        .title {
            span:first-child {
                font-size: 14px;
                color: #333333;
            }

            span + span {
                font-size: 12px;
                color: #3F3F3F;
                line-height: 20px;
            }
        }

        .tab-wrapper{
            position: relative;
            margin-top: 10px;

            .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab{
                border-radius: 0;
                background: #fff;
                width: 90px !important;
            }

            .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active{
                border-top: 1px solid #3399ff;
            }

            .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active:before{
                content: '';
                display: block;
                width: 100%;
                height: 1px;
                background: #3399ff;
                position: absolute;
                top: 0;
                left: 0;
            }

            .line-hide{
                position: absolute;
                top: 0;
                right: 0;
                width: 1px;
                height: 30px;
                z-index: 100;
                background: white;
            }
        }

        /deep/ .ivu-tabs{
            border: 1px solid #E6E6E6;
            border-top: 0;

            .ivu-tabs-bar{
                margin-bottom: 0!important;
            }

            .ivu-tabs-nav .ivu-tabs-tab:hover{
                color: #d83f3f;
                border-color: #eee !important;
            }

            .ivu-tabs-nav-container:focus .ivu-tabs-tab-focused{
                border-color: #eee !important;
            }

            &.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab{
                border: 1px solid #eee;
                border-bottom: 0;
                margin-right: 0!important;
                border-left: 0;
            }

            /deep/ .ivu-tabs-tab{
                width: 90px;
                text-align: center;
            }
        }

        .label-list {
            padding-left: 10px;
            height: 180px;
            overflow: auto;

            li {
                width: 70px;
                height: 30px;
                line-height: 30px;
                background: #F1F1F1;
                border-radius: 67px;
                text-align: center;
                float: left;
                margin-top: 10px;
                margin-right: 10px;
                font-size: 12px;

                &.active {
                    background: #D83F3F;
                    color: white;
                }
            }
        }
    }

    .pointer{
        cursor: pointer;
    }
</style>

