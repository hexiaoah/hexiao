<template>
    <div class="table-wrapper clearfix" v-if="hasChoosedBrand || opEntityId">
        <div class="table-header">
            <Select v-model="kindId"
                    @on-change="changeKindId"
                    class="choose-category pull-left">
                <Option v-for="(item, $index) in kindList"
                        :value="item && item.id"
                        :key="$index">
                    {{item.name}}
                </Option>
            </Select>

            <Input v-model="searchVal"
                   class="searchinput"
                   icon="search"
                   @on-click="filterGoods"
                   @on-enter="filterGoods"
                   placeholder="搜索">
            </Input>
            <router-link :to='addRouterPath' class="btn-addshop">添加商品</router-link>

        </div>

        <table-manage-list v-show="tableDataList && tableDataList.length"
                           :title-list="titleList"
                           :table-data="tableDataList"
                           :is-chain="!opEntityId"
                           :isEmpty="isEmpty"
                           @current-choosed="currentChoosed"
                           @delete-item="deleteItem"
                           @edit-item="editItem">
        </table-manage-list>

        <div class="table-footer" v-show="tableDataList && tableDataList.length">
            <!-- <change-category @save-change-group="saveChangeGroup"
                             :classification-list="categoryList"
                             :type="'goods'"
                             :choosed-item="choosedItemList">
            </change-category> -->
            <BatchSetupPoptip v-on:reload="reloadTableManage" :choosedItemList="choosedItemList" />
            <Page :total="total"
                  show-total
                  :current="page.pageNum"
                  :page-size="page.pageSize"
                  @on-change="changePageNum"
                  class="pull-right manage-page">
            </Page>
        </div>
        <div class="no-data" v-show="!!tableDataList && !tableDataList.length">
            <img src="https://assets.2dfire.com/frontend/3be21e322d74bc5d4977a43380e79daf.png" alt="" class="no-menu">
            <span>未找到符合要求的商品信息</span>
        </div>
    </div>
</template>

