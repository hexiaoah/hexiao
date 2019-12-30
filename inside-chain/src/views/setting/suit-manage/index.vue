<!--套餐管理-->
<template>
    <div>
        <brand-select></brand-select>　　
        <div class="suit-manage">
            <crumbBar class="mb-20px">
                <settingTabs></settingTabs>
            </crumbBar>
            <suit-manage :plate-entity-id="plateEntityId"
                         :edit-router-path="editRouterPath"
                         :add-router-path="addRouterPath">
            </suit-manage>
        </div>
    </div>
</template>
<script>
    import BrandSelect from '@/components/brand-select/brand-select'
    import crumbBar from '@/components/layout/crumb-bar'
    import Crumb from '@/components/layout/crumb'
    import changeCategory from '@/components/category/change-category.vue'
    import settingTabs from "@/components/tabs/setting-tabs"
    import SuitManage from '@/components/table/suit-manage.vue'
    import settingModule from "@/store/modules/setting/index"

    import { mapState, mapActions } from "vuex"

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
                return {path: '/add_set_base_info', query: {
                    plateEntityId: this.plateEntityId
                }}
            },
            editRouterPath(){
                return {path: '/edit_set_base_info', query: {
                    plateEntityId: this.plateEntityId
                }}
            }
        },
        created() {
            this.setNav(6)
            this.getBrands()
            this.plateEntityId = this.$route.query.plateEntityId
        },
        methods: {
            ...mapActions({
                setNav: "leftNav/setNav",
                getBrands: "setting/getBrandList",
            }),
            changeBrand(id){
                this.$router.push({
                    path: '/combo_manage',
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
            SuitManage,
            changeCategory
        },
        beforeCreate() {
//            动态注册module
            let {setting = {}, goods = {}} = this.$store.state
            if (Object.keys(setting).length <= 0) {
                this.$store.registerModule('setting', settingModule)
            }
        }
    };
</script>
<style lang="scss" type="text/scss" scoped>
    .suit-manage {
        padding: 30px;
    }

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
</style>
