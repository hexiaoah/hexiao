<template>
    <div>
        <baseCard>

            <Select v-model="params.area_id" style="width:128px" @on-change="searchChangeArea">
                <Option :value=-1>全部区域</Option>
                <Option v-for="item,index in areaList" :value="item.id" :key="index+'_selectArea'">
                    {{ item.name }}
                </Option>
            </Select>
            <Input v-model="params.name"
                   style="width:180px"
                   placeholder="搜索"
                   @on-enter="getList"
                   @on-click="getList"
                   icon="ivu-icon ivu-icon-search"
            >
            </Input>

            <Button class="fl-right mb-15px" type="primary" @click="goAddTable">添加桌位</Button>
            <Button class="fl-right mb-15px mr-10px ivu-btn-ghost"
                    type="primary"
                    @click="delTableListBefore"
                    :disabled="checkedCount === 0"
            >
                批量删除
            </Button>
            <div class="fl-clear"></div>
            <div v-if="list.length > 0">
                <div class="spin-table">
                    <table class="goods-table mb-10px">
                        <tr>
                            <th>
                                <Checkbox :value="all" @on-change="checkAll">
                                    <span class="pl-10px">
                                    桌位
                                    </span>
                                </Checkbox>
                            </th>
                            <th>
                                所属区域
                            </th>
                            <th>
                                桌位类型
                            </th>
                            <th class="tool-tr">
                                操作
                            </th>
                        </tr>

                        <tr v-for="item in list">
                            <td>
                                <Checkbox :value="item.checked"
                                          @on-change="checkOne(item)"
                                >
                                    <TableInfo :info="item"></TableInfo>
                                </Checkbox>
                            </td>
                            <td>{{item.areaName}}</td>
                            <td>{{item.seatKind | seatKind}}</td>
                            <td>
                                <a class="table-button" @click="goEditTable(item)">编辑</a>
                                <a class="table-button" @click="delTableBefore(item.id)">删除</a>
                            </td>
                        </tr>
                    </table>
                    <Spin size="large" fix v-if="loading"></Spin>
                </div>
                <div class="page-bar">
                    <ChangeArea :can="checkedCount === 0" :list="areaList" class="fl-left"
                                @on-save="changeArea"></ChangeArea>
                    <Page :total="total" :current="params.page_index" :page-size="10" show-total @on-change="change"></Page>
                </div>
            </div>
            <div v-else>
                <NoTable :text="noDataText"></NoTable>
                <div class="center-btn">

                    <Button v-if="noTable" @click="goImport">桌位批量导入</Button>
                </div>
            </div>
        </baseCard>
    </div>
