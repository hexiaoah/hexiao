<template>
    <div :class="classes">
        <span v-if="hasSlot" :class="slotClasses">
            <slot></slot>
        </span>
    </div>
</template>

<script>
function oneOf(value, validList) {
    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true;
        }
    }
    return false;
}
const prefixCls = "divider";
export default {
    name: "Divider",
    props: {
        type: {
            type: String,
            default: "vertical",
            validator(value) {
                return oneOf(value, ["horizontal", "vertical"]);
            }
        },
        orientation: {
            type: String,
            default: "center",
            validator(value) {
                return oneOf(value, ["left", "right", "center"]);
            }
        },
        dashed: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        hasSlot() {
            return !!this.$slots.default;
        },
        classes() {
            return [
                `${prefixCls}`,
                `${prefixCls}-${this.type}`,
                {
                    [`${prefixCls}-with-text-${this.orientation}`]: this
                        .hasSlot,
                    [`${prefixCls}-dashed`]: !!this.dashed
                }
            ];
        },
        slotClasses() {
            return [`${prefixCls}-inner-text`];
        }
    }
};
</script>
<style scoped lang="less">
.divider {
    font-size: 14px;
    line-height: 1.5;
    color: #515a6e;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
    background: #e8eaec;
}
.divider-vertical {
    margin: 0 8px;
    display: inline-block;
    height: 0.9em;
    width: 1px;
    vertical-align: middle;
    position: relative;
    top: -0.06em;
}
.divider-horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 24px 0;
    clear: both;
}
</style>
