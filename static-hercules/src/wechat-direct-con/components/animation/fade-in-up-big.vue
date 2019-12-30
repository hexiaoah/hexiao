<template>
    <transition
        v-if="!type"
        enter-active-class="animated fadeInUpBig"
        leave-active-class="animated fadeOutDownBig"
    >
        <slot></slot>
    </transition>
    <transition-group
        v-else
        enter-active-class="animated fadeInUpBig"
        leave-active-class="animated fadeOutDownBig"
    >
        <slot></slot>
    </transition-group>
</template>

<script>
    import 'animate.css'
    export default {
        name: "fade-in-up-big",
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
