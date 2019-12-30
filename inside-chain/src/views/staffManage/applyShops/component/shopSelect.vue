<template>
    <div class="card">
        <div class="card-body">
            <div class="card-title" v-if="title">
                <span>{{title}}</span>
                <span v-if="promptMes" class="promptMes">{{promptMes}}</span>
            </div>
            <div>
                <ButtonAdd class="pull-left mt-10px" @on-tap="showShopsModal">选择门店</ButtonAdd>
                <ShopSelect :brand="pageState.plateEntityId" v-if="pageState.showShopSelect"
                    @on-cancel="pageState.showShopSelect = false"
                    @on-ok="saveShops" :applyType="applyType"></ShopSelect>
            </div>
            <div class="fl-clear"></div>
            <BaseBCard class="mt-10px">
                <Row>
                    <Col :md="6" class="block" v-for="(item,index) in shopList" :key="index">
                    <SelectBlock :item="item" @on-tap="select" @on-cancel="delOne($event, index)" :key="index">
                    </SelectBlock>
                    </Col>
                </Row>
            </BaseBCard>
        </div>
    </div>
</template>
<script>
    import ShopSelect from '@/components/shop-select/shop-select'
    import ButtonAdd from '@/components/button/button-add'
    import BaseBCard from '@/components/layout/base-borderCard'
    import SelectBlock from '@/components/layout/select-block'



export default {
    components: {
        ShopSelect,ButtonAdd,BaseBCard,SelectBlock
    },
    props:{
        title:{
            type:String,
            default:''
        },
        promptMes:{
            type:String,
            default:''
        },
        shopList:{
            type:Array,
            default:()=>([])
        },
        type:{
            type:String,
            default:''
        }
    },
    data () {
        return {
            pageState:{
                showShopSelect : false,
                plateEntityId:''
            }
        }
    },
    computed: {
        applyType(){
            if(this.type === 'unify'){
                return "0"
            }else if(this.type === "self"){
                return "1"
            }else{
                return ''
            }
        }
    },
    methods: {

        showShopsModal() {
            this.pageState.showShopSelect = true;
        },
        saveShops(){
            this.$emit('saveShops',{type:this.type})
            this.pageState.showShopSelect = false
        },
        select(item) {
            this.$emit('select',{item,type:this.type})
        },
        delOne(item, index) {
            this.$emit('delOne',{item,index,type:this.type})
        },
    },
    
}
</script>
<style lang="scss" scoped>
    .card {
        width: 100%;
        background-color: #FFFFFF;
        /*cursor: pointer;*/
        box-shadow: 0 2px 4px 0 rgba(202,202,202,0.26);
        transition: box-shadow 0.3s;
    }

    .card:hover {
        box-shadow: 0 2px 6px 0 rgba(202,202,202,0.52);
    }

    .card-body {
        padding: 15px;
        padding-right: 10px;
        padding-bottom: 20px;
        .card-title {
            font-size: 18px;
            color: #3C4144;
            line-height: 100%;
            font-weight: bold;
            margin-bottom: 12px;
            .promptMes{
                font-size: 12px;
                margin-left: 50px;
                color: #999999;
                font-weight: normal;
                line-height: 12px;
            }
        }

    }
    .block {
        margin-bottom: 5px;
        padding: 0 5px;
    }
    .fl-clear {
        clear: both;
    }
</style>


