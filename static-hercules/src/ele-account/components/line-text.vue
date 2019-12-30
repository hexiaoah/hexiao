<template>
    <div class="line-text clear-fix">
        <p class="label f-l" :class="labelClass">{{label}}</p>
        <p class="value f-r" :class="{'icon-right':iconRight,valueClass}">
            <slot>
                {{value}}
            </slot>
        </p>
    </div>
</template>

<script>
    export default {
        name: "line-text",
        props: {
            label: String,
            value: String,
            labelClass: String,
            valueClass: String,
            iconRight: Boolean,
            iconDirect: Boolean
        }
    }
</script>

<style lang="scss" scoped>
    .line-text {
        .value.icon-right {
            padding-right: 30px;
            background: url("https://assets.2dfire.com/frontend/759c714c40dc8148635fbea359ab2e63.png") no-repeat;
            background-size: 15px 26px;
            background-position: right center;
        }
    }
</style>