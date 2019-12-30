
<template>
    <div>
        <Modal :value="modal" width="800"
        @on-ok="ok"
        @on-cancel="cancel"
        @on-visible-change="handleChange"
        >
        <div style="width:100%;height:30px"></div>
             <Input 
                icon="ios-search" 
                class="large" 
                v-model="params.keyword" 
                placeholder="店铺名称" 
                @on-click="clickSearchShops" 
                @on-enter="clickSearchShops" 
                style="width: 560px"
            >
             </Input>
             <div class="filter-button" @click="changeFilterState">
                <span>筛选</span>
                <span class="filter-icon" :class="{'icon-up': pageState.showFilter}"></span>
            </div>
            <div :class="{'filter-hide': !pageState.showFilter,'filter-select':true}" >
                <div class="filter-select-content">
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

                    <inlineFilter class="mbb-10px" v-show="shop_filter.showFilterOrgan" title="机构：">
                        <span class="filter-left"  v-if="shop_filter.organs_checked.length >0">
                        <selectedInline :list="shop_filter.organs_checked" :active="shop_filter.selected_organ" @on-tap="clickBackOrgan"></selectedInline>
                        </span>
                        <span class="filter-right">
                            <selectInline :show="2" :list="shop_filter.organs_show" :active="shop_filter.selected_organ" @on-tap="clickSelectOrgan"></selectInline>
                        </span>
                    </inlineFilter>
                </div>

            </div>
                <listTotal :label="pageData.totalLabel" :selectedList="selectedList" :content="shopsList.total"></listTotal>
                <BatchCard :list="shopsList" v-on:checkSelect="checkSelect" />
            <div>

            </div>
            <div slot="footer">
                <Button size="large"  @click="cancel">取消</Button>
                <Button type="error" size="large"  @click="ok">确认</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import inlineFilter from '@/components/shop-select/inline-filter'
import selectInline from "@/components/shop-select/select-inline";
import areaSelect from "@/components/shop-select/area-select";
import areaSelected from "@/components/shop-select/area-selected";
import selectedInline from "@/components/shop-select/selected-inline";
import BatchCard from "@/components/layout/batch-card"
import { mapGetters, mapActions } from "vuex";
import listTotal from '@/components/shop-select/list-total'
import shopModule from "@/store/modules/shop/index"
let params = {
        keyword: '',
        // 分支机构id
        branchEntityId: '',
        pageIndex: 1,
        pageSize: 6,
    }
