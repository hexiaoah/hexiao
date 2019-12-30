<template>
    <div class="content clearfix" v-if="hasChoosedBrand || opEntityId">
        <div class="filter-wrapper">
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
                   @on-click="filterSuit"
                   @on-enter="filterSuit"
                   placeholder="搜索">
            </Input>

            <router-link :to="addRouterPath" class="btn-add-suit">添加套餐</router-link>
        </div>
        <table-manage-list v-show="tableDataList && tableDataList.length"
                           :title-list="titleList"
                           :table-data="tableDataList"
                           :is-chain="!opEntityId"
                           @current-choosed="currentChoosed"
                           @delete-item="deleteItem"
                           @edit-item="editItem">
        </table-manage-list>

        <div class="footer" v-show="tableDataList && tableDataList.length">
            <change-category @save-change-group="saveChangeGroup"
                             :classification-list="categoryList"
                             :choosed-item="choosedSuitList">
            </change-category>
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
            <span>未找到符合要求的套餐信息</span>
        </div>
    </div>
</template>

<script>
    //用于缓存搜索条件
    let catchInfo = {
        status: false,
    }
    import {suitTableTitle, singleSuitTableTitle} from '@/const/emu-table-title.js'
    import Tools from '@/base/tools'
    import TableManageList from './suit-manage-list/index.vue'
    import changeCategory from '@/components/category/change-category.vue'
    import {mapState, mapActions} from 'vuex'
    import {apiChangeSuitCateGory} from '@/config/api_setting'
    import catchError from '@/base/catchError'
    export default {
        name: 'suit-manage',
        props: {
            addRouterPath: {
                type: Object,
                default(){
                    return {}
                }
            },
            editRouterPath: {
                type: Object,
                default: {path: '/edit_set_base_info'},
                required: true
            },
            plateEntityId: {
                type: String,
                default: '',
                required: false
            }
        },
        watch: {
            plateEntityId(newval, oldval){
                let opEntityId = this.$route.query.entityId
                this.getSuitList(newval)
                // 获取分类列表
                this._getCategoryList({
                    isInclude: 1,
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
                choosedSuitList: [], // 被选中的套餐
                suitList: [],
                page: {
                    pageNum: 1,
                    pageSize: 20,
                }
            }
        },
        computed: {
            ...mapState({
                categoryList(state){
                    return state.setting.categoryList || []
                },
                tableDataList(state){
                    let data = state.setting
                    return (this.opEntityId ? data.single.suitList.list : data.chain.suitList.list) || []
                },
                total(state){
                    let data = state.setting
                    return this.opEntityId ? data.single.suitList.total : data.chain.suitList.total
                },
            }),
            kindList(){
                return [{name: '全部分类', id: '0'}].concat(Tools.recursion(this.categoryList))
            },
            hasChoosedBrand(){
                return this.$route.query.plateEntityId
            },
            titleList(){
                return this.opEntityId ? singleSuitTableTitle : suitTableTitle
            }
        },
        created(){
            this.opEntityId = this.$route.query.entityId
            if (!!this.opEntityId || !!this.plateEntityId) {
                // 获取分类列表
                this._getCategoryList({
                    isInclude: 1,
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
                this.getSuitList()
            }
        },
        methods: {
            ...mapActions({
                _getCategoryList: 'setting/getCategoryList',
                _getSuitList: 'setting/getSuitList',
                _deleteSuit: 'setting/deleteSuit'
            }),
            // 获取套餐列表
            getSuitList(val){
                if (this.searchVal.length > 20) {
                    this.$Message.error('搜索套餐标题不能超过20个汉字')
                    return
                }
                this._getSuitList({
                    opEntityId: val || this.opEntityId,
                    kindId: this.kindId === '0' ? '' : this.kindId,
                    plateEntityId: this.plateEntityId,
                    keyWord: this.searchVal.trim(),
                    pageIndex: this.page.pageNum,
                    pageSize: this.page.pageSize
                })
            },
            filterSuit(){
                if (this.searchVal.length > 20) {
                    this.$Message.error('搜索套餐标题不能超过20个汉字')
                    return
                }
                this.page.pageNum = 1
                this.getSuitList()
            },
            changeKindId(val){
                this.kindId = val
                this.getSuitList()
            },
            changePageNum(num){
                this.page.pageNum = num
                this.getSuitList()
            },
            currentChoosed(itemList){
                this.choosedSuitList = itemList
            },
            // 换分类成功后刷新列表
            saveChangeGroup(name, id){
                let suitIdList = this.choosedSuitList.map(item => item.suitId)
                let nameList = this.choosedSuitList.map(item => item.itemName).join(',')
                apiChangeSuitCateGory(id, suitIdList, this.opEntityId).then(data => {
                    data.data && this.$Message.success({
                        content: `${nameList}套餐已移至${name}分类`,
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
                let plateEntityId = this.$route.query.plateEntityId
                // 这个entityId就是opEntityId， 历史原因没改
                let entityId = this.$route.query.entityId
                let query = crumbName ? {itemId: item.suitId, crumbName, entityId} : {
                    itemId: item.suitId,
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
                this._deleteSuit({
                    plateEntityId: this.plateEntityId,
                    kindId: this.kindId === '0' ? '' : this.kindId,
                    keyWord: this.searchVal,
                    pageIndex: this.page.pageNum,
                    pageSize: this.page.pageSize,
                    suitId: item.suitId,
                    opEntityId: this.opEntityId
                })
            }
        },
        components: {
            TableManageList,
            changeCategory
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .content {
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

        .btn-add-suit {
            width: 88px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            background: #D83F3F;
            border: 1px solid #D83F3F;
            border-radius: 4px;
            font-size: 12px;
            color: #FFFFFF;
            letter-spacing: 0;
            float: right;

            &.disabled {
                color: #bbbec4;
                background-color: #f7f7f7;
                border-color: #dddee1;
                cursor: not-allowed;
            }
        }

        .manage-page {
            margin-top: 15px;
        }
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

    .ivu-select-item-selected.ivu-select-item-focus {
        display: table-cell;
        min-width: 200px;
    }
</style>

