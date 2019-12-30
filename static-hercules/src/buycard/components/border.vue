<template>
<div class="borderWrap" :class="{active:type}">
    <div class="content">
        <slot></slot>
    </div>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
</div>
</template>

<script>
export default {
    props: {
        type: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
.borderWrap {
    position: relative;
    width: 690px;
    height: 232px;
    overflow: hidden;
    margin:0 auto;
    .content {
        width: 690px;
        height: 232px;
        border: 1PX solid #eeeeee;
    }

    i {
        position: absolute;
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        background: #ffffff;
        z-index: 2;
        border: 1PX solid #eeeeee;
        font-style: normal;
    }

    i:nth-of-type(1) {
        left: -20px;
        top: -20px;
    }

    i:nth-of-type(2) {
        right: -20px;
        top: -20px;
    }

    i:nth-of-type(3) {
        right: -20px;
        bottom: -20px;
    }

    i:nth-of-type(4) {
        left: -20px;
        bottom: -20px;
    }
}

.borderWrap.active {
    width: 666px;
    height: 202px;
    margin:12px 10px;

    .content {
        width: 666px;
        height: 202px;
        border: 1PX solid rgba(213,155,81,0.2);
        padding: 0 28px;
        position: relative;
    } 
    i{
        border: 1PX solid rgba(213,155,81,0.2);
    }
}
</style>
