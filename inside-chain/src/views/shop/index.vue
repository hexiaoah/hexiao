<template>
    <div>
        <crumbBar>
            <Crumb rightName="门店自定义编码和简称" rightLink="/coutom_content" ></Crumb>
        </crumbBar>

        <div class="shops-wrap">

            <div class="pr-20px">

            <Input icon="ios-search" class="large" v-model="params.keyWord" placeholder="店铺名称" @on-click="clickSearchShops" @on-enter="clickSearchShops" style="width: 560px"></Input>
            
            <div class="viewType">
                <div v-for="item in viewList.list" @click="handleTypeChange(item.name)" :key="item.id" class="viewItem">
                    <img class="viewPic" :src="item.name === viewList.value ? item.url1 : item.url2" >
                </div>
            </div>

            <div class="filter-button" @click="changeFilterState">
                <span>筛选</span>
                <span class="filter-icon" :class="{'icon-up': pageState.showFilter}"></span>
            </div>
            
            <div v-show="pageState.showFilter">
                <div class="up"></div>
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
            <listTotal :label="pageData.totalLabel" :content="shopsList.total"></listTotal>
            <div v-if="viewList.value === 'graphList'">

                <Row>
                    <Col :sm="12" :md="8" v-for="(item,index) in shopsList.shops" :key="index" class="card-col">
                    <listCard @on-tap="goShopView(item)" :title="item.title" :desc="item.desc" :status="item.status" :statusText="item.statusText" :image="item.image"
                            :type="item.type">
                        <div slot="content" class="shop-content">
                                <inlineLabel :title="shop_info.shopPlate">{{item.desc}}</inlineLabel>
                                <inlineLabel :title="shop_info.shopCode">{{item.code}}</inlineLabel>
                                <inlineLabel :title="shop_info.shopManager">{{item.linkman}}</inlineLabel>
                                <inlineLabel :title="shop_info.contactNumber">{{item.phone}}</inlineLabel>
                                <inlineLabel :title="shop_info.workerTotal">{{item.employeeAmount}}</inlineLabel>
                                <!-- <inlineLabel :title="shop_info.OpenDate">{{item.foundDate}}</inlineLabel> -->
                        </div>
                        <p slot="footer">
                            <inlineAddress>{{item.address}}</inlineAddress>
                        </p>
                    </listCard>
                    </Col>
                </Row>
            </div>
            <div v-else class="pr-20px mb-15px">
                <div v-if="shopsList.shops && shopsList.shops.length " class="tableMain">
                    <!-- <Table border :columns="columns(this)" :data="shopsList.shops"></Table> -->
                    <!-- <div class="mb-20px"></div> -->
                    <ShopTable :list="shopsList.shops" :titleList="titleList" @goShopView="goShopView" />
                </div>
            </div>
            <div class="page-bar">
                <Page :total="shopsList.total" :current="params.pageIndex" :page-size="params.pageSize" show-total @on-change="changePage"></Page>
            </div>

        </div>

    </div>
</template>
<script>
    let shop_info = {
        shopPlate: '品牌：',
        shopCode: '店铺编码：',
        shopManager: '门店经理：',
        contactNumber: '联系电话：',
        workerTotal: '员工总数：',
        OpenDate: '开业日期：',
    }
    let pageData = {
        totalLabel: '当前符合门店总数：'
    }

    let params = {
        keyWord: '',
        // 分支机构id
        branchEntityId: '',
        pageIndex: 1,
        pageSize: 6,
    }

