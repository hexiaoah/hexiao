<template>
    <div class="text-left">
        <!--{{isEdit}}-->
        <h4>基础设置</h4>
        <div>
            <div class="table full-width">
                <div class="table-cell left">
                    {{ (isIncludeValue == 0) ? '商品分类' : '套餐分类'}}
                </div>
                <div class="table-cell right">
                    <baseVerifyInput :input="baseSetting.goodClass"
                                     @verify="emitVerify($event,'goodClass')"></baseVerifyInput>
                </div>
            </div>
            <div class="table full-width">
                <div class="table-cell left">
                    上级分类
                </div>
                <div class="table-cell right">
                    <DropdowMenu :list="upperClassOptions" :input="baseSetting.upperClass"
                                 @verify="emitVerify($event,'upperClass')"></DropdowMenu>
                </div>
            </div>
            <div class="table full-width">
                <div class="table-cell left">
                    分类编码
                </div>
                <div class="table-cell right">
                    <baseVerifyInput :input="baseSetting.classCode"
                                     @verify="emitVerify($event,'classCode')"></baseVerifyInput>
                </div>
            </div>
        </div>
        <!--isEdit:{{isEdit}} - hasChild:  {{hasChild}}-->
        <div v-if="!(!!isEdit && !!hasChild)">
            <h4>高级设置</h4>
            <div>
                <div class="table full-width">
                    <div class="table-cell left">
                        销售额归到其他分类
                    </div>
                    <div class="table-cell right">
                        <DropdowMenu :list="groupKindOptions" :input="baseSetting.saleClass"
                                     @verify="emitVerify($event,'saleClass')"></DropdowMenu>

                    </div>
                </div>
                <div class="table full-width">
                    <div class="table-cell left" style="vertical-align: top; padding-top: 8px;">
                        销售提成
                    </div>
                    <div class="table-cell right">
                        <baseVerifySelect :input="baseSetting.saleCommissionClass"
                                          @verify="emitVerify($event,'saleCommissionClass')"
                                          @change="saleCommissionClassValueChanged"></baseVerifySelect>
                    </div>
                    <!--{{baseSetting.saleCommissionByPercent}}-->
                    <div class="table-cell last-right" style="width: 90px"
                         v-if="baseSetting.saleCommissionClass.value!=1">
                        <!--<baseVerifyInput :input="baseSetting.saleCommission"-->
                        <!--@verify="emitVerify($event,'saleCommission')"></baseVerifyInput>-->
                        <!--按比例提成-->
                        <baseVerifyInput :input="baseSetting.saleCommissionByPercent"
                                         @verify="emitVerify($event,'saleCommissionByPercent')"
                                         v-if="baseSetting.saleCommissionClass.value==2"></baseVerifyInput>
                        <!--按金额提成-->
                        <baseVerifyInput :input="baseSetting.saleCommissionByAssert"
                                         @verify="emitVerify($event,'saleCommissionByAssert')"
                                         v-if="baseSetting.saleCommissionClass.value==3"></baseVerifyInput>
                    </div>
                    <div class="table-cell text-left" style="width: 60px;"
                         v-if="baseSetting.saleCommissionClass.value!=1">
                        <span v-show="baseSetting.saleCommissionClass.value==2"> %</span>
                    </div>
                </div>
                <div class="table full-width">
                    <div class="table-cell left" style="vertical-align: top; padding-top: 10px;">
                        {{ (isIncludeValue == 0) ? '商品' : '套餐'}}备注
                    </div>
                    <div class="table-cell right add-remark">
                        <baseLabels :list="baseSetting.remarkList.value" @on-del="deleteRemarkList"></baseLabels>
                        <ButtonAdd class="button-add-remark" @on-tap="addRemark">添加新备注</ButtonAdd>
                    </div>
                </div>
                <!--//商品备注选项框-->
                <div class="table full-width" v-if="baseSetting.selectRemark.show">
                    <div class="table-cell left" style="vertical-align: top; padding-top: 10px;">
                        <!--商品加料-->
                    </div>
                    <div class="table-cell right add-remark">
                        <baseVerifySelect :input="baseSetting.selectRemark"
                                          @change="selectRemarkChange"></baseVerifySelect>
                    </div>
                </div>
                <div class="table full-width" v-if="isIncludeValue==0">
                    <div class="table-cell left" style="vertical-align: top; padding-top: 10px;">
                        {{ (isIncludeValue == 0) ? '商品' : '套餐'}}加料
                    </div>
                    <div class="table-cell right add-remark">
                        <baseLabels :list="baseSetting.newFeed.value" @on-del="deleteFeedList"></baseLabels>
                        <ButtonAdd class="button-add-remark" @on-tap="addFeed">添选新料</ButtonAdd>
                    </div>
                </div>
                <!--//商品加料选项框-->
                <div class="table full-width" v-if="baseSetting.selectFeed.show">
                    <div class="table-cell left" style="vertical-align: top; padding-top: 10px;">
                        <!--商品加料-->
                    </div>
                    <div class="table-cell right add-remark">
                        <baseVerifySelect :input="baseSetting.selectFeed" @change="selectFeedChange"></baseVerifySelect>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /**
     * 添加商品分类的modal body部分
     * @param res
     * @author
     *
     */
    import multiInput from '@/components/goods-class/multi-input';
    import baseVerifyInput from '@/components/verify/base-verify-input'
    import baseVerifySelect from '@/components/verify/base-verify-select'
    import baseLabels from '@/components/label/base-labels'
    import ButtonAdd from '@/components/button/button-add'
    import DropdowMenu from '@/components/goods-class/dropdown-menu'
    import {mapGetters} from "vuex";

    let pageParams = {
        plateEntityId: ''
    }

    export default {
        name: "goodClassAddBody",
        props: ['isParent', 'isEdit', 'id', 'isInclude', 'hasChild'],//isParent是否是添加大类
        data() {
            return {
                pageParams
            }
        },
        components: {
            multiInput,
            baseVerifyInput,
            baseVerifySelect,
            baseLabels,
            ButtonAdd,
            DropdowMenu
        },
        computed: {
            ...mapGetters({
                goodClassDetail: "goods/goodDetail",
                goodClassList: "goods/goodClassList",
                baseSetting: "goods/baseSetting",
            }),
            isIncludeValue() {
                if (!this.isEdit) {//新增  却决于上级的类型
                    return this.isInclude
                } else {
                    return this.baseSetting.isInclude.value
                }
            },
            upperClassOptions() {
                let option = [
                    {
                        id: '0',
                        name: '无上级分类',
                        addSub: true,
                    }
                ]
                let isInclude = this.isIncludeValue;
                if (this.goodClassList && this.goodClassList.length > 0) {
                    this.goodClassList.map(item => {
                        if (item.isInclude === isInclude) {
                            option.push(Object.assign({}, item))
                        }

                    })
                }

                let list;
                if (!this.isEdit) {
                    list = this.disabledUpperClassOptions(option);
                }
                else {
                    list = this.disabledUpperClassOptionsExceptSelf(option, this.id)
                }


                return list;
            },
            groupKindOptions() {
                let option = [
                    {
                        id: '0',
                        name: '不设置',
                        addSub: true,
                    }
                ]
                let isInclude = this.isIncludeValue;

                if (this.goodClassList && this.goodClassList.length > 0) {
                    this.goodClassList.map(item => {
                        if (item.isInclude === isInclude) {
                            option.push(Object.assign({}, item))
                        }
                    })
                }

                let list;
                if (!this.isEdit) {
                    list = this.disabledgroupKindOptionsAll(option);
                } else {
                    list = this.disabledgroupKindOptionsExceptSelf(option, this.id);
                }

                return list
            }
        },

        methods: {
            test(a) {
                let self = this;
                let c = [];
                a.map(v => {
                    v.c = !v.c;
                    if (v.aa && v.aa.length > 0) {
                        self.test(v.aa)
                    }
                    c.push(v)
                })
                return c;
            },
            //上级分类option处理
            disabledUpperClassOptions(list) {
                let c = [];
                let self = this;
                list.map(item => {
                    let new_item = Object.assign({disabled: false}, item);
                    new_item.disabled = !new_item.addSub;
                    if (new_item.subList && new_item.subList.length > 0) {
                        new_item.subList = self.disabledUpperClassOptions(new_item.subList)
                    }
                    c.push(new_item)
                })
                return c;
            },

            //上级分类option初始化  编辑时不能选自己
            disabledUpperClassOptionsExceptSelf(list, id) {
                let c = [];
                let self = this;
                list.map(item => {
                    let new_item = Object.assign({disabled: false}, item);

                    if (new_item.id == id) {
                        new_item.disabled = true;
                    } else {
                        new_item.disabled = !new_item.addSub;
                    }
                    if (new_item.subList && new_item.subList.length > 0) {
                        new_item.subList = self.disabledUpperClassOptionsExceptSelf(new_item.subList, id)
                    }
                    c.push(new_item)
                })
                return c;
            },
            //销售额归类option初始化
            disabledgroupKindOptionsAll(list) {
                let c = [];
                let self = this;
                if (list) {
                    list.map((item) => {
                        let new_item = Object.assign({disabled: false}, item)
                        if (new_item.subList) {
                            new_item.subList = this.disabledgroupKindOptionsAll(new_item.subList)
                        }
                        c.push(new_item)
                    })

                }
                return c;
            },

            //销售额归类option初始化  编辑时不能选自己
            disabledgroupKindOptionsExceptSelf(list, id) {
                let c = [];
                let self = this;
                if (list) {
                    list.map(item => {
                        let new_item = Object.assign({disabled: false}, item)
                        if (new_item.id == id) {
                            new_item.disabled = true;
                        }
                        if (new_item.subList) {
                            new_item.subList = this.disabledgroupKindOptionsExceptSelf(new_item.subList, id)
                        }
                        c.push(new_item)
                    })
                }
                return c;
            },

            //销售提成方式变化
            saleCommissionClassValueChanged(value) {
                // switch (value) {
                //     case 1:
                //         this.baseSetting.saleCommissionByAssert.isrequired = false
                //         this.baseSetting.saleCommissionByPercent.isrequired = false
                //         break
                //     case 2:
                //         this.baseSetting.saleCommissionByAssert.isrequired = false
                //         this.baseSetting.saleCommissionByPercent.isrequired = true
                //         break
                //     case 3:
                //         this.baseSetting.saleCommissionByAssert.isrequired = true
                //         this.baseSetting.saleCommissionByPercent.isrequired = false
                // }
            },
            //备注选择更新
            selectRemarkChange(e) {
                let remarkList = this.baseSetting.remarkList
                let list = remarkList.value;
                let len = list.length;
                for (let i = 0; i < len; i++) {
                    if (list[i].value == e) {
                        return;
                    }
                }
                let options = this.baseSetting.selectRemark.options
                let optLen = options.length
                let kindTasteList = this.baseSetting.kindTasteList
                for (let i = 0; i < optLen; i++) {
                    let item = options[i]
                    if (item.value == e) {
                        remarkList.value.push({
                            name: item.label,
                            value: item.value
                        })
                        kindTasteList.value.push(e);
                        return
                    }
                }
            },
            selectFeedChange(e) {
                let newFeedList = this.baseSetting.newFeed
                let list = newFeedList.value;
                let len = list.length;
                for (let i = 0; i < len; i++) {
                    if (list[i].value == e) {
                        return;
                    }
                }
                let options = this.baseSetting.selectFeed.options
                let optLen = options.length
                let additionKindList = this.baseSetting.additionKindList
                for (let i = 0; i < optLen; i++) {
                    let item = options[i]
                    if (item.value == e) {
                        newFeedList.value.push({
                            name: item.label,
                            value: item.value
                        })
                        additionKindList.value.push(e);
                        return
                    }
                }
            },
            emitVerify(e, type) {
                console.log('------------', e, type)
                if (type == undefined) return
                this.baseSetting[type].isVerifiedOk = e;
            },
            addRemark() {
                this.baseSetting.selectRemark.show = !this.baseSetting.selectRemark.show
            },
            deleteRemarkList(data) {
                let index = data.index;
                let remarkList = this.baseSetting.remarkList
                let kindTasteList = this.baseSetting.kindTasteList
                remarkList.value.splice(index, 1)
                kindTasteList.value.splice(index, 1)
            },
            addFeed() {
                this.baseSetting.selectFeed.show = !this.baseSetting.selectFeed.show
            },
            deleteFeedList(data) {
                let index = data.index;
                let newFeed = this.baseSetting.newFeed
                let additionKindList = this.baseSetting.additionKindList
                newFeed.value.splice(index, 1)
                additionKindList.value.splice(index, 1)
            },
        },
        created() {
            let self = this;
            self.pageParams.plateEntityId = self.$route.query.plateEntityId;
            let initParams = {
                plateEntityId: self.pageParams.plateEntityId,
                isInclude: -1//分类类型：-1全部，0普通菜，1套餐，2加料
            }
            this.$store.dispatch('goods/getGoodClassList', initParams)
        },
    }
</script>

<style scoped>
    .table {
        margin: 15px;
    }

    .table .left {
        width: 130px;
        text-align: right;
        padding-right: 10px;
        vertical-align: middle;
        color: #999;
    }

    .table .right /deep/ .ivu-select {
        width: 200px;
    }

    .table .right /deep/ .ivu-input-wrapper {
        width: 200px;
    }

    .table .last-right {
        width: 140px;
        text-align: left;
    }

    .last-right /deep/ .ivu-input-wrapper {
        width: 88px;
    }

    .button-add-remark.button {
        margin: 5px 0;
    }

    h4 {
        color: #333;
        font-size: 14px;
        padding-left: 10px;
    }

    .add-remark /deep/ .button-add-remark {
        display: inline-block;
    }

    .add-remark /deep/ .label-wrap {
        display: inline-block;
    }

    .add-remark /deep/ .label-wrap .list-label-item .label {
        margin-top: 5px;
        margin-bottom: 5px;
    }
</style>
