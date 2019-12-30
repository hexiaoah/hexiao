<script>
    /**
     -- zeqi@2dfire

     使用方法：同一般组件，先引入组件，props主要有两个值，show及params，
     params中传递plateEntityId判断为连锁，传递opEntityId判断为单店，isInclude用来区分分类类型

     @props:
     show：是否显示本组件
     params: {
       plateEntityId: 品牌ID 连锁使用
       opEntityId: 门店id 单店使用
       isInclude: 0 商品 1 套餐
     }

     example：
     门店使用params: {
        opEntityId: 99330011
        isInclude: 0
     }

     连锁使用params: {
        plateEntityId: 99330011
        isInclude: 0
     }

     @events:
     @cancel: 取消
     @ok: 保存

     初始模板
     */

    import baseModal from '@/components/modal/base-modal';
    import goodClassAddBody from '@/views/setting/goods-class/components/good_class_add_body';
    import goodClassAddBodySingle from '@/views/shop/store-manage/goods-class/good_class_add_body';
    import Requester from '@/base/requester'
    import catchError from '@/base/catchError'
    import API from '@/config/api'
    import {mapGetters, mapActions} from "vuex";

    let pageData = {
        okText: '保存',
        cancelText: '取消',
        config: {
            0: {
                title: '商品分类添加'
            },
            1: {
                title: '套餐分类添加'
            },
        }
    };

    export default {
        props: {
//            是否显示
            show: {
                type: Boolean,
                default: false
            },
//            plateEntityId / opEntityId
//            0 商品 1 套餐
            params: {
                type: Object,
                default() {
                    return {
                        plateEntityId: '',
                        opEntityId: '',
                        isInclude: 0
                    }
                }
            }
        },
        data() {
            return {
                pageData,
            }
        },
        computed: {
            ...mapGetters({
                chain: "goods/baseSetting",
                single: "goods/baseSettingSingle",
            }),
            baseSetting() {
                if(this.params.plateEntityId){
                    return this.chain
                }else{
                    return this.single
                }
            }
        },
        components: {
            baseModal,
            goodClassAddBody,
            goodClassAddBodySingle
        },
        methods: {
//            初始化验证信息
            initVerifyInfo() {
                for (let key in this.baseSetting) {
                    let required = this.baseSetting[key].isrequired
                    if (!!required) {
                        this.baseSetting[key].required = false;
                    }
                }
            },
//            开始表单验证
            getVerify() {
                for (let key in this.baseSetting) {
                    let required = this.baseSetting[key].isrequired
                    if (!!required) {
                        if (key === 'saleCommissionByPercent') {
                            if (this.baseSetting.saleCommissionClass.value === 2) {
                                let v = this.baseSetting.saleCommissionByPercent.value;
                                let verify = this.baseSetting.saleCommissionByPercent.isVerifiedOk
                                if (v === undefined || v === '') {
                                    return false
                                }
                                if (!verify) return false
                            }
                        } else if (key === 'saleCommissionByAssert') {
                            if (this.baseSetting.saleCommissionClass.value === 3) {
                                let v = this.baseSetting.saleCommissionByAssert.value;
                                let verify = this.baseSetting.saleCommissionByAssert.isVerifiedOk;
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
            cancelAddClassType() {
                this.baseSetting.selectRemark.show = false
                this.baseSetting.selectFeed.show = false
                this.$store.dispatch('goods/resetBaseSetting', this.params)
                this.$emit('cancel')
            },
            showVerifyInfo() {
                for (let key in this.baseSetting) {
                    let required = this.baseSetting[key].isrequired
                    if (!!required) {
                        this.baseSetting[key].required = true;
                    }
                }
            },
//            确认提交分类
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
                    groupKindId: (baseSetting.saleClass.value === '') ? '0' : baseSetting.saleClass.value,//销售额归属其他分类ID，无传 0
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

                params.parentId = baseSetting.upperClass.value;
                params.isInclude = this.params.isInclude
                params.parentId = baseSetting.upperClass.value
                params.isInclude = this.params.isInclude

                Object.assign(params, self.params)

                this.saveNewClass(params);
            },
//            保存新分类
            saveNewClass(params) {
                let self = this;
                params.kindTasteList = JSON.stringify(params.kindTasteList)
                params.additionKindList = JSON.stringify(params.additionKindList)
                Requester.post(API.SAVE_GOOD_CLASS, params, {emulateJSON: true}).then(
                    data => {
                        self.$emit('ok')
                        self.cancelAddClassType()
                    }
                ).catch(e => {
                    catchError(e);
                })
            }
        },
        created() {
            let self = this;
            let initParams = {
                isInclude: self.params.isInclude
            }
            Object.assign(initParams, self.params)
            self.$store.dispatch('goods/getGoodClass', initParams);
            self.$store.dispatch('goods/resetBaseSetting', self.params)
        }
    }
</script>

<template>
    <div>
        <baseModal :show="show" :okText="pageData.okText"
                   :cancelText="pageData.cancelText" :header="pageData.config[params.isInclude].title"
                   @on-ok="confirmAddClassType" @on-cancel="cancelAddClassType">
            <goodClassAddBody v-if="params.plateEntityId && show" :isParent="true" :isEdit="false"
                              id="0" :isInclude="params.isInclude" :hasChild="false"></goodClassAddBody>
            <goodClassAddBodySingle v-if="!params.plateEntityId && show" :isParent="true" :isEdit="false"
                             :id="0"  :isInclude="params.isInclude" :hasChild="false"></goodClassAddBodySingle>
        </baseModal>
    </div>
</template>

<style lang="scss" scoped>

</style>