//    控制页面筛选项是否展开
    let pageState = {
        showFilter: true,
        viewType:'graphList',
        
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
        value:'graphList',
        pageSize:{
            graphList: 6,
            TableList: 20
        }
    }

    import listCard from '@/components/layout/list-card'
    import listTotal from '@/components/shop-select/list-total'
    import inlineFilter from '@/components/shop-select/inline-filter'
    import inlineLabel from "@/components/inline/inline-label";
    import inlineAddress from "@/components/inline/inline-address";
    import containerCard from '@/components/layout/container-card'
    import crumbBar from '@/components/layout/crumb-bar'
    import Crumb from "@/components/layout/crumb";
    import selectInline from "@/components/shop-select/select-inline";
    import selectedInline from "@/components/shop-select/selected-inline";
    import areaSelect from "@/components/shop-select/area-select";
    import areaSelected from "@/components/shop-select/area-selected";
    import ShopTable from "@/components/table/shop-table-list/index"
    import { mapGetters, mapActions } from "vuex";
    import { shopTitle as titleList } from "@/const/emu-table-title"

    import shopModule from "@/store/modules/shop/index"

    export default {
        data() {
            return {
                pageData, shop_info, params, pageState,titleList,viewList
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
                "setCatchFilters"
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
                self.setKeyword(self.params);
//                查找门店
                self.searchShops(self.params);
            },
//            翻页
            changePage(page_index) {
                let self = this;

                self.params.pageIndex = page_index;
                // self.params.pageSize = this.viewList.pageSize[this.viewList.value]
                let params = {
                    page: self.params,
                    changed_page: page_index
                };
                self.changeShops(params);
            },
            // 前往门店详情
            goShopView(item) {
                // this.resetPageIndex();
                this.saveFilters()//缓存筛选条件
                this.$store.dispatch("leftNav/showShopNav", true);
//
                this.goShop(item);
            },
            initShopManage() {
                let self = this;
                //侧边栏选中
                self.$store.dispatch("leftNav/setNav", 2);
                if(!self.isCatch){ //判断是否有缓存筛选条件
                    //清空选择
                    self.clearFilter();
                    self.resetPageIndex();
                    //获取分组
                    self.getCategory()
                    //查询有无停业门店
                    self.getCloseShop()
                    //获取筛选项-品牌
                    self.getFilterBrands()
                    //获取筛选项 -机构
                    self.getOrganMap()
                    //获取筛选项 -区域
                    self.getArea()
                    // 获取门店列表
                }else{
                    self.setCatchFilters()//重新赋值
                }
                self.initShops();
            },
            selectGroup(item){
                this.selectFilterGroup(item)
            },
//            重置页码
            resetPageIndex() {
                let self =  this;
                self.params.pageIndex = 1;
                this.params.pageSize = this.viewList.pageSize[this.viewList.value]
                this.setPageState(this.params)
            },
            handleTypeChange(value){
                if(value === this.viewList.value ) return
                this.viewList.value = value
                this.resetPageIndex();
                this.initShops()
            }
        },
        created() {
            let self = this;

            let chain = sessionStorage.getItem('chain');
            if(chain) {
                let chainObj = JSON.parse(chain);
                let plateEntityId = chainObj.plateEntityId;
                if(plateEntityId) {
                    self.selectBrand(plateEntityId)
                }
                sessionStorage.removeItem('chain')
            }
            self.initShopManage();
            // this.getBrandEntitiesList() //供应链分组删除

        },
        components: {
            Crumb, crumbBar, listCard, listTotal, containerCard, inlineFilter, inlineLabel, inlineAddress, selectInline, selectedInline, areaSelect, areaSelected, ShopTable
        },
        beforeCreate() {
//            动态注册module
            let { shop={} } = this.$store.state

            if(Object.keys(shop).length <= 0) {
                this.$store.registerModule('shop', shopModule)
            }
        }
    };
</script>
<style lang="scss" scoped>
    .shops-wrap {
        padding: 30px;
        padding-right: 10px;
    }

    .card-col {
        padding: 0 20px 15px 0;
    }
    .shop-content{
        margin-top: 8px;
    }

    .page-bar {
        text-align: right;
        padding-right: 20px;
    }

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
    .tableMain{
        background-color: #ffffff;
        padding: 15px;
        box-shadow: 0 2px 4px 0 rgba(202, 202, 202, 0.26);
        transition: box-shadow 0.3s;
        &:hover{
            box-shadow: 0 2px 6px 0 rgba(202, 202, 202, 0.52);
        }
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
