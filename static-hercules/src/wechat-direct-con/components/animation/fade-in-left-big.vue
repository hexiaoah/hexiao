<template>
    <transition
        v-if="!type"
        enter-active-class="animated fadeInLeftBig"
        leave-active-class="animated fadeOutRightBig"
    >
        <slot></slot>
    </transition>
    <transition-group
        v-else
        enter-active-class="animated fadeInLeftBig"
        leave-active-class="animated fadeOutRightBig"
    >
        <slot></slot>
    </transition-group>
</template>

<script>
    import 'animate.css'
    export default {
        name: "fade-in-right-big",
        props: {
            type: {
                type: String,
                default() {
                    return ''
                }
            }
        }
    }
</script>

<style scoped>

</style>
