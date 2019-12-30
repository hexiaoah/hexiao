<template>
    <transition
            enter-active-class="animated fadeInRightBig"
            leave-active-class="animated fadeOutLeftBig"
    >
        <router-view class="router-view"></router-view>
    </transition>

</template>

<script>
    import 'animate.css'

    export default {
        name: "app"
    }
</script>

<style lang="scss">
    @import "./styles/reset";
    @import "./styles/common";
    @import "./styles/border";
</style>