<script>
    //用于缓存搜索条件
    let catchInfo = {
        status: false,
    }
    import {goodsTableTitle, singleShopTableTitle} from '@/const/emu-table-title.js'
    import Tools from '@/base/tools'
    import TableManageList from './goods-manage-list/index.vue'
    import changeCategory from '@/components/category/change-category.vue'
    import BatchSetupPoptip from '@/components/batch-setup/batch-setup-poptip.vue'
    import {mapState, mapActions} from 'vuex'
    import {apiChangeGoodsCategory} from '@/config/api_setting'
    import catchError from '@/base/catchError'
    export default {
        name: 'goods-manage',
        props: {
            addRouterPath: {
                type: Object,
                default: {path: '/goods_add'},
                required: true
            },
            editRouterPath: {
                type: Object,
                default: {path: '/goods_edit'},
                required: true
            },
            plateEntityId: {
                type: String,
                default: '',
                required: false
            }
        },
        watch: {
            plateEntityId(newval){
                let opEntityId = this.$route.query.entityId
                this.getTableDataList(newval)
                // 获取分类列表
                this._getCategoryList({
                    isInclude: 0,
                    plateEntityId: newval,
                    opEntityId: opEntityId
                })
            }
        },
        data() {
            return {
                kindId: '0',
                opEntityId: '',
                searchVal: '',
                choosedItemList: [], // 被选中的商品
                page: {
                    pageNum: 1,
                    pageSize: 20
                },
                isEmpty:false
            }
        },
        computed: {
            ...mapState({
                categoryList(state){
                    return state.setting.categoryList || []
                },
                tableDataList(state){
                    let data = state.setting
                    return this.opEntityId ? data.single.goodsList.itemList : data.chain.goodsList.itemList
                },
                total(state){
                    let data = state.setting
                    return this.opEntityId ? data.single.goodsList.total : data.chain.goodsList.total
                }
            }),
            titleList(){
                return this.opEntityId ? singleShopTableTitle : goodsTableTitle
            },
            hasChoosedBrand(){
                return this.$route.query.plateEntityId
            },
            kindList(){
                return [{name: '全部分类', id: '0'}].concat(Tools.recursion(this.categoryList))
            },
        },
        created(){
            this.opEntityId = this.$route.query.entityId
            // 获取分类列表
            this._getCategoryList({
                isInclude: 0,
                plateEntityId: this.plateEntityId,
                opEntityId: this.opEntityId
            })
            if(catchInfo.status){ //重新赋值
                this.kindId = catchInfo.kindId
                this.searchVal = catchInfo.searchVal,
                this.page.pageSize = catchInfo.pageSize
                this.page.pageNum = catchInfo.pageNum
                catchInfo.status = false
            }
            // 获取商品列表
            this.getTableDataList()
        },
        methods: {
            ...mapActions({
                _getCategoryList: 'setting/getCategoryList',
                _getTableDataList: 'setting/getGoodsList',
                _deleteGoods: 'setting/deleteGoods'
            }),
            reloadTableManage(val){
                this.isEmpty = (!!val)
                this.getTableDataList()
            },
            // 获取商品列表
            getTableDataList(val){
                this._getTableDataList({
                    plateEntityId: val || this.plateEntityId,
                    kindId: this.kindId === '0' ? '' : this.kindId,
                    keyWord: this.searchVal.trim(),
                    pageNum: this.page.pageNum,
                    pageSize: this.page.pageSize,
                    opEntityId: this.opEntityId
                })
            },
            filterGoods(){
                if (this.searchVal.length > 20) {
                    this.$Message.error('搜索商品标题不能超过20个汉字')
                    return
                }
                this.page.pageNum = 1
                this.getTableDataList()
            },
            changeKindId(val){
                this.page.pageNum = 1
                this.kindId = val
                this.getTableDataList()
            },
            changePageNum(num){
                this.page.pageNum = num
                this.getTableDataList()
            },
            currentChoosed(itemList){
                this.choosedItemList = itemList
            },
            // 保存换取分类
            saveChangeGroup(name, id){
                let idList = this.choosedItemList.map(item => item.itemId)
                let nameList = this.choosedItemList.map(item => item.itemName).join(',')
                apiChangeGoodsCategory(this.plateEntityId, id, idList, this.opEntityId).then(data => {
                    data.data && this.$Message.success({
                        content: `${nameList}商品已移至${name}分类`,
                        duration: 800
                    })
                    setTimeout(() => {
                        window.location.reload()
                    }, 800)
                }).catch(e => {
                    catchError(e)
                })
            },
            editItem(item){
                let crumbName = this.$route.query.crumbName
                // 这个entityId就是opEntityId， 历史原因没改
                let opEntityId = this.$route.query.entityId
                let plateEntityId = this.$route.query.plateEntityId
                let query = crumbName ? {itemId: item.itemId, crumbName, entityId: opEntityId} : {
                    itemId: item.itemId,
                    plateEntityId
                }
                catchInfo = { //缓存数据
                    kindId: this.kindId,
                    searchVal: this.searchVal,
                    pageSize: this.page.pageSize,
                    pageNum: this.page.pageNum,
                    status: true
                }
                this.$router.push({
                    path: this.editRouterPath.path,
                    query: query
                })
            },
            deleteItem(item){
                // 这里传递这么多参数是为了删除后调用获取商品列表的接口
                this._deleteGoods({
                    plateEntityId: this.plateEntityId,
                    idList: JSON.stringify([item.itemId]),
                    opEntityId: this.opEntityId,
                    kindId: this.kindId === '0' ? '' : this.kindId,
                    keyWord: this.searchVal,
                    pageNum: this.page.pageNum,
                    pageSize: this.page.pageSize
                })
            },
        },
        components: {
            TableManageList,
            changeCategory,
            BatchSetupPoptip
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

    .table-wrapper {
        background: #ffffff;
        padding: 15px;

        .searchinput {
            width: 180px;
            height: 32px;
            margin-left: 10px;
        }

        .choose-category {
            width: 200px;
        }

        .manage-page {
            margin-top: 15px;
        }

        .btn-addshop {
            width: 88px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            display: inline-block;
            background: #D83F3F;
            border: 1px solid #D83F3F;
            border-radius: 4px;
            font-size: 12px;
            color: #FFFFFF;
            letter-spacing: 0;
            float: right;
            margin-right: 10px;
        }
    }

    .ivu-select-item-selected.ivu-select-item-focus {
        display: table-cell;
        min-width: 200px;
    }

    .no-data {
        text-align: center;
        padding: 15px 10px;
        font-size: 12px;
        color: #999999;

        .no-menu {
            display: block;
            width: 138px;
            height: 83px;
            margin: 27px auto;
        }
    }
</style>

