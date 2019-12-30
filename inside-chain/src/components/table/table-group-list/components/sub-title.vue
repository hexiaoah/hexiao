<template>
    <div class="note">
        <div class="note-title">
            <p class="category">{{name}}</p>
            <p class="allchoosed">{{isRequired === 0 ? '允许顾客自选' : '必须全部选择'}}</p>
        </div>
        <div class="operation-list">
            <a href="javascript:void(0)" @click="addGoods">添加商品</a>
            <a href="javascript:void(0)" @click="editSuitGroup">编辑</a>
            <a href="javascript:void(0)" @click="deleteSuitGroup">删除分组</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'sub-title',
        props: {
            name: {
                type: String,
                default: ''
            },
            isRequired: {
                type: Number,
                default: 0
            }
        },
        methods: {
            addGoods(){
                this.$emit('add-goods')
            },
            editSuitGroup(){
                this.$emit('edit-suit-group')
            },
            deleteSuitGroup(){
                this.$emit('delete-suit-group')
            }
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .note {
        height: 50px;
        background: white;
        border-bottom: 1px solid #E5E5E5;
        border-left: 1px solid #E5E5E5;
        border-right: 1px solid #E5E5E5;

        .note-title {
            margin-left: 10px;
            font-size: 12px;
            line-height: 12px;
            margin-top: 12px;
            display: inline-block;

            .category {
                color: #333333;
            }

            .allchoosed {
                color: #999999;
                margin-top: 5px;
            }
        }

        .operation-list {
            width: 172px;
            height: 50px;
            list-style-type: none;
            font-size: 12px;
            color: #5599FF;
            line-height: 12px;
            float: right;

            a {
                float: left;
                padding-right: 8px;
                padding-left: 8px;
                border-right: 1px solid #3F3F3F;
                line-height: 12px;
                margin-top: 20px;
                display: inline-block;
                font-size: 12px;
                color: #5599FF;
            }

            a:first-child {
                padding-left: 0;
            }

            a:last-child {
                padding-right: 0;
                border: none;
            }
        }
    }
</style>

