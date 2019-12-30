<template>
    <Form :label-width="195" class="sale-fee">
        <FormItem label="套餐上架">
            <i-switch v-model="Form.status === 1" size="default" @on-change="change('status', $event)"></i-switch>
        </FormItem>
    </Form>
</template>

<script>
    import {mapGetters, mapActions} from "vuex"
    export default {
        computed: {
            ...mapGetters({
                Form: "setting/suitDetailToBackStateSet",
            })
        },
        methods: {
            ...mapActions({
                _changeSuitBaseInfoVal: 'setting/changeSuitBaseInfoVal'
            }),
            change(type, val){
                let value = val
                if(Object.prototype.toString.call(val) === '[object Boolean]'){
                    value = Number(val)
                }
                this._changeSuitBaseInfoVal({attr: type, val: value})
            }
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .ivu-form-item{
        margin-bottom: 0;
    }
</style>

