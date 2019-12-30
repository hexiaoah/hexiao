<!--
    步骤条
    步骤条块，几个步骤放几块在steps内
-->

<template>
    <div class="step" :class="classes" :style="styles">
        <div class="head" v-if="head"></div>
        <slot></slot>
        <div class="tail" v-if="tail"></div>
    </div>
</template>

<script>
    export default {
        props: ["current"],
        data() {
            return {
                total: 1,
                currentStatus: '',
                head: true,
                tail: true
            };
        },
        computed: {
            classes() {
                return [
                    `status-${this.currentStatus}`
                ]
            },
            styles() {
                return {
                    width: `${1 / this.total * 100}%`
                };
            }
        },
        methods: {},
        created() {
        },
        updated() {
        }
    };
</script>

<style lang="scss" scoped>
    .step {
        display: inline-block;
        height: 44px;
        line-height: 44px;
        font-size: 14px;
        text-align: center;

        background: #F1F1F1;
        color: #666666;
    }

    .tail {
        float: right;

        border-top: 22px solid  #ffffff;
        border-left: 18px solid #F1F1F1;
        border-bottom: 22px solid  #ffffff;
    }
    .head {
        float: left;

        border-top: 22px solid transparent;
        border-left: 18px solid #ffffff;
        border-bottom: 22px solid transparent;
    }
    .body {
        display: inline-block;
    }
    .status-active {
        background: #D83F3F;
        color: #ffffff;

        .tail {
            border-left-color: #D83F3F;

        }
    }
</style>