let pageState = {
    showFilter: true
}
let pageData = {
    totalLabel: '当前符合门店总数：'
}
let selectedList = []
let shop_filter = {
        keyword: '',
        areas: [{"subList":[{"subList":[{"name":"拱墅区","id":"769","type":"town"}],"name":"杭州市","id":"78","type":"city"}],"name":"浙江省","id":"11","type":"province"}],
        area_show: [],
        brands: [{"name":"全部","entityId":""},{"name":"沙沙","entityId":"99228966"},{"name":"鸠摩","entityId":"99934780"},{"name":"鹊巢","entityId":"99933683"}],

        joinModes: [
            {
                name: '全部',
                entityId: '-1',
            },
            {
                name: '加盟',
                entityId: 0,
            },
            {
                name: '直营',
                entityId: 1,
            },
            {
                name: '合作',
                entityId: 2,
            },
            {
                name: '合营',
                entityId: 3,
            },
        ],

        organs: [],
        organs_show: [{"branchCode":"LYNWLSZB620","expand":false,"level":1,"shopCount":0,"branchName":"方法是这样","entityId":"99935090","parentEntityId":"0"},{"branchCode":"LYNWLSZB295","expand":false,"level":1,"shopCount":0,"branchName":"饭后回复","entityId":"99935092","parentEntityId":"0"},{"branchCode":"CB000000092","expand":false,"level":1,"children":[{"branchCode":"CB000000094","expand":false,"level":2,"children":[{"branchCode":"CB000000096","expand":false,"level":3,"children":[{"branchCode":"CB000000098","expand":false,"level":4,"shopCount":0,"branchName":"河北子公司1-1","entityId":"99228974","parentEntityId":"99228972"}],"shopCount":0,"branchName":"河北子公司1","entityId":"99228972","parentEntityId":"99228970"},{"branchCode":"CB000000097","expand":false,"level":3,"shopCount":0,"branchName":"河北子公司2","entityId":"99228973","parentEntityId":"99228970"}],"shopCount":0,"branchName":"河北分公司","entityId":"99228970","parentEntityId":"99228967"},{"branchCode":"CB000000095","expand":false,"level":2,"shopCount":0,"branchName":"天津分公司","entityId":"99228971","parentEntityId":"99228967"}],"shopCount":0,"branchName":"华北测试分公司1","entityId":"99228967","parentEntityId":"0"},{"branchCode":"CB000000093","expand":false,"level":1,"shopCount":0,"branchName":"华北测试沙沙分公司1","entityId":"99228968","parentEntityId":"0"},{"branchCode":"LYNWLSZB384","expand":false,"level":1,"children":[{"branchCode":"LYNWLSZB574","expand":false,"level":2,"children":[{"branchCode":"LYNWLSZB486","expand":false,"level":3,"shopCount":0,"branchName":"杭州1-1子公司","entityId":"99935064","parentEntityId":"99934776"},{"branchCode":"LYNWLSZB600","expand":false,"level":3,"shopCount":0,"branchName":"杭州第一分公司","entityId":"99935062","parentEntityId":"99934776"}],"shopCount":1,"branchName":"杭州市分公司","entityId":"99934776","parentEntityId":"99934773"},{"branchCode":"LYNWLSZB854","expand":false,"level":2,"children":[{"branchCode":"LYNWLSZB660","expand":false,"level":3,"shopCount":0,"branchName":"温州第一分公司","entityId":"99935063","parentEntityId":"99934777"}],"shopCount":0,"branchName":"温州市分公司","entityId":"99934777","parentEntityId":"99934773"}],"shopCount":0,"branchName":"华东大区","entityId":"99934773","parentEntityId":"0"},{"branchCode":"LYNWLSZB470","expand":false,"level":1,"children":[{"branchCode":"LYNWLSZB559","expand":false,"level":2,"shopCount":0,"branchName":"广州分公司","entityId":"99934778","parentEntityId":"99934775"}],"shopCount":0,"branchName":"华南大区","entityId":"99934775","parentEntityId":"0"},{"branchCode":"LYNWLSZB640","expand":false,"level":1,"children":[{"branchCode":"LYNWLSZB804","expand":false,"level":2,"shopCount":1,"branchName":"武汉管理区","entityId":"99934779","parentEntityId":"99934774"}],"shopCount":0,"branchName":"华中大区","entityId":"99934774","parentEntityId":"0"}],
        organs_checked: [{"branchName":"全部","entityId":"","children":[{"branchCode":"LYNWLSZB620","expand":false,"level":1,"shopCount":0,"branchName":"方法是这样","entityId":"99935090","parentEntityId":"0"},{"branchCode":"LYNWLSZB295","expand":false,"level":1,"shopCount":0,"branchName":"饭后回复","entityId":"99935092","parentEntityId":"0"},{"branchCode":"CB000000092","expand":false,"level":1,"children":[{"branchCode":"CB000000094","expand":false,"level":2,"children":[{"branchCode":"CB000000096","expand":false,"level":3,"children":[{"branchCode":"CB000000098","expand":false,"level":4,"shopCount":0,"branchName":"河北子公司1-1","entityId":"99228974","parentEntityId":"99228972"}],"shopCount":0,"branchName":"河北子公司1","entityId":"99228972","parentEntityId":"99228970"},{"branchCode":"CB000000097","expand":false,"level":3,"shopCount":0,"branchName":"河北子公司2","entityId":"99228973","parentEntityId":"99228970"}],"shopCount":0,"branchName":"河北分公司","entityId":"99228970","parentEntityId":"99228967"},{"branchCode":"CB000000095","expand":false,"level":2,"shopCount":0,"branchName":"天津分公司","entityId":"99228971","parentEntityId":"99228967"}],"shopCount":0,"branchName":"华北测试分公司1","entityId":"99228967","parentEntityId":"0"},{"branchCode":"CB000000093","expand":false,"level":1,"shopCount":0,"branchName":"华北测试沙沙分公司1","entityId":"99228968","parentEntityId":"0"},{"branchCode":"LYNWLSZB384","expand":false,"level":1,"children":[{"branchCode":"LYNWLSZB574","expand":false,"level":2,"children":[{"branchCode":"LYNWLSZB486","expand":false,"level":3,"shopCount":0,"branchName":"杭州1-1子公司","entityId":"99935064","parentEntityId":"99934776"},{"branchCode":"LYNWLSZB600","expand":false,"level":3,"shopCount":0,"branchName":"杭州第一分公司","entityId":"99935062","parentEntityId":"99934776"}],"shopCount":1,"branchName":"杭州市分公司","entityId":"99934776","parentEntityId":"99934773"},{"branchCode":"LYNWLSZB854","expand":false,"level":2,"children":[{"branchCode":"LYNWLSZB660","expand":false,"level":3,"shopCount":0,"branchName":"温州第一分公司","entityId":"99935063","parentEntityId":"99934777"}],"shopCount":0,"branchName":"温州市分公司","entityId":"99934777","parentEntityId":"99934773"}],"shopCount":0,"branchName":"华东大区","entityId":"99934773","parentEntityId":"0"},{"branchCode":"LYNWLSZB470","expand":false,"level":1,"children":[{"branchCode":"LYNWLSZB559","expand":false,"level":2,"shopCount":0,"branchName":"广州分公司","entityId":"99934778","parentEntityId":"99934775"}],"shopCount":0,"branchName":"华南大区","entityId":"99934775","parentEntityId":"0"},{"branchCode":"LYNWLSZB640","expand":false,"level":1,"children":[{"branchCode":"LYNWLSZB804","expand":false,"level":2,"shopCount":1,"branchName":"武汉管理区","entityId":"99934779","parentEntityId":"99934774"}],"shopCount":0,"branchName":"华中大区","entityId":"99934774","parentEntityId":"0"}]}],
        areas_checked: [{"id":"","name":"全部","type":"all","subList":[{"subList":[{"subList":[{"name":"拱墅区","id":"769","type":"town"}],"name":"杭州市","id":"78","type":"city"}],"name":"浙江省","id":"11","type":"province"}]}],

        showFilterOrgan: true,

        // 选中的品牌id
        selected_brand: '',
        // 选中的加盟类型 默认全部 -1
        selected_join: '-1',
        // 选中的组织id
        selected_organ: '',
        // 省id
        selected_provinceId: '',
        // 城市id
        selected_cityId: '',
        // 区县id
        selected_townId: '',
    }
