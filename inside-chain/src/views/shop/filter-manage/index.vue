<template>
    <div class="pr-20px">

        <Input icon="ios-search" class="large" v-model="params.code" placeholder="店铺编码" @on-click="clickSearchShops" @on-enter="clickSearchShops" style="width: 560px"></Input>
        
        <div v-if="ChartType" class="viewType">
            <div v-for="item in viewList.list" @click="handleTypeChange(item.name)" :key="item.id" class="viewItem">
                <img class="viewPic" :src="item.name === viewList.value ? item.url1 : item.url2" >
            </div>
        </div>

        <div class="filter-button" @click="changeFilterState">
            <span>筛选</span>
            <span class="filter-icon" :class="{'icon-up': pageState.showFilter}"></span>
        </div>
        
        <div v-show="pageState.showFilter">
            <div :class="ChartType?'up':'up-60'"></div>
            <containerCard class="filter-wrap">
                <inlineFilter class="mb-10px mt-5px" title="品牌：">

                    <selectInline :show="1" :list="shop_filter.brands" :active="shop_filter.selected_brand" @on-tap="clickSelectBrand"></selectInline>
                </inlineFilter>

                <inlineFilter class="mb-10px mt-5px" title="类型：">

                    <selectInline :show="1" :list="shop_filter.joinModes" :active="shop_filter.selected_join"
                                @on-tap="clickSelectJoin"></selectInline>
                </inlineFilter>

                <inlineFilter :class="{'mb-10px':shop_filter.showFilterOrgan}" title="地区：">
                    <span class="filter-left"  v-if="shop_filter.areas_checked.length >0">
                    <areaSelected :list="shop_filter.areas_checked" :area="shop_filter" @on-tap="clickBackArea"></areaSelected>
                    </span>
                    <span class="filter-right">
                    <areaSelect :list="shop_filter.areas" :area="shop_filter" @on-tap="clickSelectArea"></areaSelect>
                    </span>

                </inlineFilter>

                <inlineFilter class="mb-10px" v-show="shop_filter.showFilterOrgan" title="机构：">
                    <span class="filter-left"  v-if="shop_filter.organs_checked.length >0">
                    <selectedInline :list="shop_filter.organs_checked" :active="shop_filter.selected_organ" @on-tap="clickBackOrgan"></selectedInline>
                    </span>
                    <span class="filter-right">
                        <selectInline :show="2" :list="shop_filter.organs_show" :active="shop_filter.selected_organ" @on-tap="clickSelectOrgan"></selectInline>
                    </span>
                </inlineFilter>

                <inlineFilter v-for="(item,index) in categoryList"  :class="{'mb-10px':true,'mbb-10px':index === categoryList.length - 1 && !shop_filter.supplyGroupMap.length && !shop_filter.closeShop }" :title="item.categoryName+'：'" :key="item.categoryId">

                    <selectInline :show="1" :list="item.groupList" :active="item.activeId"
                                @on-tap="selectGroup"></selectInline>
                </inlineFilter>

                <inlineFilter v-if="shop_filter.supplyGroupMap.length" class="mbb-10px" title="供应链分组：">

                    <selectInline :show="1" :list="shop_filter.supplyGroupMap" :active="shop_filter.select_supplyGroupMap[0] || ''"
                                @on-tap="clicksupplyGroup"></selectInline>
                </inlineFilter>

                <inlineFilter v-if="shop_filter.closeShop" class="mbb-10px" title="营业状态：">

                    <selectInline :show="1" :list="shop_filter.shopStatusList" :active="shop_filter.shopStatus"
                                @on-tap="selectStatus"></selectInline>
                </inlineFilter>

            </containerCard>
        </div>


    </div>
