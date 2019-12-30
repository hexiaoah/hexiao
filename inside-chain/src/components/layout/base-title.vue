<script>
    /**
     -- zeqi@2dfire

     @props:
     size: number/string

     基本标题，放在需要标题的地方，一般左居中字号大小默认18
     */

    export default {
        props: ["size"],
        data() {
            return {}
        },
        computed: {
            styles() {
                let self = this;
                if (self.size !== undefined) {
                    return {
                        fontSize: self.size + 'px'
                    }
                }
            }
        },
        created() {

        }
    }
</script>

<template>
    <p class="title" :style="styles">
        <slot></slot>
    </p>
</template>

<style lang="scss" scoped>
    .title {
        font-size: 18px;
        color: #3C4144;
        font-weight: bold;
    }
</style>

