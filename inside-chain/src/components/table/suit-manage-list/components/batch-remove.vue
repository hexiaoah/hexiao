<template>
    <div @click="batchRm" :class="{batchRemove:true,batchRemoveColse:!shopsList.total}"><span>批量移除</span>
        <Poptip
            trigger="hover" 
            placement="bottom-end" 
            content='可将商品从指定门店的商品库中进行批量移除'>
            <span :class="{'batch-help':true,helpColse:!shopsList.total}">?</span>
        </Poptip>
        <!-- <ShopSelect v-if="showShopSelect"
                    @on-cancel="showShopSelect = false"
                    @on-ok="saveShops"></ShopSelect> -->
        <Modal 
        v-model="showShopSelect" 
        width="600"
         @on-cancel="oncancel"
        >
            <p slot="header">
                选择门店
            </p>
            <Input icon="ios-search"
                   v-model="value"
                   placeholder="门店名称" @on-click="searchShops" @on-enter="searchShops"
                   style="width: 200px">
            </Input>
            <listTotal :label="pageData.totalLabel" :selectedList="checkGroup" :content="shopsList.total"></listTotal>
            <BatchCard >
                <div style="border:1px solid #bbbbbb;">
                    <div class="header">
                        <Checkbox 
                        :value="allSelected" 
                        @click.prevent.native="checkAll"
                        :indeterminate="indeterminate"
                        >全选</Checkbox>
                    </div>
                    <div class="content">
                        <CheckboxGroup class="select-group" v-model="checkGroup">
                            <Checkbox class="shopbox"   v-for="(item,index) in shopsList.shops" :key="item.entityId" 
                            :label="item.entityId">{{item.title}}</Checkbox>
                        </CheckboxGroup>
                    </div>
                </div>
            </BatchCard>
            <div slot="footer">
                <Button type="text" size="large" @click="cancel">取消</Button>
                <Button type="primary" size="large" @click="ok">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import BatchModal from '@/components/modal/batch-modal.vue'
    import ShopSelect from '@/components/shop-select/shop-select'
    import { mapActions,mapGetters } from 'vuex'
    import BatchCard from "@/components/layout/batch-card"
    import listTotal from '@/components/shop-select/list-total'
    import settingModule from "@/store/modules/setting/index"
    import shopSelectModule from "@/store/modules/components/shop-select"

    import batchModule from '@/store/modules/components/batch-Modify'


let pageData = {
    totalLabel: '当前符合门店总数：'
}
let params = {
    itemId:'',
    entityIds:[],
}

export default {
    props:{
        shops:{
            type:Array
        },
        item:{
            type: Object,
            default: null
        }
    },
    components:{
        ShopSelect,listTotal,BatchCard
    },
    computed: {
        ...mapGetters({
        }),
        shopsList(){
            return {
                total:this.shops.length,
                shops:this.shops.map(item=>({title:item.name,entityId:item.entityId}))
            }
        },
        allSelected(){
            return (this.shopsList.total === this.checkGroup.length && this.shopsList.total !== 0 )
        },
        indeterminate(){
            return (this.checkGroup.length !== 0 && !this.allSelected)
        },
        getInfo(){
            return {
                itemId : this.item.suitId,
                entityIds:[...this.checkGroup]
            }
        }
    },
    methods: {
        ...mapActions({
            'batchChainShopModify':'batchModify/batchChainShopModify',
            'getBatchRemoveChainShopItemResult':'batchModify/getBatchRemoveChainShopItemResult'
        }),
        batchRm(){
            if(!this.shopsList.total) return
            this.$emit('closePopTip')   
            this.showShopSelect = true;

        },
        ok(){
            if(this.checkGroup.length === 0) {
                this.$Message.info({content:'请选择门店'})
                return
            }
            this.showShopSelect = false
            this.$Modal.confirm({
                title: '请注意',
                render: (h) => {
                    return h('div',{style:{height:'40px',padding:'18px 0 0 48px'}},[
                        h('p',{style:{fontSize:'14px'}},[
                            h('span',{style:{color:'#3366ff',margin:'0 5px 0 0'}},this.item.suitName),
                            h('span','将在'),
                            h('span',{style:{color:'#3366ff',margin:'5px'}},this.checkGroup.length),
                            h('span','家门店中被移除，请谨慎操作！')
                        ]),
                        h('Button',{
                            attrs:{type:'text'},
                            style:{position:'absolute',top:'79px',right:'120px',height:'36px',fontSize:'14px'},
                            on:{
                                click:()=>{
                                    this.$Modal.remove()
                                    this.showShopSelect = true
                                }
                            }
                            },
                            '上一步'
                        ),
                        h('div',{style:{position:'absolute',left:'0',top:'0',color:'#f90',fontSize:'36px'}},[
                            h('Icon',{attrs:{type:'android-alert'}})
                        ])
                    ])
                },
                onOk: () => {
                    let params = {
                        ...this.params,
                        ...this.getInfo,
                    }
                    console.log(this.checkGroup)
                    this.$Spin.show({
                        render: (h) => {
                            return h('div', [
                                h('Icon', {
                                    style:{animation: 'ani-demo-spin 1s linear infinite'},
                                    props: {
                                        type: 'load-c',
                                        size: 18,
                                        fix: false
                                    }
                                }),
                                h('div', 'Loading')
                            ])
                        }
                    })
                    this.batchChainShopModify({params:params,VM:this})
                    this.checkGroup = []
                    this.value = ""
                },
                onCancel: () => {
                    this.checkGroup = []
                    this.value = ""
                }
            })

        },
        cancel(){
            this.showShopSelect = false
            this.checkGroup = []
            this.value = ""
        },
        oncancel(){
            this.checkGroup = []
            this.value = ""
        },
        searchShops(){
            this.checkGroup = []
            this.$emit('searchShops',this.value)
        },
        checkAll(){
            if(this.allSelected){
                this.checkGroup = []
            }else{
                this.checkGroup = [...this.shopsList.shops.map(item=>item.entityId)]
            }
        },
    },
    data() {
        return {
            showShopSelect: false,//是否展示门店选择模态框
            value:'',
            pageData,
            checkGroup:[],
            params
        }
    },
    created () {
    },
    beforeCreate() {
        //动态注入
        let { batchModify={} } = this.$store.state

        if(Object.keys(batchModify).length <= 0) {
            this.$store.registerModule('batchModify', batchModule)
        }
    }
}
</script>
<style lang="scss" scoped>
.batchRemove{
    color: #D83F3F;
    float: right;
    margin-right: 10px;
    .batch-help{
        display: inline-block;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        border: 1px solid #333;
        border-radius: 10px;
        color: #333;
        margin-left: 5px;
    }
    /deep/ .ivu-poptip-popper{
        top: 35px !important;
        left: 115px !important;
        .ivu-poptip-body-content-inner{
                white-space: pre-wrap;
                padding: 10px;
                width: 150px;
        }
        .ivu-poptip-arrow:after{
            border-bottom-color:#fff !important;
        }
    }

}
.batchRemoveColse{
    color: #999999;
    .helpColse{
        color: #999999;
        border-color: #999999;
    }
}
</style>


