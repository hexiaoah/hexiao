<template>
    <div>
        <Modal :value="modal" width="750"
        @on-ok="ok"
        @on-cancel="cancel"
        >
            <div class="contentWarp">
                <div class="title">
                    <h2>批量修改</h2>
                    <span class="tips">注：以下设置项若未作修改，则系统默认不改变原有设置</span>
                </div>
                <div class="menuList">
                    <h3>基础设置</h3>
                    <div class="selectWarp">
                         <ChangeSelect :value="batchModifySelected.shopCategoryId" title="商品分类" type="shopCategoryId" :list="kindList" v-on:change="change" />
                         <!-- <BaseSelect :value="batchModifySelected.shopCategoryId" title="商品分类" type="shopCategoryId" :list="kindList" v-on:change="change" /> -->
                    </div>
                </div>
                <div class="menuList">
                    <h3>销售渠道</h3>
                    <div class="selectWarp">
                         <ChangeSelect :value="batchModifySelected.isTakeout" title="顾客外卖可点此商品" type="isTakeout"  :list="totalList.list" v-on:change="change" />
                         <ChangeSelect :value="batchModifySelected.isReserve" title="顾客堂食可点此商品" type="isReserve"  :list="totalList.list" v-on:change="change" />
                    </div>
                </div>
                <div class="menuList" v-if="!plateEntityId">
                    <h3>商品状态</h3>
                    <div class="selectWarp">
                        <ChangeSelect :value="batchModifySelected.isSelf" title="商品上架" type="isSelf" :list="totalList.selfList" v-on:change="change" />
                    </div>
                </div>  
                <div class="menuList">
                    <h3>销售设置</h3>
                    <div class="selectWarp">
                        <ChangeSelect :value="batchModifySelected.isRatio" title="允许收银员在收银时打折" type="isRatio"  :list="totalList.list" v-on:change="change" />
                        <ChangeSelect :value="batchModifySelected.isChangePrice" title="允许收银员在收银时修改价格" type="isChangePrice"  :list="totalList.list" v-on:change="change" />
                        <ChangeSelect :value="batchModifySelected.discountInclude" title="允许商品金额计入优惠门槛" type="discountInclude"  :list="totalList.list" v-on:change="change" />
                        <ChangeSelect :value="batchModifySelected.isGive" title="可作为赠菜" type="isGive"  :list="totalList.list" v-on:change="change" />
                        <ChangeSelect :value="batchModifySelected.isBackAuth" title="退菜时需要权限验证" type="isBackAuth"  :list="totalList.backAuthList" v-on:change="change" />
                        <ChangeSelect :value="batchModifySelected.mealOnly" title="此商品仅在套餐里显示" type="mealOnly"  :list="totalList.mealOnlyList" v-on:change="change" />
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
    import ChangeSelect from '@/components/batch-setup/batch-select.vue'
    import BaseSelect from '@/components/batch-setup/base-select.vue'
    let batchModifySelected={
                isTakeout:'-1',
                isReserve:'-1',
                shopCategoryId:'-1',
                isSelf:'-1',
                isRatio:'-1',
                isChangePrice:'-1',
                discountInclude:'-1',
                isGive:'-1',
                isBackAuth:'-1',
                mealOnly:'-1',
            }

export default {
    components:{
        ChangeSelect,BaseSelect
    },
    props:["modal","totalList","kindList","plateEntityId"],
    created () {
    },
    updated () {
    },
    methods: {
        ok(){
            this.$emit('ok',this.filterParams(this.batchModifySelected))
            this.selectedClear()
        },
        cancel(){
            this.$emit('cancel')
            this.selectedClear()
        },
        change(params){
            let {type, id} = params
            this.batchModifySelected[type] = id
        },
        selectedClear(){
            Object.keys(this.batchModifySelected).map(item=>{
                batchModifySelected[item] = '-1'
            })
        },
        filterParams(option){
            let obj ={}
            Object.keys(option).filter(key=>{
                if(option[key] !== '-1'){
                    obj[key] = option[key]
                }
            })
            return obj
        }
    },
    data() {
        return {
            batchModifySelected
        }
    }

}
</script>
<style lang="scss" scoped>
.contentWarp{
    padding: 10px;
    .title{
        margin-bottom: 15px;
        .tips{
            color: #D83F3F;
        }
    }
    .menuList{
        margin-bottom: 5px;
    }
    .selectWarp{
        display:flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 20px;
    }
}
</style>

