<!--商品管理-->
<template>
    <div class="goods-manage">
        <brand-select></brand-select>　　
        <div class="goods-manage-body">
            <crumbBar class="mb-20px">
                <settingTabs></settingTabs>
            </crumbBar>
            <goods-manage :plate-entity-id="plateEntityId"
                          :edit-router-path="editRouterPath"
                          :add-router-path="addRouterPath">
            </goods-manage>
        </div>
    </div>
</template>

<script>
    import BrandSelect from '@/components/brand-select/brand-select'
    import crumbBar from '@/components/layout/crumb-bar'
    import Crumb from '@/components/layout/crumb'
    import settingTabs from "@/components/tabs/setting-tabs"
    import GoodsManage from '@/components/table/goods-manage.vue'
    import {mapState, mapActions} from 'vuex'
    import settingModule from "@/store/modules/setting/index"
    import goodsModule from "@/store/modules/goods/index"
    import brandSelectModule from "@/store/modules/components/brand-select"
    export default {
        data() {
            return {
                plateEntityId: ''
            }
        },
        computed: {
            ...mapState({
                brandList: state => state.setting.brandList
            }),
            addRouterPath(){
                return { path: '/goods_add', query: {plateEntityId: this.plateEntityId} }
            },
            editRouterPath(){
                return { path: '/goods_edit', query: {plateEntityId: this.plateEntityId} }
            }
        },
        watch: {
            brandList(newval){
                console.log('newval',newval)
                if(newval && newval.length === 1 && newval[0].canManage){
                    this.plateEntityId  = newval[0].entityId
                    this._setSelected(newval[0].entityId)
                    this.changeBrand(this.plateEntityId)
                }
//                如果品牌列表长度多余2个，且当前为首次进入（即 url无plateEntityId参数），检查默认品牌
                else if(newval && newval.length > 1 && !this.$route.query.plateEntityId){
                    newval.map(item=>{
                        if(item.defaultPlate){
                            this.plateEntityId  = item.entityId
                            this._setSelected(item.entityId)
                            this.changeBrand(this.plateEntityId)
                        }
                    })
                }
            },
            $route(){
                this.plateEntityId = this.$route.query.plateEntityId
                this._getBrands()
            }
        },
        created() {
            this.setNav(6)
            this.plateEntityId = this.$route.query.plateEntityId
            this._getBrands()
        },
        methods: {
            ...mapActions({
                setNav: "leftNav/setNav",
                _getBrands: "setting/getBrandList",
                _setSelected: 'brandSelect/setSelected'
            }),
            changeBrand(id){
                this.$router.push({
                    path: '/goods_manage',
                    query: {
                        plateEntityId: id
                    }
                })
            }
        },
        components: {
            BrandSelect,
            crumbBar,
            Crumb,
            settingTabs,
            GoodsManage
        },
        beforeCreate() {
//            动态注册module
            let { setting={}, goods={}, brandSelect={} } = this.$store.state

            if(Object.keys(goods).length <= 0) {
                this.$store.registerModule('goods', goodsModule)
            }
            if(Object.keys(setting).length <= 0) {
                this.$store.registerModule('setting', settingModule)
            }
            if(Object.keys(brandSelect).length <= 0) {
                this.$store.registerModule('brandSelect', brandSelectModule)
            }
        }
    };
</script>

<style lang="scss" type="text/scss" scoped>
    .goods-manage-header {

        .crumb-wrap {
            display: inline-block;
        }

        .brand-filter {
            & > span {
                font-size: 12px;
                color: #999999;
                text-align: center;
            }

            /deep/ .ivu-select-placeholder {
                color: #333333;
            }

            /deep/ .ivu-select {
                width: 88px;
                margin-left: 10px;
                margin-top: -5px;
            }
        }
    }

    .goods-manage-body {
        padding: 30px;
    }

    .choose-add-menu {

        .item-list {
            margin-bottom: -15px;

            li {
                overflow: hidden;
                margin-bottom: 15px;
                line-height: 24px;
            }
        }

        .info {
            font-size: 12px;
            color: #999999;
            line-height: 16px;
            padding-top: 20px;
            margin-bottom: 14px;
        }
    }
</style>
