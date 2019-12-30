<template>
    <p :class="'copy-item'+index" :data-clipboard-text="text" @click.self="copy">
        <slot></slot>
    </p>
</template>

<script>
    import Clipboard from 'clipboard';

    export default {
        name: "clip-board",
        props: {
            index: {
                type: [String, Number],
                default() {
                    return ''
                }
            },
            text: String
        },
        methods: {
            copy() {
                let clipboard = new Clipboard('.copy-item' + this.index)
                clipboard.on('success', e => {
                    this.$toast("已复制到剪切板")
                    clipboard.destroy()
                })
                clipboard.on('error', e => {
                    // 不支持复制
                    this.$toast("该浏览器不支持自动复制")
                    // 释放内存
                    clipboard.destroy()
                })
            }
        }
    }
</script>

<style scoped>

</style>