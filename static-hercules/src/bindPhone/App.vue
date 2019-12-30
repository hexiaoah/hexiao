<script>
const router = require('@2dfire/utils/router');
module.exports = {
    data() {
        return {};
    },
    components: {
        dialogs: require('base/components/dialogs/index.vue')
    },
    methods: {},
    created() {}
};
</script>
<template>
    <div id="wrapper" class="wrapper">
        <dialogs></dialogs>
        <router-view></router-view>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    height: 100%;
}
</style>
