<template>
    <BaseModal :show="show"
               :header="pageState.modalTitle"
               width="450"
               okText="保存"
               @on-ok="ok"
               @on-cancel="cancel"
    >
        <Form ref="area" :model="form" :label-width="135" :rules="ruleValidate">
            <FormItem label="区域名称" prop="name">
                <Input v-model="form.name" style="width: 200px"
                       placeholder=""></Input>
            </FormItem>
        </Form>
    </BaseModal>
</template>

<script>
    import API from '@/config/api_table'
    import BaseModal from '@/components/modal/base-modal'

    let pageState = {
        modalTitle: '添加区域',
    }
    let form = {
        name: ''
    }
    export default {
        components: {BaseModal},
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },
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
                pageState,
                form,
                ruleValidate: {
                    name: [
                        {validator: validateName, trigger: 'blur'},
                    ],
                }
            }
        },
        name: "index",
        methods: {
            ok() {
                let self = this;
                self.$refs['area'].validate((valid) => {
                    if (valid) self.addArea()
                })
            },
            async addArea() {
                let self = this;
                const {success} = await API.addArea({area_name: self.form.name})
                if (success) {
                    self.$Message.success('添加区域成功')
                    self.$emit('on-success')

                }
            },
            cancel() {
                let self = this;
                self.$emit('on-cancel')
            }
        },
        watch: {
            show(newVal) {
                let self = this;
                if (newVal) {
                    self.$refs['area'].resetFields();
                    self.form.name = ''
                }
            }
        }
    }
</script>

<style scoped>

</style>
