<template>
    <div>
        <crumbBar>
            <Crumb></Crumb>
        </crumbBar>

        <div class="shops-wrap">
            <Input icon="ios-search" class="mb-30px large" v-model="params.keyword" placeholder="品牌名称"
                   @on-click="clickSearchBrands" @on-enter="clickSearchBrands" style="width: 560px"></Input>

            <Row>
                <Col :sm="12" :md="8" v-for="(item,index) in brands.brands" :key="index" class="card-col">
                <listCard :title="item.name" :desc="item.shopCount" :image="item.img" @on-tap="goInfo(item)">
                <span  v-if="showSelectBrand" slot="titleBtn">
                    <!--todo 默认品牌显示默认文案   其他品牌显示为默认按钮-->
                    <span v-if="item.defaultPlate" class="def-text">默认</span>
                    <span v-else class="def-btn" @click="userCanManage(item)">设为默认</span>
                </span>
                    <div slot="content">
                        <inlineLabel title="成立日期: ">{{item.foundDate}}</inlineLabel>
                        <inlineLabel title="连锁模式: ">{{item.joinMode}}</inlineLabel>
                        <inlineLabel title="品牌负责人: ">{{item.manager}}</inlineLabel>
                    </div>
                    <span slot="footer">
                    <span>经营菜系：</span>
                    <span v-for="sub in item.cooking">
                            {{sub.name}}
                    </span>
                </span>
                </listCard>
                </Col>
            </Row>
            <div class="page-bar">
                <Tip class="fl-left mt-n-8px" v-if="showSelectBrand">
                    提示：品牌较多时，为了便于连锁设置中的选品牌操作，可在此设置默认操作品牌。
                </Tip>
                <Page :total="brands.total" :current="params.pageIndex" :page-size="params.pageSize" show-total
                      @on-change="changePage"></Page>
            </div>
        </div>
    </div>
</template>

<script>
    let params = {
        keyword: '',
        pageIndex: 1,
        pageSize: 6,
    }
    let catchParams = {
        status:false
    }

    import listCard from '@/components/layout/list-card'
    import inlineLabel from '@/components/inline/inline-label'
    import Crumb from "@/components/layout/crumb";
    import crumbBar from "@/components/layout/crumb-bar";
    import Tip from "@/components/tip/tip"

    import {mapGetters, mapActions} from "vuex";

    import shopModule from "@/store/modules/shop/index"

    export default {
        data() {
            return {
                params
            }
        },
        components: {
            listCard,
            Crumb,
            crumbBar,
            Tip,
            inlineLabel
        },
        computed: {
            ...mapGetters({
                brands: "shop/brands"
            }),
//            只有一个品牌时，右上角无需展示状态和按钮。
//            品牌数量≥2，显示品牌栏下的提示文案
            showSelectBrand(){
                return this.brands.total > 1
            }
        },
        methods: {
            ...mapActions("shop", [
                "initBrands",
                "searchBrands",
                "changeBrands",
                "goBrandInfo",
                "setDefaultPlate",
                "canManagePlate"
            ]),
//            筛选品牌列表
            clickSearchBrands() {
                let self = this;
                self.resetPageIndex();
                self.searchBrands(self.params);
            },
            changePage(pageIndex) {
                let self = this;
                self.params.pageIndex = pageIndex;

                let params = {
                    page: self.params,
                    changed_page: pageIndex
                };
                self.changeBrands(params);
            },
            goInfo(item) {
                let self = this;
                // self.resetPageIndex();
                catchParams = {...this.params,status:true}
                self.goBrandInfo(item);
            },
            resetPageIndex() {
                let self = this;
                self.params.pageIndex = 1;
            },
            setDefBrand(item) {
                let self = this;

                self.$Modal.confirm({
                    title: "请注意",
                    content: "确定要将【" + item.name + "】设置为默认操作品牌吗？",
                    onOk: () => {
                        console.log('点击了默认 ok！！', item)
                        let set_params = {
                            plateEntityId: item.entityId,
                            searchItems: self.params,
                        }
                        self.setDefaultPlate(set_params)
                    }
                })
            },
            canSetPlate(item){
                let self = this;
                console.log('output',item);
                if(item.canManage){
                    self.setDefBrand(item)
                }else{
                    self.$Message.warning("您没有当前品牌的管理权限")
                }
            },
            userCanManage(item) {
                let self = this;

                let user_params = {
                    plateEntityId: item.entityId,
                    name: item.name,
                    callback:e=>{
                        self.canSetPlate(e)
                    }
                }

                self.canManagePlate(user_params)
            },
            clearParams(){
                this.params.keyword = ''
                this.params.pageIndex = 1
            }


        },
        created() {
            let self = this;
            let params = {}
            if(catchParams.status){
                params.pageIndex = catchParams.pageIndex
                params.pageSize = catchParams.pageSize
                params.keyword = catchParams.keyword
                catchParams.status = false
            }else{
                self.clearParams();
                params = { ...this.params }
            }
//            设置侧边导航栏显示
            self.$store.dispatch("leftNav/setNav", 3);
            self.initBrands(params);
        },
        beforeCreate() {
//            动态注册module
            let {shop = {}} = this.$store.state

            if (Object.keys(shop).length <= 0) {
                this.$store.registerModule('shop', shopModule)
            }
        }
    }

</script>

<style lang="scss" scoped>
    .shops-wrap {
        padding: 30px;
        padding-right: 10px;
    }

    .card-col {
        padding: 0 20px 15px 0;
    }

    .page-bar {
        text-align: right;
        padding-right: 20px;
    }

    .mt-n-8px {
        margin-top: -8px;
    }

    .def-text {
        color: #999999;
    }

    .def-btn {
        transition: all 0.3s;
        color: #5599FF;
        cursor: pointer;

    }

    .def-btn:hover {
        color: #3f81cd;
    }
</style>
