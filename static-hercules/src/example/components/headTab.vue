<script>
    module.exports = {
        props: ['homeData']
    }
</script>

<template>
    <div class="head-tab">
        <h1>
            {{ homeData.title }}
        </h1>
    </div>
</template>
<!-- 组件样式要用 scoped 防止全局污染-->
<style src="./headTab.scss" lang="scss" scoped></style>
