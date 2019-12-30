<template>
    <div class="batch-warpper">
        <!-- <Poptip class="batch-prptip" placement="bottom"> -->
            <!-- <span class="batch-manage">批量管理</span> -->
            <div class="batch-warp" slot="content">
                <Button type="text" @click="batchDel" class="batch-btn">批量删除</Button>
                <Button type="text" @click="batchUpdate" class="batch-btn">批量修改</Button>
                <!-- <div @click="batchRm" class="batch-btn">批量移除</div>
                <Poptip
                trigger="hover" 
                placement="bottom" 
                content='可以将门店里的商品批量删除，但不影响集团里的商品'>
                    <span class="batch-help">?</span>
                </Poptip> -->
            </div>
        <!-- </Poptip> -->
        <BatchChangeModal 
            :totalList="totalList"
            :kindList="kindList"  
            :modal="updataModal" 
            :plateEntityId="getInfo.plateEntityId"
            v-on:ok='ok' 
            v-on:cancel="cancel" />
    </div>
</template>
<script>
import BatchChangeModal from '@/components/modal/batch-change-modal.vue'
import totalList from '@/const/emu-batch-select-lib'
import Tools from '@/base/tools'
import { mapActions, mapGetters, mapState } from 'vuex'

import batchModule from '@/store/modules/components/batch-Modify'
let params = {
    plateEntityId:'',
    itemIdList:[],
    isDel:0,
    opEntityId:'',
    brandEntityId:'',
    entityType:''
}

export default {
    props:{
        choosedItemList: Array,
    },
    components:{
        BatchChangeModal
    },
    computed: {
        ...mapGetters({
            setSelected: "brandSelect/selected",
        }),
        ...mapState({
            categoryList(state){
                    return state.setting.categoryList || []
                },
        }),
        kindList(){
            return [].concat(Tools.recursion(this.categoryList))
        },
        getInfo(){
            return {
                plateEntityId : this.$route.query.plateEntityId ? this.$route.query.plateEntityId : '',
                // plateEntityId : '',
                itemIdList : this.choosedItemList.map(item=>(item.itemId)),
                opEntityId:this.$route.query.entityId ? this.$route.query.entityId : ''
            }
        }
    },
    data() {
        return {
            updataModal:false,
            totalList,
            params
        }
    },
    methods: {
        ...mapActions({
            'batchModify':'batchModify/batchModify', //批量更新删除接口
            'batchChainShopModify':'batchModify/batchChainShopModify'
        }),
        batchUpdate(){
            if(this.checkListEmpt()){
                this.updataModal = true
            }
        },
        batchDel(){
            if(this.checkListEmpt()){
                this.$Modal.confirm({
                    title: '删除商品',
                    content: `删除商品后, 将无法恢复，请慎重操作！`,
                    onOk: this.delok
                })
            }
        },
        checkListEmpt(){
            if(!this.choosedItemList || this.choosedItemList.length === 0){
                this.$Message.info('请勾选需要管理的商品')
                return false;
            }
            return true
        },
        ok(params){
            this.updataModal = false
            this.params ={
                ...this.params,
                ...this.getInfo,
                ...params,
                isDel : 0
            }
            this.handleModify(this.params)
        },
        cancel(){
            this.updataModal = false
        },
        delok(){
            this.params = {
                ...this.params,
                ...this.getInfo,
                isDel : 1
                }
               this.handleModify(this.params)
        },
        handleModify(params){
            params = this.filterParams(params)
            console.log(params)

            this.batchModify({params,VM:this})
            // if(params.plateEntityId){
            //     this.batchModify({params,VM:this})
            // }else{
            //     this.batchChainShopModify({params,VM:this})
            // }

        },
        filterParams(option){
            let obj ={}
            Object.keys(option).filter(key=>{
                if(option[key]){
                    obj[key] = option[key]
                }
            })
            return obj
        }

    },
    mounted() {
    },
    beforeCreate () {
        let { batchModify={} } = this.$store.state
        if(Object.keys(batchModify).length <= 0) {
            this.$store.registerModule('batchModify', batchModule)
        }
    }
}
</script>
<style lang="scss" scoped>
.batch-warpper{
    display: inline-block;
    margin-top: 15px;
    .batch-warp{
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #333;

        .batch-btn{
            width: 88px;
            text-align: center;
            border: 1px solid #cccccc;
            border-radius: 5px;
            margin-right: 10px;
            cursor: pointer;
            &:last-child{
                margin-right: 0px;
            }
        }

    }
}

</style>
