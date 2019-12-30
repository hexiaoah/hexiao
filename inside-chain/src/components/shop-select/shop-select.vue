<script>
    /**
     -- zeqi@2dfire

     @props:
     brand：是否需要品牌筛选，传入brand则不显示品牌筛选栏

     @event:
     on-tap: 确定按钮，返回所有选中的门店信息list


     @desc:
     选择门店组件
     */

    import BaseModal from '@/components/modal/base-modal'
    import BasePanel from '@/components/layout/base-panel'
    import InlineFilter from '@/components/shop-select/inline-filter'
    import ContainerCard from '@/components/layout/container-card'
    import SelectInline from "@/components/shop-select/select-inline";
    import SelectedInline from "@/components/shop-select/selected-inline";
    import AreaSelect from "@/components/shop-select/area-select";
    import AreaSelected from "@/components/shop-select/area-selected";
    import ListTotal from "@/components/shop-select/list-total";

    import shopSelectModules from '@/store/modules/components/shop-select'

    let pageState = {
        showFilter: true,
        totalLabel: '当前符合条件门店总数：'
    }

    let params = {
        keyWord: ''
    }

    import {mapGetters, mapActions} from "vuex";

    export default {
        name: 'shopSelect',
        props:{
            show:{
                type: String,
                default: ''
            },
            brand:{
                type: String,
                default: ''
            },
            applyType:{
                type: String,
                default: ''
            },
            list:{
                type:Object,
                default:()=>({
                    itemClassId: '',
                    itemName: '',
                    itemps: '',
                    itemId:''
                })
            }
        },
        data() {
            return {
                pageState,
                params,
            }
        },
        components: {
            BaseModal,
            ContainerCard,
            BasePanel,
            InlineFilter,
            SelectInline,
            SelectedInline,
            AreaSelect,
            AreaSelected,
            ListTotal
        },
        computed: {
            ...mapGetters({
                shopFilter: "shopSelect/shopFilter",
                shopsList: "shopSelect/shops",
                categoryList:"shopSelect/categoryList"
            }),
            checkCount(){
                let count = 0;
                let self = this;
                self.shopsList.map(item => {
                    if (item.checked) {
                        count++
                    }
                });
                return count
            },
            AllChecked() {
                let count = 0;
                let self = this;
                self.shopsList.map(item => {
                    if (item.checked) {
                        count++
                    }
                });
                return count === self.AllcheckedStatus.length && self.AllcheckedStatus.length !== 0
            },
            maxHeight() {
                let height = document.documentElement.clientHeight * 0.7;
                return {
                    maxHeight: height + 'px',
                    overflowY: 'auto'
                }
            },
            AllcheckedStatus(){
                return this.shopsList.filter(item=>{
                    return item.isExclude == '-1'
                })
            }
            
        },
        methods: {
            ...mapActions({
                selectFilterBrand: "shopSelect/selectBrand",
                selectFilterJoin: "shopSelect/selectJoin",
                selectFilterOrgan: "shopSelect/selectOrgan",
                selectFilterArea: "shopSelect/selectArea",
                backFilterOrgan: "shopSelect/backOrgan",
                backFilterArea: "shopSelect/backArea",
                getShops: "shopSelect/getShops",
                getBrands: "shopSelect/getFilterBrands",
                getOrgan: "shopSelect/getOrganMap",
                getArea: "shopSelect/getArea",
                initShops: "shopSelect/initShops",
                checkAllShop: "shopSelect/checkAllShop",
                checkOneShop: "shopSelect/checkOneShop",
                resetFilter: "shopSelect/clearFilter",
                setApplyType:"shopSelect/setApplyType",
                getCategory:'shopSelect/getCategory',
                selectFilterGroup:'shopSelect/selectFilterGroup',
                excludeids:'shopSelect/excludeids'

            }),
            //            改变页面筛选项是否展示
            changeFilterState() {
                let self = this;
                self.pageState.showFilter = !self.pageState.showFilter;
            },
            ok() {
                let self = this;

                if(self.checkCount === 0){
                    self.$Message.info('请先选择门店')
                }else{
                this.$emit('on-ok');
                }
            },
            cancel() {
                this.$emit('on-cancel');
            },
            selectBrand(item) {
                this.selectFilterBrand(item.entityId);

            },
            selectGroup(item){
                console.log(this.categoryList)
                this.selectFilterGroup(item)
            },
            selectJoin(item) {
                this.selectFilterJoin(item.entityId);
            },
            selectOrgan(item) {
                this.selectFilterOrgan(item);
            },
            selectArea(item) {
                this.selectFilterArea(item);
            },
            backOrgan(e) {

                let params = {
                    item: e.item,
                    index: e.index
                };
                this.backFilterOrgan(params);

            },
            backArea(e) {
                this.params.pageIndex = 1;

                let params = {
                    item: e.item,
                    index: e.index
                };
                this.backFilterArea(params);

            },
            searchShops() {
                let self = this;
                self.params.pageIndex = 1;
                this.getShops(self.params);
            },
            //            获取筛选项 -品牌
            getFilterBrands() {
                this.getBrands(params);

            },
//            获取筛选项 -机构
            getFilterOrgan() {
                this.getOrgan(params);

            },
//            获取筛选项 -区域
            getFilterArea() {
                this.getArea();

            },
            checkAll(e) {
                this.checkAllShop(e);
            },
            checkOne(item, e) {
                let params = {
                    entityId: item.entityId,
                    type: e
                };
                this.checkOneShop(params)
            }
        },
        created() {
            let self = this;
            this.resetFilter()
            if(this.applyType){
                this.setApplyType(this.applyType)
            }
            this.excludeids(this.list)
            this.getCategory(this.list)
//            如果存在品牌 则不显示品牌筛选栏目
            if (self.brand) {
                self.selectFilterBrand(self.brand);
            } else {
                self.getFilterBrands()
                this.initShops()
            }
            this.getFilterOrgan()
            this.getFilterArea()
        },
        beforeCreate() {
//            动态注册module
            let { shopSelect={} } = this.$store.state

            if(Object.keys(shopSelect).length <= 0) {
                this.$store.registerModule('shopSelect', shopSelectModules)
            }
        }
    }