</template>
<script>
    // 组件引入
    import shopModule from "@/store/modules/shop/index"
    import baseCard from '@/components/layout/base-card'
    import NoTable from '@/components/no-data/no-menu'
    import TableInfo from '../components/table-info'
    import ChangeArea from '../components/change-area'
    import Filters from '@/const/filter'
    import API from '@/config/api_table'

    let params = {
        page_index: 1,
        page_size: 10,
        area_id: -1,
        name: ''
    }

    let catchParams = {
        status:false
    }

    export default {
        data() {
            return {
                params,
                loading: true,
                list: [],
                areaList: [],
                total: 0,
                noDataText: '',
                noTable: false,
                noTableText: '当前店铺暂无桌位，请添加桌位！',
                noSearchedText: '未找到符合要求的桌位信息'
            }
        },
        components: {
            baseCard, NoTable, TableInfo, ChangeArea
        },
        computed: {
            all() {
                let self = this;
                const listLength = self.list.length;
                return listLength === self.checkedCount
            },
            checkedCount() {
                let self = this;
                let checkedCount = 0;
                self.list.map(item => {
                    if (item.checked) checkedCount++
                })
                return checkedCount
            },
        },
        methods: {
            async getList() {
                let self = this;
                self.loading = true
                const {data, success} = await API.getTableList({
                    page_index: self.params.page_index,
                    page_size: self.params.page_size,
                    area_id: self.params.area_id === -1 ? '' : self.params.area_id,
                    name: self.params.name
                })
                if (success) {
                    const {datas, totalRecord} = data

                    let tmp = datas || [];
                    // todo 测试使用，无桌位情况模拟
                    // tmp=[]
                    //
                    self.list = []
                    if (tmp && tmp.length > 0) {
                        tmp.map(item => {
                            self.list.push({
                                checked: false,
                                name: item.name,
                                adviseNum: item.adviseNum,
                                code: item.code,
                                id: item.id,
                                seatKind: item.seatKind,
                                areaName: item.areaName,
                            })
                        })
                    } else {
                        self.setNoDataText(self.params)
                    }

                    self.total = totalRecord;
                    setTimeout(() => {
                        self.loading = false
                    }, 500)
                }

            },
            setNoDataText(searchItems) {
                let self = this;
                // 至少存在一种搜索条件 即判断为是有搜索条件
                if (searchItems.area_id !== -1 || searchItems.name !== '') {
                    self.noDataText = self.noSearchedText
                    self.noTable = false
                } else {
                    self.noDataText = self.noTableText
                    self.noTable = true
                }
            },
            // 获取所有区域
            async getAreaAll() {
                let self = this;
                const area_params = {
                    sale_out_flag: false
                }
                const {data, success} = await API.getAreaAll(area_params)
                if (success) {

                    let tmp = data || [];
                    self.areaList = []
                    if (tmp && tmp.length > 0) {
                        tmp.map(item => {
                            self.areaList.push({
                                checked: false,
                                name: item.name,
                                id: item.id,
                            })
                        })
                    }
                }

            },
            searchChangeArea() {
                let self = this;
                self.getList()
            },
            initPage() {
                let self = this;
                if(catchParams.status){
                    self.params.page_index = catchParams.page_index;
                    self.params.area_id = catchParams.area_id;
                    self.params.name = catchParams.name;
                    catchParams.status = false
                }else{
                    self.params.page_index = 1;
                    self.params.area_id = -1;
                    self.params.name = '';
                }
                self.getList();
            },
            change(page_index) {
                let self = this;
                self.params.page_index = page_index;
                self.getList();
            },
            goAddTable() {
                let self = this;
                self.$router.push({
                    path: 'add',
                    query: {
                        entityId: self.$route.query.entityId
                    }
                })
            },
            goImport() {
                let self = this;
                self.$router.push({
                    path: 'import',
                    query: {
                        entityId: self.$route.query.entityId
                    }
                })
            },
            goEditTable(item) {
                let self = this;
                catchParams = {...self.params,status:true}
                self.$router.push({
                    path: 'edit',
                    query: {
                        id: item.id,
                        entityId: self.$route.query.entityId
                    }
                })
            },
            delTableBefore(id) {
                const self = this;
                self.$Modal.confirm({
                    title: '请注意',
                    content: '删除桌位后将无法恢复，请慎重操作！',
                    onOk: () => {
                        let ids_tmp = []
                        ids_tmp.push(id)
                        const ids = JSON.stringify(ids_tmp)
                        self.delTables(ids)
                    },
                })
            },
            delTableListBefore() {
                const self = this;
                self.$Modal.confirm({
                    title: '请注意',
                    content: `是否对选中的${self.checkedCount}个桌位进行批量删除？`,
                    onOk: () => {
                        let ids_tmp = []
                        self.list.map(item => {
                            if (item.checked) ids_tmp.push(item.id)
                        })
                        const ids = JSON.stringify(ids_tmp)
                        self.delTables(ids)
                    },
                })
            },
            async delTables(ids) {
                const self = this;
                const {success} = await API.delTables({seat_ids: ids})
                // 删除成功后，返回第一页
                if (success) {
                    self.params.page_index = 1
                    self.getList()
                }
            },
            checkAll() {
                const self = this;
                const isChecked = self.all
                self.list.map(item => {
                    item.checked = !isChecked
                })
            },
            checkOne(e) {
                const self = this;
                self.list.map(item => {
                    if (e.id === item.id) {
                        item.checked = !item.checked
                    }
                })
            },
            // 批量替换桌位所在区域
            async changeArea(e) {
                let checkedList = [];
                let checkedNamesList = [];
                let self = this;
                self.list.map(item => {
                    if (item.checked) {
                        checkedList.push(item.id)
                        checkedNamesList.push(item.name)
                    }
                })
                const seat_ids = JSON.stringify(checkedList)
                const {success} = await API.updateSeatArea({
                    area_id: e.id,
                    seat_ids
                })

                if(success){
                    const checkedNames = checkedNamesList.join('、')
                    self.$Message.success(`${checkedNames}已移至区域【${e.name}】`)
                    self.initPage()
                }

            }
        },
        filters: Filters,
        created() {
            let self = this;
            self.$store.dispatch("leftNav/showShopNav", 6);
            self.getAreaAll()
            self.initPage()
        },
        beforeCreate() {
            let self = this;

//            动态注册module
            let {shop = {}} = self.$store.state

            if (Object.keys(shop).length <= 0) {
                self.$store.registerModule('shop', shopModule)
            }
        }
    };
</script>
<style lang="scss" scoped>
    .tool-tr {
        width: 10%;
    }

    .spin-table {
        position: relative;
    }

    .center-btn {
        text-align: center;
    }
</style>
