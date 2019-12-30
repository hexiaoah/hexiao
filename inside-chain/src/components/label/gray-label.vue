<script>
    /**
     -- zeqi@2dfire

     @props:
     name：标签显示内容，
     right：是否开启右侧预留区域 提供点击事件

     @event:
     on-tap: 右侧冒泡的点击事件

     */

    export default {
        props: ["name","right"],
        methods: {
            tapRight() {
                this.$emit('on-tap');
            }
        },
    }
</script>

<template>
    <div class="gray-label">
        <span class="name">{{name}}</span>
        <span v-if="right" class="right" @click="tapRight">
            <slot></slot>
        </span>
    </div>
</template>

<style lang="scss" scoped>
    .gray-label {
        display: inline-block;

        background: #F1F1F1;
        margin-right: 10px;
        margin-bottom: 10px;
        font-size: 14px;
        color: #333333;

        padding: 8px 16px;

        border-radius: 15px;
        line-height: 1;

    }

    .name {
        display: inline-block;
    }

    .right {
        display: inline-block;
        margin-left: 6px;
    }
</style>

