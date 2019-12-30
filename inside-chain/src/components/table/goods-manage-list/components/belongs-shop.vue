<template>
    <Poptip @on-popper-show="getBelongsShop(item)"
            @on-popper-hide="clearBelongsShop"
            v-model="visible"
            :width="275"
            placement="bottom-end" 
            class="belongs-shop pull-left">
        <span>查看菜品所在门店</span>
        <div class="shop-list" slot="content">
            <div class="title">
                <span>该商品在下列门店中已上架</span>
                <!-- <span class="close" @click="closePopTip">关闭</span> -->
                <BatchRemove :item="item" @searchShops='searchShops' :shops="shops" v-on:closePopTip="closePopTip" />
            </div>
            <ul class="content" v-if="belongsShop.shopList && belongsShop.shopList.length">
                <li v-for="(item, $index) in belongsShop.shopList" :key="$index">
                    <div class="shopname">{{item.name}}</div>
                    <div class="price view-shop pull-right" @click="viewShop(item.entityId, item.name)">
                       查看门店
                    </div>
                </li>
            </ul>
            <div class="text-center blank-color" v-else>0家门店</div>
            <!--<div class="footer">-->
                <!--<div class="unjoin">{{belongsShop.notSaleNum}}家门店未上架</div>-->
            <!--</div>-->
            <div v-if="belongsShop.notSaleNum">
                <div class="footer">
                    <div class="unjoin">{{belongsShop.notSaleNum}}家门店未上架</div>
                </div>
                <!--// todo 替换内容为 未上架门店列表 即可-->
                <ul class="content" v-if="belongsShop.notSaleShopList && belongsShop.notSaleShopList.length">
                    <li v-for="(item, $index) in belongsShop.notSaleShopList" :key="$index+ ' unJoin'">
                        <div class="shopname">{{item.name}}</div>
                        <div class="price view-shop pull-right" @click="viewShop(item.entityId, item.name)">
                            查看门店
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </Poptip>
</template>

<script>
    import {apiGetBelongsShopList} from '@/config/api_setting'
    import catchError from '@/base/catchError'
    import BatchRemove from '@/components/table/goods-manage-list/components/batch-remove.vue'

    export default {
        components:{
            BatchRemove
        },
        name: 'belongs-ment',
        props: {
            item: {
                type: Object,
                default: null
            }
        },
        data(){
          return {
            visible: false,
            belongsShop: {
                shopList: [],
                notSaleNum: 0
            },
            shopList:[],
            searchVal:''
          }
        },
        computed: {
             shops(){
                 return this.shopList.filter( item =>{
                     if(item.name.includes(this.searchVal)){
                         return item
                     }
                 })
             }
        },
        methods: {
            getBelongsShop(item){
                let {itemId} = item
                let plateEntityId = this.$route.query.plateEntityId
                this.searchVal = ''
                apiGetBelongsShopList(itemId, plateEntityId).then(data => {
                    this.belongsShop = data.data
                    this.getShopList(data.data)
                }).catch(e => {
                    catchError(e)
                })
            },
            searchShops(value){
                this.searchVal = value.trim()
            },
            clearBelongsShop(){
                this.belongsShop = {
                    shopList: [],
                    notSaleNum: 0
                }
            },
            viewShop(entityId, name){
                this.$router.push({
                    path: '/shop_manage_library_goods_manage',
                    query: {
                        entityId,
                        crumbName: name
                    }
                })
            },
            viewUnShelvesShop(){
                let { plateEntityId } = this.$route.query
                let obj = { plateEntityId }
                sessionStorage.removeItem('chain')
                sessionStorage.setItem('chain', JSON.stringify(obj))
                this.$router.push({
                    path: '/shop_manage'
                })
            },
            closePopTip(){
                this.visible = false
            },
            getShopList(option){
                this.shopList = []
                Object.keys(option).filter(key=>{
                    // if( Object.prototype.toString.call(option[key]) === "[object Array]"){
                        //     this.shops = this.shops.concat(option[key])
                    // }
                    if( key === 'shopList' ){
                        this.shopList = [].concat(option.shopList)
                    }
                })
            }
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .title {
        height: 38px;
        line-height: 38px;
        background: #F1F1F1;
        border-radius: 1px;
        font-size: 12px;
        color: #333333;
        padding: 0 10px;

        span:first-child{
            font-weight: bold;
        }

        .close {
            float: right;
            color: #D83F3F;
            cursor: pointer;
        }
    }

    .content {
        max-height: 130px;
        overflow: auto;
        padding: 0 10px;

        li{
            height: 25px;
            line-height: 25px;
        }

        .shopname {
            font-size: 12px;
            color: #666666;
            max-width: 115px;
            display: inline-block;
        }

        .view-shop {
            color: #5599FF;
        }
    }

    .footer {
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        color: #333333;
        border: 1px solid #EEEEEE;
        border-bottom: 0;

        .unjoin {
            display: inline-block;
            color: #D83F3F;
        }

        .set {
            color: #5599FF;
        }
    }

</style>

