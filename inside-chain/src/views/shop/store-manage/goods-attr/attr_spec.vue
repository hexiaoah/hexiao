<!--商品 规格-->
<template>
    <div>
        <ButtonBar>
            <Button type="primary" @click="showAddModal">添加规格</Button>
        </ButtonBar>

        <!--无数据展示-->
        <NoData v-show="noData" text="未添加规格"></NoData>

        <!--规格列表-->
        <table v-show="!noData" class="goods-table">
            <thead>
            <tr>
                <th>规格名称</th>
                <th>用料是基准商品用料的几倍</th>
                <th>价格是基准商品价格的几倍</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in specList">
                <td>{{item.name}}</td>
                <td>{{item.rawScale}}</td>
                <td>{{item.priceScale}}</td>
                <td class="short-th">
                    <button class="table-button" @click="updateSpec(item)">编辑</button>
                    <button class="table-button" @click="deleteSpec(item)">删除</button>
                </td>
            </tr>
            </tbody>
        </table>

        <!-- 添加弹窗 -->
        <BaseModal :show="pageState.modalShow" :header="pageState.modalTitle" okText="保存" @on-ok="ok"
                   @on-cancel="cancel">
            <Form :label-width="200">
                <FormItem label="规格名称">
                    <Input v-model="form.name" placeholder=""></Input>
                    <Verify :need="pageState.need" type="1" :value="form.name" :max="20"
                            @verify="verifySpecName"></Verify>
                </FormItem>
                <FormItem label="此规格用料是基准商品用料的几倍">
                    <Input v-model="form.rawScale" placeholder=""></Input>
                    <Verify :need="pageState.need" type="3" :value="form.rawScale" :max="100000"
                            @verify="verifyMatls"></Verify>
                </FormItem>
                <FormItem label="此规格价格是基准商品价格的几倍" :class="{'last-item': !showRange}">
                    <Input v-model="form.priceScale" placeholder=""></Input>
                    <Verify :need="pageState.need" type="3" :value="form.priceScale" :max="100000"
                            @verify="verifyPrice"></Verify>
                </FormItem>

                <FormItem label="请选择算价规则" v-show="showRange" :class="{'last-item': showRange}">
                    <RadioGroup v-model="form.range">
                        <Radio :label="1">重新计算所有商品单价</Radio>
                        <Radio :label="2">重新计算所有商品单价(不包括自定义过单价的商品)</Radio>
                    </RadioGroup>
                </FormItem>
            </Form>
        </BaseModal>
    </div>
</template>
<script>
    import ButtonBar from '@/components/button/button-bar'

    import BaseModal from '@/components/modal/base-modal'

    import Verify from '@/components/verify/base-verify'
    import NoData from '@/components/no-data/no-table'

    import {mapGetters} from "vuex";

    let pageState = {
        modalShow: false,
        modalTitle: '',
        modalType: 1,
        verifySpecName: true,
        verifyMatls: true,
        verifyPrice: true,
        need: false,
//        showRange: false,
    };
    let form = {
        id: '',
        name: '',
        rawScale: '',
        priceScale: '',
        range: 0,
        priceOld: '',
    }

    let pageParams = {
        opEntityId: '',
        plateEntityId: ''
    }

    export default {
        data() {
            return {
                pageState,
                pageParams,
                form
            }
        },
        computed: {
            ...mapGetters({
                specList: "goods/specListSingle",
            }),
            verifySuccess() {
                let self = this;
                return self.pageState.verifySpecName && self.pageState.verifyMatls && self.pageState.verifyPrice
            },
            noData() {
                let self = this;
                return !(self.specList && self.specList.length > 0)
            },
            showRange() {
                let self = this;
                if (!!self.form.priceOld && !!self.form.priceScale && self.pageState.verifyPrice && self.pageState.modalType == 2) {
                    if (parseFloat(self.form.priceOld) != parseFloat(self.form.priceScale)) {
                        self.form.range = 1;
                        return true
                    }
                    else {
                        self.form.range = 0;
                        return false
                    }
                } else {
                    self.form.range = 0;
                    return false
                }
            }
        },
        methods: {
            showAddModal() {
                let self = this;
                self.pageState.modalShow = true
                self.pageState.modalType = '1'
                self.pageState.modalTitle = '添加规格'
            },
//            弹窗关闭
            cancel() {
                let self = this;
                self.pageState.modalShow = false
                self.pageState.need = false;
                self.clearForm()
            },
//            表单验证用 单位名称
            verifySpecName(e) {
                let self = this;
                self.pageState.verifySpecName = e
            },
//            验证表单输入 用料
            verifyMatls(e) {
                let self = this;
                self.pageState.verifyMatls = e
            },
//            验证表单输入 价格
            verifyPrice(e) {
                let self = this;
                self.pageState.verifyPrice = e
            },
            ok() {
                let self = this;
                Object.assign(self.form, self.pageParams)
//                输入通过验证 1: not empty  2: 长度限制
                if (form.name && form.rawScale && form.priceScale && self.verifySuccess) {
                    console.log(self.form)

//                    关掉弹窗
                    self.pageState.modalShow = false
//                    提交保存
                    if (self.pageState.modalType == '1') {
                        self.$store.dispatch('goods/saveSpec', self.form)
                    } else {
                        self.$store.dispatch('goods/updateSpec', self.form)
                    }
//                    清除表单输入
                    self.clearForm()
                    self.pageState.need = false;

                }
                else {
                    self.pageState.need = true;
                }
            },
//            清空弹窗内表单输入
            clearForm() {
                let self = this;
                self.form.id = ''
                self.form.name = ''
                self.form.rawScale = ''
                self.form.priceScale = ''
            },
//            删除规格
            deleteSpec(item) {
                let self = this;
                Object.assign(item, self.pageParams)
                self.$Modal.confirm({
                    title: '请注意',
                    content: '删除规格后，用到此规格的所有商品将会全部取消关联，请慎重操作！',
//                    点击确定的操作
                    onOk: () => {
                        self.$store.dispatch('goods/deleteSpec', item)
                    },
//                    点击取消的操作
                    onCancel: () => {
                    }
                });
            },
//            编辑单位
            updateSpec(item) {

                let self = this;

                self.pageState.modalTitle = '编辑规格'
                self.pageState.modalType = '2'
                self.pageState.modalShow = true

                self.form.id = item.id
                self.form.name = item.name
                self.form.rawScale = item.rawScale
                self.form.priceScale = item.priceScale
                self.form.priceOld = item.priceScale
            }
        },
        created() {
            console.log('CREATE SPEC')

            this.pageParams.opEntityId = this.$route.query.entityId;
            this.pageParams.plateEntityId = this.$route.query.plateEntityId;
            this.$store.dispatch('goods/getSpecList', this.pageParams)
        },
        components: {
            ButtonBar,
            BaseModal,
            Verify,
            NoData
        }
    };
</script>
<style lang="scss" scoped>

</style>
