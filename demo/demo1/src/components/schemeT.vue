<template>
    <div>
        <div class="title">{{title}}</div>
        <div><slot></slot></div>
    </div>
</template>

<script>
export default {
    name: 'scheme-t',
    props:["title"]

}
</script>

<style lang="scss" scoped>
    .title{
        font-size: 16px;
        color: #333333;
        margin-top: 25px;
        margin-bottom: 25px;
        font-weight: bold;
    }
</style>