export default {
    props:{
        modal:Boolean,
        defalut:false
    },
    components:{
        inlineFilter,
        selectInline,
        areaSelect,
        areaSelected,
        selectedInline,
        BatchCard,
        listTotal
    },
    data() {
        return {
            params,
            pageState,
            pageData,
            selectedList,
            transfer:false,
            shopsList:{
                total:0
            },
            shop_filter,
        }
    },

    methods: {
        ok(){
            this.$emit('ok')
        },
        cancel(){
            this.$emit('cancel')
        },
        //            改变页面筛选项是否展示
        changeFilterState() {
            let self = this;
            self.pageState.showFilter = !self.pageState.showFilter;
        },
        clickSearchShops() {
           
        },
        resetPageIndex() {
            let self =  this;
            self.params.pageIndex = 1;
        },
        clickSelectBrand(item) {
            this.shop_filter.selected_brand = item.entityId
            console.log(item,this.selected_brand)
        },
        initShopManage() {
            
        },
//            重置页码
        resetPageIndex() {
            let self =  this;
            self.params.pageIndex = 1;
        },
        clickSelectJoin(item){
            this.shop_filter.selected_join = item.entityId
        },
//      点击 地区 返回上一层
        clickBackArea(e) {
            // this.resetPageIndex();
            if(e.index !== (this.shop_filter.areas_checked.length - 1) ){
                this.shop_filter.areas_checked.splice(e.index+1,this.shop_filter.areas_checked.length-e.index-1)
                this.shop_filter.areas = [].concat(this.shop_filter.areas_checked[e.index].subList) 
            }

        },
//      点击 地区 筛选栏
        clickSelectArea(item) {
            if(item.subList){
                this.shop_filter.areas_checked.push(item)
                this.shop_filter.areas = item.subList
            }
            console.log(item)
            console.log(this.shop_filter.areas_checked)
            if(item.type === 'province'){
                this.shop_filter.selected_provinceId = item.id
            }else if( item.type === 'city'){
                this.shop_filter.selected_cityId = item.id
            }else if(item.type === 'town'){
                this.shop_filter.selected_townId = item.id
            }
        },

//      点击 机构 返回上一层
        clickBackOrgan(e) {
            // this.resetPageIndex();

            

        },
//      点击 机构 筛选栏
        clickSelectOrgan(item) {
            
        },
        checkSelect(list){
            
        },
        handleChange(res){

        }
    
    },

    mounted() {
      
    }
}
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
    .filter-left {
        display: inline-block;
        margin-right: 30px;
    }
    .filter-right {
        display: inline-block;
    }

    .icon-up {
        transform: rotate(-180deg);
    }
    .filter-select{
        transition: all .3s linear;
        max-height: 300px;
        overflow: hidden;
        margin-top: 10px;
        .filter-select-content{
            border: 1px solid #cccccc;
            padding: 10px 20px;
        }
    }
    .filter-hide{
        max-height: 0;
    }
</style>