</template>
<script>
//    控制页面筛选项是否展开
    let pageState = {
        showFilter: false,        
    }
    const viewList = {
        list:[
            {
                id:1,name:'graphList',
                url1:'https://assets.2dfire.com/frontend/b5ce26e7e24ab0a60f6ff9fc396d9cd4.png',
                url2:'https://assets.2dfire.com/frontend/81dd0000873c086cc50cd07e2941da64.png'
            },
            {
                id:2,name:'TableList',
                url1:'https://assets.2dfire.com/frontend/0c3ef8f8e9ee14e9e7313891a2c8cf5c.png',
                url2:'https://assets.2dfire.com/frontend/7881b5c11d8c4ea692125058112f0f67.png'
             }
        ],
        value:'TableList',
        pageSize:{
            graphList: 6,
            TableList: 20
        }
    }

    import inlineFilter from '@/components/shop-select/inline-filter'
    import containerCard from '@/components/layout/container-card'
    import selectInline from "@/components/shop-select/select-inline";
    import selectedInline from "@/components/shop-select/selected-inline";
    import areaSelect from "@/components/shop-select/area-select";
    import areaSelected from "@/components/shop-select/area-selected";
    import { mapGetters, mapActions } from "vuex";

    import shopModule from "@/store/modules/shop/index"

    export default {
        data() {
            return {
                pageState,viewList
            }
        },
        props:{
            ChartType:{
                type: Boolean,
                default: false
            },
            params:{
                type: Object,
                default: ()=>{}
            }
        },
        computed: {
            ...mapGetters({
                shopsList: "shop/shops",
                shop_filter: "shop/shop_filter",
                categoryList:"shop/categoryList",
                isCatch:'shop/isCatch'
            })
        },
        methods: {
            ...mapActions("shop",[
                "selectBrand",
                "selectOrgan",
                "selectArea",
                "selectJoin",
                "backOrgan",
                "backArea",
                "setKeyword",
                "searchShops",
                "changeShops",
                "getFilterBrands",
                "getOrganMap",
                "getArea",
                "goShop",
                "clearFilter",
                "initShops",
                "getBrandEntitiesList",
                "getCategory",
                "selectFilterGroup",
                "selectSupplyGroup",
                "setPageSize",
                "selectShopStatus",
                "getCloseShop",
                "setPageState",
                "saveFilters",
                "setCatchFilters",
                "setCode",
            ]),
//            改变页面筛选项是否展示
            changeFilterState() {
                let self = this;
                self.pageState.showFilter = !self.pageState.showFilter;
            },
//            选中某品牌 传递entityId
            clickSelectBrand(item) {
                this.resetPageIndex();
                this.selectBrand(item.entityId);

            },
            clickSelectJoin(item) {
                this.resetPageIndex();
                this.selectJoin(item.entityId);
            },
//            点击 机构 筛选栏
            clickSelectOrgan(item) {
                this.resetPageIndex();
                this.selectOrgan(item);
            },
//            点击 地区 筛选栏
            clickSelectArea(item) {
                this.resetPageIndex();
                this.selectArea(item);
            },
//            点击 供应链 筛选栏
            clicksupplyGroup(item){
                this.resetPageIndex();
                this.selectSupplyGroup(item.entityId);
            },
            //点击 门店状态 筛选栏
            selectStatus(item){
                this.resetPageIndex();
                this.selectShopStatus(item.entityId)
            },
//            点击 机构 返回上一层
            clickBackOrgan(e) {
                this.resetPageIndex();

                let params = {
                    item: e.item,
                    index: e.index
                }
                this.backOrgan(params);

            },
//            点击 地区 返回上一层
            clickBackArea(e) {
                this.resetPageIndex();

                let params = {
                    item: e.item,
                    index: e.index
                }
                this.backArea(params);

            },
//            查找
            clickSearchShops() {
                let self =  this;
                self.resetPageIndex();
//                为筛选设置关键词
                self.setCode(self.params);
//                查找门店
                console.log(self.params)
                self.searchShops(self.params);
            },
            selectGroup(item){
                this.selectFilterGroup(item)
            },
//            重置页码
            resetPageIndex() {
                // let self =  this;
                // self.params.pageIndex = 1;
                // this.params.pageSize = this.viewList.pageSize[this.viewList.value]
                // this.setPageState(this.params)
                console.log(this.viewList.pageSize[this.viewList.value])
                this.$emit('resetPageIndex',this.viewList.pageSize[this.viewList.value])
            },
            handleTypeChange(value){
                if(value === this.viewList.value ) return
                this.resetPageIndex();
                this.viewList.value = value
                this.params.pageSize = this.viewList.pageSize[value]
                this.setPageSize(this.params)
            }
        },
        created() {

        },
        components: {
            containerCard, inlineFilter, selectInline, selectedInline, areaSelect, areaSelected
        }
    };
</script>
<style lang="scss" scoped>
    .filter-button {
        width: 130px;
        height: 50px;
        line-height: 50px;
        padding-left: 20px;
        background: #FFFFFF;
        border: 1px solid rgba(174, 174, 174, 0.21);
        border-radius: 4px;
        float: right;
        font-size: 13px;
        color: #000000;
        letter-spacing: 0;
        text-align: center;

        cursor: pointer;
        user-select: none;
    }

    .filter-icon {
        display: inline-block;
        width: 9px;
        height: 5px;
        vertical-align: middle;
        background-image: url("https://assets.2dfire.com/frontend/4bc5abe585bb1a97cc9f64c0be6c3e60.png");
        background-size: cover;
        transition: transform 0.3s;

        margin-left: 30px;
    }

    .icon-up {
        transform: rotate(-180deg);
    }

    .filter-wrap {
        margin-top: 10px;
    }

    .up:before {
        content: "";
        width: 0;
        float: right;
        display: block;
        border-width: 6px;
        position: relative;
        top: -12px;
        right: 200px;
        border-style: dashed dashed solid;
        border-color: transparent transparent #FFFFFF;
        font-size: 0;
        line-height: 0;
    }
    .up-60:before {
        content: "";
        width: 0;
        float: right;
        display: block;
        border-width: 6px;
        position: relative;
        top: -12px;
        right: 60px;
        border-style: dashed dashed solid;
        border-color: transparent transparent #FFFFFF;
        font-size: 0;
        line-height: 0;
    }

    .filter-item {
        display: inline-block;
        margin-right: 30px;
        margin-bottom: 10px;
    }

    .item-active {
        color: #D83F3F;
    }


    .filter-left {
        display: inline-block;

        margin-right: 30px;
    }
    .filter-right {
        display: inline-block;
    }

    .mbb-10px {
        margin-bottom: -10px;
    }

    .mt-5px {
        margin-top: 5px;
    }
    .viewType{
        float: right;
        display: flex;
        overflow: hidden;
        margin-left: 20px;
    }
    .viewItem{
        width: 60px;
        height: 50px;
        cursor: pointer;
    }
    .viewPic{
        width: 100%;
        height: 50px;
    }
</style>
