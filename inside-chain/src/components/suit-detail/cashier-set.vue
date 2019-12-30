<template>
    <div class="content">
        <Form :model="cashierSet" :label-width="175">
            <FormItem label="允许收银员在收银时打折">
                <i-switch v-model="cashierSet.isAllowDiscount === 1" size="default" @on-change="change('isAllowDiscount', $event)"></i-switch>
            </FormItem>
            <FormItem label="允许收银员在收银时修改价格">
                <i-switch v-model="cashierSet.isChangePrice === 1" size="default" @on-change="change('isChangePrice', $event)"></i-switch>
            </FormItem>
            <FormItem label="退菜时需要权限验证" class="mt-10px">
                <i-switch v-model="cashierSet.isBackAuth === 1" size="default" @on-change="change('isBackAuth', $event)"></i-switch>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'
    export default {
        computed: {
            ...mapGetters({
                cashierSet: "setting/suitDetailToBackCashierSet",
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
<style lang="scss" type="text/scss" scoped>
    .content {
        overflow: hidden;
        padding-top: 0;
        padding-bottom: 0;
    }

    .ivu-form-item {
        width: 50%;
        float: left;
        padding-left: 20px;
        margin-bottom: 0;

        /deep/ label {
            padding-right: 18px;
        }

        /deep/ input {
            width: 200px;
        }

        &.check {
            margin-bottom: 0;
            margin-top: 7px;
        }
    }
</style>
