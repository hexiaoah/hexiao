<template>
    <div>
        <crumbBar>
            <Crumb></Crumb>
        </crumbBar>

        <div class="shops-wrap">

            <div class="pr-20px">
                <!-- <FilterComponent :params="params" @resetPageIndex="resetPageIndex" ></FilterComponent> -->
                 <Input icon="ios-search" class="large" v-model="params.code" placeholder="店铺编码" @on-click="clickSearchShops" @on-enter="clickSearchShops" style="width: 560px"></Input>
            </div>
            <listTotal :label="pageData.totalLabel" :content="shopsList.total"></listTotal>
            <div class="pr-20px mb-15px">
                <div v-if="shopsList.shops && shopsList.shops.length " class="tableMain">
                    <CoutomTable :tableList="shopsList.shops" :titleList="tableTitle(this)" />
                </div>
            </div>
            <div class="page-bar">
                <Page :total="shopsList.total" :current="params.pageIndex" :page-size="params.pageSize" show-total @on-change="changePage"></Page>
            </div>

        </div>
        <Modal ref="myModal"
            v-model="visible"
            :footerHide="true"
            :closable="false"
            class-name="vertical-center-modal"
        >
            <EditForm :visible="visible" name="form" :title="title" @handleOk = "handleOk" :formInline="formInline"></EditForm>
        </Modal>
    </div>
</template>
<script>
    const tableTitle = t => ([
        {
            title:'名称',
            key:'title',
        },
        {
            title:'品牌',
            key:'desc',
        },
        {
            title:'门店编码',
            key:'code',
        },
        {
            title:'自定义编码',
            key:'customCode',
        },
        {
            title:'简称',
            key:'shortName',
        },
        {
            title:'操作',
            render: (h,data)=>{
                return h('div',[
                    h('a',{
                        on:{
                            click:()=>{
                                t.editInfo(data)
                            }
                        },
                        class:'edit-button'
                    },'编辑')
                ])
            },
            width:'15%'
        }
    ])

    let pageData = {
        totalLabel: '当前符合门店总数：'
    }

    let params = {
        keyWord: '',
        // 分支机构id
        branchEntityId: '',
        pageIndex: 1,
        pageSize: 20,
        code:''
    }

    import listCard from '@/components/layout/list-card'
    import listTotal from '@/components/shop-select/list-total'
    import crumbBar from '@/components/layout/crumb-bar'
    import Crumb from "@/components/layout/crumb";
    import CoutomTable from "../../../components/table/staff-table-list/index"
    import { mapGetters, mapActions } from "vuex";
    import FilterComponent from '../filter-manage/index'

    import shopModule from "@/store/modules/shop/index"
    import EditForm from './components/editForm'

    export default {
        data() {
            return {
                pageData, params, tableTitle,
                visible: false,
                title:'',
                entityId:'',
                formInline:{
                    coutomEncode: '',
                    shortName: ''
                }
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
                "changeShops",
                "getFilterBrands",
                "getOrganMap",
                "getArea",
                "clearFilter",
                "initShops",
                "getBrandEntitiesList",
                "getCategory",
                "selectFilterGroup",
                "setPageSize",
                "getCloseShop",
                "setPageState",
                "setCatchFilters",
                "updateCustomInfo",
                "querySimpleShopList"
            ]),
//            翻页
            changePage(page_index) {
                let self = this;

                self.params.pageIndex = page_index;
                let params = {
                    page: self.params,
                    changed_page: page_index
                };
                self.changeShops(params);
            },
            initShopManage() {
                let self = this;
                //侧边栏选中
                self.$store.dispatch("leftNav/setNav", 2);
                if(!self.isCatch){ //判断是否有缓存筛选条件
                    //清空选择
                    self.clearFilter();
                    this.params.code = ''
                    self.resetPageIndex(self.params.pageSize);
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
                // self.initShops();
                this.querySimpleShopList()

            },
            selectGroup(item){
                this.selectFilterGroup(item)
            },
//            重置页码
            resetPageIndex(pageSize) {
                this.params.pageIndex = 1;
                this.params.pageSize = pageSize
                this.setPageState(this.params)
            },
            editInfo(item){
                this.title = item.title
                this.entityId = item.entityId
                this.formInline = {
                    coutomEncode: item.customCode,
                    shortName: item.shortName
                }
                this.visible = true
            },
            handleOk(){
                const params = {
                    entityId: this.entityId,
                    customCode: this.formInline.coutomEncode,
                    shortName: this.formInline.shortName
                }
                this.updateCustomInfo(params)
                this.visible = false
            },
            clickSearchShops(){
                this.querySimpleShopList(this.params.code)
            }
        },
        created() {
            let self = this;
            console.log(this)
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
            Crumb, crumbBar, listCard, listTotal, CoutomTable, FilterComponent, EditForm
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
        /deep/ .edit-button{
            cursor: pointer;
            font-size: 12px;
            color: #5599FF;
            line-height: 12px;
        }
    }
    .page-bar {
        text-align: right;
        padding-right: 20px;
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
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
        .ivu-modal{
            top: 0;
        }
    }

</style>
