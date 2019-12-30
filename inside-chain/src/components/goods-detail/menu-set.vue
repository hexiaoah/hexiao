<template>
    <Form :model="formItem" :label-width="150" class="sale-fee">
        <FormItem label="菜单">
            <i-switch v-model="formItem.menu" size="default"></i-switch>
        </FormItem>
        <FormItem label="已加入的菜单">
            <i-switch v-model="formItem.haveJoined" size="default"></i-switch>
            <span>修改价格</span>
            <span>取消加入</span>
        </FormItem>
    </Form>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                formItem: {
                    menu: '',
                    haveJoined: ''
                }
            }
        },
        created(){

        },
        mounted() {

        },
        methods: {},
        components: {}
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

</style>

