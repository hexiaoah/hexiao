<script>
    import Requester from '@/base/requester'
    import catchError from '@/base/catchError'
    import API from '@/config/api'
    import Tip from '@/components/tip/tip'

    export default {
        data() {
            return {
                brandList: [],
                selectedValue: null,
                oldSelected: null,
                hadDefaultBrand: false
            }
        },
        components: {
            Tip
        },
        methods: {
            async getAllBrand() {
                let self = this;
                try {
                    const data = await Requester.get(API.GET_ALL_PLATE)
                    const currId = this.$route.query.plate_entity_id
                    if (data.data && data.data.length > 0) {
                        this.brandList = data.data
                        if (currId) {
                            this.brandList.forEach(({entityId}) => {
                                if (entityId === currId) {
                                    this.changBrand(entityId)
                                    // this.selectedValue = entityId
                                }
                            })
                        }
//                        url上没有品牌id时，检查是否有默认品牌id
                        else{
                            if(self.brandList.length > 1){
                                self.brandList.map(item=>{
                                    if(item.defaultPlate) {
                                        self.selectedValue = item.entityId
                                    }
                                })
                            }
                        }
// 只有一个品牌时，也不显示设置默认按钮
                        if(self.brandList.length === 1){
                            self.hadDefaultBrand = true
                        }
                        if(self.brandList.length > 1){
                            self.brandList.map(item=>{
                                if(item.defaultPlate) {
                                    self.hadDefaultBrand = true
                                }
                            })
                        }
                    }else{
                        // 没有品牌 也不显示这个按钮
                        self.hadDefaultBrand = true
                    }
                } catch (e) {
                    catchError(e)
                }
            },
            getBrandById(id) {
                const arr = this.brandList.filter(({entityId}) => entityId === id)
                return arr.length ? arr[0] : null
            },
            changBrand(e) {
                let selectedItem = {}
                this.brandList.forEach(item => {
                    if (item.entityId === e) {
                        selectedItem = item
                    }
                })
                if (e && e !== this.oldSelected) {
                    if (selectedItem.canManage) {
                        if (this.oldSelected) {
                            this.$Modal.confirm({
                                title: '请注意',
                                content: `当前正在生${this.getBrandById(this.oldSelected).name}操作，确定需要切换品牌吗？`,
                                onOk: () => {
                                    this.selectedValue = e
                                    this.oldSelected = e
                                    this.$emit('change', selectedItem)
                                },
                                onCancel: () => {
                                    this.selectedValue = this.oldSelected
                                }
                            })
                        } else {
                            this.selectedValue = e
                            this.oldSelected = e
                            this.$emit('change', selectedItem)
                        }
                    } else {
                        this.$Modal.warning({
                            title: '请注意',
                            content: '您没有当前所选品牌的权限',
                            onOk: () => {
                                this.selectedValue = this.oldSelected
                            }
                        })
                    }
                }
            },
            goBrandManage() {
                this.$router.push({
                    path: "/shop_brand"
                })
            }
        },
        watch: {
            $route() {
                if (!this.$route.query.plate_entity_id) {
                    this.selectedValue = null
                    this.oldSelected = null
                    this.$emit('change', null)
                }
            }
        },
        created() {
            this.getAllBrand()
        }
    }
</script>

<template>
    <div class="brand-select">
        <span class="select-label">品牌</span>
        <Select style="width:100px"
                @on-change="changBrand"
                v-model="selectedValue"
        >
            <Option
                v-for="item in brandList"
                :value="item.entityId"
                :key="item.entityId"
            >
                {{item.name}}
            </Option>
        </Select>
        <span class="right-tip" v-show="!selectedValue">请先选择品牌，如果没有品牌请在掌柜APP内创建一个品牌。</span>
        <span class="fl-right set-def" v-if="!hadDefaultBrand" @click="goBrandManage">*设置默认操作品牌</span>

    </div>
</template>

<style lang="scss" scoped>
    .brand-select {
        width: 100%;
        height: 60px;
        /*line-height: 60px;*/
        background: #ffffff;
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
