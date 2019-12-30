<script>
    /**
     -- zeqi@2dfire

     @props:

     @events:

     选择品牌的组件，
     */
    import {mapGetters, mapActions} from "vuex";
    import Tip from "../tip/tip"
    import brandSelectModule from '@/store/modules/components/brand-select'

    export default {
        data() {
            return {
                brandId: ''
            }
        },
        props: {},
        components: {
            Tip
        },
        computed: {
            ...mapGetters({
                brandList: "brandSelect/brandList",
//                当前选中的品牌id
                selected: "brandSelect/selected",
//                当前选中的品牌名称
                selectedBrandName: "brandSelect/selectedName",
                showDefBtn: "brandSelect/showDefBtn"
            }),
        },
        methods: {
            ...mapActions({
                getAllBrand: "brandSelect/getBrandList",
                setSelected: "brandSelect/setSelected"
            }),
            changBrand(e) {
                let self = this;
                let selectedPlate = {}
                self.brandList.map(item => {
                    if (item.entityId === e) {
                        selectedPlate = item
                    }
                })
                if (e && e !== self.selected) {
                    if (selectedPlate.canManage) {
                        if (self.selectedBrandName) {
                            console.log('self.selectedBrandName && selectedPlate.canManage', self.selectedBrandName, selectedPlate)
                            self.$Modal.confirm({
                                title: '请注意',
                                content: `当前正在${self.selectedBrandName}下操作，确定需要切换品牌吗？`,
//                    点击确定的操作
                                onOk: () => {
                                    self.$router.push({
                                        path: '/goods_manage',
                                        query: {
                                            plateEntityId: e
                                        }
                                    })
                                },
//                    点击取消的操作
                                onCancel: () => {
                                    self.brandId = self.selected
                                }
                            });
                        } else {
                            self.$router.push({
                                path: '/goods_manage',
                                query: {
                                    plateEntityId: e
                                }
                            })
                        }
                    } else {
                        this.$Modal.warning({
                            title: '请注意',
                            content: '您没有当前所选品牌的权限',
//                    点击确定的操作
                            onOk: () => {
                                console.log('ok!!')
                                self.brandId = self.selected
                            },
                        })
                    }
                }

            },
            goBrandManage(){
                this.$router.push({
                    path: "/shop_brand"
                })
            }
        },
        created() {
            let self = this;
//            获取所有品牌列表
            if (!this.selected) {
                this.getAllBrand()
            }
//           品牌id
//            进入时从url中获取品牌的entityId
            self.brandId = this.$route.query.plateEntityId || "";
            this.setSelected(self.brandId)
        },
        watch: {
            selected(newval, oldval){
                (newval !== oldval) && (this.brandId = newval)
            },
            $route(){
//                只会在点击左侧栏时触发
                let self = this;
//           品牌id
                self.brandId = this.$route.query.plateEntityId || "";
                this.setSelected(self.brandId)
            }
        },
        beforeCreate() {
//            动态注册module
            let { brandSelect={} } = this.$store.state

            if(Object.keys(brandSelect).length <= 0) {
                this.$store.registerModule('brandSelect', brandSelectModule)
            }
        }
    }
</script>

<template>
    <div class="brand-select">
        <span class="select-label">品牌</span>
        <Select style="width:100px"
                v-model="brandId"
                @on-change="changBrand"
        >
            <Option v-for="item in brandList"
                    :value="item.entityId"
                    :key="item.entityId">{{item.name}}
            </Option>
        </Select>
        <span class="right-tip" v-show="!selected">请先选择品牌，如果没有品牌请在掌柜APP内创建一个品牌。</span>

        <span class="fl-right set-def" @click="goBrandManage" v-show="showDefBtn">*设置默认操作品牌</span>
    </div>
</template>

<style lang="scss" scoped>
    .brand-select {
        width: 100%;
        height: 60px;
        /*line-height: 60px;*/
        background: #FFFFFF;
        box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.06);

        padding: 14px 30px;
    }

    .select-label {
        font-size: 12px;
        color: #999999;

        margin-right: 10px;
    }

    .right-tip {
        color: #999999;
        padding: 0 10px;
    }

    .set-def {
        font-size: 14px;
        color: #5599FF;
        height: 32px;
        line-height: 32px;

        cursor: pointer;
    }
</style>

