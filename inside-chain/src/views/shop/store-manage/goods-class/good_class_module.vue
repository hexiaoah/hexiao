<template>
    <div>
        <!--{{baseSetting}}-->
        <baseModal :show="goodAttrAddClassType.show" :okText="goodAttrAddClassType.okText"
                   :cancelText="goodAttrAddClassType.cancelText" :header="headerTitle"
                   @on-ok="confirmAddClassType" @on-cancel="cancelAddClassType">
            <goodClassAddBody :isParent="isAddParent" :isEdit="isEdit"
                              :id="kindMenuId" :isInclude="isInclude" :hasChild="hasChild"></goodClassAddBody>
        </baseModal>
        <div class="searchBar">
            <div class="pull-right">
                <Button type="primary" @click="alertAddClassType(true,0,false,false , '0')">添加商品分类</Button>
                <Button type="primary" @click="alertAddClassType(true,1,false,false , '0')">添加套餐分类</Button>
            </div>
            <div class="fl-clear"></div>
            <br>
        </div>
        <multiCollapseList :cols="goodClassList.cols" :titles="goodClassList.titles"
                           :disableType="goodClassList.disableType"
                           @collapse-operate="collapseOperate" v-if="!noData"></multiCollapseList>
        <NoData v-show="noData" text="未添加分类"></NoData>
        <br>
        <br>
    </div>
</template>

