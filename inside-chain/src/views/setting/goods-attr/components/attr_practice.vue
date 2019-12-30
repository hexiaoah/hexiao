<!--商品 做法-->
<template>
    <div>
        <ButtonBar>
            <Button type="primary" @click="showAddModal">添加做法</Button>
        </ButtonBar>

        <!--无数据展示-->
        <NoData v-show="noData" text="未添加做法"></NoData>

        <!--做法列表-->
        <table v-show="!noData" class="goods-table">
            <thead>
            <tr>
                <th>做法</th>
                <th class="short-th">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in practiceList">
                <td>{{item.name}}</td>
                <td>
                    <button class="table-button" @click="editPractice(item)">编辑</button>
                    <button class="table-button" @click="deletePractice(item)">删除</button>
                </td>
            </tr>
            </tbody>
        </table>

        <!-- 添加弹窗 -->
        <BaseModal :show="pageState.modalShow" :header="pageState.modalTitle" okText="保存" @on-ok="ok"
                   @on-cancel="cancel">
            <Form :label-width="80">
                <FormItem label="做法名称" class="last-item">
                    <Input v-model="form.name" placeholder=""></Input>
                    <Verify :need="pageState.need" type="1" :value="form.name" :max="20" @verify="verifyPractice"></Verify>
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
        verifySuccess: true,
        need: false

    };

    let form = {
        name: ''
    }
    let pageParams = {
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
                practiceList: "goods/practiceList",
            }),
            noData() {
                let self = this;
                return !(self.practiceList && self.practiceList.length > 0)
            }
        },
        methods: {
//            验证输入合法
            verifyPractice(e) {
                let self = this;
                self.pageState.verifySuccess = e
            },
//            打开弹窗
            showAddModal() {
                let self = this;
                self.pageState.modalShow = true
                self.pageState.modalTitle = '添加做法'
            },
//            弹窗内 点击取消/右上角X
            cancel() {
                let self = this;
                self.pageState.modalShow = false
                self.pageState.need = false;
                self.clearForm()
            },
//            弹窗内 点击保存
            ok() {
                let self = this;
                Object.assign(self.form, self.pageParams)

//                输入通过验证 1: not empty  2: 长度限制
                if (form.name && self.pageState.verifySuccess) {
                    console.log('input success!')
//                    关掉弹窗
                    self.pageState.modalShow = false
//                    提交
                    self.$store.dispatch('goods/savePractice', self.form)

                    self.clearForm()
                    delete self.form.id
                    self.pageState.need = false;

                }
                else{
                    self.pageState.need = true;
                }
            },
            //            清空弹窗内表单输入
            clearForm() {
                let self = this;
                self.form.name = ''
            },
            //编辑做法
            editPractice(item){
                this.pageState.modalTitle = '编辑做法'
                this.form.name = item.name
                this.form.id = item.id
                this.pageState.modalShow = true
            },
            //            删除做法
            deletePractice(item) {
//
                let self = this;
                Object.assign(item, self.pageParams)

                self.$Modal.confirm({
                    title: '请注意',
                    content: '删除做法后，用到此做法的所有商品将会全部取消关联，请慎重操作！',
//                    点击确定的操作
                    onOk: () => {
                        self.$store.dispatch('goods/deletePractice', item)
                    },
//                    点击取消的操作
                    onCancel: () => {
                    }
                });
            },
        },
        created() {
//            初始化
            console.log('CREATE PRAC')
            let self = this;
            self.pageParams.plateEntityId = self.$route.query.plateEntityId;
            self.$store.dispatch('goods/getPracticeList', self.pageParams)
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
