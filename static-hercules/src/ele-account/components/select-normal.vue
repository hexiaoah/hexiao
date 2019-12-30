<template>
    <mask-layer v-bind="$attrs" v-on="$listeners">
        <div class="select-normal">
            <p class="title">{{title}}</p>
            <ul class="select-list">
                <li class="item" :class="item.code===selected?'icon-ok':''" v-for="item in list" @click="handleClick(item)"><p>{{item.name}}</p></li>
            </ul>
        </div>
    </mask-layer>
</template>

<script>
    export default {
        name: "select-normal",
        props: {
            list: {
                type: Array,
                default: []
            },
            selected: {
                type: [Number, String],
                default: ''
            },
            title: {
                type: String,
                default: ''
            }
        },
        methods: {
            handleClick(item) {
                let data = {...item}
                this.$emit('click', data)
                this.$emit('update:selected', data.code)
                this.$emit('update:visible', false)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/border";

    .select-normal {
        background-color: #fff;
        margin-top: 80px;
        padding-left: 30px;
        font-size: 30px;
        .title {
            height: 100px;
            line-height: 100px;
            font-weight: bold;
            @extend .border-bottom;
        }
        .select-list .item {
            height: 88px;
            line-height: 88px;
            @extend .border-bottom;
            padding-right: 30px;
            &:last-child {
                border-bottom: none;
            }
            &.icon-ok p {
                background: url("https://assets.2dfire.com/frontend/968849d2fd3777820124b0bc6d1b5834.png") no-repeat;
                background-size: 26px 20px;
                background-position: right center;
            }
        }
    }
</style>