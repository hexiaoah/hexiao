<template>
    <section class="sale-audit-con">
        <f-tabs v-model="activeTab" @click="tabClick">
            <f-tab-pane label="按天审核" name="day"></f-tab-pane>
            <f-tab-pane label="按店审核" name="shop"></f-tab-pane>
        </f-tabs>
        <router-view></router-view>
    </section>
</template>

<script>
    export default {
        name: "sale-audit-con",
        data() {
            return {
                activeTab: ''
            }
        },
        methods: {
            tabClick(name, e) {
                this.$router.replace({path: `/sale-audit/${name}`})
            }
        },
        created() {
            let path = this.$route.fullPath
            let lastIndex = path.lastIndexOf('/')
            this.activeTab = path.slice(lastIndex + 1)
        }
    }
</script>

<style scoped>

</style>