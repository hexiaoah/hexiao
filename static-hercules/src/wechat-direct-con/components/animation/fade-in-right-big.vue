<template>
    <transition
        v-if="!type"
        enter-active-class="animated fadeInRightBig"
        leave-active-class="animated fadeOutLeftBig"
    >
        <slot></slot>
    </transition>
    <transition-group
        v-else
        enter-active-class="animated fadeInRightBig"
        leave-active-class="animated fadeOutLeftBig"
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
