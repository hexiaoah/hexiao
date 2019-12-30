<script>
const router = require("@2dfire/utils/router");
module.exports = {
  data() {
    return {
    };
  },
  components: {
    dialogs: require("base/components/dialogs/index.vue")
  },
  methods: {
    init() {
    }
  },
  created() {
    this.init();
  }
};
</script>
<template>
    <div id="wrapper">
        <dialogs></dialogs>
        <router-view></router-view>
    </div>
</template>

<style src="../base/styles/index.scss" lang="scss">
</style>

<style lang="scss" scoped>

</style>