<script>
    /**
     *
     * @param res
     * @author
     *
     */
    import multiCollapseList from '@/components/goods-class/multi-collapse-list';
    import baseModal from '@/components/modal/base-modal';
    import multiInput from '@/components/goods-class/multi-input';
    import goodClassAddBody from './good_class_add_body';
    import {mapGetters} from "vuex";
    import NoData from '@/components/no-data/no-table';

    const theData = {
        goodAttrAddClassType: {
            show: false,
            header: '商品分类添加',
            okText: '保存',
            cancelText: '取消',
        },
        isAddParent: true,

        isInclude: 0,//普通商品 0  套餐 1
        isEdit: false,
        isUpperDisabled: false,//上级分类是否可选 1不可选 0 可选
        id: 0,
        hasChild: false,
        kindMenuId: -1,

        pageParams: {
            opEntityId: ''
        }
    }
    export default {
        name: "good_class_",
        data() {
            return theData
        },
        components: {
            multiCollapseList,
            baseModal,
            multiInput,
            goodClassAddBody,
            NoData
        },
        computed: {
            ...mapGetters({
                goodClassList: "goods/formattedGoodClassSingle",
                baseSetting: "goods/baseSettingSingle",
            }),

            noData() {
                let self = this;
                return (self.goodClassList && self.goodClassList.cols && self.goodClassList.cols.length > 0) ? false : true
            },
            headerTitle() {
                if (!this.isEdit) {//新增  却决于上级的类型
                    if (this.isInclude == 0) {
                        return '商品分类添加'
                    } else {
                        return '套餐分类添加'
                    }

                } else {
                    if (this.baseSetting.isInclude.value == 0) {
                        return '商品分类编辑'
                    } else {
                        return '套餐分类编辑'
                    }
                }
            },
        },
        methods: {
            getVerify() {
                for (let key in this.baseSetting) {
                    let required = this.baseSetting[key].isrequired
                    console.log('-------', key, required, this.baseSetting)
                    if (!!required) {
                        if (key == 'goodClass') {
                            console.log('this.baseSetting.goodClass.value', this.baseSetting.goodClass.value)

                        }
                        if (key == 'saleCommissionByPercent') {
                            console.log('this.baseSetting.saleCommissionClass.value', this.baseSetting.saleCommissionClass.value)
                            if (this.baseSetting.saleCommissionClass.value == 2) {
                                let v = this.baseSetting.saleCommissionByPercent.value;
                                let verify = this.baseSetting.saleCommissionByPercent.isVerifiedOk
                                console.log('saleCommissionByPercent is required----------', v)
                                if (v === undefined || v === '') {
                                    return false
                                }
                                if (!verify) return false
                            }
                        } else if (key == 'saleCommissionByAssert') {
                            console.log('this.baseSetting.saleCommissionClass.value', this.baseSetting.saleCommissionClass.value)
                            if (this.baseSetting.saleCommissionClass.value == 3) {
                                let v = this.baseSetting.saleCommissionByAssert.value;
                                let verify = this.baseSetting.saleCommissionByAssert.isVerifiedOk;
                                console.log('saleCommissionByAssert is required----------', v)
                                if (v === undefined || v === '') {
                                    return false
                                }
                                if (!verify) return false
                            }
                        } else {
                            let v = this.baseSetting[key].value
                            let verify = this.baseSetting[key].isVerifiedOk
                            if (v === undefined || v === '') {
                                return false
                            }
                            if (!verify) return false
                        }
                    }
                }
                return true;
            },
            // isAllVerifyOk(){
            //
            // },
            initVerifyInfo() {
                for (let key in this.baseSetting) {
                    let required = this.baseSetting[key].isrequired
                    if (!!required) {
                        this.baseSetting[key].required = false;
                    }
                }
            },

            collapseOperate(e) {
                switch (e.optId) {
                    case 0://新增
                        if (!e.parent) {
                            //新增子类 上级没有
                            if (!!e.item.isAddSub) {//有商品，或者是四级
                                this.alertAddClassType(true, e.item.isInclude, false, true, e.item.id)
                            } else {
                                this.alertAddClassType(true, e.item.isInclude, false, true, e.item.id)
                            }
                        } else {
                            //新增子类 分类不可选
                            if (!!e.item.isAddSub) {//有商品，或者是四级
                                this.alertAddClassType(false, e.item.isInclude, false, true, e.item.id)
                            } else {
                                this.alertAddClassType(false, e.item.isInclude, false, true, e.item.id)
                            }
                        }
                        //设置新增id
                        break;
                    case 1://编辑
                        if (!e.parent) {
                            //编辑父类 上级为0
                            if (e.item.list != undefined) {
                                this.hasChild = true
                            } else {
                                this.hasChild = false
                            }
                            if (!!e.item.isAddSub) {
                                //有商品，或者是四级
                                this.alertAddClassType(true, 0, true, false, e.item.id, false)
                            } else {
                                this.alertAddClassType(true, 0, true, false, e.item.id, true)
                            }
                        } else {
                            //编辑子类
                            if (e.item.list !== undefined) {
                                this.hasChild = true
                            } else {
                                this.hasChild = false
                            }
                            if (!!e.item.isAddSub) {
                                //有商品，或者是四级
                                this.alertAddClassType(false, e.item.isInclude, true, false, e.item.id)
                            } else {
                                this.alertAddClassType(false, e.item.isInclude, true, false, e.item.id)
                            }
                        }
                        break;
                    case 2://删除
                        this.alertDelDialog(e);
                        break;
                }
            },

            //isNormal true 是添加普通商品  false:添加套餐
            //hasChild false 表示分类下无商品非第4级分类； true 表示分类下有商品或第4级分类  与后端传来的相反（注意）
            alertAddClassType(isParent, isNormal, isEdit, isUpperDisabled, id) {
                let self = this;
                this.isInclude = isNormal
                this.isEdit = isEdit
                this.kindMenuId = id
                if (!!isParent) {
                    this.isAddParent = true
                } else {
                    this.isAddParent = false
                }
                if (!!isEdit) {//编辑
                    let kindParams = {
                        kindMenuId: id
                    };
                    Object.assign(kindParams, self.pageParams);
                    this.baseSetting.upperClass.disabled = false
                    this.$store.dispatch('goods/getDetailByIDSetBaseSetting', kindParams)
                } else {
                    let addParams = {
                        key: '',
                        data: {}
                    }
                    Object.assign(addParams, self.pageParams)
                    //新增
                    //设置上级分类默认值
                    if (!!isParent) {//是父类
                        let upperclass = this.baseSetting.upperClass
                        upperclass.value = id
                        addParams.key = 'upperClass';
                        addParams.data = upperclass;
                        this.$store.dispatch('goods/updateBaseSetting', addParams
//                            {
//                            key: 'upperClass',
//                            data: upperclass
//                        }
                        )
                    } else {
                        let baseSetting = this.baseSetting
                        let upperclass = this.baseSetting.upperClass

                        upperclass.value = id
                        addParams.key = 'upperClass';
                        addParams.data = upperclass;
                        this.$store.dispatch('goods/updateBaseSetting', addParams
//                            {
//                            key: 'upperClass',
//                            data: upperclass
//                        }
                        )
                    }
                    let baseSetting = this.baseSetting;
                    let baseParams = {
                        key: '',
                        data: {}
                    }
                    Object.assign(baseParams, self.pageParams)
                    for (let key in baseSetting) {
                        if (key == 'saleCommissionClass') {
                            baseSetting[key].value = 1
                            baseParams.key = key;
                            baseParams.data = baseSetting[key];
                            this.$store.dispatch('goods/updateBaseSetting', baseParams
//                                {
//                                key: key,
//                                data: baseSetting[key]
//                            }
                            )
                        } else if (key == 'upperClass') {

                        }
                        else {
                            if (baseSetting[key].vType == 'string') {
                                baseSetting[key].value = ''
                            } else if (this.baseSetting[key].vType == 'array') {
                                baseSetting[key].value = []
                            } else if (this.baseSetting[key].vType == 'int') {
                                baseSetting[key].value = '0'
                            }
                            baseParams.key = key;
                            baseParams.data = this.baseSetting[key];
                            this.$store.dispatch('goods/updateBaseSetting', baseParams
//                                {
//                                key: key,
//                                data: this.baseSetting[key]
//                            }
                            )
                        }
                    }
                    let upperclass = this.baseSetting.upperClass
                    if (!!isUpperDisabled) {
                        upperclass.disabled = true
                    } else {
                        upperclass.disabled = false
                    }
                }
                this.goodAttrAddClassType.show = true
            },


            showVerifyInfo() {
                for (let key in this.baseSetting) {
                    let required = this.baseSetting[key].isrequired
                    if (!!required) {
                        // let v = this.baseSetting[key].isVerifiedOk
                        this.baseSetting[key].required = true;
                    }
                }
            },
            confirmAddClassType() {
                let self = this;
                let verify = this.getVerify()
                if (!verify) {
                    this.showVerifyInfo();
                    return
                }
                let baseSetting = this.baseSetting
                let params = {
                    isInclude: baseSetting.isInclude.value,//0普通菜类，1套餐菜类
                    name: baseSetting.goodClass.value,
                    parentId: 0,//根级传0
                    code: baseSetting.classCode.value,
                    groupKindId: (baseSetting.saleClass.value == '') ? '0' : baseSetting.saleClass.value,//销售额归属其他分类ID，无传 0
                    deductKind: baseSetting.saleCommissionClass.value,//销售提成方式 1不提成，2按比例，3按金额,
                    deduct: '',//提成比例或金额
                    kindTasteList: baseSetting.kindTasteList.value,//备注分类
                    additionKindList: baseSetting.additionKindList.value,//加料分类
                }
                switch (baseSetting.saleCommissionClass.value) {
                    case 2:
                        params.deduct = baseSetting.saleCommissionByPercent.value
                        break;
                    case 3:
                        params.deduct = baseSetting.saleCommissionByAssert.value
                        break;
                    default:
                }

                if (!this.isEdit) {//新增
                    //新增可选
                    if (this.kindMenuId == 0) {//新增大类
                        params.parentId = baseSetting.upperClass.value;
                        params.isInclude = this.isInclude
                    } else {//新增子类
                        params.parentId = baseSetting.upperClass.value
                        params.isInclude = this.isInclude
                    }

                } else {//编辑
                    params.id = this.kindMenuId //编辑对象
                    params.parentId = (baseSetting.upperClass.value == '') ? '0' : baseSetting.upperClass.value
                    params.isInclude = baseSetting.isInclude.value
                }

                Object.assign(params, self.pageParams)

                this.$store.dispatch('goods/saveAddClassType', params)
                this.goodAttrAddClassType.show = false
                this.baseSetting.selectRemark.show = false
                this.baseSetting.selectFeed.show = false
                this.initVerifyInfo();
            },
            cancelAddClassType() {
                this.baseSetting.selectRemark.show = false
                this.baseSetting.selectFeed.show = false
                this.goodAttrAddClassType.show = false
                this.initVerifyInfo();
            },
            alertDelDialog(data) {
                let self = this;
                let params = {
                    kindMenuId: data.item.id
                }
                Object.assign(params, self.pageParams)
                self.$Modal.confirm({
                    title: "请注意",
                    content: '是否要删除该分类？',
//                    点击确定的操作
                    onOk: () => {
                        setTimeout(() => {
                            this.$store.dispatch("goods/deleteGoodClassById", params)
                        }, 500)
                    },
//                    点击取消的操作
                    onCancel: () => {
                    }
                });
            },
        },
        created() {
            let self = this;
            self.pageParams.opEntityId = self.$route.query.entityId;
            let initParams = {
                opEntityId: self.pageParams.opEntityId,
                isInclude: -1//分类类型：-1全部，0普通菜，1套餐，2加料
            }
            self.$store.dispatch('goods/getGoodClass', initParams);
            self.$store.dispatch('goods/resetBaseSetting', self.pageParams)
        }
    }
</script>

<style scoped>

</style>
