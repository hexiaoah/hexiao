<template>
    <div>
        <baseCard>
            <Button class="fl-right mb-15px" type="primary" @click="showAddModal">添加区域</Button>
            <div class="fl-clear"></div>
            <div v-if="total > 0">
                <div class="area-table">
                    <table class="goods-table mb-10px">
                        <tr>
                            <th class="area-tr">
                                区域名称
                            </th>
                            <th>
                                操作
                            </th>
                        </tr>

                        <tr v-for="item in list">
                            <td>{{item.name}}</td>
                            <td>
                                <a class="table-button" @click="showEditModal(item)">编辑</a>
                                <a class="table-button" @click="delAreaBefore(item.id)">删除</a>
                            </td>
                        </tr>
                    </table>
                    <Spin size="large" fix v-if="loading"></Spin>
                </div>
                <div class="page-bar">
                    <Page :total="total" :current="params.page_index" :page-size="10" show-total @on-change="change"></Page>
                </div>
            </div>
            <div v-else>
                <NoArea text="当前店铺无区域，请添加区域！"></NoArea>
            </div>
        </baseCard>

        <BaseModal :show="pageState.modalShow"
                   :header="pageState.modalTitle"
                   width="450"
                   okText="保存"
                   @on-ok="ok"
                   @on-cancel="cancel"
        >
            <Form ref="area" :model="form" :label-width="135" :rules="ruleValidate">
                <FormItem label="区域名称" prop="name">
                    <Input v-model="form.name" style="width: 200px"
                           placeholder=""/>
                </FormItem>
            </Form>
        </BaseModal>
    </div>
</template>
<script>
    // 组件引入
    import shopModule from "@/store/modules/shop/index"
    import baseCard from '@/components/layout/base-card'
    import NoArea from '@/components/no-data/no-menu'
    import BaseModal from '@/components/modal/base-modal'
    import API from '@/config/api_table'

    let params = {
        page_index: 1,
        page_size: 10,
        sale_out_flag: false
    }

    let pageState = {
        modalShow: false,
        modalTitle: '',
        modalType: 1
    }

    let form = {
        id: '',
        name: ''
    }

    export default {
        data() {
            const validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('必填项，不能为空'));
                } else {
                    // 验证内容
                    const inputReg = new RegExp('^[\u4e00-\u9fa5a-zA-Z0-9]+$')
                    const inputOK = inputReg.test(value)

                    if (!inputOK) {
                        callback(new Error('区域名称仅允许输入中文、英文、数字'));
                    }
                    // 验证长度
                    if (value.length > 5) {
                        // 字符长度超过5个人
                        callback(new Error('区域名称长度不可超过5个字符'));
                    }
                    callback();
                }
            };
            return {
                params,
                pageState,
                form,
                loading: false,
                list: [],
                total: 0,
                ruleValidate: {
                    name: [
                        {validator: validateName, trigger: 'blur'},
                    ],
                }
            }
        },
        methods: {
            async getList() {
                let self = this;
                self.loading = true
                const {data, success} = await API.getAreaList(self.params)
                if (success) {
                    const {datas, totalRecord} = data
                    self.list = datas || [];
                    self.total = totalRecord;
                    setTimeout(() => {
                        self.loading = false
                    }, 500)
                }
            },
            initPage(index = 1) {
                let self = this;
                self.params.page_index = index;
                self.getList();
            },
            change(page_index) {
                let self = this;
                self.params.page_index = page_index;
                self.getList();
            },
            async addArea() {
                let self = this;
                const {success} = await API.addArea({area_name: self.form.name})
                if (success) {
                    self.cancel()
                    self.$Message.success('添加区域成功')
                    self.initPage()
                }
            },
            async updateArea() {
                let self = this;
                const {success} = await API.updateArea({
                    area_id: self.form.id,
                    area_name: self.form.name
                })
                if(success){
                    self.$Message.success('编辑区域成功')
                    self.cancel()
                    self.initPage(self.params.page_index)
                }

            },
            showAddModal() {
                let self = this;
                self.$refs['area'].resetFields();
                self.pageState.modalType = 1
                self.pageState.modalTitle = '添加区域'
                self.pageState.modalShow = true

            },
            showEditModal(item) {
                const self = this;
                self.$refs['area'].resetFields();
                self.pageState.modalType = 0
                self.pageState.modalTitle = '编辑区域'
                self.pageState.modalShow = true
                self.form.name = item.name
                self.form.id = item.id
            },
            delAreaBefore(id) {
                const self = this;
                self.$Modal.confirm({
                    title: '请注意',
                    content: '是否要删除该区域？',
                    onOk: () => {
                        self.delArea(id)
                    },
                })
            },
            async delArea(id) {
                const self = this;
                let ids = []
                ids.push(id)
                const {success} = await API.delArea({
                    area_ids: JSON.stringify(ids)
                })
                if(success) self.initPage()
            },
            ok() {
                let self = this;
                self.$refs['area'].validate((valid) => {
                    if (valid) {
                        if (self.pageState.modalType)
                            self.addArea()
                        else self.updateArea()
                    }
                })
            },
            cancel() {
                let self = this;
                self.pageState.modalShow = false
            }
        },
        created() {
            let self = this;
            self.$store.dispatch("leftNav/showShopNav", 6);

            self.initPage()
        },
        components: {
            baseCard, BaseModal, NoArea
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
    .area-tr {
        width: 90%;
    }

    .area-table {
        position: relative;
    }
</style>
