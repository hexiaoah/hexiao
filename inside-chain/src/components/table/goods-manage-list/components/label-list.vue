<template>
    <div class="shop-label-wrapper"
         :style="{width: '25%'}">
        <div :class="['shop-label-icon', {active: showEdit}]"
             @mouseenter="showEdit = true"
             @mouseleave="showEdit = false">
            <div class="shop-label spicy">微辣</div>
            <div class="shop-label groom">强烈推荐</div>
            <div class="shop-label new-dish">本月新菜</div>
            <span class="edit" v-show="showEdit">编辑</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                showEdit: false
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
    .shop-label-wrapper {
        padding-top: 12px;
        padding-bottom: 5px;

        .shop-label-icon {
            display: flex;
            flex-direction: column;
            position: relative;
            width: 100px;
            margin-left: -10px;
            padding: 10px 0 10px 10px;

            &.active {
                background: #F1F1F1;
            }

            .shop-label {
                border-radius: 2px;
                color: #fff;
                margin-top: 2px;
                margin-bottom: 2px;
                text-align: center;
                display: inline-block;
                font-size: 12px;
                line-height: 16px;

                &.spicy {
                    background: #FFAA00;
                    width: 40px;
                }

                &.groom {
                    background: #D83F3F;
                    width: 56px;
                }

                &.new-dish {
                    background: #49C070;
                    width: 56px;
                }
            }

            .edit {
                position: absolute;
                width: 32px;
                height: 16px;
                background-color: #5599FF;
                font-size: 10px;
                text-align: center;
                color: white;
                right: 0;
                top: 0;
                cursor: pointer;
            }
        }
    }
</style>

