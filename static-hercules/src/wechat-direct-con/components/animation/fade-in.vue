<template>
    <transition
        v-if="!type"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
    >
        <slot></slot>
    </transition>
    <transition-group
        v-else
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
    >
        <slot></slot>
    </transition-group>
</template>

<script>
    import 'animate.css'
    export default {
        name: "fade-in",
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
