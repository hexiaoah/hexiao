<template>
    <div>
        <BaseCard>
            <BaseTitle>基本信息</BaseTitle>
            <div class="table-form">
                <Form ref="table" :model="form" :label-width="155" :rules="ruleValidate">
                    <FormItem label="区域" prop="area">
                        <Select v-model="form.area" style="width:200px">
                            <Option v-for="item,index in areaList" :value="item.id"
                                    :key="item.id+'_selectArea'">
                                {{ item.name }}
                            </Option>
                        </Select>
                        <button class="table-button" @click="refresh">刷新</button>
                        <button class="table-button" @click="modalShow">新建区域</button>
                    </FormItem>
                    <FormItem label="桌位名称" prop="name">
                        <Input v-model="form.name"
                               style="width: 200px"
                               placeholder=""
                        >
                        </Input>

                    </FormItem>
                    <FormItem label="建议人数（人）" prop="number">
                        <Select v-model="form.number" style="width:200px">
                            <Option v-for="item,index in numList" :value="item"
                                    :key="index+'_selectNum'">
                                {{ item }}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="桌位类型" prop="type">
                        <Select v-model="form.type" style="width:200px">
                            <Option v-for="name,value in TableType" :value="value"
                                    :key="value+'_selectNum'">
                                {{ name }}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="桌位编号" prop="code">
                        <Input v-model="form.code"
                               style="width: 200px"
                               placeholder=""
                        >
                        </Input>
                    </FormItem>
                </Form>
            </div>

        </BaseCard>
        <div class="fixed-save">
            <Button type="primary"
                    class="save-btn"
                    @click="handleSubmit">
                保存
            </Button>
        </div>
        <AddArea :show="addModalShow" @on-success="addSuccess" @on-cancel="addCancel"></AddArea>
    </div>
</template>

<script>
    import BaseCard from '@/components/layout/base-card'
    import BaseTitle from '@/components/layout/base-title'
    import TableType from "@/const/emu-tableType"
    import AddArea from "../area-add"
    import API from '@/config/api_table'

    export default {
        props: {
            info: Object
        },
        components: {
            BaseCard,
            BaseTitle,
            AddArea
        },
        name: "table-base",
        data() {
            // 通用中英文验证
            const validateCNENNUM = (rule, value, callback) => {
                const inputReg = new RegExp('^[\u4e00-\u9fa5a-zA-Z0-9]+$')
                if (!inputReg.test(value)) callback(new Error('区域名称仅允许输入中文、英文、数字'));
                callback()
            }
            // 通用中英文验证
            const validateENNUM = (rule, value, callback) => {
                const inputReg = new RegExp('^[a-zA-Z0-9]+$')
                if (!inputReg.test(value)) callback(new Error('桌位编码仅允许输入英文、数字'));
                callback()
            }
            return {
                TableType,
                areaList: [],
                numList: [],
                form: {
                    area: '',
                    name: '',
                    number: '',
                    type: '',
                    code: ''
                },
                ruleValidate: {
                    area: [
                        {required: true, message: '必填项，不能为空', trigger: 'change'}
                    ],
                    name: [
                        {required: true, message: '必填项，不能为空', trigger: 'blur'},
                        {type: 'string', max: 10, message: '桌位名称不得超过10个字符', trigger: 'blur'},
                        {validator: validateCNENNUM, trigger: 'blur'}
                    ],
                    number: [
                        {required: true, message: '必填项，不能为空', trigger: 'change'}
                    ],
                    type: [
                        {required: true, message: '必填项，不能为空', trigger: 'change'}
                    ],
                    code: [
                        {required: true, message: '必填项，不能为空', trigger: 'blur'},
                        {type: 'string', max: 10, message: '桌位编码不得超过10个字符', trigger: 'blur'},
                        {validator: validateENNUM, trigger: 'blur'}
                    ],
                },
                addModalShow: false
            }
        },
        methods: {
            async getAreaList() {
                let self = this;
                const area_params = {
                    sale_out_flag: false,
                    page_index: 1,
                    page_size: 1000
                }
                const {data, success} = await API.getAreaList(area_params)
                if (success) {
                    const {datas} = data

                    let tmp = datas || [];
                    self.areaList = []
                    if (tmp && tmp.length > 0) {
                        // tmp.map(item => {
                        //     self.areaList.push({
                        //         checked: false,
                        //         name: item.name,
                        //         id: item.id,
                        //     })
                        // })
                        self.areaList = tmp
                    }
                }

            },
            initNumList() {
                let self = this;

                // 生成一个1-100的数字数组
                self.numList = Object.keys(Array.from({length: 100})).map(function (item) {
                    return (+item + 1).toString();
                });
            },
            save() {
                let self = this;
                console.log('output', self.form);
                self.$emit('on-save', self.form)
            },
            handleSubmit() {
                let self = this;
                // 验证输入是否通过
                self.$refs['table'].validate((valid) => {
                    if (valid) {
                        self.save()
                    }
                })
            },
            handleReset() {
                let self = this;

                self.$refs['table'].resetFields();
            },
            refresh() {
                let self = this;
                self.getAreaList()
                self.$Message.success('刷新区域列表成功')
            },
            modalShow() {
                let self = this;
                self.addModalShow = true;
            },
            addCancel() {
                let self = this;
                self.addModalShow = false;
            },
            addSuccess() {
                let self = this;
                self.refresh()
                self.addModalShow = false;
            }
        },
        created() {
            let self = this;
            self.getAreaList()
            self.initNumList()
            // if(self.info){
            // Object.assign(self.form, self.info)
            // self.form = self.info
            // }
        },
        watch: {

            info(newVal) {
                let self = this;
                if (newVal) {
                    self.form = self.info

                }
            }
        },
        mounted() {
            let self = this;
            self.handleReset()
        }

    }
</script>

<style scoped>
    .table-form {
        padding: 32px;
    }

    .save-btn {
        position: absolute;
        width: 180px;
        height: 36px;
        left: 50%;
        margin-left: -90px;
    }
</style>
