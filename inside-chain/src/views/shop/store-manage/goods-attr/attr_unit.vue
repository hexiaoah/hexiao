<!--商品 单位-->
<template>
    <div>
        <ButtonBar>
            <Button type="primary" @click="showAddModal">添加单位</Button>
        </ButtonBar>

        <!--无数据展示-->
        <NoData v-show="noData" text="未添加单位"></NoData>

        <!--单位列表-->
        <table v-show="!noData" class="goods-table">
            <thead>
            <tr>
                <th>单位名称</th>
                <th>换算关系</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in unitList">
                <td>{{item.unitDesc}}
                <span class="sys-unit" v-if="!item.unitType">（系统默认）</span>
                </td>
                <td>
                    <!--{{item.convert}}-->
                <span v-if="item.showConvert">1单位 = {{item.num}}克</span>
                <span v-if="!item.showConvert">-</span>
                </td>
                <td class="short-th">
                    <button class="table-button" @click="updateUnit(item)">编辑</button>
                    <button class="table-button" v-if="item.unitType" @click="deleteUnit(item)">删除</button>
                </td>
            </tr>
            </tbody>
        </table>

        <!-- 添加弹窗 -->
        <BaseModal :show="pageState.modalShow" :header="pageState.modalTitle" okText="保存" @on-ok="ok"
                   @on-cancel="cancel">
            <Form :label-width="80">
                <FormItem label="单位名称">
                    <Input v-model="form.unitDesc" placeholder="" style="width: 370px;margin: 0 10px" :disabled="pageState.modalType == 2"></Input>
                    <Verify :need="pageState.need" type="1" :value="form.unitDesc" :max="20" @verify="verifyFormUnit"></Verify>
                </FormItem>
                <FormItem label="换算关系" class="last-item" v-if="showConvert">
                    <span>1商品单位 =</span><Input v-model="form.num" placeholder="0.00"
                                               style="width: 305px;margin: 0 10px"></Input><span>克</span>
                    <Verify type="3" :value="form.num" @verify="verifyFormConvert"></Verify>
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
//        1: save, 2: update
        modalType: '1',
        verifyUnitName: true,
        verifyConvert: true,
        need: false
    };


    let form = {
        unitDesc: '',
        num: '',
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
                unitList: "goods/unitListSingle",
                showConvert: "goods/showConvertSingle",
            }),
            verifySuccess() {
                let self = this;
                return self.pageState.verifyConvert && self.pageState.verifyUnitName
            },
            noData() {
                let self = this;
                return !(self.unitList && self.unitList.length > 0)
            }
        },
        methods: {
            showAddModal() {
                let self = this;
                self.pageState.modalShow = true
                self.pageState.modalType = '1'
                self.pageState.modalTitle = '添加单位'
//                self.form.useUnitConversion = true
            },
//            弹窗关闭
            cancel() {
                let self = this;
                self.pageState.modalShow = false
                self.pageState.need = false;
                self.clearForm()
            },
//            表单验证用 单位名称
            verifyFormUnit(e) {
                let self = this;
                self.pageState.verifyUnitName = e
            },
//            验证表单输入 转换
            verifyFormConvert(e) {
                let self = this;
                self.pageState.verifyConvert = e
            },
            ok() {
                let self = this;
                Object.assign(self.form, self.pageParams)

//                输入通过验证 1: not empty  2: 长度限制
                if (form.unitDesc && self.verifySuccess) {
//                    关掉弹窗
                    self.pageState.modalShow = false
//                    提交保存
                    if(self.pageState.modalType === '1'){
                        self.$store.dispatch('goods/saveUnit', self.form);
                    }
                    //                    提交更新
                    if(self.pageState.modalType === '2'){
                        self.$store.dispatch('goods/updateUnit', self.form);
                    }
//                    清除表单输入
                    self.clearForm()
                    self.pageState.need = false;
                }else{
                    self.pageState.need = true;
                }
            },
//            清空弹窗内表单输入
            clearForm() {
                let self = this;
                self.form.unitDesc = ''
                self.form.num = ''
            },
//            删除单位
            deleteUnit(item) {
                let self = this;
                Object.assign(item, self.pageParams)

                self.$Modal.confirm({
                    title: '请注意',
                    content: '删除单位后，创建商品或套餐时将无法选择，请慎重操作！',
//                    点击确定的操作
                    onOk: () => {
                        self.$store.dispatch('goods/deleteUnit',item)
                    },
//                    点击取消的操作
                    onCancel: () => {
                        self.$Modal.hide();
                    }
                });
            },
//            编辑单位
            updateUnit(item) {

                let self = this;
                self.pageState.modalTitle = '编辑单位'
                self.pageState.modalType = '2'
                self.pageState.modalShow = true

                self.form.unitDesc = item.unitDesc
                self.form.num = item.num
//                self.form.useUnitConversion = item.useUnitConversion
            }
        },
        created() {
            console.log('CREATE UNIT')

            this.pageParams.opEntityId = this.$route.query.entityId;
            this.pageParams.plateEntityId = this.$route.query.plateEntityId;

            this.$store.dispatch('goods/getUnitList', this.pageParams)
            this.$store.dispatch('goods/getUnitConversion', this.pageParams)
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
.sys-unit{
    color: #999999;
}
</style>