</script>

<template>
    <BaseModal
        :show="true"
        header="选择门店"
        okText="保存"
        width="720"
        @on-ok="ok"
        @on-cancel="cancel"
    >
        <!--选择门店组件-->

        <!--筛选-->
        <div class="ani" :style="maxHeight">
            <Input icon="ios-search"
                   v-model="params.keyWord"
                   placeholder="门店名称" @on-click="searchShops" @on-enter="searchShops"
                   style="width: 200px">
            </Input>

            <div class="filter-button" @click="changeFilterState">
                <span>筛选</span>
                <span class="filter-icon" :class="{'icon-up': pageState.showFilter}"></span>
            </div>
            <div v-show="pageState.showFilter">
                <div class="up"></div>
                <ContainerCard class="filter-wrap" :border="1">

                    <inlineFilter v-show="!brand" class="mb-10px mt-5px" title="品牌：">

                        <SelectInline :show="1" :list="shopFilter.brands" :active="shopFilter.selected_brand"
                                      @on-tap="selectBrand"></SelectInline>
                    </inlineFilter>


                    <inlineFilter class="mb-10px mt-5px" title="类型：">

                        <SelectInline :show="1" :list="shopFilter.joinModes" :active="shopFilter.selected_join"
                                      @on-tap="selectJoin"></SelectInline>
                    </inlineFilter>

                    <inlineFilter :class="{'mb-10px':shopFilter.showFilterOrgan}" title="地区：">
                        <span class="filter-left" v-if="shopFilter.areas_checked.length >0">
                          <AreaSelected :list="shopFilter.areas_checked" :area="shopFilter"
                                        @on-tap="backArea"></AreaSelected>
                        </span>
                        <span class="filter-right">
                          <AreaSelect :list="shopFilter.areas" :area="shopFilter" @on-tap="selectArea"></AreaSelect>
                        </span>

                    </inlineFilter>

                    <inlineFilter class="mb-10px" v-show="shopFilter.showFilterOrgan" title="机构：">
                        <span class="filter-left" v-if="shopFilter.organs_checked.length >0">
                        <SelectedInline :list="shopFilter.organs_checked" :active="shopFilter.selected_organ"
                                        @on-tap="backOrgan"></SelectedInline>
                        </span>
                        <span class="filter-right">
                            <SelectInline :show="2" :list="shopFilter.organs_show" :active="shopFilter.selected_organ"
                                          @on-tap="selectOrgan"></SelectInline>
                        </span>
                    </inlineFilter>
                    <inlineFilter v-for="(item,index) in categoryList"  :class="{'mb-10px': true,'mbb-10px': index === (categoryList.length -1)}" :title="item.categoryName+'：'" :key="item.categoryId" >
                        <SelectInline :show="1" :list="item.groupList" :active="item.activeId" @on-tap="selectGroup"></SelectInline>

                    </inlineFilter>

                </ContainerCard>
            </div>
            <!--店铺展示-->

            <ListTotal :label="pageState.totalLabel" :content="shopsList.length"></ListTotal>
            <BasePanel>
                <div slot="header">
                    <Checkbox :disabled="!AllcheckedStatus.length" @on-change="checkAll" :value="AllChecked">全选</Checkbox>
                </div>

                <div slot="body" class="shops">
                    <Row>
                        <Col class="mb-20px" span="8" v-for="(item,index) in shopsList" :key="index">
                        <Checkbox :disabled="item.isExclude != '-1'" @on-change="checkOne(item, $event)" v-model="item.checked">{{item.name}}</Checkbox>
                        </Col>
                    </Row>
                </div>
            </BasePanel>
        </div>

    </BaseModal>
</template>

<style lang="scss" scoped>
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
        right: 40px;
        border-style: dashed dashed solid;
        border-color: transparent transparent #CCCCCC;
        font-size: 0;
        line-height: 0;
    }

    .filter-button {
        width: 88px;
        height: 32px;
        line-height: 32px;
        padding-left: 10px;
        background: #FFFFFF;
        border: 1px solid #e6e6e6;
        border-radius: 4px;
        float: right;
        font-size: 12px;
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

        margin-left: 10px;
    }

    .icon-up {
        transform: rotate(-180deg);
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

    .shops {
        max-height: 398px;
        overflow-y: auto;
    }
    .mbb-10px {
        margin-bottom: -10px;
    }
</style>

