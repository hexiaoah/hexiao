<!--商品和套餐下面换分类组件-->
<template>
    <Poptip placement="bottom-end"
            width="225"
            title="换分类"
            v-model="visible">
        <div class="classify" @click.stop="checkCategory">换分类</div>
        <div slot="title" class="poptip-head">
            <span class="pull-left poptip-head-t">换分类</span>
            <span class="pull-right poptip-head-manage" @click="jumpToCategory">管理分类</span>
        </div>
        <div slot="content">
            <div class="menu-cen">
                <treeSelet @z-change="changeCategory"
                           v-if="visible"
                           :tree="treeData">
                </treeSelet>
            </div>
            <div class="menu-foot">
                <div class="save classifyBtn pull-right" @click="save">保存</div>
                <div class="cancel classifyBtn pull-right" @click="close">取消</div>
            </div>
        </div>
    </Poptip>
</template>

<script>
    import treeSelet from "@/components/tree/tree-select"
    import Tools from '@/base/tools'
    export default {
        props: {
            choosedItem: {
                type: Array,
                default: null
            },
            classificationList:{
                type: Array,
                default: null
            },
            type: {
                type: String,
                default: ''
            }
        },
        data(){
            return {
                visible: false,
                choosedCategoryEntityId: '',
                choosedCategoryName: ''
            }
        },
        computed: {
            treeData(){
                let str = JSON.stringify(this.classificationList)
                let replaceStr = str.replace(/subList/g, 'children')
                let newArr = JSON.parse(replaceStr)
                // 如果有被选中，那么其他分类就不能被点击，如果还没选择，其他分类可以被选择
                if(!!this.choosedCategoryEntityId){
                    return Tools.addDisableWidthOutChoosed(newArr, this.choosedCategoryEntityId)
                }
                else{
                    return Tools.addDisableWithChildren(newArr)
                }
            }
        },
        methods: {
            checkCategory(){
                if(!!this.choosedItem && !!this.choosedItem.length){
                    this.choosedCategoryEntityId = ''
                    this.visible = true
                }
                else{
                    let message = this.type === 'goods' ? '请先选择商品，再进行换分类操作！' : '请先选择套餐，再进行换分类操作！'
                    this.$Message.error(message)
                }
            },
            changeCategory(item){
                if(item.selected){
                    this.choosedCategoryEntityId = item.id
                    this.choosedCategoryName = item.name
                }
                else{
                    this.choosedCategoryEntityId = ''
                }
            },
            close(){
                this.visible = false
                this.choosedCategoryEntityId = ''
            },
            save(){
                this.visible = false
                this.$emit('save-change-group', this.choosedCategoryName,  this.choosedCategoryEntityId)
                this.choosedCategoryEntityId = ''
            },
            jumpToCategory(){
                let entityId = this.$route.query.entityId
                let path = ''
                let query = {}
                if(entityId){
                    path = '/single_shop_goods_class'
                    query = {
                        entityId: entityId,
                        crumbName: this.$route.query.crumbName
                    }
                }
                else{
                    path = '/goods_class'
                    query = {
                        plateEntityId: this.$route.query.plateEntityId
                    }
                }
                this.$router.push({
                    path: path,
                    query
                })
            }
        },
        components: {
            treeSelet
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    .ivu-input-group-prepend {
        background-color: #fff !important;
        border-right: none !important;
    }

    .menu-cen{
        height: 350px;
        overflow: auto;
        padding-bottom: 20px !important;
    }

    .menu-cen {
        padding-left: 10px;
        padding-right: 10px;
    }

    .classify {
        width: 88px;
        height: 32px;
        line-height: 32px;
        border: 1px solid #CCCCCC;
        border-radius: 4px;
        text-align: center;
        margin-top: 15px;
        cursor: pointer;
        display: inline-block;
    }

    .poptip-head {
        height: 38px;
        background: #F1F1F1;
        line-height: 38px;
        padding: 0;

        .poptip-head-t {
            margin-left: 10px;
        }

        .poptip-head-manage {
            margin-right: 10px;
            color: #5599FF;
            cursor: pointer;
        }
    }

    .menu-foot {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 30px;
        line-height: 30px;
        border-top: 1px solid #EEEEEE;
        padding-right: 10px;
        z-index: 10;
        background: white;

        .classifyBtn {
            width: 44px;
            height: 20px;
            border-radius: 3px;
            text-align: center;
            line-height: 20px;
            font-size: 11px;
            margin-top: 5px;
        }

        .cancel {
            border: 1px solid #CCCCCC;
            color: #333333;
            margin-right: 10px;
            cursor: pointer;
        }

        .save {
            color: #D83F3F;
            border: 1px solid #D83F3F;
            cursor: pointer;
        }
    }
</style>

